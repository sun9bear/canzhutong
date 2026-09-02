import type { OrgLevel, OrgRecord } from "./orgs";

/**
 * Official employment deep links allowed on H5 /jobs「官方办事入口」.
 * Homepages (残联 / 人社 / 政务网门户)、人社部站、已停用域名、占位栏目、登录 SPA 不收录。
 * 没有深链的省份保持空列表，不回退到门户首页。
 */
export const EMPLOYMENT_DEEP_LINK_URLS = [
  "https://www.cdpf.org.cn/ywpd/jyjy/index.htm",
  "https://www.gov.cn/zhengce/2007-03/05/content_2602471.htm",
  "https://www.gov.cn/zhengce/zhengceku/2015-09/15/content_5650063.htm",
  "https://www.gov.cn/zhengce/content/2021-07/21/content_5626391.htm",
  "https://www.gov.cn/zhengce/zhengceku/202506/content_7030054.htm",
  "https://www.cdpf.org.cn/zwgk/zcwj/wjfb/9475784b2c5d49e99082db6bbfb47615.htm",
  "https://www.bdpf.org.cn/cms68/web1459/subject/n1/n1459/n2476/c140710/content.html",
  "https://www.bdpf.org.cn/cms68/web1459/subject/n1/n1459/n1551/n5605/n5606/",
  "https://www.ln.gov.cn/web/zwgkx/zfxxgk1/zc/gz/719D009202F84BD881363F265B39B5A5/index.shtml",
  "https://www.shdpf.org.cn/clwz/clwz/ggl/2026/03/16/2c9934e39ce660b5019cf5c4f8d61e41.html",
  "https://service.jscl.gov.cn/",
  "https://jyzx.gddpf.org.cn/",
  "https://jyzx.gddpf.org.cn/jyns/bszn/content/post_1012994.html",
  "https://jyzx.gddpf.org.cn/xxgk/tzgg/content/post_1321688.html",
  "https://www.cqdpf.org.cn/web/article/1385733981142347776/web/content_1385733981142347776.html",
  "https://www.gov.cn/zhengce/2018-04/10/content_5717277.htm",
] as const;

const NORMALIZED = new Set(EMPLOYMENT_DEEP_LINK_URLS.map(normalizeEmploymentUrl));

export function normalizeEmploymentUrl(raw: string): string {
  return raw.trim().replace(/\/+$/, "");
}

export function isEmploymentDeepLink(raw: string | undefined | null): boolean {
  if (!raw) return false;
  return NORMALIZED.has(normalizeEmploymentUrl(raw));
}

function joblink(p: {
  id: string;
  name: string;
  shortName: string;
  level: OrgLevel;
  regionCode: string;
  regionName: string;
  website: string;
  notes: string;
  sourceName: string;
}): OrgRecord {
  return {
    id: p.id,
    name: p.name,
    shortName: p.shortName,
    kind: "employment_service",
    level: p.level,
    regionCode: p.regionCode,
    regionName: p.regionName,
    address: "",
    postcode: "",
    phones: [],
    hotline: "12385",
    website: p.website,
    hours: "以原文和当地公告为准",
    notes: p.notes,
    sourceName: p.sourceName,
    sourceUrl: p.website,
    verifiedAt: "2026-09-02",
  };
}

