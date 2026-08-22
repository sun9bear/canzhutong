import { PREFECTURES } from "./prefectures";

export const CATEGORIES = [
  { id: "rights", label: "权利保障", hint: "平等权、反歧视、法律救济" },
  { id: "subsidy", label: "两项补贴与福利", hint: "生活补贴、护理补贴、优待" },
  { id: "employment", label: "就业创业", hint: "按比例就业、残保金、扶持" },
  { id: "rehab", label: "康复医疗", hint: "儿童康复救助、基本康复" },
  { id: "education", label: "教育培训", hint: "义务教育、高考便利、职教" },
  { id: "accessibility", label: "无障碍环境", hint: "设施、信息、社会服务" },
  { id: "assistive", label: "辅助器具", hint: "适配、补贴、产业政策" },
  { id: "housing", label: "住房出行", hint: "危房改造、公共交通、家庭改造" },
  { id: "tax", label: "税收社保", hint: "个税、增值税、养老保险" },
  { id: "legal_aid", label: "法律援助", hint: "诉讼便利、法律援助" },
  { id: "prevention", label: "残疾预防", hint: "筛查、干预、行动计划" },
  { id: "culture", label: "文化体育", hint: "公共文化、体育、融合" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const DISABILITY_TYPES = [
  { id: "all", label: "各类残疾" },
  { id: "visual", label: "视力残疾" },
  { id: "hearing", label: "听力残疾" },
  { id: "speech", label: "言语残疾" },
  { id: "physical", label: "肢体残疾" },
  { id: "intellectual", label: "智力残疾" },
  { id: "mental", label: "精神残疾" },
  { id: "multiple", label: "多重残疾" },
  { id: "children", label: "残疾儿童" },
  { id: "autism", label: "孤独症" },
] as const;

export type DisabilityTypeId = (typeof DISABILITY_TYPES)[number]["id"];

export const LEVELS = [
  { id: "national", label: "国家" },
  { id: "provincial", label: "省 / 自治区 / 直辖市" },
  { id: "municipal", label: "地市 / 特区" },
  { id: "county", label: "区 / 县" },
] as const;

export type LevelId = (typeof LEVELS)[number]["id"];

export const REGIONS = [
  { code: "CN", name: "全国", parent: null },
  { code: "BJ", name: "北京", parent: "CN" },
  { code: "TJ", name: "天津", parent: "CN" },
  { code: "HE", name: "河北", parent: "CN" },
  { code: "SX", name: "山西", parent: "CN" },
  { code: "NM", name: "内蒙古", parent: "CN" },
  { code: "LN", name: "辽宁", parent: "CN" },
  { code: "JL", name: "吉林", parent: "CN" },
  { code: "HL", name: "黑龙江", parent: "CN" },
  { code: "SH", name: "上海", parent: "CN" },
  { code: "JS", name: "江苏", parent: "CN" },
  { code: "ZJ", name: "浙江", parent: "CN" },
  { code: "AH", name: "安徽", parent: "CN" },
  { code: "FJ", name: "福建", parent: "CN" },
  { code: "JX", name: "江西", parent: "CN" },
  { code: "SD", name: "山东", parent: "CN" },
  { code: "HA", name: "河南", parent: "CN" },
  { code: "HB", name: "湖北", parent: "CN" },
  { code: "HN", name: "湖南", parent: "CN" },
  { code: "GD", name: "广东", parent: "CN" },
  { code: "GX", name: "广西", parent: "CN" },
  { code: "HI", name: "海南", parent: "CN" },
  { code: "CQ", name: "重庆", parent: "CN" },
  { code: "SC", name: "四川", parent: "CN" },
  { code: "GZ", name: "贵州", parent: "CN" },
  { code: "YN", name: "云南", parent: "CN" },
  { code: "XZ", name: "西藏", parent: "CN" },
  { code: "SN", name: "陕西", parent: "CN" },
  { code: "GS", name: "甘肃", parent: "CN" },
  { code: "QH", name: "青海", parent: "CN" },
  { code: "NX", name: "宁夏", parent: "CN" },
  { code: "XJ", name: "新疆", parent: "CN" },
  { code: "SZ", name: "深圳", parent: "GD" },
  { code: "GZC", name: "广州", parent: "GD" },
  { code: "HZ", name: "杭州", parent: "ZJ" },
  { code: "NJ", name: "南京", parent: "JS" },
  { code: "CD", name: "成都", parent: "SC" },
  { code: "WH", name: "武汉", parent: "HB" },
  { code: "XA", name: "西安", parent: "SN" },
  ...PREFECTURES,
] as const;

export type RegionCode = (typeof REGIONS)[number]["code"];

export const AGE_GROUPS = [
  { id: "child", label: "0–6 岁（学龄前）" },
  { id: "student", label: "6–18 岁（义务教育 / 高中）" },
  { id: "youth", label: "18–35 岁" },
  { id: "adult", label: "36–59 岁" },
  { id: "elder", label: "60 岁及以上" },
] as const;

export const EMPLOYMENT_STATUSES = [
  { id: "unemployed", label: "未就业 / 求职中" },
  { id: "employed", label: "已就业（单位）" },
  { id: "self", label: "自主创业 / 灵活就业" },
  { id: "supported", label: "辅助性就业 / 托养" },
  { id: "student", label: "在校就读" },
  { id: "retired", label: "已退休 / 无就业需求" },
] as const;

export const EDUCATION_LEVELS = [
  { id: "none", label: "未上学" },
  { id: "special", label: "特殊教育学校" },
  { id: "compulsory", label: "义务教育阶段" },
  { id: "high", label: "高中 / 中职" },
  { id: "college", label: "大专及以上" },
] as const;

export const LIVING_SITUATIONS = [
  { id: "family", label: "与家人同住" },
  { id: "alone", label: "独自居住" },
  { id: "institution", label: "机构托养 / 照护" },
  { id: "rural", label: "农村户籍" },
  { id: "urban", label: "城镇户籍" },
] as const;

export const NEED_OPTIONS = [
  { id: "subsidy", label: "申请补贴和福利" },
  { id: "rehab", label: "康复与辅助器具" },
  { id: "job", label: "就业或职业发展" },
  { id: "school", label: "教育入学" },
  { id: "daily", label: "日常生活与出行" },
  { id: "access", label: "无障碍与家庭改造" },
  { id: "legal", label: "维权与法律援助" },
] as const;

export const GRADES = [
  { id: "1", label: "一级（极重度）" },
  { id: "2", label: "二级（重度）" },
  { id: "3", label: "三级（中度）" },
  { id: "4", label: "四级（轻度）" },
  { id: "unknown", label: "尚未办证 / 不清楚" },
] as const;

export function categoryLabel(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function regionName(code: string) {
  return REGIONS.find((r) => r.code === code)?.name ?? code;
}

export function regionParent(code: string) {
  return REGIONS.find((r) => r.code === code)?.parent ?? null;
}

export const PROVINCE_REGIONS = REGIONS.filter((r) => r.parent === "CN" || r.code === "CN");

export function childRegions(parent: string) {
  return REGIONS.filter((r) => r.parent === parent);
}

export function disabilityLabel(id: string) {
  return DISABILITY_TYPES.find((d) => d.id === id)?.label ?? id;
}

export function levelLabel(id: string) {
  return LEVELS.find((l) => l.id === id)?.label ?? id;
}
