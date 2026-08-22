import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { retrieveForQuestion } from "./policies";
import { DISCLAIMER } from "@/data/copy";
import { regionName, disabilityLabel } from "@/data/catalog";

export type ProfileInput = {
  displayName: string;
  regionCode: string;
  disabilityTypes: string[];
  disabilityGrade: string;
  ageGroup: string;
  employmentStatus: string;
  education: string;
  livingSituation: string;
  needs: string[];
  extraNotes: string;
};

export const getProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      display_name: string;
      region_code: string;
      disability_types: string;
      disability_grade: string;
      age_group: string;
      employment_status: string;
      education: string;
      living_situation: string;
      needs: string;
      extra_notes: string;
    }>`select display_name, region_code, disability_types, disability_grade, age_group,
             employment_status, education, living_situation, needs, extra_notes
      from user_profiles where user_id = ${context.userId}`;
    const row = rows[0];
    if (!row) return null;
    const parse = (s: string): string[] => {
      try {
        const v = JSON.parse(s) as unknown;
        return Array.isArray(v) ? v.map(String) : [];
      } catch {
        return [];
      }
    };
    return {
      displayName: row.display_name,
      regionCode: row.region_code,
      disabilityTypes: parse(row.disability_types),
      disabilityGrade: row.disability_grade,
      ageGroup: row.age_group,
      employmentStatus: row.employment_status,
      education: row.education,
      livingSituation: row.living_situation,
      needs: parse(row.needs),
      extraNotes: row.extra_notes,
    } satisfies ProfileInput;
  });

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: ProfileInput) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const types = JSON.stringify(data.disabilityTypes.slice(0, 8));
    const needs = JSON.stringify(data.needs.slice(0, 8));
    await sql`
      insert into user_profiles (
        user_id, display_name, region_code, disability_types, disability_grade,
        age_group, employment_status, education, living_situation, needs, extra_notes, updated_at
      ) values (
        ${context.userId}, ${data.displayName.slice(0, 40)}, ${data.regionCode},
        ${types}, ${data.disabilityGrade}, ${data.ageGroup}, ${data.employmentStatus},
        ${data.education}, ${data.livingSituation}, ${needs},
        ${data.extraNotes.slice(0, 500)}, now()
      )
      on conflict (user_id) do update set
        display_name = excluded.display_name,
        region_code = excluded.region_code,
        disability_types = excluded.disability_types,
        disability_grade = excluded.disability_grade,
        age_group = excluded.age_group,
        employment_status = excluded.employment_status,
        education = excluded.education,
        living_situation = excluded.living_situation,
        needs = excluded.needs,
        extra_notes = excluded.extra_notes,
        updated_at = now()
    `;
    return { ok: true as const };
  });

export type AdviceResult =
  | {
      ok: true;
      text: string;
      citations: { id: string; title: string; docNo: string; regionName: string }[];
    }
  | { ok: false; error: string };

export const generateAdvice = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<AdviceResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "个性化建议暂时不可用。" };

    const sql = await getSql();
    const rows = await sql<{
      display_name: string;
      region_code: string;
      disability_types: string;
      disability_grade: string;
      age_group: string;
      employment_status: string;
      education: string;
      living_situation: string;
      needs: string;
      extra_notes: string;
    }>`select * from user_profiles where user_id = ${context.userId}`;
    const row = rows[0];
    if (!row || !row.region_code) {
      return { ok: false, error: "请先完善个人档案后再生成建议。" };
    }
    const types = (() => {
      try {
        return JSON.parse(row.disability_types) as string[];
      } catch {
        return [];
      }
    })();
    const needs = (() => {
      try {
        return JSON.parse(row.needs) as string[];
      } catch {
        return [];
      }
    })();

    const query = [
      regionName(row.region_code),
      ...types.map(disabilityLabel),
      row.disability_grade,
      row.age_group,
      row.employment_status,
      ...needs,
      "两项补贴 康复 就业 无障碍 教育",
    ].join(" ");

    const policies = await retrieveForQuestion(query, row.region_code, types, 10);
    const contextBlock = policies
      .map(
        (p, i) =>
          `【${i + 1}】${p.title}（${p.regionName} / ${p.docNo}）\n摘要：${p.summary}\n要点：${p.keyPoints.join("；")}\n对象：${p.eligibility}\n办理：${p.howToApply}`,
      )
      .join("\n\n");

    const profileText = `地区：${regionName(row.region_code)}
残疾类别：${types.map(disabilityLabel).join("、") || "未填"}
等级：${row.disability_grade || "未填"}
年龄段：${row.age_group}
就业：${row.employment_status}
教育：${row.education}
生活：${row.living_situation}
需求：${needs.join("、") || "未填"}
补充：${row.extra_notes || "无"}`;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.3,
        max_tokens: 1600,
        messages: [
          {
            role: "system",
            content: `你是「残助通」个性化顾问。根据用户档案和【政策库摘录】写出可执行的建议。
结构必须为：
一、可能符合的政策（只列摘录里能对应上的，标文件名，不确定就写“需当地核实”）
二、康复与日常生活（政策路径与生活适应，不做医疗诊断）
三、教育或职业发展（按年龄和就业状态）
四、下一步行动清单（3—7条，写清去哪个窗口）
禁止编造金额和地方独有标准。语气尊重、具体、不煽情。不要使用星号、井号、反引号等 Markdown 符号，用「一、二、三」和小标题即可。`,
          },
          {
            role: "user",
            content: `档案：\n${profileText}\n\n【政策库摘录】\n${contextBlock}\n\n${DISCLAIMER}`,
          },
        ],
      }),
    });
    if (!res.ok) return { ok: false, error: `生成失败（${res.status}），请稍后重试。` };
    const body = (await res.json()) as { choices: { message: { content: string } }[] };
    const text = body.choices[0]?.message.content ?? "";
    const citations = policies.map((p) => ({
      id: p.id,
      title: p.title,
      docNo: p.docNo,
      regionName: p.regionName,
    }));
    await sql`
      insert into advice_reports (user_id, content, citations)
      values (${context.userId}, ${text}, ${JSON.stringify(citations)})
    `;
    return { ok: true, text, citations };
  });

export const latestAdvice = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ content: string; citations: string; created_at: string }>`
      select content, citations, created_at::text from advice_reports
      where user_id = ${context.userId}
      order by id desc limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    let citations: { id: string; title: string; docNo: string; regionName: string }[] = [];
    try {
      citations = JSON.parse(row.citations) as typeof citations;
    } catch {
      citations = [];
    }
    return { text: row.content, citations, createdAt: row.created_at };
  });