/** 只读就业栏办事入口：仅上述深链，按地区筛选；无深链的省份不生成条目。 */
export const EMPLOYMENT_PORTALS: OrgRecord[] = [
  joblink({
    id: "joblink-cdpf-jyjy",
    name: "中国残联教育就业栏目",
    shortName: "中国残联教育就业",
    level: "national",
    regionCode: "CN",
    regionName: "全国",
    website: "https://www.cdpf.org.cn/ywpd/jyjy/index.htm",
    notes: "中国残联官网业务频道「教育就业」。政策原文、就业服务请以该栏目及地方残联通知为准。",
    sourceName: "中国残疾人联合会",
  }),
  joblink({
    id: "joblink-sc-employment-ordinance",
    name: "残疾人就业条例",
    shortName: "残疾人就业条例",
    level: "national",
    regionCode: "CN",
    regionName: "全国",
    website: "https://www.gov.cn/zhengce/2007-03/05/content_2602471.htm",
    notes: "国务院令第488号，中国政府网公开全文。安排比例、残保金以条例及配套办法原文为准。",
    sourceName: "中国政府网",
  }),
  joblink({
    id: "joblink-mof-fund",
    name: "残疾人就业保障金征收使用管理办法",
    shortName: "残保金征收使用管理办法",
    level: "national",
    regionCode: "CN",
    regionName: "全国",
    website: "https://www.gov.cn/zhengce/zhengceku/2015-09/15/content_5650063.htm",
    notes: "财税〔2015〕72号，中国政府网公开。计征、使用和分档减缴以该办法及后续公告原文为准。",
    sourceName: "中国政府网",
  }),
  joblink({
    id: "joblink-14th-plan",
    name: "“十四五”残疾人保障和发展规划",
    shortName: "十四五残疾人保障和发展规划",
    level: "national",
    regionCode: "CN",
    regionName: "全国",
    website: "https://www.gov.cn/zhengce/content/2021-07/21/content_5626391.htm",
    notes: "国发〔2021〕10号，中国政府网公开。就业专章及地方规划以原文为准。",
    sourceName: "中国政府网",
  }),
  joblink({
    id: "joblink-three-year-2025",
    name: "促进残疾人就业三年行动方案（2025—2027年）",
    shortName: "就业三年行动（2025—2027）",
    level: "national",
    regionCode: "CN",
    regionName: "全国",
    website: "https://www.gov.cn/zhengce/zhengceku/202506/content_7030054.htm",
    notes: "国办发〔2025〕23号，中国政府网公开。地方实施方案以各省公开文本为准。",
    sourceName: "中国政府网",
  }),
  joblink({
    id: "joblink-three-year-2022",
    name: "促进残疾人就业三年行动方案（2022—2024年）（残联转载）",
    shortName: "国办三年行动（2022—2024）残联转载",
    level: "national",
    regionCode: "CN",
    regionName: "全国",
    website: "https://www.cdpf.org.cn/zwgk/zcwj/wjfb/9475784b2c5d49e99082db6bbfb47615.htm",
    notes: "上一轮国办三年行动，中国残联文件发布栏目转载。实施期已结束，现行任务请同时查阅2025—2027年方案原文。",
    sourceName: "中国残疾人联合会",
  }),
  joblink({
    id: "joblink-bj-qa-2026",
    name: "北京市按比例安排残疾人就业申报政策问答（2026版）",
    shortName: "按比例申报政策问答（2026版）",
    level: "provincial",
    regionCode: "BJ",
    regionName: "北京市",
    website: "https://www.bdpf.org.cn/cms68/web1459/subject/n1/n1459/n2476/c140710/content.html",
    notes: "市残联按比例申报审核专题页公开的2026版政策问答。申报入口、材料与时间以该页和当年通告为准。本条不收录网报登录页。",
    sourceName: "北京市残疾人联合会",
  }),
  joblink({
    id: "joblink-bj-jycy",
    name: "北京市残联就业创业栏目",
    shortName: "市残联就业创业栏目",
    level: "provincial",
    regionCode: "BJ",
    regionName: "北京市",
    website: "https://www.bdpf.org.cn/cms68/web1459/subject/n1/n1459/n1551/n5605/n5606/",
    notes: "市残联官网就业创业栏目。具体办事以栏目内通知和区残联窗口为准。",
    sourceName: "北京市残疾人联合会",
  }),
  joblink({
    id: "joblink-ln-scatter",
    name: "辽宁省按比例分散安置规定",
    shortName: "按比例分散安置规定",
    level: "provincial",
    regionCode: "LN",
    regionName: "辽宁省",
    website: "https://www.ln.gov.cn/web/zwgkx/zfxxgk1/zc/gz/719D009202F84BD881363F265B39B5A5/index.shtml",
    notes: "辽宁省政府网公开的按比例分散安置规定。安排比例与残保金以该规定及省财政、残联现行文件原文为准。",
    sourceName: "辽宁省人民政府",
  }),
  joblink({
    id: "joblink-sh-notice-2026",
    name: "上海市2026年按比例就业联网认证通知",
    shortName: "2026 联网认证通知",
    level: "provincial",
    regionCode: "SH",
    regionName: "上海市",
    website: "https://www.shdpf.org.cn/clwz/clwz/ggl/2026/03/16/2c9934e39ce660b5019cf5c4f8d61e41.html",
    notes: "市残联官网公告栏公开的2026年联网认证通知。认证时间、系统入口以通知原文为准。",
    sourceName: "上海市残疾人联合会",
  }),
  joblink({
    id: "joblink-js-service",
    name: "江苏省残联服务网",
    shortName: "省残联服务网",
    level: "provincial",
    regionCode: "JS",
    regionName: "江苏省",
    website: "https://service.jscl.gov.cn/",
    notes: "江苏省残联服务网。按比例就业联网认证等事项以该站及省政务服务网当年入口为准。不收录未开通的就业子域占位页。",
    sourceName: "江苏省残疾人联合会",
  }),
  joblink({
    id: "joblink-gd-jyzx",
    name: "广东省残疾人就业服务中心",
    shortName: "省残疾人就业服务中心",
    level: "provincial",
    regionCode: "GD",
    regionName: "广东省",
    website: "https://jyzx.gddpf.org.cn/",
    notes: "省残疾人就业服务中心网站。年审、认证和指南见站内通知，以原文为准。",
    sourceName: "广东省残疾人就业服务中心",
  }),
  joblink({
    id: "joblink-gd-guide",
    name: "广东省按比例就业年审申报操作指南",
    shortName: "年审申报操作指南",
    level: "provincial",
    regionCode: "GD",
    regionName: "广东省",
    website: "https://jyzx.gddpf.org.cn/jyns/bszn/content/post_1012994.html",
    notes: "省残疾人就业服务中心公开的年审申报操作指南。步骤与账号以该页为准。",
    sourceName: "广东省残疾人就业服务中心",
  }),
  joblink({
    id: "joblink-gd-audit-2025",
    name: "广东省2025年按比例就业联网认证通告",
    shortName: "2025 联网认证通告",
    level: "provincial",
    regionCode: "GD",
    regionName: "广东省",
    website: "https://jyzx.gddpf.org.cn/xxgk/tzgg/content/post_1321688.html",
    notes: "省残疾人就业服务中心信息公开栏目通告。认证对象与时间以通告原文为准。",
    sourceName: "广东省残疾人就业服务中心",
  }),
  joblink({
    id: "joblink-cq-audit-2025",
    name: "重庆市2025年按比例就业联网认证通告",
    shortName: "2025 联网认证通告",
    level: "provincial",
    regionCode: "CQ",
    regionName: "重庆市",
    website: "https://www.cqdpf.org.cn/web/article/1385733981142347776/web/content_1385733981142347776.html",
    notes: "市残联网站公开的2025年联网认证通告。办理入口与时限以通告原文为准。",
    sourceName: "重庆市残疾人联合会",
  }),
  joblink({
    id: "joblink-sn-ratio",
    name: "陕西省按比例安排残疾人就业办法",
    shortName: "按比例安排残疾人就业办法",
    level: "provincial",
    regionCode: "SN",
    regionName: "陕西省",
    website: "https://www.gov.cn/zhengce/2018-04/10/content_5717277.htm",
    notes: "中国政府网2018年公开的陕西省按比例安排残疾人就业办法。安排比例与实施以办法原文和省残联现行解释为准。",
    sourceName: "中国政府网",
  }),
];
