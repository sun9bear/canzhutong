import { createServerFn } from "@tanstack/react-start";
import { retrieveForQuestion } from "./policies";
import { retrieveOrgs } from "./orgs";
import { DISCLAIMER } from "@/data/copy";
import type { PolicyDetail } from "./policies";
import type { OrgRecord } from "@/data/orgs";
import { chatCompletion } from "./llm";

/** In-memory askPolicy rate limit: ~20 requests per IP per hour. */
const ASK_RATE_LIMIT = 20;
const ASK_WINDOW_MS = 60 * 60 * 1000;

type AskBucket = { count: number; resetAt: number };
const askBuckets = new Map<string, AskBucket>();

function headerIp(request: Request, name: string): string | undefined {
  const raw = request.headers.get(name);
  if (!raw) return undefined;
  const first = raw.split(",")[0]?.trim();
  return first || undefined;
}

async function clientIp(): Promise<string> {
  // Dynamic import: this module is pulled into the client via askPolicy RPC.
  // A static `@tanstack/react-start/server` import would ship AsyncLocalStorage
  // to the browser (see isolation.server.ts).
  const { getRequest } = await import("@tanstack/react-start/server");
  const request = getRequest();
  if (!request) return "unknown";
  // Prefer platform-set headers; the first X-Forwarded-For hop is client-spoofable.
  const vercel = headerIp(request, "x-vercel-forwarded-for");
  if (vercel) return vercel;
  const realIp = headerIp(request, "x-real-ip");
  if (realIp) return realIp;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded.split(",").map((s) => s.trim()).filter(Boolean);
    // Last hop is typically appended by the trusted proxy.
    const last = hops[hops.length - 1];
    if (last) return last;
  }
  return "unknown";
}

/** Returns false when the IP is over the hourly budget. */
function takeAskToken(ip: string): boolean {
  const now = Date.now();
  let bucket = askBuckets.get(ip);
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + ASK_WINDOW_MS };
    askBuckets.set(ip, bucket);
  }
  if (bucket.count >= ASK_RATE_LIMIT) return false;
  bucket.count += 1;
  return true;
}

function formatContext(policies: PolicyDetail[]): string {
  return policies
    .map((p, i) => {
      const points = p.keyPoints.map((k) => `- ${k}`).join("\n");
      return `【文件${i + 1}】${p.title}
文号/依据：${p.docNo || "见正文"}
层级：${p.level}　地区：${p.regionName}
状态：${p.status}
摘要：${p.summary}
要点：
${points}
对象：${p.eligibility}
如何办理：${p.howToApply}
正文摘录：
${p.body.slice(0, 1800)}`;
    })
    .join("\n\n----\n\n");
}

function formatOrgs(orgs: OrgRecord[]): string {
  if (!orgs.length) return "";
  return orgs
    .map((o, i) => {
      const phones = o.phones.length ? o.phones.join("、") : "（官网未公布分机，请用热线）";
      return `【机构${i + 1}】${o.name}
层级：${o.level}　地区：${o.regionName}
地址：${o.address || "暂未收录"}
电话：${phones}
热线：${o.hotline}
网站：${o.website}
来源：${o.sourceName} ${o.sourceUrl}
备注：${o.notes}`;
    })
    .join("\n\n");
}

const SYSTEM = `你是「残助通」政策助手，专门依据用户消息后附带的【政策库摘录】和【机构黄页】回答中国残疾人权益、福利、康复、就业、教育、无障碍及残联联系方式问题。

必须遵守：
1. 只根据摘录作答。摘录没有写明的金额、截止日期、材料清单、地方扩大范围、办公电话，明确说「当前库中没有该细则，请向户籍地残联或拨打12385核实」，禁止编造电话号码和金额。
2. 先给简短结论，再列依据（《文件名》或文号），再写办理路径和注意点。问电话、地址时先给12385，再给已收录的机构信息，并写来源。
3. 区分国家规定与地方规定。地方标准以当地最新文件为准。
4. 使用简明中文，短句，避免黑话；必要时用括号解释术语。可用小标题和数字条目排版，不要用星号、井号、反引号等 Markdown 符号。
5. 不提供医学诊断、用药或手术方案；康复内容只谈政策路径和一般生活适应。
6. 不构成法律意见。可在结尾用一句话提醒核实。
7. 若问题与摘录无关，说明能力范围，并建议拨打12385。
8. 回答面向使用者，不要出现「本轮」「扫描进度」「已核」「未锁定」「能打电话的人」这类内部或不当措辞。电话写「可拨打12385」，不要按能否打电话区分使用者。`;

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type AskResult =
  | {
      ok: true;
      text: string;
      citations: { id: string; title: string; docNo: string; regionName: string }[];
    }
  | { ok: false; error: string };

export const askPolicy = createServerFn({ method: "POST" })
  .validator(
    (input: {
      question: string;
      region?: string;
      disabilityTypes?: string[];
      history?: ChatTurn[];
    }) => input,
  )
  .handler(async ({ data }): Promise<AskResult> => {
    const ip = await clientIp();
    if (!takeAskToken(ip)) {
      return {
        ok: false,
        error: "提问过于频繁，请稍后再试（每小时约 20 次），或先用政策库检索。",
      };
    }

    const question = data.question.trim().slice(0, 800);
    if (!question) return { ok: false, error: "请输入问题" };

    const wantOrg = /电话|地址|残联|热线|怎么找|联系|黄页|窗口/.test(question);
    const [policies, orgs] = await Promise.all([
      retrieveForQuestion(question, data.region, data.disabilityTypes, 8),
      retrieveOrgs(question, data.region, wantOrg ? 6 : 3),
    ]);
    const context = formatContext(policies);
    const orgBlock = formatOrgs(orgs);
    const history = (data.history ?? []).slice(-6).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content.slice(0, 2000),
    }));

    const llm = await chatCompletion({
      system: SYSTEM,
      temperature: 0.2,
      max_tokens: 1200,
      messages: [
        ...history,
        {
          role: "user",
          content: `${question}\n\n【政策库摘录】\n${context}\n\n【机构黄页】\n${orgBlock || "（无）"}\n\n【声明】${DISCLAIMER}`,
        },
      ],
    });

    if (!llm.ok) {
      if (llm.error === "no_config") {
        return {
          ok: false,
          error: "智能咨询暂时不可用，请先在政策库中检索，或拨打 12385。",
        };
      }
      if (llm.error === "timeout") {
        return {
          ok: false,
          error: "咨询请求超时，请稍后重试，或改用政策库检索。",
        };
      }
      const status = llm.status ? `（${llm.status}）` : "";
      return {
        ok: false,
        error: `咨询服务暂时繁忙${status}，请稍后重试或改用政策库检索。`,
      };
    }

    return {
      ok: true,
      text: llm.text,
      citations: policies.map((p) => ({
        id: p.id,
        title: p.title,
        docNo: p.docNo,
        regionName: p.regionName,
      })),
    };
  });
