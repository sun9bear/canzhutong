import { PREFECTURES } from "./prefectures";
import { PREFECTURE_ORG_PATCHES } from "./prefecture-orgs";

/** 各省残联或可进入残联栏目的政府门户。禁止用中国政府网首页冒充地方文件来源。 */
export const PROVINCE_PORTALS: Record<string, string> = {
  BJ: "https://www.bdpf.org.cn/",
  TJ: "http://www.tjdpf.org.cn/",
  HE: "https://www.hebcl.org.cn/",
  SX: "http://www.sxdpf.org.cn/",
  NM: "https://www.nmgcl.org.cn/",
  LN: "https://mzt.ln.gov.cn/",
  JL: "http://www.jldpf.org.cn/",
  HL: "https://www.hljcl.org.cn/",
  SH: "https://www.shdpf.org.cn/",
  JS: "https://www.jscl.gov.cn/",
  ZJ: "https://www.zj.gov.cn/",
  AH: "https://www.ahdpf.org.cn/",
  FJ: "https://www.fujian.gov.cn/",
  JX: "https://www.jxdpf.gov.cn/",
  SD: "http://www.sddpf.org.cn/",
  HA: "http://www.henancjr.org.cn/",
  HB: "http://www.hbdpf.org.cn/",
  HN: "http://mzt.hunan.gov.cn/",
  GD: "http://www.gddpf.org.cn/",
  GX: "http://www.gxdpf.org.cn/",
  HI: "https://www.hidpf.org.cn/",
  CQ: "http://www.cqdpf.org.cn/",
  SC: "http://www.scdpf.org.cn/",
  GZ: "http://www.gzsdpf.org.cn/",
  YN: "https://www.yncl.org.cn/",
  XZ: "http://www.xzcl.org.cn/",
  SN: "http://www.sndpf.cn/",
  GS: "https://www.gsdpf.org.cn/",
  QH: "https://www.qhcl.org.cn/",
  NX: "https://www.ndpf.org.cn/",
  XJ: "https://www.xjdpf.org.cn/",
};

const CITY_PORTALS: Record<string, string> = {
  SZ: "http://www.szcl.gov.cn/",
  WH: "https://www.whdpf.org.cn/",
  NJ: "https://cl.nanjing.gov.cn/",
  HZ: "https://www.hzcl.org.cn/",
  FOC: "https://www.fzcl.gov.cn/",
  QZJ: "https://www.quanzhou.gov.cn/zfb/wsbs/nrrh/202510/t20251010_3216756.htm",
  DLC: "https://www.daliandpf.org.cn/",
  GZC: "https://www.gzdpf.org.cn/",
  HYS: "http://www.hydpf.org/",
  SHE: "https://www.sydpf.cn/",
  DGG: "http://www.gddgdpf.org.cn/",
  HUI: "http://cl.huizhou.gov.cn/",
  GZH: "http://www.gzhdpf.org.cn/",
  JIU: "https://www.jjdpf.org.cn/",
  KMG: "http://cl.km.gov.cn/",
  NNG: "http://www.gxnndpf.org.cn/",
  CD: "https://www.cdcl.org.cn/",
  XA: "http://www.xa-dpf.org.cn/",
  SJZ: "http://www.sjzcl.org/",
  WX: "https://cl.wuxi.gov.cn/",
  SXS: "http://sxcl.sx.gov.cn/",
  ZUH: "https://www.zhdpf.org.cn/",
  RZH: "http://www.sddpf.org.cn/col/col85494/index.html",
  TANG: "https://hbtsdpf.org.cn/",
  HET: "http://www.hscjr.org.cn/",
  JYG: "https://www.jygcanlian.cn/",
  JMN2: "http://www.jmdpf.org.cn/",
  SWA: "https://swsadmin.shanwei.gov.cn/sdpf/zwgk/list_11.shtml",
  CGO: "https://zz.henancjr.org.cn/",
  CCN: "http://www.ccdpf.org.cn/",
  ZHA: "http://www.gdzjcl.org.cn/",
  INC: "http://cl.yinchuan.gov.cn/",
  HHS: "http://www.hhsdpf.org.cn/",
  JYS: "https://jydpf.org/",
  MAS: "http://www.masscl.com.cn/",
  BAO: "https://www.bjdpf.org.cn/",
  BTO: "http://www.btcl.gov.cn/",
  TYN: "https://taiyuan.gov.cn/nsbm.html",
  ZYS2: "https://cl.zunyi.gov.cn/",
  GYS: "https://cl.cngy.gov.cn/",
  KWE: "https://www.gydpf.org.cn/",
  JYS2: "https://jqscl.org.cn/",
  ZYS: "https://zycanlian.org.cn/",
  AKS: "https://www.ankang.gov.cn/Content-2905181.html",
  NGB: "http://www.nbcl.org.cn/",
  JLS: "http://jlsdpf.jlcity.gov.cn/",
  SQS: "https://www.sqcl.gov.cn/",
  TLT: "https://canl.tongliao.gov.cn/shicl/",
  ZJK: "https://www.zjkscl.gov.cn/",
};

export function isBareGovCn(url?: string) {
  if (!url) return true;
  const u = url.replace(/\/+$/, "").toLowerCase();
  return u === "https://www.gov.cn" || u === "http://www.gov.cn";
}

/** 该行政区官方门户：有市残联网站用市站，否则用省残联/省政府门户。绝不回落到中国政府网首页。 */
export function officialPortal(code: string): string {
  if (CITY_PORTALS[code]) return CITY_PORTALS[code];
  const patch = PREFECTURE_ORG_PATCHES[code];
  if (patch?.website && !isBareGovCn(patch.website)) return patch.website;
  if (patch?.sourceUrl && !isBareGovCn(patch.sourceUrl)) return patch.sourceUrl;
  if (PROVINCE_PORTALS[code]) return PROVINCE_PORTALS[code];
  const parent = PREFECTURES.find((p) => p.code === code)?.parent;
  if (parent && PROVINCE_PORTALS[parent]) return PROVINCE_PORTALS[parent];
  return "https://www.cdpf.org.cn/";
}

export function documentOrPortal(code: string, documentUrl?: string) {
  if (documentUrl && !isBareGovCn(documentUrl)) return documentUrl;
  return officialPortal(code);
}
