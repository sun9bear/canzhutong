import { createFileRoute, Link } from "@tanstack/react-router";
import { ReadAloud } from "@/components/read-aloud";
import { DISCLAIMER } from "@/data/copy";

export const Route = createFileRoute("/_app/guides")({
  component: Guides,
});

const STEPS = [
  {
    title: "办理残疾人证",
    body: "向户口所在地县级残联申请，填写表格，到指定医院或评定机构评残。评定通过后由残联审核制证。智力、精神和未成年残疾人由监护人代办。这是享受绝大多数专项政策的前提。",
    to: "/library/$policyId" as const,
    params: { policyId: "disability-certificate" },
  },
  {
    title: "申请两项补贴",
    body: "生活补贴主要面向低保家庭残疾人；护理补贴主要面向一、二级重度残疾人。两项可同时领。向街道或乡镇申请，材料一般包括身份证、户口簿、残疾人证。金额以当地公示为准。",
    to: "/library/$policyId" as const,
    params: { policyId: "two-subsidies-2015" },
  },
  {
    title: "残疾儿童康复救助",
    body: "国家托底对象是 0—6 岁视力、听力、言语、肢体、智力残疾儿童和孤独症儿童。许多省份扩大了年龄。监护人向县级残联申请，到定点机构训练或手术。",
    to: "/library/$policyId" as const,
    params: { policyId: "child-rehab-rescue" },
  },
  {
    title: "求职与按比例就业",
    body: "到残联就业服务机构或公共就业服务平台登记。用人单位应按不低于 1.5%（地方可规定更高）安排残疾人就业，未达标缴纳残保金。个人也可申请培训、创业和辅助性就业。",
    to: "/library/$policyId" as const,
    params: { policyId: "sc-employment-ordinance" },
  },
  {
    title: "家庭无障碍改造",
    body: "困难重度残疾人家庭可申请坡道、卫生间、房门、闪光门铃等改造。向村（居）或县级残联报名，名额按年度项目安排。",
    to: "/library/$policyId" as const,
    params: { policyId: "family-home-access" },
  },
  {
    title: "维权与法律援助",
    body: "可拨打 12385，也可到残联法律救助工作站、法律援助机构办理，或在本应用「问一问」文字咨询。符合条件的可免予核查经济困难。",
    to: "/library/$policyId" as const,
    params: { policyId: "legal-aid-law" },
  },
];

function Guides() {
  const speakAll = STEPS.map((s, i) => `第${i + 1}步，${s.title}。${s.body}`).join("");

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold">办事指南</h1>
        <p className="mt-2 text-muted">
          把最常见的六件事走一遍。窗口名称各地略有不同，以政务服务网和残联大厅为准。
        </p>
        <div className="mt-3">
          <ReadAloud text={`办事指南。${speakAll}`} label="朗读全部步骤" />
        </div>
      </header>
      <ol className="space-y-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="rounded-xl bg-surface p-5 shadow-card">
            <p className="text-sm font-medium text-primary">第 {i + 1} 步</p>
            <h2 className="mt-1 font-display text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            <Link
              to={s.to}
              params={s.params}
              className="mt-3 inline-flex h-11 items-center text-sm font-medium text-primary"
            >
              查看依据文件
            </Link>
          </li>
        ))}
      </ol>
      <section className="rounded-xl border border-border p-5">
        <h2 className="font-display text-lg font-semibold">不依赖电话怎么办理</h2>
        <p className="mt-2 leading-relaxed text-muted">
          全程可以用文字：本应用「问一问」、当地政务服务网、残联窗口书面交流。闪光门铃、手语翻译等无障碍服务可向县级残联询问。打电话不是唯一途径。
        </p>
      </section>
      <section className="rounded-xl border border-border p-5">
        <h2 className="font-display text-lg font-semibold">数据怎么来的</h2>
        <p className="mt-2 leading-relaxed text-muted">
          国家层面收录法律、行政法规和国务院、多部门公开文件的结构化要点。地方层面为 31
          个省（区、市）及部分中心城市的实施办法、十四五规划、两项补贴和儿童康复救助路径，用于对照「国家托底
          + 地方细化」。 地方金额、扩大对象范围变动频繁，库中刻意不锁死具体元/月数字。
        </p>
        <p className="mt-3 text-sm text-subtle">{DISCLAIMER}</p>
      </section>
    </div>
  );
}
