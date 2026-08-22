import type { PolicyRecord } from "./types";

export type ExtraPatch = {
  implementingIssued?: string;
  implementingUrl?: string;
  implementingPoints?: string[];
  planTitle?: string;
  planIssued?: string;
  planShortTitle?: string;
  planUrl?: string;
  planPoints?: string[];
  subsidyUrl?: string;
  subsidyPoints?: string[];
  rehabUrl?: string;
  rehabAgeNote?: string;
  rehabPoints?: string[];
  employmentUrl?: string;
  employmentNote?: string;
  portalUrl?: string;
  extraPolicies?: PolicyRecord[];
};

function localSubsidy(p: {
  id: string;
  code: string;
  name: string;
  title: string;
  shortTitle: string;
  summary: string;
  keyPoints: string[];
  eligibility: string;
  howToApply: string;
  body: string;
  sourceName: string;
  sourceUrl: string;
  docNo: string;
  issuedAt: string;
  effectiveAt: string;
}): PolicyRecord {
  return {
    ...p,
    level: "provincial",
    regionCode: p.code,
    regionName: p.name,
    category: "subsidy",
    disabilityTypes: ["all"],
    status: "以官方文件和当地公示为准",
    keywords: `${p.name},两项补贴,生活补贴,护理补贴`,
    relatedIds: ["two-subsidies-2015", `${p.code.toLowerCase()}-subsidy`],
  };
}

function localEmployment(p: {
  id: string;
  code: string;
  name: string;
  title: string;
  shortTitle: string;
  summary: string;
  keyPoints: string[];
  eligibility: string;
  howToApply: string;
  body: string;
  sourceName: string;
  sourceUrl: string;
  docNo: string;
  issuedAt: string;
  effectiveAt: string;
}): PolicyRecord {
  return {
    ...p,
    level: "provincial",
    regionCode: p.code,
    regionName: p.name,
    category: "employment",
    disabilityTypes: ["all"],
    status: "以官方文件和当地申报通知为准",
    keywords: `${p.name},残保金,按比例就业,就业`,
    relatedIds: ["sc-employment-ordinance", "mof-disabled-employment-fund", "employment-fund-reduction", "employment-three-year-2025"],
  };
}

export const PROVINCIAL_PATCHES: Record<string, ExtraPatch> = {
  BJ: {
    planUrl:
      "https://fgw.beijing.gov.cn/fgwzwgk/2024zcwj/ghjhwb/wngh/202205/t20220517_3732878.htm",
    planIssued: "2021-09-19（京残工委〔2021〕3号，市发改委公开）",
    rehabUrl:
      "https://www.beijing.gov.cn/zhengce/zhengcefagui/201905/t20190522_61796.html",
    rehabAgeNote:
      "京政办发〔2018〕49号：完善本市残疾儿童康复服务制度，落实国发〔2018〕20号。加强0—15岁残疾儿童康复服务衔接，提供手术、康复训练和辅助器具配置等一体化服务；将疑似残疾儿童纳入康复服务范围。具体目录与补助以市残联配套办法及区残联审批为准。",
    employmentUrl:
      "https://invest.beijing.gov.cn/sy/zt/qyrx/202603/t20260316_4557787.html",
    employmentNote:
      "京财税〔2019〕1333号：本市用人单位应按不少于在职职工总数1.5%的比例安排残疾人就业，达不到比例的缴纳残保金。安排就业的，先到税务登记地残疾人就业服务机构审核，再向主管税务机关申报缴纳。北京市投资促进局2026年3月企业问答仍引用该口径。",
    extraPolicies: [
      localSubsidy({
        id: "bj-subsidy-chaoyang-guide",
        code: "BJ",
        name: "北京市",
        title:
          "北京市困难残疾人生活补贴和重度残疾人护理补贴（朝阳区政务服务网办事指南口径）",
        shortTitle: "北京两项补贴分档",
        summary:
          "北京市政务服务网朝阳区六里屯街道办事指南：生活补贴按家庭类型和残疾类别分档，低保家庭一二级视力/肢体及一二三级智力/精神400元/月，同家庭三四级视力/肢体、四级智力/精神及听力言语320元/月；低收入未享低保的对应类别参照低保标准或300元/月。护理补贴：一级视力/肢体/智力/精神及二级智力/精神中的多重300元/月；二级视力/肢体、二级智力/精神（不含多重）、三级智力/精神及一二级听力/言语100元/月。此为该指南所列金额，请以户籍地窗口为准。",
        keyPoints: [
          "低保家庭：一二级视力/肢体及一二三级智力/精神生活补贴400元/月；其他所列类别320元/月。",
          "低收入未享低保：一二级视力/肢体及一二三级智力/精神参照本市低保标准；其他所列类别300元/月。",
          "护理：一级及二级智力/精神多重300元/月；指南所列其他类别100元/月。",
        ],
        eligibility:
          "北京市符合两项补贴条件的持证残疾人。分档以办事指南和户籍地审核为准。",
        howToApply:
          "向街道政务服务中心申请。本条引用朝阳区六里屯街道指南，其他区办理地点以本区为准。",
        body: "来源：北京市政务服务网《困难残疾人生活补贴和重度残疾人护理补贴资格认定》办事指南（朝阳区六里屯街道）。指南列出多档生活补贴和两档护理补贴。未在其他区页面交叉核验前，请以户籍地窗口为准。",
        sourceName: "北京市政务服务网（朝阳区六里屯街道办事指南）",
        sourceUrl:
          "https://banshi.beijing.gov.cn/pubtask/task/1/110105014000/4d91420d-ea69-48d5-84c9-294c8518c2af.html?locationCode=110105014000",
        docNo: "北京市政务服务网两项补贴资格认定指南",
        issuedAt: "2026",
        effectiveAt: "以窗口审核为准",
      }),
      localEmployment({
        id: "bj-employment-fund-2019",
        code: "BJ",
        name: "北京市",
        title: "北京市残疾人就业保障金征收使用管理办法",
        shortTitle: "北京残保金1.5%",
        summary:
          "京财税〔2019〕1333号：本市机关、团体、企业、事业单位和民办非企业单位应按不少于在职职工总数1.5%的比例安排残疾人就业，达不到比例的缴纳残保金。早期地方办法曾写1.7%，现行征收口径为1.5%。",
        keyPoints: [
          "安排比例不少于1.5%。",
          "先到税务登记地残疾人就业服务机构审核，再向税务机关申报缴纳。",
          "分档减缴、30人以下企业免征按财政部公告2023年第8号执行至2027年底。",
        ],
        eligibility: "在北京市注册的用人单位；在本市求职的持证残疾人。",
        howToApply:
          "单位：残联就业服务机构审核 + 电子税务局申报。个人：到区残联就业服务机构或公共就业服务平台登记。",
        body: "北京市财政局、国家税务总局北京市税务局、北京市残疾人联合会《关于印发〈北京市残疾人就业保障金征收使用管理办法〉的通知》（京财税〔2019〕1333号）。北京市投资促进局2026年3月16日企业问答完整引用第六条1.5%口径。",
        sourceName: "北京市投资促进局（引京财税〔2019〕1333号）",
        sourceUrl:
          "https://invest.beijing.gov.cn/sy/zt/qyrx/202603/t20260316_4557787.html",
        docNo: "京财税〔2019〕1333号",
        issuedAt: "2019",
        effectiveAt: "2019",
      }),
      localEmployment({
        id: "bj-employment-job-subsidy-2026",
        code: "BJ",
        name: "北京市",
        title: "北京市2026年招用残疾人岗位补贴和社会保险补贴申报",
        shortTitle: "北京2026岗位补贴申报",
        summary:
          "市残联2026年7月通告：符合京残发〔2018〕26号条件的用人单位，在申报就业情况和残保金后，于2026年8月1日至11月30日申请2025年度岗位补贴和社会保险补贴。条件包括签订一年以上劳动合同、工资不低于当年本市月最低工资标准1.2倍、按规定缴纳社保。逾期视为放弃。",
        keyPoints: [
          "2026年申请窗口：8月1日—11月30日（对应2025年1—12月补贴）。",
          "工资须不低于当年本市月最低工资的1.2倍。",
          "网上申报：wangshen.bdpf.org.cn。",
        ],
        eligibility:
          "招用本市户籍劳动年龄内持证残疾人、符合京残发〔2018〕26号的用人单位。机关事业单位不列入社保补贴范围。",
        howToApply: "网上、现场或邮寄向税务登记地残疾人就业服务机构申请。",
        body: "北京市残疾人联合会《关于2026年北京市用人单位申请招用残疾人岗位补贴和社会保险补贴的通告》（2026年7月22日）。海淀区、平谷区残联同步转发。补贴金额按京残发〔2018〕26号及当年办理口径，本条不锁死过期元/人数字。",
        sourceName: "北京市残疾人联合会（海淀区残联转载）",
        sourceUrl:
          "https://hdqw.bjhd.gov.cn/hdcl/tztg/202607/t20260728_4823515.htm",
        docNo: "京残发〔2018〕26号（2026年办理通告）",
        issuedAt: "2026-07-22",
        effectiveAt: "2026-08-01",
      }),
      localEmployment({
        id: "bj-employment-audit-2026",
        code: "BJ",
        name: "北京市",
        title: "北京市2026年按比例安排残疾人就业申报审核",
        shortTitle: "北京2026年审3—10月",
        summary:
          "京残发〔2022〕5号：2026年申报审核期为3月1日至10月31日。2025年已安排残疾人就业的用人（工）单位，向税务登记地残疾人就业服务机构申报。可网上、现场或邮寄。登录市残联网报系统或北京市政务服务网「残保金征缴一件事」。",
        keyPoints: [
          "2026年审核期：3月1日—10月31日。",
          "依据京残发〔2022〕5号。",
          "网上：kstbcs.bdpf.org.cn 或北京市政务服务网。",
        ],
        eligibility:
          "北京市2025年已安排持证残疾人或残疾军人证1至8级人员就业的机关、团体、企事业单位和民办非企业。",
        howToApply:
          "向税务登记地残疾人就业服务机构网上、现场或邮寄申报。也可通过北京市政务服务网「残保金征缴一件事」。",
        body: "北京市残疾人联合会官网「按比例安排残疾人就业情况申报审核专题」公开2026年通告。依据《北京市按比例安排残疾人就业情况申报审核实施办法（暂行）》（京残发〔2022〕5号）。",
        sourceName: "北京市残疾人联合会",
        sourceUrl:
          "https://www.bdpf.org.cn/cms68/web1459/subject/n1/n1459/n2476/index.html",
        docNo: "京残发〔2022〕5号",
        issuedAt: "2026",
        effectiveAt: "2026-03-01",
      }),
    ],
  },
  SH: {
    planUrl:
      "https://www.shanghai.gov.cn/nw12344/20210810/d9cf38fe1ed447598dc1a96143c9ce97.html",
    planIssued: "2021-07-09（沪府办发〔2021〕15号）",
    rehabUrl:
      "https://www.shanghai.gov.cn/nw12344/20250507/b3de0e1bc10a4a6597434edc37bd8386.html",
    rehabAgeNote:
      "沪府发〔2025〕1号：加强本市残疾儿童康复救助制度建设。救助对象为具有本市户籍未满18周岁，持视力/听力/言语/肢体/智力残疾人证或“阳光宝宝卡”，或经本市孤独症儿童康复救助诊断机构诊断为孤独症的儿童；持本市居住证且父母双方（或监护人）持居住证连续满1年以上、未享受户籍地同类救助的同类未满18周岁儿童也可申请。自2025年5月1日起施行，有效期至2030年4月30日；沪府规〔2018〕22号及延期文件同时废止。具体细则以市残联配套规定为准。",
    employmentUrl:
      "https://shanghai.chinatax.gov.cn/xwdt/ztzl/zcgll/cjrbzj/jfzy/202608/t481322.html",
    employmentNote:
      "沪财发〔2020〕9号：安排比例1.5%。市税务局2026年8月19日指南：2025年度就业情况联网认证为2026年3月16日至10月31日（11月1日零时关闭）；2025年度残保金缴费开始时间为2026年8月19日。安排就业的须先认证、再选择申请或放弃超比例奖励，再申报残保金。",
    subsidyPoints: [
      "上海发布2026年5月转载市民政局解答：仍按2025年7月1日调整后的标准执行。",
      "生活补贴：重残无业和低保家庭450元/月，低保边缘家庭320元/月。",
      "护理补贴：一级350元/月；二级以及三级智力、三级精神180元/月。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "sh-subsidy-2025",
        code: "SH",
        name: "上海市",
        title: "上海市困难残疾人生活补贴和重度残疾人护理补贴标准",
        shortTitle: "上海两项补贴标准",
        summary:
          "自2025年7月1日起：生活补贴重残无业和低保家庭450元/月、低保边缘家庭320元/月；护理补贴一级350元/月，二级及三级智力、三级精神180元/月。上海发布2026年5月解答仍按此执行。",
        keyPoints: [
          "生活补贴：重残无业、低保家庭450元/人/月；低保边缘家庭320元/人/月。",
          "护理补贴：一级350元/人/月；二级和三级智力、三级精神180元/人/月。",
          "街道社区事务受理服务中心或一网通办申请。可同时申领两项。",
        ],
        eligibility:
          "上海市符合两项补贴条件的持证残疾人，对象范围以市民政局实施意见为准。",
        howToApply:
          "向街道（乡镇）社区事务受理服务中心申请，或通过一网通办。非本人申请须到实体窗口并带委托书。",
        body: "来源：中国上海（上海发布）《残疾人两项补贴，谁能领、领多少、怎么领》（2026年5月12日），转述市民政局口径，明确按2025年7月1日调整后的标准执行。崇明区政府网站2025年8月公开《关于调整上海市“残疾人两项补贴”标准的通知》与此金额一致。",
        sourceName: "中国上海（上海发布）转市民政局",
        sourceUrl:
          "https://www.shanghai.gov.cn/xbhygq/20260512/f73630b674bd4e02b1d6fcb248d2013b.html",
        docNo: "上海市2025年7月1日调整两项补贴标准（2026年5月仍执行）",
        issuedAt: "2025-07-01",
        effectiveAt: "2025-07-01",
      }),
      localEmployment({
        id: "sh-employment-three-year",
        code: "SH",
        name: "上海市",
        title: "上海市促进残疾人就业三年行动方案（2025—2027年）",
        shortTitle: "上海就业三年行动",
        summary:
          "沪府办发〔2025〕20号：落实国办发〔2025〕23号。开展就业促进、就业帮扶、就业提升、就业保障四方面行动，包括机关事业单位带头安排就业、企业拓岗、自主创业灵活就业、阳光职业康复援助基地和大学生就业帮扶。",
        keyPoints: [
          "依据沪府办发〔2025〕20号，实施期2025—2027年。",
          "机关、事业单位带头安排残疾人就业。",
          "残保金仍按本市征收使用办法、比例不低于国家1.5%底线，税务征收。",
        ],
        eligibility: "上海市有就业需求的持证残疾人；在沪用人单位。",
        howToApply:
          "个人到区残联就业服务机构和公共就业服务机构登记。单位按市残联、税务部门年度申报通知办理。",
        body: "上海市人民政府办公厅关于印发《上海市促进残疾人就业三年行动方案》的通知（沪府办发〔2025〕20号）。市残联网站2026年1月15日公开。市政府网政策解读同步引用国办发〔2025〕23号。",
        sourceName: "上海市残疾人联合会（沪府办发〔2025〕20号）",
        sourceUrl:
          "https://www.shdpf.org.cn/clwz/clwz/xxgk/ghjh/2026/01/15/2c9934e39bd43fb1019bd4bba567025c.html",
        docNo: "沪府办发〔2025〕20号",
        issuedAt: "2025",
        effectiveAt: "2025",
      }),
      localEmployment({
        id: "sh-employment-fund-2020",
        code: "SH",
        name: "上海市",
        title: "上海市残疾人就业保障金征收使用管理实施办法",
        shortTitle: "上海残保金（社保基数）",
        summary:
          "沪财发〔2020〕9号：安排比例1.5%。征缴基数为用人单位上年度社会保险费缴费基数之和。市财政局2026年1月解读将有效期延长至2030年12月31日。文中原分档减缴“执行三年”已过，现行分档按财政部公告2023年第8号。",
        keyPoints: [
          "安排比例1.5%。",
          "征缴基数=上年度社会保险费缴费基数之和。",
          "分档减缴、30人以下企业免征按财政部公告2023年第8号。",
          "市财政局2026年1月解读：9号文有效期延长至2030年12月31日。",
        ],
        eligibility: "在上海市注册的用人单位；在本市求职的持证残疾人。",
        howToApply:
          "单位经残联审核后通过电子税务局申报。个人到区残联就业服务机构登记。",
        body: "上海市财政局、税务局、残联《关于印发〈上海市残疾人就业保障金征收使用管理实施办法〉的通知》（沪财发〔2020〕9号）。国家税务总局上海市税务局法规库公开。市财政局2026年1月7日解读：经评估将9号文有效期延长至2030年12月31日。",
        sourceName: "上海市财政局（沪财发〔2020〕9号及延期解读）",
        sourceUrl:
          "https://czj.sh.gov.cn/zys_8908/zcjd_8969/qt_8982/20260107/927cccf6356f4129828147dbff3746a4.html",
        docNo: "沪财发〔2020〕9号",
        issuedAt: "2020",
        effectiveAt: "2020",
      }),
      localEmployment({
        id: "sh-employment-audit-2026",
        code: "SH",
        name: "上海市",
        title: "上海市2026年按比例就业联网认证与残保金缴费",
        shortTitle: "上海2026年审3月16日起",
        summary:
          "国家税务总局上海市税务局《2025年度残疾人就业保障金缴费指南》（2026年8月19日）：安排残疾人就业的用人单位应在2026年3月16日至10月31日申报2025年度就业情况，2026年11月1日零时起关闭系统，逾期视为未安排。2025年度残保金缴费开始时间为2026年8月19日。30人（含）以下企业暂免。须先完成就业人数申报并选择申请或放弃超比例奖励，再办理残保金申报缴纳。",
        keyPoints: [
          "2026年联网认证：3月16日—10月31日。",
          "2025年度残保金缴费开始：2026年8月19日。",
          "30人（含）以下企业暂免征收。",
          "先认证、再选超比例奖励、再向电子税务局申报。",
        ],
        eligibility:
          "在上海市注册的用人单位。安排有残疾人就业的须先联网认证；未安排的可直接向税务机关申报缴纳。",
        howToApply:
          "就业申报：上海一网通办残保金征缴「一件事」进入全国联网认证系统。残保金：电子税务局「地方特色—申报纳税—残疾人就业保障金申报」，或一网通办「无残疾职工或已完成残疾职工申报」。咨询残联就业人数申报见市残联通知附件；缴款问题打021-12366。",
        body: "国家税务总局上海市税务局网站《2025年度残疾人就业保障金缴费指南》（2026年8月19日）。指南附件1为市残联《关于开展上海市2026年残疾人按比例就业情况联网认证工作的通知》。安排比例仍按沪财发〔2020〕9号的1.5%。",
        sourceName: "国家税务总局上海市税务局",
        sourceUrl:
          "https://shanghai.chinatax.gov.cn/xwdt/ztzl/zcgll/cjrbzj/jfzy/202608/t481322.html",
        docNo: "上海市税务局2025年度残保金缴费指南",
        issuedAt: "2026-08-19",
        effectiveAt: "2026-03-16",
      }),
    ],
  },
  CQ: {
    planUrl:
      "https://www.cq.gov.cn/zwgk/zfxxgkzl/fdzdgknr/zdmsxx/shbz/sbzcjywbl/202112/t20211231_10268369.html",
    planIssued: "2021（重庆市“十四五”残疾人保障和发展规划）",
    rehabUrl:
      "https://www.cq.gov.cn/zwgk/zfxxgkml/szfwj/xzgfxwj/szf/201810/t20181012_8837026.html",
    rehabAgeNote:
      "渝府发〔2018〕44号：重庆市人民政府关于建立残疾儿童康复救助制度的实施意见，落实国发〔2018〕20号，自2018年10月1日起实施。有条件区县可适时扩大年龄范围、放宽家庭经济条件限制并合理提高标准，具体以区县细则和市残联目录为准。",
    implementingUrl:
      "https://www.cqcs.gov.cn/bm/qmzj_75252/zwgk_73772/fdzdgknr_73775/zcwj_bm/gfxwj_bm/202402/t20240219_12933621.html",
    implementingIssued: "2021-12-10（渝民发〔2021〕15号）",
    subsidyUrl:
      "https://mzj.cq.gov.cn/zwgk_218/zfxxgkml/zcjd/mtsj/202512/t20251230_15279136.html",
    subsidyPoints: [
      "渝民发〔2021〕15号：生活补贴对象为重庆市户籍城乡低保中持有效残疾人证且符合衔接条件者；护理补贴对象为一级、二级持证残疾人。可同时申领两项。",
      "重庆市民政局2025年12月报道：自2026年1月1日起，生活补贴100元/月；护理补贴一级110元/月、二级100元/月。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "cq-subsidy-rule-2021",
        code: "CQ",
        name: "重庆市",
        title: "重庆市进一步完善残疾人两项补贴制度实施意见",
        shortTitle: "重庆两项补贴渝民发15号",
        summary:
          "渝民发〔2021〕15号：明确对象范围、政策衔接、跨省通办与动态管理。生活补贴限低保持证残疾人；护理补贴限一、二级持证残疾人。有条件区县可扩面。",
        keyPoints: [
          "生活补贴：户籍低保对象中持有效残疾人证且符合衔接条件。",
          "护理补贴：一级、二级持有效残疾人证且符合衔接条件。",
          "两项可同时享受；工伤护理费、特困供养不同时享受。",
          "支持跨省通办、全程网办；有条件可将审核下放到乡镇（街道）。",
        ],
        eligibility:
          "具有重庆市户籍、持有效残疾人证，并符合渝民发〔2021〕15号对象范围与政策衔接规定的残疾人。",
        howToApply:
          "向户籍地或全国任意乡镇（街道）一门受理窗口，或政务服务平台申请；补贴由原户籍地审核发放。",
        body: "重庆市民政局、财政局、残联《关于进一步完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（渝民发〔2021〕15号，2021年12月10日）。长寿区民政局2024年2月废止旧区规范时全文转载该意见。现行元/月见市提标报道专条。",
        sourceName: "重庆市民政局、财政局、残联（长寿区政府网转载）",
        sourceUrl:
          "https://www.cqcs.gov.cn/bm/qmzj_75252/zwgk_73772/fdzdgknr_73775/zcwj_bm/gfxwj_bm/202402/t20240219_12933621.html",
        docNo: "渝民发〔2021〕15号",
        issuedAt: "2021-12-10",
        effectiveAt: "2021-12-10",
      }),
      localSubsidy({
        id: "cq-subsidy-2026",
        code: "CQ",
        name: "重庆市",
        title: "重庆市提高残疾人两项补贴标准（2026年）",
        shortTitle: "重庆2026两项补贴",
        summary:
          "自2026年1月1日起，重庆市困难残疾人生活补贴100元/人/月；一级重度护理补贴110元/人/月，二级100元/人/月。由市民政局、财政局、残联联合印发通知。",
        keyPoints: [
          "生活补贴100元/人/月（提高10元）。",
          "护理补贴：一级110元/人/月，二级100元/人/月。",
          "2026年1月1日起执行。",
        ],
        eligibility: "重庆市符合两项补贴条件的持证残疾人。",
        howToApply: "向户籍地乡镇街道或区县民政申请。",
        body: "来源：重庆市民政局转载重庆日报《重庆残疾人“两项补贴”标准又提高了！2026年1月1日起施行》（2025年12月30日）。市民政局、市财政局、市残联联合印发通知。本条锁定已写出的100/110/100元，细则以通知全文为准。",
        sourceName: "重庆市民政局",
        sourceUrl:
          "https://mzj.cq.gov.cn/zwgk_218/zfxxgkml/zcjd/mtsj/202512/t20251230_15279136.html",
        docNo: "重庆市提高两项补贴通知（2026年1月1日起）",
        issuedAt: "2025-12",
        effectiveAt: "2026-01-01",
      }),
      localEmployment({
        id: "cq-employment-fund-2016",
        code: "CQ",
        name: "重庆市",
        title: "重庆市残疾人就业保障金征收使用管理实施办法",
        shortTitle: "重庆残保金1.5%",
        summary:
          "渝财综〔2016〕58号：本市用人单位应按在职职工总数1.5%安排残疾人就业。安排1名持证一、二级残疾人或残疾军人证1—3级的，按2人计算。九龙坡区财政局2025年催缴通知仍引用该办法。",
        keyPoints: [
          "安排比例1.5%。",
          "一、二级残疾人及残疾军人1—3级按2人计算。",
          "未达标向税务机关申报缴纳。工资上限以国家和市税务局当年口径为准。",
        ],
        eligibility: "在重庆市注册的用人单位；在本市求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "重庆市财政局等《重庆市残疾人就业保障金征收使用管理实施办法》（渝财综〔2016〕58号）。重庆市九龙坡区人民政府网2025年4月3日催缴通知引用该文第二十六条。潼南区政府网转引安排比例1.5%及一二级按2人计算。",
        sourceName: "重庆市九龙坡区财政局（引渝财综〔2016〕58号）",
        sourceUrl:
          "https://cqjlp.gov.cn/bmjz/qzfbm_97119/qczj_97719/zwgk_97124/fdzdgknr_97126/lzyj/zcwj/202504/t20250403_14478840.html",
        docNo: "渝财综〔2016〕58号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localEmployment({
        id: "cq-employment-audit-2026",
        code: "CQ",
        name: "重庆市",
        title: "重庆市2026年按比例就业联网认证",
        shortTitle: "重庆2026年审3—10月",
        summary:
          "重庆高新区政务服务和社会事务中心2026年2月通告：审核时间为2026年3月1日至10月31日。登录「渝快办」搜索「全国残疾人按比例就业情况联网认证」，选择税务登记地所在区县残联办理。安排比例1.5%；达到1%但低于1.5%的，按应缴费额50%缴纳残保金。",
        keyPoints: [
          "2026年认证：3月1日—10月31日。",
          "渝快办全程网办。",
          "1%—1.5%按应缴费额50%缴纳。",
        ],
        eligibility: "重庆市2025年度安排有残疾人就业的用人单位。",
        howToApply:
          "登录渝快办 zwykb.cq.gov.cn，搜索「全国残疾人按比例就业情况联网认证」，法人登录，选择税务登记地区县残联。",
        body: "重庆高新区政务服务和社会事务中心《关于开展2026年残疾人按比例就业情况联网认证工作的通告》（2026年2月28日）。安排比例及分档减缴与市办法、财政部公告一致。",
        sourceName: "重庆高新区管委会",
        sourceUrl:
          "https://gxq.cq.gov.cn/ggtz/202602/t20260228_15477134_wap.html",
        docNo: "重庆高新区2026年联网认证通告",
        issuedAt: "2026-02-28",
        effectiveAt: "2026-03-01",
      }),
    ],
  },
  GD: {
    planUrl:
      "https://www.gd.gov.cn/gkmlpt/content/3/3764/post_3764191.html",
    planIssued: "2021-12-16（粤府函〔2021〕375号）",
    rehabUrl:
      "https://www.gd.gov.cn/gkmlpt/content/0/157/post_157297.html",
    rehabAgeNote:
      "粤府办〔2018〕43号《广东省残疾儿童康复救助实施办法》：救助对象主要为本省户籍0—6岁（截至申请当年度8月31日止不满7周岁，有条件地区可扩大年龄范围）视力、听力、言语、智力、肢体残疾儿童和孤独症儿童。自2018年10月1日起实施；原文载明有效期5年，现行执行口径以省残联/省政府最新配套为准，本库不锁死过期金额。",
    planShortTitle: "广东规划（残疾人）",
    employmentUrl:
      "https://guangdong.chinatax.gov.cn/gdsw/gzsw_cjrjybzj/2018-07/06/content_f3d584a796bd4f778b2a2a458f707748.shtml",
    employmentNote:
      "粤财社〔2017〕51号：用人单位安排残疾人就业的比例不得低于本单位在职职工总数的1.5%，达不到比例的缴纳残保金。税务机关征收。分档减缴按财政部公告2023年第8号。深圳经济特区另有本市办法，见深圳专条。",
    subsidyPoints: [
      "广东省财政厅、民政厅、残联关于2026年提高两项补贴标准的通知：困难残疾人生活补贴每人每月217元，重度残疾人护理补贴每人每月290元。",
      "已高于该标准的地区继续按已定标准执行。列入2026年省十件民生实事。",
      "广州等地已转发执行。深圳等市如有更高分档，以本市文件为准。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "gd-subsidy-2026",
        code: "GD",
        name: "广东省",
        title: "广东省2026年提高残疾人两项补贴标准",
        shortTitle: "广东2026两项补贴",
        summary:
          "2026年广东省困难残疾人生活补贴217元/人/月，重度残疾人护理补贴290元/人/月。已高于此标准的地区不下调。",
        keyPoints: [
          "生活补贴217元/月，护理补贴290元/月。",
          "依据省十四届人大五次会议审查的2026年省十件民生实事。",
          "部分地市原标准更高的，继续按已定标准。",
        ],
        eligibility:
          "广东省符合两项补贴条件的持证残疾人，对象范围仍按国发〔2015〕27号及省实施办法。",
        howToApply: "向户籍地乡镇街道或通过粤省事、广东政务服务网申请。",
        body: "文件标题：广东省财政厅、广东省民政厅、广东省残疾人联合会关于2026年提高我省残疾人两项补贴标准的通知。生活补贴从2025年209元提至217元，护理补贴从280元提至290元（媒体转述2025年对照数，现行以2026年通知为准）。",
        sourceName: "广东省财政厅、民政厅、残联",
        sourceUrl:
          "http://www.zjxs.gov.cn/zjxsczj/gkmlpt/content/2/2205/post_2205166.html",
        docNo: "广东省2026年提高两项补贴标准通知",
        issuedAt: "2026",
        effectiveAt: "2026",
      }),
      localEmployment({
        id: "gd-employment-fund-2017",
        code: "GD",
        name: "广东省",
        title: "广东省残疾人就业保障金征收使用管理实施办法",
        shortTitle: "广东残保金1.5%",
        summary:
          "粤财社〔2017〕51号：用人单位安排残疾人就业比例不得低于在职职工总数1.5%，未达标缴纳残保金。省税务局公开材料写明2018年1月1日起实施该办法。",
        keyPoints: [
          "安排比例不低于1.5%。",
          "残保金由税务机关征收。",
          "国家分档减缴、30人以下企业免征执行至2027年底。",
        ],
        eligibility:
          "在广东省注册的用人单位（深圳另见本市办法）；在本省求职的持证残疾人。",
        howToApply:
          "有安排残疾人就业的，先向残联申报审核，再通过电子税务局申报缴纳。个人到残联就业服务机构登记。",
        body: "广东省财政厅、广东省国家税务局、广东省残疾人联合会、广东省地方税务局《关于印发广东省残疾人就业保障金征收使用管理实施办法的通知》（粤财社〔2017〕51号）。国家税务总局广东省税务局栏目公开：从2018年1月1日开始实施新的征收使用管理办法，比例1.5%。",
        sourceName: "国家税务总局广东省税务局（引粤财社〔2017〕51号）",
        sourceUrl:
          "https://guangdong.chinatax.gov.cn/gdsw/gzsw_cjrjybzj/2018-07/06/content_f3d584a796bd4f778b2a2a458f707748.shtml",
        docNo: "粤财社〔2017〕51号",
        issuedAt: "2017",
        effectiveAt: "2018-01-01",
      }),
    ],
  },
  HN: {
    planShortTitle: "湖南规划（残疾人）",
    subsidyUrl:
      "https://mzt.hunan.gov.cn/mzt/xxgk/zcfg/wj/202602/t20260204_33909648.html",
    employmentUrl:
      "https://czj.yueyang.gov.cn/9062/9065/9066/content_2188057.html",
    employmentNote:
      "湘财综〔2016〕46号转发国家办法。岳阳市岳财发〔2024〕3号仍按1.5%计征。怀化市残联2026年2月28日通告、湘潭市残联同期通告：联网认证时间为3月1日至10月31日，登录湖南政务服务网办理。分档减缴按财政部公告2023年第8号。",
    subsidyPoints: [
      "湘民发〔2026〕4号：2026年两项补贴省级指导标准提高到每人每月110元，自2026年1月1日起执行。",
      "各地应制定不低于省级指导标准的本地区标准；2025年已高于指导标准的，2026年不得低于2025年当地标准。",
      "超出省级指导标准的资金由地方自行负担。年初发放低于110元/月的地区按新标准补齐差额。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "hn-subsidy-2026",
        code: "HN",
        name: "湖南省",
        title: "湖南省调整残疾人两项补贴标准（2026年）",
        shortTitle: "湖南2026两项补贴",
        summary:
          "2026年省级指导标准每人每月110元，市县不得低于此标准，已高于的不下调。",
        keyPoints: [
          "省级指导标准110元/人/月（生活补贴、护理补贴）。",
          "执行时间：2026年1月1日。",
          "文号：湘民发〔2026〕4号。",
        ],
        eligibility:
          "湖南省符合两项补贴条件的残疾人，具体对象以省实施意见和市县细则为准。",
        howToApply:
          "向乡镇街道申请。补差按文件要求由发放低于指导标准的地区补齐。",
        body: "湖南省民政厅网站公布湘民发〔2026〕4号。指导标准不是封顶标准，长沙等市可能更高，以当地公示为准。",
        sourceName: "湖南省民政厅",
        sourceUrl:
          "https://mzt.hunan.gov.cn/mzt/xxgk/zcfg/wj/202602/t20260204_33909648.html",
        docNo: "湘民发〔2026〕4号",
        issuedAt: "2026-02",
        effectiveAt: "2026-01-01",
      }),
      localEmployment({
        id: "hn-employment-fund",
        code: "HN",
        name: "湖南省",
        title: "湖南省残疾人就业保障金征收有关规定",
        shortTitle: "湖南残保金1.5%",
        summary:
          "湖南省人民政府门户2019年公开的省财政厅通知：未安排或未达本单位职工总数1.5%的用人单位应当缴纳残保金。应缴纳额=（当年末职工总数\xD71.5%－已安排残疾人数）\xD7统计部门发布的上年度本地区职工年平均工资。湘财综〔2016〕46号转发国家办法。",
        keyPoints: [
          "安排比例1.5%。",
          "计征工资用统计部门公布的上年度本地区职工年平均工资。",
          "分档减缴按财政部公告2023年第8号。",
        ],
        eligibility: "在湖南省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "湖南省人民政府门户网站《关于残疾人就业保障金征收工作有关问题的通知》（省财政厅，2019年1月14日公开）。引用安排比例1.5%及计征公式。岳阳市财政局2024年通知仍按1.5%执行。",
        sourceName: "湖南省人民政府（省财政厅通知）",
        sourceUrl:
          "http://hunan.gov.cn/hnszf/xxgk/wjk/szbm/szfzcbm_19689/sczt/gfxwj_19835/201901/t20190114_5258035.html",
        docNo: "湖南省残保金征收工作有关问题的通知",
        issuedAt: "2019-01",
        effectiveAt: "2019",
      }),
      localEmployment({
        id: "hn-employment-ordinance",
        code: "HN",
        name: "湖南省",
        title: "湖南省按比例安排残疾人就业规定",
        shortTitle: "湖南按比例就业规定",
        summary:
          "湖南省人民政府令第273号：用人单位应按不低于职工总数1.5%安排残疾人就业。与财政有经常性经费领拨关系的单位，残保金按统计部门上年度本地区职工年平均工资计征；其他单位按本单位职工平均工资计征，高于当地职工平均工资的按当地平均工资。超比例依照《湖南省超比例安排残疾人就业奖励办法》奖励。",
        keyPoints: [
          "安排比例1.5%。",
          "财政拨款单位用当地职工年平均工资计征。",
          "超比例按省政府奖励办法执行。",
        ],
        eligibility: "在湖南省注册的用人单位。",
        howToApply: "单位经残联审核后向税务机关申报。",
        body: "《湖南省按比例安排残疾人就业规定》（湖南省人民政府令第273号）。省政府门户网站公开PDF。超比例奖励标准见2025—2027年三年行动方案：超比例人数\xD7月最低工资\xD76倍。",
        sourceName: "湖南省人民政府",
        sourceUrl:
          "https://hunan.gov.cn/hnszf/szf/hnzb_18/xxgz/202012/14098168/files/ae6a7994e95b44eb83bdd0e1507c28e8.pdf",
        docNo: "湖南省人民政府令第273号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localEmployment({
        id: "hn-employment-three-year",
        code: "HN",
        name: "湖南省",
        title: "湖南省促进残疾人就业三年行动实施方案（2025—2027年）",
        shortTitle: "湖南就业三年行动",
        summary:
          "湖南省人民政府办公厅印发《湖南省促进残疾人就业三年行动实施方案（2025—2027年）》。对安排比例高于1.5%的用人单位，每年按超比例人数（可以不是整数）乘以当年当地月最低工资标准的6倍给予奖励。残保金仍按省1.5%征收。",
        keyPoints: [
          "实施期2025—2027年。",
          "按比例就业不低于1.5%，未达标缴纳残保金。",
          "超比例奖励：每年按超比例人数（可以不是整数）\xD7当年当地月最低工资标准的6倍。",
        ],
        eligibility: "湖南省有就业需求的持证残疾人；在湘用人单位。",
        howToApply:
          "个人到残联就业服务机构和公共就业服务机构登记。单位按年度申报通知办理。",
        body: "湖南省人民政府办公厅关于印发《湖南省促进残疾人就业三年行动实施方案（2025—2027年）》的通知，省政府门户2026年1月8日公开。",
        sourceName: "湖南省人民政府办公厅",
        sourceUrl:
          "https://www.hunan.gov.cn/hnszf/xxgk/wjk/szfbgt/202601/t20260108_33888963.html",
        docNo: "湘政办发〔2025〕52号",
        issuedAt: "2025-12-22",
        effectiveAt: "2025",
      }),
    ],
  },
  SX: {
    planShortTitle: "山西规划（残疾人）",
    planUrl:
      "http://www.lishi.gov.cn/zwgk/fdzdgknr/ghtj/sjghjjd/sjwj/202401/t20240112_1834541.shtml",
    planIssued: "2022（晋政发〔2022〕9号，离石区政府网转载省政府通知全文）",
    implementingUrl:
      "http://www.npc.gov.cn/npc/c1773/c1849/c6680/c18674/c18676/201905/t20190522_51238.html",
    implementingIssued: "2010-07-16通过，2010-10-01施行（山西省残疾人保障条例；原1992年实施办法同时废止，中国人大网公开文本）",
    employmentUrl:
      "https://xxgk.qinshui.gov.cn/xzf/qsczj/fdzdgknr/mlqd_25/202301/P020230118420849432752.pdf",
    employmentNote:
      "山西省残疾人就业保障金征收使用管理实施办法：安排比例不得低于在职职工总数1.5%。年缴纳额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资。",
    subsidyPoints: [
      "省财政厅、民政厅2025年12月通知：自2026年1月1日起，两项补贴与上一年度全省农村低保平均标准的挂钩比例统一调整为22%。",
      "2026年全省困难残疾人生活补贴122元/人/月，重度残疾人护理补贴122元/人/月；三、四级智力、精神残疾人补贴61元/人/月。",
      "生活补贴由82元提至122元，护理补贴由109元提至122元。市县是否上浮以当地文件为准。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "sx-subsidy-2026",
        code: "SX",
        name: "山西省",
        title: "山西省调整残疾人两项补贴标准（2026年）",
        shortTitle: "山西2026两项补贴",
        summary:
          "2026年1月1日起，生活补贴和护理补贴均为122元/人/月；三、四级智力、精神残疾人补贴61元/人/月。",
        keyPoints: [
          "挂钩比例调整为农村低保平均标准的22%。",
          "生活补贴122元/月，护理补贴122元/月。",
          "三、四级智力、精神残疾人补贴61元/月。",
        ],
        eligibility:
          "山西省符合两项补贴及扩大护理对象范围的持证残疾人，以省通知和县级审核为准。",
        howToApply: "向户籍地乡镇街道申请。",
        body: "依据山西省财政厅、民政厅《关于调整残疾人两项补贴标准的通知》。吕梁市政府网、长治市政府网转载了2026年标准。金额随低保调整，下一年度可能再变。",
        sourceName: "山西省财政厅、民政厅（山西日报/市政府网转载）",
        sourceUrl:
          "http://www.lvliang.gov.cn/llxxgk/zfxxgk/xxgkml/shggsy/shjzhshfl/202512/t20251218_2003613.html",
        docNo: "山西省关于调整残疾人两项补贴标准的通知",
        issuedAt: "2025-12-09",
        effectiveAt: "2026-01-01",
      }),
      localEmployment({
        id: "sx-employment-fund",
        code: "SX",
        name: "山西省",
        title: "山西省残疾人就业保障金征收使用管理实施办法",
        shortTitle: "山西残保金1.5%",
        summary:
          "沁水县政府信息公开网公开的省实施办法：安排比例不得低于1.5%。年缴纳额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资。",
        keyPoints: [
          "安排比例1.5%。",
          "年缴纳额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资。",
          "分档减缴按国家和省发改收费文件。",
        ],
        eligibility: "在山西省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "沁水县人民政府信息公开网公开《山西省残疾人就业保障金征收使用管理实施办法》PDF。国家税务总局山西省税务局转载省发改委等部门分档征收口径。",
        sourceName: "沁水县人民政府（转省实施办法）",
        sourceUrl:
          "https://xxgk.qinshui.gov.cn/xzf/qsczj/fdzdgknr/mlqd_25/202301/P020230118420849432752.pdf",
        docNo: "山西省残疾人就业保障金征收使用管理实施办法",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localEmployment({
        id: "sx-employment-overquota-2023",
        code: "SX",
        name: "山西省",
        title: "山西省超比例安排残疾人就业奖励办法",
        shortTitle: "山西超比例最低工资50%",
        summary:
          "省财政厅、省残联、省人社厅联合印发《超比例安排残疾人就业奖励办法》。从2023年3月1日起，实际安排残疾人数超过在职职工总数1.5%（不含）且超出部分满1人的，可申请奖励。奖励标准为用人单位所在县（市、区）上年度全日制用人单位最低工资标准的50%。每年3月1日至4月10日申请上年度奖励。",
        keyPoints: [
          "超比例奖励：当地上年度全日制最低工资标准的50%（按超出人数计）。",
          "须超过1.5%且超出满1人。",
          "申报窗口每年3月1日—4月10日。",
        ],
        eligibility: "山西省超比例安排残疾人就业的机关、企事业单位等用人单位。",
        howToApply:
          "每年3月1日至4月10日，携带材料到当地按比例就业审核认定的残疾人服务机构申请上年度奖励。",
        body: "山西省卫生健康委员会网站2023年2月8日转载：省财政厅、省残联、省人社厅联合印发《超比例安排残疾人就业奖励办法》。奖励标准原文为「用人单位所在县（市、区）上年度全日制用人单位最低工资标准的50%」。",
        sourceName: "山西省卫生健康委员会（转省奖励办法）",
        sourceUrl:
          "https://wjw.shanxi.gov.cn/xwzx/szyw/202302/t20230208_7943163.shtml",
        docNo: "山西省超比例安排残疾人就业奖励办法",
        issuedAt: "2023-02",
        effectiveAt: "2023-03-01",
      }),
    ],
  },
  LN: {
    planShortTitle: "辽宁规划（残疾人）",
    planUrl:
      "https://www.ln.gov.cn/web/zwgkx/zfwj/szfbgtwj/2022n/766822D9F382464FB16C6EAD1FD8FB20/index.shtml",
    planIssued: "2022-01（辽政办发〔2022〕6号）",
    rehabUrl:
      "https://www.ln.gov.cn/web/zwgkx/zfxxgk1/zc/xzgfxwj/szf/szfwj/2023010415522743769/index.shtml",
    rehabAgeNote:
      "辽政发〔2018〕29号：具有辽宁户籍、0—7岁、在视力、听力（言语）、肢体、智力、精神等方面有出生缺陷和发育异常、需要进行早期干预和康复训练的儿童（有无办理残疾人证均可）；优先低保、建档立卡贫困户、儿童福利机构收留抚养、残疾孤儿及特困供养对象等。有条件地区可扩大年龄范围或放宽家庭经济条件限制。自2018年10月1日起全面实施；补助项目与额度以省残联配套及当地执行为准，本库不锁死过期金额。",
    implementingUrl:
      "http://www.npc.gov.cn/npc/c1773/c1849/c6680/c18674/c18676/201905/t20190522_52920.html",
    implementingIssued: "2011-11-24通过，2012-02-01施行（辽宁省实施《中华人民共和国残疾人保障法》办法，中国人大网公开文本）",
    subsidyUrl:
      "https://mzt.ln.gov.cn/mzt/zfxxgk/fdzdgknr/lzyj/mztgfxwj/lmf/2026040916485552844/index.shtml",
    subsidyPoints: [
      "辽宁省民政厅：经省政府同意，从2026年1月1日起，困难残疾人生活补贴起始标准从不低于80元/月提高到不低于90元/月，重度残疾人护理补贴起始标准同步从不低于80元提到不低于90元。",
      "有条件的地区可在起始标准上提高。生活补贴对象范围仍以低保家庭残疾人为主，护理补贴以一、二级重度为主，是否扩大须看当地文件。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "ln-subsidy-2026",
        code: "LN",
        name: "辽宁省",
        title: "辽宁省提高两项补贴起始标准（2026年）",
        shortTitle: "辽宁2026两项补贴",
        summary:
          "2026年1月1日起，生活补贴和护理补贴起始标准均不低于每人每月90元，市县可上浮。",
        keyPoints: [
          "起始标准：生活补贴≥90元/月，护理补贴≥90元/月。",
          "不是封顶数。沈阳、大连等市可能更高。",
        ],
        eligibility: "辽宁省符合两项补贴条件的残疾人。",
        howToApply: "向乡镇街道或通过辽宁政务服务网申请。",
        body: "辽宁省民政厅官网《关于提高困难残疾人生活补贴和重度残疾人护理补贴起始标准的通知》，2026年4月9日公开，执行回溯至2026年1月1日。",
        sourceName: "辽宁省民政厅、财政厅、残联",
        sourceUrl:
          "https://mzt.ln.gov.cn/mzt/zfxxgk/fdzdgknr/lzyj/mztgfxwj/lmf/2026040916485552844/index.shtml",
        docNo: "辽民发〔2026〕16号",
        issuedAt: "2026-03-30",
        effectiveAt: "2026-01-01",
      }),
      localEmployment({
        id: "ln-employment-fund",
        code: "LN",
        name: "辽宁省",
        title: "辽宁省残疾人就业保障金征收口径",
        shortTitle: "辽宁残保金1.5%",
        summary:
          "沈阳市财政局2023、2024年行政事业性收费目录：残保金按差额人数\xD7上年职工年平均工资计征。分档减缴按财政部公告2023年第8号。依据含辽财非〔2016〕415号、辽残联发〔2017〕41号、省政府令第75号。目录按1%—1.5%分档，省规定比例为1.5%。",
        keyPoints: [
          "安排比例1.5%。",
          "公式与国家办法一致。",
          "30人（含）以下企业免征至2027年底。",
        ],
        eligibility: "在辽宁省注册的用人单位；在本省求职的持证残疾人。",
        howToApply: "单位经残联审核后向税务机关申报。咨询12366。",
        body: "沈阳市财政局、发改委公布的市本级行政事业性收费目录清单（2023年、2024年）列明残保金公式及财政部公告2023年第8号分档，并列举辽财非〔2016〕415号、辽残联发〔2017〕41号等依据。辽宁省财政厅网站2024年7月8日仍公开该办法。",
        sourceName: "辽宁省财政厅",
        sourceUrl:
          "https://czt.ln.gov.cn/czt/zfxxgk/zc/xzgfxwj/2024070812165444350/index.shtml",
        docNo: "辽财非〔2016〕415号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
    ],
  },
  FJ: {
    planTitle: "福建省“十五五”残疾人保障和发展规划",
    planIssued: "2026年7月21日（闽政办〔2026〕18号）",
    planShortTitle: "福建十五五残疾人规划",
    planPoints: [
      "规划期2026—2030年。两项补贴覆盖率100%（约束性），基本康复服务率≥95%（约束性）。",
      "完善儿童康复救助实施细则；修订基本型辅具适配补贴办法和目录。",
      "落实低保渐退、就业成本扣减、“单人保”。家庭无障碍改造5年2.5万户。",
      "城乡新增残疾人就业2.5万人（五年累计，预期性）。打造美丽工坊、励志主播等就业品牌。",
    ],
    implementingUrl:
      "https://mzt.fujian.gov.cn/zfxxgkzl/zc/gfxwj/202311/t20231120_6304448.htm",
    implementingIssued: "2023-11-15（闽民规〔2023〕9号）",
    subsidyUrl:
      "https://mzt.fujian.gov.cn/ztzl/rdhy/202605/t20260515_7148535.htm",
    subsidyPoints: [
      "闽民规〔2023〕9号：生活补贴对象为低保家庭残疾人、家庭年人均收入在当地低保标准100%～130%的重度残疾人、60周岁及以上无固定收入（个人收入）的重度残疾人；护理补贴对象为一、二级需长期照护的重度残疾人。",
      "省民政厅2026年5月回应关切口径：生活补贴121元/人/月；生活困难对象护理一级145元、二级121元；非生活困难对象护理一级115元、二级85元。市县可高于省标准（如福州公示更高）。",
      "动态调整：生活补贴与生活困难一级/二级护理分别按不低于省定低保最低标准的25%、30%、25%调整。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "fj-subsidy-rule-2023",
        code: "FJ",
        name: "福建省",
        title: "福建省困难残疾人生活补贴和重度残疾人护理补贴实施办法",
        shortTitle: "福建两项补贴实施办法",
        summary:
          "闽民规〔2023〕9号：细化两项补贴对象、动态调整、申办流程、跨省通办和全程网办。非生活困难重度护理补贴一级115元/月、二级85元/月；生活困难对象标准按低保比例动态调整。",
        keyPoints: [
          "生活补贴三类对象：低保家庭；低保标准100%～130%重度；60岁及以上无固定收入重度。",
          "护理补贴：一、二级需长期照护；非生活困难一级115元、二级85元。",
          "支持跨省通办、全程网办；有条件地方可将审定权限下放到乡镇（街道）。",
          "文号闽民规〔2023〕9号，省民政厅行政规范性文件库公开。",
        ],
        eligibility:
          "具有本省户籍、持有效残疾人证，并符合闽民规〔2023〕9号对象范围与政策衔接规定的残疾人。",
        howToApply:
          "向户籍地乡镇（街道）民政服务窗口申请，或通过国家政务服务平台、民政通、福建省网上办事大厅全程网办。",
        body: "福建省民政厅、财政厅、残联《福建省困难残疾人生活补贴和重度残疾人护理补贴实施办法》（闽民规〔2023〕9号，2023年11月15日印发施行）。省民政厅2026年5月17日《一文读懂｜残疾人两项补贴谁能领、领多少、怎么领？》公开现行省定金额口径。市县提标以当地公示为准。",
        sourceName: "福建省民政厅、财政厅、残联",
        sourceUrl:
          "https://mzt.fujian.gov.cn/zfxxgkzl/zc/gfxwj/202311/t20231120_6304448.htm",
        docNo: "闽民规〔2023〕9号",
        issuedAt: "2023-11-15",
        effectiveAt: "2023-11-15",
      }),
      localSubsidy({
        id: "fj-subsidy-2025",
        code: "FJ",
        name: "福建省",
        title: "福建省提高残疾人两项补贴标准（2025年起）",
        shortTitle: "福建两项补贴省标准",
        summary:
          "自2025年1月起，福建省困难残疾人生活补贴121元/人/月；重度护理补贴一级145元/人/月、二级121元/人/月。设区市、县可高于省标准。2026年如有新通知以新文本为准。",
        keyPoints: [
          "生活补贴121元/人/月。",
          "护理补贴：一级145元/人/月，二级121元/人/月。",
          "福清等县市公示高于省标准，以户籍地为准。",
        ],
        eligibility:
          "福建省符合两项补贴条件的持证残疾人，对象范围按闽民规〔2023〕9号等省实施办法。",
        howToApply: "向户籍地乡镇街道或县民政申请。",
        body: "来源：福建省财政厅《明年1月起，我省继续提高残疾人两项补贴标准》（2025年1月2日，社保处）。由114/137/114元分别提高到121/145/121元。本条是省级托底，不是各县统一价。",
        sourceName: "福建省财政厅",
        sourceUrl:
          "https://czt.fujian.gov.cn/zwgk/czxw/202501/t20250107_6619746.htm",
        docNo: "福建省2025年提高两项补贴（财政厅公开）",
        issuedAt: "2025-01-02",
        effectiveAt: "2025-01-01",
      }),
      localEmployment({
        id: "fj-employment-three-year",
        code: "FJ",
        name: "福建省",
        title: "福建省促进残疾人就业三年行动方案（2025—2027年）",
        shortTitle: "福建就业三年行动",
        summary:
          "闽政办〔2025〕28号：省级、地市级编制50人及以上的机关和编制67人及以上的事业单位（中小学、幼儿园除外）安排残疾人就业未达规定比例的，2027年底前至少安排1名残疾人；未达标依规缴纳残保金。县乡按编制总数统筹达标。",
        keyPoints: [
          "文号闽政办〔2025〕28号。",
          "机关事业单位带头安排就业，未达标缴纳残保金。",
          "企业助残招聘、自主创业灵活就业、农村帮扶、辅助性就业同步部署。",
        ],
        eligibility: "福建省有就业需求的持证残疾人；在闽机关、事业单位和企业。",
        howToApply:
          "个人到残联就业服务中心和公共就业服务机构登记。机关事业单位按组织、人社、残联统计公示制度落实。",
        body: "福建省人民政府办公厅关于印发《福建省促进残疾人就业三年行动方案（2025—2027年）》的通知（闽政办〔2025〕28号），省政府门户2025年10月11日公开。",
        sourceName: "福建省人民政府办公厅",
        sourceUrl:
          "https://www.fujian.gov.cn/zwgk/zxwj/szfbgtwj/202510/t20251011_7019955.htm",
        docNo: "闽政办〔2025〕28号",
        issuedAt: "2025-10",
        effectiveAt: "2025",
      }),
    ],
  },
  HE: {
    planShortTitle: "河北规划（残疾人）",
    implementingUrl:
      "http://www.luanxian.gov.cn/index.php?a=show&c=index&catid=1688&id=33503&m=content",
    implementingIssued: "2015（冀政字〔2015〕74号，2016-01-01起制度实施）",
    subsidyUrl:
      "http://www.chengan.gov.cn/zfxxgk/view.jsp?id=27806&xxfl=1403",
    employmentUrl:
      "https://www.yongqing.gov.cn/xingzhengshiyexingshoufeihezhengfuxingjijinmuluqingdan/2023-06-03/15204.html",
    employmentNote:
      "冀财税〔2016〕40号：安排比例1.5%。年缴纳额=（上年职工人数×1.5%－上年实际安排人数）×上年职工年平均工资。冀财非税〔2020〕15号进一步规范征收管理。",
    extraPolicies: [
      localSubsidy({
        id: "he-subsidy-rule-2015",
        code: "HE",
        name: "河北省",
        title: "河北省全面建立残疾人两项补贴制度实施意见",
        shortTitle: "河北两项补贴冀政字74号",
        summary:
          "冀政字〔2015〕74号：生活补贴对象为低保家庭持证残疾人；护理补贴对象为一、二级需长期照护重度残疾人。制度起点生活补贴不低于55元/月、护理补贴不低于50元/月，之后按动态调整。",
        keyPoints: [
          "生活补贴：低保家庭持证残疾人；有条件地方可扩面。",
          "护理补贴：一、二级视力/肢体/精神/智力及多重且需长期照护。",
          "制度起点：生活不低于55元/月、护理不低于50元/月（2016年起），现行元/月见提标专条。",
          "文号冀政字〔2015〕74号，滦县政府网公开全文。",
        ],
        eligibility:
          "具有河北省户籍、持有效残疾人证，并符合冀政字〔2015〕74号及后续提标、当地扩面规定的残疾人。",
        howToApply:
          "向户籍地乡镇（街道）社会救助一门受理窗口申请。现行标准以省提标通知和市县公示为准。",
        body: "河北省人民政府《关于全面建立困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（冀政字〔2015〕74号）。滦县人民政府信息公开平台公开全文。后续标准以省民政厅、财政厅、残联提标通知为准。",
        sourceName: "滦县人民政府（引冀政字〔2015〕74号）",
        sourceUrl:
          "http://www.luanxian.gov.cn/index.php?a=show&c=index&catid=1688&id=33503&m=content",
        docNo: "冀政字〔2015〕74号",
        issuedAt: "2015",
        effectiveAt: "2016-01-01",
      }),
      localSubsidy({
        id: "he-subsidy-2025",
        code: "HE",
        name: "河北省",
        title: "河北省提高残疾人两项补贴标准（2025年）",
        shortTitle: "河北2025两项补贴提标",
        summary:
          "省民政厅、财政厅、残联通知：自2025年1月1日起，困难残疾人生活补贴由96元/月调整为106元/月；重度残疾人护理补贴由90元/月调整为100元/月。高于省定标准所需资金由当地财政解决。",
        keyPoints: [
          "生活补贴106元/人/月（原96元）。",
          "护理补贴100元/人/月（原90元）。",
          "自2025年1月1日起执行。",
          "市县可高于省定标准。",
        ],
        eligibility: "河北省符合两项补贴条件的持证残疾人。",
        howToApply: "向户籍地乡镇街道或县民政申请；以当地公示和窗口为准。",
        body: "河北省民政厅、财政厅、残联《关于提高困难残疾人生活补贴和重度残疾人护理补贴标准的通知》（2024年12月25日）。成安县人民政府网2025年3月12日公开全文。是否2026年再调，请核省民政厅最新通知。",
        sourceName: "河北省民政厅、财政厅、残联（成安县政府网公开）",
        sourceUrl: "http://www.chengan.gov.cn/zfxxgk/view.jsp?id=27806&xxfl=1403",
        docNo: "河北省两项补贴提标通知（2025年1月1日起）",
        issuedAt: "2024-12-25",
        effectiveAt: "2025-01-01",
      }),
      localEmployment({
        id: "he-employment-fund-2016",
        code: "HE",
        name: "河北省",
        title: "河北省残疾人就业保障金征收使用管理实施办法",
        shortTitle: "河北残保金1.5%",
        summary:
          "冀财税〔2016〕40号：本省用人单位安排残疾人就业比例1.5%。永清县政府网收费目录公开该办法及公式，并列冀财非税〔2020〕15号。",
        keyPoints: [
          "安排比例1.5%。",
          "年缴纳额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资。",
          "分档减缴按财政部公告2023年第8号。",
        ],
        eligibility: "在河北省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "河北省财政厅等《河北省残疾人就业保障金征收使用管理实施办法》（冀财税〔2016〕40号）。永清县人民政府网行政事业性收费目录列明公式、冀财税〔2016〕40号及冀财非税〔2020〕15号。",
        sourceName: "永清县人民政府（引冀财税〔2016〕40号）",
        sourceUrl:
          "https://www.yongqing.gov.cn/xingzhengshiyexingshoufeihezhengfuxingjijinmuluqingdan/2023-06-03/15204.html",
        docNo: "冀财税〔2016〕40号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localEmployment({
        id: "he-employment-audit-2026",
        code: "HE",
        name: "河北省",
        title: "河北省2026年按比例就业申报审核窗口",
        shortTitle: "河北2026年审",
        summary:
          "吴桥县政府网2026年3月2日通告：2026年残疾人就业保障金审核时间为2026年3月1日至10月31日；税务部门集中申报缴费不得迟于2026年11月30日。安排比例1.5%。",
        keyPoints: [
          "2026年审核：3月1日—10月31日。",
          "缴费不得迟于2026年11月30日。",
          "安排比例1.5%。",
        ],
        eligibility: "在河北省注册、安排有残疾人就业的用人单位。",
        howToApply: "在规定期限内向残联申报就业情况后，向税务机关缴纳。",
        body: "吴桥县人民政府网《关于残疾人就业保障金审核及缴纳的通告》（2026年3月2日）。本条锁定2026年窗口，下一年以新通告为准。",
        sourceName: "吴桥县人民政府",
        sourceUrl:
          "http://www.wuqiao.gov.cn/wuqiao/c101108/202603/4a9d0d8f781545298823a2a8e04c23a3.shtml",
        docNo: "2026年河北残保金审核通告（吴桥县公开）",
        issuedAt: "2026-03-02",
        effectiveAt: "2026-03-01",
      }),
    ],
    subsidyPoints: [
      "冀政字〔2015〕74号建立制度；省民政厅、财政厅、残联2024年12月25日通知：自2025年1月1日起生活补贴106元/月、护理补贴100元/月。",
      "有条件的市县可高于省标准；2026年是否再调，请核省民政厅最新通知。",
    ],
  },
  ZJ: {
    planUrl:
      "https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web3096/site/attach/0/d7060e6c6eb74a66b66748978344d4e3.pdf",
    planIssued: "2021-06-28（浙政发〔2021〕19号，省政府公报）",
    rehabUrl:
      "https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web3096/site/attach/0/1811021506297899116.pdf",
    rehabAgeNote:
      "浙政发〔2018〕36号（省政府公报PDF）：完善残疾儿童康复服务制度。服务对象以0—6周岁经鉴定符合国家标准的视力、听力、言语、肢体、智力、多重残疾儿童和孤独症儿童为主；不具备义务教育入学条件的，年龄可按规定放宽。具体补贴档次与目录以省残联工作细则及当地执行文件为准。",
    planShortTitle: "浙江规划（残疾人）",
    subsidyUrl:
      "https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web2681/site/attach/0/68e8c1dc35ec4f35afeca1e57c50bdc6.pdf",
    employmentUrl:
      "https://zhejiang.chinatax.gov.cn/art/2017/4/20/art_8410_12284.html",
    employmentNote:
      "浙财社〔2017〕26号：安排比例未达1.5%的缴纳残保金。按上年未按规定安排的人数和上年在职职工平均工资计征。当年通知写明超过当地社平工资3倍按3倍计征，国家发改价格规〔2019〕2015号后上限为2倍，以税务局当年申报表为准。文到宁波不发，宁波单独规定。",
    subsidyPoints: [
      "浙民福〔2021〕191号：困难残疾人生活补贴按照当地低保标准的30%确定，随低保调整，由县（市、区）公布。本库不锁死全省统一元/月。",
      "重度残疾人护理补贴按生活自理能力分档，具体金额以户籍地公示为准。",
      "可通过浙里办、浙江省政务服务网或乡镇街道申请。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "zj-subsidy-rule",
        code: "ZJ",
        name: "浙江省",
        title: "浙江省困难残疾人生活补贴和重度残疾人护理补贴实施办法",
        shortTitle: "浙江两项补贴口径",
        summary:
          "浙民福〔2021〕191号规定：困难残疾人生活补贴按当地低保标准的30%计发。护理补贴分档由市县确定。各地元/月不同，以户籍地当年公示为准。",
        keyPoints: [
          "生活补贴 = 当地低保标准 \xD7 30%，随低保调整。",
          "护理补贴分档，不是全省一个价。",
          "申请渠道：浙里办、政务服务网、乡镇街道。",
        ],
        eligibility:
          "浙江省符合两项补贴条件的持证残疾人，对象范围以省实施办法和县级审核为准。",
        howToApply:
          "向户籍地乡镇街道申请，或通过浙里办、浙江省政务服务网办理。",
        body: "浙江省民政厅、财政厅、残联《关于印发〈浙江省困难残疾人生活补贴实施办法〉和〈浙江省重度残疾人护理补贴实施办法〉的通知》（浙民福〔2021〕191号）。县市区公开文件多次转引该口径。本条只锁定计算规则，不把某一县的元/月套用全省。",
        sourceName: "浙民福〔2021〕191号（县市区公开文件转引）",
        sourceUrl:
          "https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web2681/site/attach/0/68e8c1dc35ec4f35afeca1e57c50bdc6.pdf",
        docNo: "浙民福〔2021〕191号",
        issuedAt: "2021",
        effectiveAt: "2021",
      }),
      localEmployment({
        id: "zj-employment-fund-2017",
        code: "ZJ",
        name: "浙江省",
        title: "浙江省转发残疾人就业保障金征收使用管理办法",
        shortTitle: "浙江残保金1.5%",
        summary:
          "浙财社〔2017〕26号：安排残疾人就业比例未达本单位在职职工总数1.5%的，应当缴纳残保金。按上年未按规定安排的人数和上年在职职工平均工资计征。通知原文写超过当地社平工资3倍按3倍计征；国家发改价格规〔2019〕2015号后征收上限为当地社平工资2倍，申报时以电子税务局当年口径为准。本通知主送不含宁波。",
        keyPoints: [
          "安排比例1.5%。",
          "文号浙财社〔2017〕26号，2017年5月2日起执行。",
          "2020年起改为按年缴纳，缴纳时间为每年9月征期。",
        ],
        eligibility:
          "在浙江省（不含宁波，宁波按本市规定）注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "浙江省财政厅、地方税务局、残联《转发财政部 国家税务总局 中国残疾人联合会关于印发〈残疾人就业保障金征收使用管理办法〉的通知》（浙财社〔2017〕26号）。国家税务总局浙江省税务局网站公开。分档减缴按财政部公告2023年第8号。",
        sourceName: "国家税务总局浙江省税务局（浙财社〔2017〕26号）",
        sourceUrl:
          "https://zhejiang.chinatax.gov.cn/art/2017/4/20/art_8410_12284.html",
        docNo: "浙财社〔2017〕26号",
        issuedAt: "2017-04",
        effectiveAt: "2017-05-02",
      }),
    ],
  },
  SD: {
    planUrl:
      "http://gb.shandong.gov.cn/art/2021/10/11/art_100623_39296.html",
    planIssued: "2021-09-02（鲁政字〔2021〕156号）",
    rehabUrl:
      "http://gb.shandong.gov.cn/art/2026/1/18/art_100623_47044.html",
    rehabAgeNote:
      "鲁政字〔2025〕188号《山东省残疾儿童康复救助办法》：申请对象为持残疾人证且未满18周岁，或持规定残疾诊断证明且未满7周岁，并符合户籍/居住证纳税或社保等条件之一。0—6岁听力言语肢体智力及孤独症集中训练每人年补助2万元；7岁以上集中训练1.5万元、“机构+社区+家庭”0.5万元；视力训练0.6万元（原则上不超过2年）。自2026年1月1日起施行，鲁政发〔2018〕20号同时废止。",
    planShortTitle: "山东规划（残疾人）",
    implementingUrl:
      "http://www.shandong.gov.cn/art/2015/12/29/art_2267_17675.html",
    implementingIssued: "2015-12-25（鲁政发〔2015〕27号，2016-01-01施行）",
    subsidyUrl:
      "http://www.shandong.gov.cn/art/2015/12/29/art_2267_17675.html",
    employmentUrl:
      "http://czt.shandong.gov.cn/art/2026/6/2/art_100312_10330386.html",
    employmentNote:
      "鲁财税〔2026〕8号：安排比例不得低于1.5%。年缴纳额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资。残保金申报缴纳为每年8月1日—11月30日，自2026年6月1日起施行。沂南、郯城、德城2026年通告：联网认证时间为3月1日至10月31日，登录山东省残联网站办事服务「就业申报」。",
    extraPolicies: [
      localSubsidy({
        id: "sd-subsidy-rule-2015",
        code: "SD",
        name: "山东省",
        title: "山东省全面建立残疾人两项补贴制度实施意见",
        shortTitle: "山东两项补贴鲁政发27号",
        summary:
          "鲁政发〔2015〕27号：自2016年起两项补贴标准均为每人每月不低于80元，并建立动态调整。生活补贴对象为低保家庭持证残疾人；护理补贴对象为无生活自理能力的一、二级智力、精神、视力、肢体残疾人。有条件地方可扩面。",
        keyPoints: [
          "制度起点标准：生活补贴、护理补贴均不低于80元/人/月（2016年起），之后按动态调整，省无统一锁死的2026年元/月进入本库。",
          "生活补贴：低保家庭持证残疾人；有条件地方可扩大到低收入及其他困难残疾人。",
          "护理补贴：一、二级智力、精神、视力、肢体且无生活自理能力；有条件地方可扩面。",
          "可同时申领两项；与其他福利性生活/护理补贴择高；特困供养、工伤护理费不享受两项补贴。",
        ],
        eligibility:
          "具有山东省户籍、持有效残疾人证，并符合鲁政发〔2015〕27号及后续完善文件、当地扩面规定的残疾人。",
        howToApply:
          "向户籍地乡镇（街道）社会救助一门受理窗口申请。现行标准以市县民政公示为准。",
        body: "山东省人民政府《关于贯彻国发〔2015〕52号文件全面建立困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（鲁政发〔2015〕27号）。省政府门户与省民政厅政策解读同步公开。后续鲁民〔2021〕86号、鲁民〔2022〕64号等完善文件未在本条展开；各地现行元/月以当地公示为准，本库不编造全省统一金额。",
        sourceName: "山东省人民政府",
        sourceUrl: "http://www.shandong.gov.cn/art/2015/12/29/art_2267_17675.html",
        docNo: "鲁政发〔2015〕27号",
        issuedAt: "2015-12-25",
        effectiveAt: "2016-01-01",
      }),
      localEmployment({
        id: "sd-employment-fund-2026",
        code: "SD",
        name: "山东省",
        title: "山东省残疾人就业保障金征收使用管理办法（2026年）",
        shortTitle: "山东残保金1.5%",
        summary:
          "鲁财税〔2026〕8号：本省用人单位安排残疾人就业比例不得低于在职职工总数1.5%。申报缴纳期为每年8月1日—11月30日。自2026年6月1日起施行，替代原鲁财综〔2018〕31号。",
        keyPoints: [
          "安排比例不低于1.5%。",
          "年缴纳额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资。",
          "每年8月1日—11月30日向税务机关申报缴纳。",
          "减免缓缴按国家和省有关规定执行。",
        ],
        eligibility: "在山东省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位向残联申报就业情况后，于8月1日—11月30日通过电子税务局缴纳。个人到残联就业服务机构登记。",
        body: "山东省财政厅、国家税务总局山东省税务局、山东省残疾人联合会《关于印发山东省残疾人就业保障金征收使用管理办法的通知》（鲁财税〔2026〕8号）。省财政厅2026年6月2日公开。第六条比例1.5%，第十一条申报期8月1日—11月30日，第二十九条自2026年6月1日起施行。",
        sourceName: "山东省财政厅",
        sourceUrl:
          "http://czt.shandong.gov.cn/art/2026/6/2/art_100312_10330386.html",
        docNo: "鲁财税〔2026〕8号",
        issuedAt: "2026-06-02",
        effectiveAt: "2026-06-01",
      }),
    ],
    subsidyPoints: [
      "省无统一锁死的2026年元/月标准进入本库。烟台市政府网2026年2月办事指南：一、二级困难生活补贴214元/月，三、四级161元/月（芝罘区、长岛综试区170元）；一级护理193元/月，二级护理161元/月。此为烟台市标准，不能套用全省。",
      "其他地市以当地民政公示为准。",
    ],
  },
  YN: {
    planShortTitle: "云南规划（残疾人）",
    implementingUrl:
      "https://www.baoshan.gov.cn/info/11596/4861464.htm",
    implementingIssued: "2016（云政发〔2016〕5号，保政发〔2016〕66号转引）",
    subsidyUrl:
      "https://ynmz.yn.gov.cn/index.php/cms/qitazhengcewenjian/11943.html",
    subsidyPoints: [
      "云政发〔2016〕5号建立制度：生活补贴对象为低保家庭残疾人；护理补贴对象为一、二级需长期照护重度残疾人。",
      "云民发〔2026〕2号：自2026年1月1日起，省级指导标准为困难残疾人生活补贴100元/人/月，重度护理补贴一级110元/人/月、二级100元/人/月。州（市）可高于省级指导标准。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "yn-subsidy-rule-2016",
        code: "YN",
        name: "云南省",
        title: "云南省困难残疾人生活补贴和重度残疾人护理补贴制度实施办法",
        shortTitle: "云南两项补贴云政发5号",
        summary:
          "云政发〔2016〕5号：生活补贴对象为具有云南省户籍的低保家庭残疾人；护理补贴对象为一级、二级且需要长期照护的重度残疾人。有条件地方可扩面。现行元/月见云民发〔2026〕2号省级指导标准。",
        keyPoints: [
          "生活补贴：低保家庭持证残疾人；有条件可扩面。",
          "护理补贴：一、二级需长期照护重度残疾人。",
          "文号云政发〔2016〕5号；保山市人民政府保政发〔2016〕66号转引该办法对象范围。",
          "现行省级指导标准见云民发〔2026〕2号专条。",
        ],
        eligibility:
          "具有云南省户籍、持有效残疾人证，并符合云政发〔2016〕5号及后续提标、州（市）扩面规定的残疾人。",
        howToApply:
          "向户籍地乡镇（街道）受理窗口申请；也可按全国两项补贴信息系统办理。",
        body: "云南省人民政府《关于印发云南省困难残疾人生活补贴和重度残疾人护理补贴制度实施办法的通知》（云政发〔2016〕5号）。保山市人民政府《关于实施困难残疾人生活补贴和重度残疾人护理补贴制度的通知》（保政发〔2016〕66号）完整转引该办法对象与衔接口径。",
        sourceName: "保山市人民政府（引云政发〔2016〕5号）",
        sourceUrl: "https://www.baoshan.gov.cn/info/11596/4861464.htm",
        docNo: "云政发〔2016〕5号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localSubsidy({
        id: "yn-subsidy-2026",
        code: "YN",
        name: "云南省",
        title: "云南省调整残疾人两项补贴省级指导标准（2026年）",
        shortTitle: "云南2026两项补贴",
        summary:
          "云民发〔2026〕2号：自2026年1月1日起，生活补贴100元/人/月；护理补贴一级110元/人/月、二级100元/人/月。",
        keyPoints: [
          "生活补贴由90元提高至100元/人/月。",
          "护理补贴：一级由100元提高至110元，二级由90元提高至100元。",
          "此为省级指导标准，州（市）应于2026年6月30日前按不低于省级指导标准发布当地执行标准。",
        ],
        eligibility:
          "云南省符合两项补贴条件的持证残疾人，对象范围以省通知和州（市）审核为准。",
        howToApply: "向户籍地乡镇街道申请。",
        body: "云南省民政厅、财政厅、残联《关于调整残疾人两项补贴标准的通知》（云民发〔2026〕2号）。省民政厅网站公开全文。牟定县人民政府网2026年3月问答、安宁市民政局2026年4月发放公示与此省级指导标准一致。",
        sourceName: "云南省民政厅、财政厅、残联",
        sourceUrl:
          "https://ynmz.yn.gov.cn/index.php/cms/qitazhengcewenjian/11943.html",
        docNo: "云民发〔2026〕2号",
        issuedAt: "2026-01",
        effectiveAt: "2026-01-01",
      }),
      localEmployment({
        id: "yn-employment-fund-2017",
        code: "YN",
        name: "云南省",
        title: "云南省残疾人就业保障金征收使用管理实施办法",
        shortTitle: "云南残保金1.5%",
        summary:
          "云财非税〔2017〕32号：省人民政府规定安排比例1.5%。未达标缴纳残保金。分档减缴按财政部公告2023年第8号。",
        keyPoints: [
          "安排比例1.5%。",
          "税务机关征收。",
          "分档减缴、30人以下企业免征执行至2027年底。",
        ],
        eligibility: "在云南省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "云南省财政厅、地方税务局、残联《关于印发云南省残疾人就业保障金征收使用管理实施办法的通知》（云财非税〔2017〕32号）。红河州蒙自市人民政府网征收情况公示引用该文。",
        sourceName: "蒙自市人民政府（引云财非税〔2017〕32号）",
        sourceUrl: "https://www.hhmz.gov.cn/info/5581/331971.htm",
        docNo: "云财非税〔2017〕32号",
        issuedAt: "2017",
        effectiveAt: "2017",
      }),
    ],
  },
  XJ: {
    planShortTitle: "新疆规划（残疾人）",
    implementingUrl:
      "https://mzt.xinjiang.gov.cn/xjmzt/c113003/202309/1d0a76a885ba4ba7afad13e018812a9e.shtml",
    implementingIssued: "2022（新民规发〔2022〕3号）",
    subsidyUrl:
      "https://www.xjboz.gov.cn/xjboz/c125891/202604/435d84fdfcc4447e8ef4c831d8a80e92.shtml",
    subsidyPoints: [
      "新民规发〔2022〕3号：生活补贴对象为城乡低保家庭持证残疾人；护理补贴对象为一级、二级重度残疾人。有条件地方可扩面。",
      "新民发〔2026〕20号：自2026年1月1日起，全区生活补贴和护理补贴基础标准均由120元提高至140元/人/月。地州可上浮。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "xj-subsidy-rule-2022",
        code: "XJ",
        name: "新疆维吾尔自治区",
        title: "新疆进一步完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见",
        shortTitle: "新疆两项补贴新民规发3号",
        summary:
          "新民规发〔2022〕3号：明确对象范围、政策衔接与精准管理。生活补贴限城乡低保家庭持证残疾人；护理补贴限一、二级重度残疾人。有条件地方可扩面至低保边缘等。现行基础标准见新民发〔2026〕20号。",
        keyPoints: [
          "生活补贴：新疆户籍、持有效残疾人证的城乡低保家庭残疾人。",
          "护理补贴：一级、二级重度残疾人。",
          "有条件地方可扩面，扩面资金由当地财政负担。",
          "文号新民规发〔2022〕3号，自治区民政厅规范性文件库公开。",
        ],
        eligibility:
          "具有新疆户籍、持有效残疾人证，并符合新民规发〔2022〕3号及后续提标、当地扩面规定的残疾人。",
        howToApply:
          "向户籍地乡镇（街道）一门受理窗口申请，或通过全国两项补贴信息系统办理。",
        body: "自治区民政厅、财政厅、残联《关于进一步完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（新民规发〔2022〕3号）。自治区民政厅网站行政规范性文件栏目公开。现行元/月见新民发〔2026〕20号专条。",
        sourceName: "新疆维吾尔自治区民政厅、财政厅、残联",
        sourceUrl:
          "https://mzt.xinjiang.gov.cn/xjmzt/c113003/202309/1d0a76a885ba4ba7afad13e018812a9e.shtml",
        docNo: "新民规发〔2022〕3号",
        issuedAt: "2022",
        effectiveAt: "2022",
      }),
      localSubsidy({
        id: "xj-subsidy-2026",
        code: "XJ",
        name: "新疆维吾尔自治区",
        title: "新疆提高全区残疾人两项补贴基础标准（2026年）",
        shortTitle: "新疆2026两项补贴",
        summary:
          "新民发〔2026〕20号：自2026年1月1日起，全区困难残疾人生活补贴和重度残疾人护理补贴基础标准均由120元提高至140元/人/月。",
        keyPoints: [
          "生活补贴基础标准140元/人/月。",
          "护理补贴基础标准140元/人/月。",
          "由120元提高。地州公示请以当地文件为准。",
        ],
        eligibility:
          "新疆符合两项补贴条件的持证残疾人，对象范围以自治区通知和县级审核为准。",
        howToApply: "向户籍地乡镇街道或通过一卡通渠道申请。",
        body: "依据自治区民政厅、财政厅、残联《关于提高全区困难残疾人生活补贴和重度残疾人护理补贴标准的通知》（新民发〔2026〕20号）。博尔塔拉蒙古自治州财政局2026年4月24日公开文章完整引用该文金额。吐鲁番市政府网、阿合奇县政府网2026年公示与此基础标准一致。",
        sourceName: "新民发〔2026〕20号（博州财政局转引）",
        sourceUrl:
          "https://www.xjboz.gov.cn/xjboz/c125891/202604/435d84fdfcc4447e8ef4c831d8a80e92.shtml",
        docNo: "新民发〔2026〕20号",
        issuedAt: "2026-01",
        effectiveAt: "2026-01-01",
      }),
      localEmployment({
        id: "xj-employment-fund-2016",
        code: "XJ",
        name: "新疆维吾尔自治区",
        title: "新疆维吾尔自治区残疾人就业保障金征收使用管理办法",
        shortTitle: "新疆残保金",
        summary:
          "新财非税〔2016〕28号。伊吾县政府网2026年3月公开政策汇编引用该办法第七条计征公式。国家税务总局新疆维吾尔自治区税务局法规库2025年10月仍列出该文。安排比例执行国家1.5%底线。",
        keyPoints: [
          "文号新财非税〔2016〕28号。",
          "计征公式与国家办法一致。",
          "分档减缴按财政部公告2023年第8号。",
        ],
        eligibility: "在新疆注册的用人单位；在自治区求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "自治区财政厅《关于印发〈新疆维吾尔自治区残疾人就业保障金征收使用管理办法〉的通知》（新财非税〔2016〕28号）。伊吾县人民政府网2026年3月《残疾人就业保障金申报使用相关政策》引用第七条。新疆税务局法规库2025年10月31日仍公开该文。",
        sourceName: "伊吾县人民政府（引新财非税〔2016〕28号）",
        sourceUrl:
          "https://www.xjyiwu.gov.cn/xjyiwu/c123449/202603/8d5bd970b47c4a09aa3e645fa5d0f7c4.shtml",
        docNo: "新财非税〔2016〕28号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
    ],
  },
  JX: {
    implementingUrl:
      "https://www.gongqing.gov.cn/mzj/fdzdgknr_187053/fgzc/zcwj/202105/t20210503_4920859.html",
    implementingIssued: "2015-12-29（赣府发〔2015〕63号）",
    subsidyUrl:
      "https://www.jxlcx.gov.cn/art/2026/6/16/art_27845_4455077.html",
    employmentUrl:
      "https://www.yongxiu.gov.cn/bmxzxxgk/bmgk/czj/fgzc/zcwj/202601/t20260104_7140036.html",
    employmentNote:
      "赣财非税〔2019〕3号：安排比例1.5%。自2026年1月1日起，财政拨款的机关、团体、事业单位残保金改由同级税务部门征收。企业等仍向税务机关申报。",
    subsidyPoints: [
      "赣府发〔2015〕63号：生活补贴对象为低保持证残疾人；护理补贴对象为一、二级需长期照护重度残疾人。",
      "赣府发〔2025〕5号：从2025年1月起，生活补贴和护理补贴均由100元提高到110元/人/月。黎川、龙南、南昌青云谱2026年公开仍按110元执行。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "jx-subsidy-rule-2015",
        code: "JX",
        name: "江西省",
        title: "江西省困难残疾人生活补贴和重度残疾人护理补贴制度实施办法",
        shortTitle: "江西两项补贴赣府发63号",
        summary:
          "赣府发〔2015〕63号：生活补贴对象为具有江西户籍、持证且纳入城乡低保的残疾人；护理补贴对象为一级、二级且需要长期照护的重度残疾人。制度起点两项各50元/月，之后按动态调整。现行110元见赣府发〔2025〕5号专条。",
        keyPoints: [
          "生活补贴：江西户籍、持证、纳入城乡低保的残疾人。",
          "护理补贴：一级、二级且需长期照护。",
          "可同时申领两项；特困供养、工伤护理费不享受两项补贴。",
          "文号赣府发〔2015〕63号，共青城市民政局网站公开全文。",
        ],
        eligibility:
          "具有江西省户籍、持有效残疾人证，并符合赣府发〔2015〕63号及后续提标、市县扩面规定的残疾人。",
        howToApply:
          "向户籍地乡镇（街道）申请，资金通过惠民惠农一卡通发放。",
        body: "江西省人民政府《关于印发江西省困难残疾人生活补贴和重度残疾人护理补贴制度实施办法的通知》（赣府发〔2015〕63号，2015年12月29日）。共青城市人民政府网公开全文。现行元/月见赣府发〔2025〕5号及县市公示专条。",
        sourceName: "江西省人民政府（共青城市政府网公开）",
        sourceUrl:
          "https://www.gongqing.gov.cn/mzj/fdzdgknr_187053/fgzc/zcwj/202105/t20210503_4920859.html",
        docNo: "赣府发〔2015〕63号",
        issuedAt: "2015-12-29",
        effectiveAt: "2016-01-01",
      }),
      localSubsidy({
        id: "jx-subsidy-2025",
        code: "JX",
        name: "江西省",
        title: "江西省困难残疾人生活补贴和重度残疾人护理补贴标准",
        shortTitle: "江西两项补贴110元",
        summary:
          "赣府发〔2025〕5号：自2025年1月起，全省困难残疾人生活补贴和重度残疾人护理补贴均由100元提高到110元/人/月。黎川县人民政府2026年6月统计表、龙南县人民政府2026年4月公开仍按此标准执行。",
        keyPoints: [
          "生活补贴110元/人/月。",
          "护理补贴110元/人/月。",
          "2025年1月起。2026年县市公示仍见此标准，是否再调请核省民政厅。",
        ],
        eligibility:
          "江西省符合两项补贴条件的持证残疾人，对象范围以省、市县文件为准。",
        howToApply: "向户籍地乡镇申请，资金通过惠民惠农一卡通发放。",
        body: "来源：黎川县人民政府网《2026年06月黎川县残疾人两项补贴发放统计表（城镇）》（2026年6月16日）引用《江西省人民政府关于印发2025年民生实事安排方案的通知》（赣府发〔2025〕5号）。龙南县人民政府网2026年4月公开困难残疾人生活补贴、重度残疾人护理补贴均为每人每月110元，与此一致。",
        sourceName: "黎川县人民政府（引赣府发〔2025〕5号）",
        sourceUrl:
          "https://www.jxlcx.gov.cn/art/2026/6/16/art_27845_4455077.html",
        docNo: "赣府发〔2025〕5号",
        issuedAt: "2025-01",
        effectiveAt: "2025-01-01",
      }),
      localEmployment({
        id: "jx-employment-three-year",
        code: "JX",
        name: "江西省",
        title: "江西省促进残疾人就业三年行动方案（2025—2027年）",
        shortTitle: "江西就业三年行动",
        summary:
          "江西省人民政府办公厅印发三年行动方案，落实国办发〔2025〕23号。目标：2025—2027年全省城乡新增残疾人就业不低于2万人。加大职业技能培训和就业创业扶持。",
        keyPoints: [
          "实施期2025—2027年，城乡新增就业不低于2万人。",
          "落实就业创业扶持和职业技能培训。",
          "按比例就业和残保金仍按国家和省办法，比例不低于1.5%。",
        ],
        eligibility: "江西省有就业需求的持证残疾人；在赣用人单位。",
        howToApply: "个人到残联就业服务机构和公共就业服务机构登记。",
        body: "江西省人民政府办公厅关于印发《江西省促进残疾人就业三年行动方案（2025—2027年）》的通知。兴国县政府信息公开网2026年1月20日转载。",
        sourceName: "江西省人民政府办公厅（兴国县政府网转载）",
        sourceUrl:
          "https://www.xingguo.gov.cn/xgxxxgk/cssq6002/202601/983dd308c5e341c08cb5e29507a0b8cd.shtml",
        docNo: "江西省促进残疾人就业三年行动方案",
        issuedAt: "2026-01",
        effectiveAt: "2025",
      }),
      localEmployment({
        id: "jx-employment-fund-2019",
        code: "JX",
        name: "江西省",
        title: "江西省残疾人就业保障金征收使用管理实施办法",
        shortTitle: "江西残保金1.5%",
        summary:
          "江西省财政厅公开《江西省残疾人就业保障金征收使用管理实施办法》（赣财非税〔2019〕3号）：用人单位未达在职职工总数1.5%的，应当缴纳残保金。每年3—4月份为安排残疾人就业申报审核期。分档减缴按财政部公告2023年第8号。",
        keyPoints: [
          "安排比例1.5%。",
          "文号赣财非税〔2019〕3号。",
          "申报审核期一般为每年3—4月。",
        ],
        eligibility: "在江西省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "江西省财政厅网站公开《江西省残疾人就业保障金征收使用管理实施办法》。财政厅现行有效规范性文件目录列赣财非税〔2019〕3号。",
        sourceName: "江西省财政厅",
        sourceUrl:
          "https://jxf.jiangxi.gov.cn/jxsczt/gfxwj/content/content_1985597047802630144.html",
        docNo: "赣财非税〔2019〕3号",
        issuedAt: "2019-01-23",
        effectiveAt: "2019",
      }),
      localEmployment({
        id: "jx-employment-tax-2026",
        code: "JX",
        name: "江西省",
        title: "江西省财政拨款用人单位残保金改由税务部门征收（2026年）",
        shortTitle: "江西财政拨款残保金改税务征",
        summary:
          "省财政厅、省税务局、省残联通知：自2026年1月1日起，各级财政拨款的机关、团体、事业单位残保金征收职能由同级残联调整至同级税务部门。残联继续负责按比例就业联网认证。永修县财政局2026年1月4日转发。",
        keyPoints: [
          "2026年1月1日起，财政拨款单位残保金改由税务部门征收。",
          "机关、团体、事业单位适用。",
          "按比例就业联网认证仍由残联办理。",
        ],
        eligibility:
          "江西省财政拨款的机关、团体、事业单位。企业等非财政拨款单位仍按原税务征收渠道。",
        howToApply: "先完成联网认证，再向主管税务机关申报缴纳残保金。",
        body: "江西省财政厅、国家税务总局江西省税务局、江西省残疾人联合会关于残保金征收职能调整的通知。省财政厅政策解读栏目公开：为实现征收主体统一，自2026年1月1日起财政拨款用人单位残保金改由同级税务部门征收。永修县人民政府网2026年1月4日转发同口径。",
        sourceName: "江西省财政厅；永修县人民政府（转发）",
        sourceUrl:
          "https://www.yongxiu.gov.cn/bmxzxxgk/bmgk/czj/fgzc/zcwj/202601/t20260104_7140036.html",
        docNo: "江西省残保金征收职能调整通知（2026年1月1日起）",
        issuedAt: "2025-12",
        effectiveAt: "2026-01-01",
      }),
    ],
  },
  HB: {
    implementingUrl: "http://www.hbdpf.org.cn/gk/gfwj/flfg/161202.htm",
    implementingIssued: "2015-12-26（鄂政办发〔2015〕96号，2016-01-01施行）",
    subsidyUrl:
      "http://www.shiyan.gov.cn/fw/ztfw/shfl_105864/cjrfl/wjtz/202604/t20260403_4918451.shtml",
    subsidyPoints: [
      "鄂政办发〔2015〕96号：生活补贴对象为低保家庭残疾人；护理补贴对象为一、二级需长期照护重度残疾人。",
      "省民政厅、财政厅、残联调整方案：自2026年1月1日起，生活补贴110元/人/月，护理补贴125元/人/月。",
    ],
    employmentUrl:
      "https://www.hbdaye.gov.cn/zfxxgk/fdgknr/gysyjs/shbz/202303/t20230329_1001750.html",
    employmentNote:
      "鄂财法规〔2017〕11号、省政府令第334号：安排比例不低于1.5%。年缴纳额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资。安排1名持证一、二级残疾人或残疾军人证1—3级的，按2人计算。工资不低于当地最低工资并足额缴社保、签一年以上合同的才计入。",
    extraPolicies: [
      localSubsidy({
        id: "hb-subsidy-rule-2015",
        code: "HB",
        name: "湖北省",
        title: "湖北省全面建立残疾人两项补贴制度实施意见",
        shortTitle: "湖北两项补贴鄂政办发96号",
        summary:
          "鄂政办发〔2015〕96号：自2016年1月1日起全面实施。生活补贴对象为低保家庭残疾人；护理补贴对象为一、二级需长期照护重度残疾人。制度起点生活50元/月、护理100元/月，之后按动态调整。",
        keyPoints: [
          "生活补贴：低保家庭中的残疾人。",
          "护理补贴：一、二级且需要长期照护的重度残疾人。",
          "可同时申领两项；特困供养、工伤护理费不享受两项补贴。",
          "文号鄂政办发〔2015〕96号，省残联网站公开。",
        ],
        eligibility:
          "具有湖北省户籍、持有效残疾人证，并符合鄂政办发〔2015〕96号及后续调整方案的残疾人。",
        howToApply:
          "向户籍地街道办事处或乡镇政府受理窗口申请；也可按全国两项补贴信息系统办理。",
        body: "湖北省人民政府办公厅《关于全面建立困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（鄂政办发〔2015〕96号，2015年12月26日）。湖北省残联信息公开栏目公开全文。现行元/月见2026年调整方案专条。",
        sourceName: "湖北省残疾人联合会（引鄂政办发〔2015〕96号）",
        sourceUrl: "http://www.hbdpf.org.cn/gk/gfwj/flfg/161202.htm",
        docNo: "鄂政办发〔2015〕96号",
        issuedAt: "2015-12-26",
        effectiveAt: "2016-01-01",
      }),
      localSubsidy({
        id: "hb-subsidy-2026",
        code: "HB",
        name: "湖北省",
        title: "湖北省困难残疾人生活补贴和重度残疾人护理补贴标准调整方案（2026年）",
        shortTitle: "湖北2026两项补贴提标",
        summary:
          "省民政厅、财政厅、残联印发调整方案：自2026年1月1日起，困难残疾人生活补贴提高到每人每月110元；重度残疾人护理补贴提高到每人每月125元。",
        keyPoints: [
          "生活补贴110元/人/月。",
          "护理补贴125元/人/月。",
          "自2026年1月1日起实施。",
          "提高部分由省与市县财政分级承担。",
        ],
        eligibility: "湖北省符合两项补贴条件的持证残疾人。",
        howToApply: "向户籍地乡镇街道或县民政申请；依托全国残疾人两项补贴信息系统办理。",
        body: "湖北省民政厅、财政厅、残联《湖北省困难残疾人生活补贴标准、重度残疾人护理补贴标准调整方案》（2026年3月25日印发）。十堰市委市政府门户网站2026年4月3日公开。省委、省政府批准。",
        sourceName: "湖北省民政厅、财政厅、残联（十堰市政府网公开）",
        sourceUrl:
          "http://www.shiyan.gov.cn/fw/ztfw/shfl_105864/cjrfl/wjtz/202604/t20260403_4918451.shtml",
        docNo: "湖北省两项补贴标准调整方案（2026年1月1日起）",
        issuedAt: "2026-03-25",
        effectiveAt: "2026-01-01",
      }),
      localEmployment({
        id: "hb-employment-three-year",
        code: "HB",
        name: "湖北省",
        title: "湖北省促进残疾人创业就业三年行动方案",
        shortTitle: "湖北就业三年行动",
        summary:
          "湖北省人民政府办公厅印发促进残疾人创业就业三年行动方案，落实国办发〔2025〕23号，部署机关事业单位带头安排就业等行动。残保金仍按鄂财法规〔2017〕11号1.5%计征。",
        keyPoints: [
          "落实国办发〔2025〕23号。",
          "机关、事业单位带头安排残疾人就业。",
          "残保金比例1.5%，税务机关征收。",
        ],
        eligibility: "湖北省有就业需求的持证残疾人；在鄂用人单位。",
        howToApply:
          "个人到残联就业服务机构和公共就业服务平台登记。单位按年审和税务申报通知办理。",
        body: "湖北省人民政府办公厅关于印发《湖北省促进残疾人创业就业三年行动方案》的通知，省政府门户2026年4月22日公开。征收办法见鄂财法规〔2017〕11号。",
        sourceName: "湖北省人民政府办公厅",
        sourceUrl:
          "https://www.hubei.gov.cn/zfwj/ezbf/202604/t20260422_5920601.shtml",
        docNo: "湖北省促进残疾人创业就业三年行动方案",
        issuedAt: "2026-04",
        effectiveAt: "2025",
      }),
    ],
  },
  JS: {
    planUrl:
      "https://www.jiangsu.gov.cn/art/2021/10/15/art_46144_10075133.html",
    planIssued: "2021-09-25（苏政办发〔2021〕82号）",
    rehabUrl:
      "https://www.jiangsu.gov.cn/art/2018/10/30/art_46143_7856295.html",
    rehabAgeNote:
      "苏政发〔2018〕129号：本省户籍经评估有康复训练适应指征的0—6周岁残疾儿童；7—14周岁肢体残疾、孤独症儿童；人工耳蜗手术救助年龄可放宽到7—14周岁。有条件地区可放宽。救助经费标准由县级以上政府确定并动态调整。",
    implementingUrl:
      "http://mzt.jiangsu.gov.cn/art/2023/1/31/art_78615_10848067.html",
    implementingIssued: "2022-12-26（苏民规〔2022〕4号，2023-04-01施行）",
    subsidyUrl:
      "http://mzt.jiangsu.gov.cn/art/2023/1/31/art_78615_10848067.html",
    subsidyPoints: [
      "苏民规〔2022〕4号：护理补贴城镇、农村分别按不低于130、90元/月·人发放，逐步统一城乡标准。",
      "生活补贴按当地低保标准分档：低保家庭内重度30%－40%、非重度25%；低保外无固定收入智力/肢体/精神/视力重度按低保标准100%；一户多残、依老养残（家庭人均收入在低保标准2倍以内）不低于低保标准60%。",
      "自2023年4月1日起施行，有效期5年。具体元/月以户籍地低保标准和市县细则为准。",
    ],
    employmentUrl:
      "https://jiangsu.chinatax.gov.cn/art/2021/6/11/art_8774_348913.html",
    employmentNote:
      "苏财综〔2017〕2号：安排比例未达1.5%的缴纳残保金。应缴额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资\xD7征收比例。分档减缴按国家公告。",
    extraPolicies: [
      localSubsidy({
        id: "js-subsidy-rule-2022",
        code: "JS",
        name: "江苏省",
        title: "江苏省完善残疾人两项补贴制度实施意见",
        shortTitle: "江苏两项补贴苏民规4号",
        summary:
          "苏民规〔2022〕4号：明确生活补贴对象分档与护理补贴城乡托底标准。护理补贴城镇不低于130元/月·人、农村不低于90元/月·人。自2023年4月1日起施行。",
        keyPoints: [
          "护理补贴：城镇不低于130元/月·人，农村不低于90元/月·人。",
          "生活补贴与当地低保标准挂钩分档发放（详见省实施意见）。",
          "可同时申领两项补贴；特困供养、工伤护理费不享受两项补贴。",
          "文号苏民规〔2022〕4号，省民政厅网站公开全文。",
        ],
        eligibility:
          "具有本地户籍、持有效残疾人证，并符合苏民规〔2022〕4号对象范围与政策衔接规定的残疾人。",
        howToApply:
          "向户籍地乡镇（街道）一门受理窗口或政务服务平台申请；支持跨省通办、全程网办。",
        body: "江苏省民政厅、财政厅、残联《关于完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（苏民规〔2022〕4号）。省民政厅规范性文件栏目与省政府公报同步公开。生活补贴金额随当地低保标准浮动，本条不锁死各地具体元/月。",
        sourceName: "江苏省民政厅、财政厅、残联",
        sourceUrl:
          "http://mzt.jiangsu.gov.cn/art/2023/1/31/art_78615_10848067.html",
        docNo: "苏民规〔2022〕4号",
        issuedAt: "2022-12-26",
        effectiveAt: "2023-04-01",
      }),
      localEmployment({
        id: "js-employment-fund-2017",
        code: "JS",
        name: "江苏省",
        title: "江苏省残疾人就业保障金征收使用管理办法",
        shortTitle: "江苏残保金1.5%",
        summary:
          "苏财综〔2017〕2号：本省用人单位安排残疾人就业比例1.5%。税务部门公开的征缴通告沿用该公式，并叠加国家分档征收比例。",
        keyPoints: [
          "安排比例1.5%。",
          "公式含征收比例，分档减缴按财政部公告2023年第8号。",
          "个人求职到残联就业服务机构登记。",
        ],
        eligibility: "在江苏省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构或公共就业服务平台登记。",
        body: "江苏省财政厅、地税局、残联《江苏省残疾人就业保障金征收使用管理办法》（苏财综〔2017〕2号）。国家税务总局江苏省税务局灌云县2021年征缴通告完整引用该文公式。",
        sourceName: "国家税务总局江苏省税务局（引苏财综〔2017〕2号）",
        sourceUrl:
          "https://jiangsu.chinatax.gov.cn/art/2021/6/11/art_8774_348913.html",
        docNo: "苏财综〔2017〕2号",
        issuedAt: "2017",
        effectiveAt: "2017",
      }),
      localEmployment({
        id: "js-employment-overquota",
        code: "JS",
        name: "江苏省",
        title: "江苏省按比例就业补贴与超比例奖励（设区市公开口径）",
        shortTitle: "江苏达比例2倍超比例4倍",
        summary:
          "无锡市残联2026年通告、常州市政府网2025年3月访谈、苏州高新区2023年通知均写明：达比例每安置1人，每人每年不低于上年度当地月最低工资的2倍；超比例每安置1人，不低于4倍（不重复享受达比例补贴）。是否全省统一文件，请核省残联。",
        keyPoints: [
          "达比例补贴：不低于月最低工资\xD72。",
          "超比例奖励：不低于月最低工资\xD74。",
          "无锡、常州、苏州高新区公开口径一致。",
        ],
        eligibility:
          "在江苏省按比例或超比例安排残疾人的用人单位，具体以所在市残联通知为准。",
        howToApply: "向税务登记地残联就业服务机构按当年通知申请。",
        body: "口径来源：无锡市残联2026年2月27日联网认证通告；常州市政府网2025年3月25日在线访谈；苏州高新区2023年度申报通知。残保金计征仍按苏财综〔2017〕2号1.5%。",
        sourceName: "无锡市残联、常州市人民政府、苏州高新区",
        sourceUrl: "https://cl.wuxi.gov.cn/doc/2026/02/27/4738091.shtml",
        docNo: "江苏设区市达比例超比例奖补公开口径",
        issuedAt: "2026",
        effectiveAt: "2026",
      }),
      localEmployment({
        id: "js-employment-audit-2026",
        code: "JS",
        name: "江苏省",
        title: "江苏省2026年按比例安排残疾人就业联网认证",
        shortTitle: "江苏2026年审3—10月",
        summary:
          "江苏省残联2026年2月28日通知：本省行政区域内2025年度已安排残疾人就业的用人单位，2026年联网认证时间为3月1日至10月31日。登录江苏省政务服务网搜索「全国残疾人按比例就业情况联网认证」办理。",
        keyPoints: [
          "2026年认证窗口：3月1日—10月31日。",
          "对象：2025年度已安排残疾人就业的用人单位。",
          "安排比例仍按苏财综〔2017〕2号1.5%。",
        ],
        eligibility:
          "江苏省2025年度已安排残疾人就业的机关、团体、企事业单位、社会服务机构。",
        howToApply:
          "登录江苏省政务服务网，搜索「全国残疾人按比例就业情况联网认证」，选择所属辖区在线办理。",
        body: "江苏省残疾人联合会《关于开展2026年按比例安排残疾人就业情况联网认证工作的通知》（2026年2月28日）。市残联达比例、超比例奖补仍按各地当年通知。",
        sourceName: "江苏省残疾人联合会",
        sourceUrl:
          "https://www.jscl.gov.cn/html/category/TZGG/article/ee70531e1c304241810bcba2aee50bd9.html",
        docNo: "江苏省残联2026年联网认证通知",
        issuedAt: "2026-02-28",
        effectiveAt: "2026-03-01",
      }),
    ],
  },
  SC: {
    implementingUrl:
      "http://mzt.sc.gov.cn/scmzt/xzgfxwj2023/2024/7/1/23ba46f969f5427e875f41c79c0c62f6.shtml",
    implementingIssued: "2024-07-01（川民规〔2024〕1号）",
    subsidyUrl:
      "http://mzt.sc.gov.cn/scmzt/zcjd2023/2024/7/1/c53e8ebf27144f4492e8e727e56f9d30.shtml",
    subsidyPoints: [
      "川民规〔2024〕1号：加强两项补贴精准管理与政策衔接，落实国发〔2015〕52号、民发〔2021〕70号、民发〔2022〕79号及川民发〔2015〕195号衔接规定。",
      "省民政厅政策解读口径：困难残疾人生活补贴100元/人/月；一、二级重度护理补贴分别为110元、80元/人/月（解读载明截至提标后现行标准）。市县可另有提标。",
    ],
    employmentUrl:
      "https://www.jzg.gov.cn/jzgrmzf/c100053/202301/70dbb837d4944d77a2a3ed824d7dcf26.shtml",
    employmentNote:
      "川财规〔2021〕5号：四川省安排残疾人就业比例不得低于在职职工总数1.6%（高于国家1.5%底线）。川财规〔2026〕2号延长该实施办法有效期。未达标缴纳残保金。",
    extraPolicies: [
      localSubsidy({
        id: "sc-subsidy-precise-2024",
        code: "SC",
        name: "四川省",
        title: "四川省进一步加强残疾人两项补贴精准管理的实施意见",
        shortTitle: "四川两项补贴川民规1号",
        summary:
          "川民规〔2024〕1号：强化政策宣传、政策衔接、数据比对与动态复核。省民政厅解读载明现行省定生活补贴100元/月，一、二级护理补贴110元、80元/月。",
        keyPoints: [
          "严格落实国发〔2015〕52号、民发〔2021〕70号、民发〔2022〕79号及川民发〔2015〕195号衔接规定。",
          "重度护理补贴与老年人护理补贴不得重复，可择高。",
          "解读载明省定标准：生活100元；护理一级110元、二级80元。",
          "文号川民规〔2024〕1号，省民政厅规范性文件库公开。",
        ],
        eligibility:
          "具有四川省户籍、持有效残疾人证，并符合川民发〔2015〕195号及川民规〔2024〕1号规定的残疾人。",
        howToApply:
          "向户籍地乡镇（街道）民政窗口申请，或通过全国残疾人两项补贴信息系统办理。",
        body: "四川省民政厅、财政厅、残联《关于进一步加强残疾人两项补贴精准管理的实施意见》（川民规〔2024〕1号，省民政厅网站2024年7月1日公开）。金额口径引自同日政策解读对既往提标文件的汇总表述，市县提标以当地公示为准。",
        sourceName: "四川省民政厅、财政厅、残联",
        sourceUrl:
          "http://mzt.sc.gov.cn/scmzt/xzgfxwj2023/2024/7/1/23ba46f969f5427e875f41c79c0c62f6.shtml",
        docNo: "川民规〔2024〕1号",
        issuedAt: "2024-07-01",
        effectiveAt: "2024-07-01",
      }),
      localEmployment({
        id: "sc-employment-fund-2021",
        code: "SC",
        name: "四川省",
        title: "四川省残疾人就业保障金征收使用管理实施办法",
        shortTitle: "四川残保金1.6%",
        summary:
          "川财规〔2021〕5号：本省用人单位安排残疾人就业比例不得低于在职职工总数1.6%。川财规〔2026〕2号延长该办法有效期。九寨沟县政府网公开的县实施办法第五条转引省1.6%口径。",
        keyPoints: [
          "安排比例1.6%，高于国家1.5%底线。",
          "达不到比例须缴残保金。",
          "2026年省财政厅、税务局、残联发文延长办法有效期。",
        ],
        eligibility: "在四川省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位向残联申报就业情况后向税务机关缴纳。个人到残联就业服务机构登记。",
        body: "四川省残疾人就业保障金征收使用管理实施办法（川财规〔2021〕5号）。九寨沟县人民政府网《九寨沟县残疾人就业保障金征收使用管理实施办法》第五条转引省比例1.6%。四川省残联公开川财规〔2026〕2号《关于延长〈四川省残疾人就业保障金征收使用管理实施办法〉有效期的通知》。",
        sourceName: "九寨沟县人民政府（引川财规〔2021〕5号）",
        sourceUrl:
          "https://www.jzg.gov.cn/jzgrmzf/c100053/202301/70dbb837d4944d77a2a3ed824d7dcf26.shtml",
        docNo: "川财规〔2021〕5号",
        issuedAt: "2021",
        effectiveAt: "2021",
      }),
      localEmployment({
        id: "sc-employment-audit-2026",
        code: "SC",
        name: "四川省",
        title: "四川省2026年按比例就业联网认证",
        shortTitle: "四川2026年审3—10月",
        summary:
          "四川省残联官网2026年2月27日公告：开展全省按比例就业联网认证。安排比例仍为川财规〔2021〕5号的1.6%。成都市残联同步口径为3月1日至10月31日，登录四川省政务服务网选择税务登记地残联办理。",
        keyPoints: [
          "省残联2026年2月27日发联网认证公告。",
          "安排比例1.6%。",
          "成都公开窗口：3月1日—10月31日。",
        ],
        eligibility: "四川省2025年度安排有残疾人就业的用人单位。",
        howToApply:
          "登录四川省政务服务网，进入税务登记地区（市）县残联服务网页，选择「全国残疾人按比例就业情况联网认证」。也可到县残联就业服务机构窗口。",
        body: "四川省残疾人联合会官网《2026年四川省残疾人按比例就业联网认证公告》（2026年2月27日，scdpf.org.cn）。成都市窗口见市残联对外口径：3月1日至10月31日。",
        sourceName: "四川省残疾人联合会",
        sourceUrl:
          "http://www.scdpf.org.cn/zwgk/tzgg/202602/t20260227_32409.html",
        docNo: "四川省残联2026年联网认证公告",
        issuedAt: "2026-02-27",
        effectiveAt: "2026-03-01",
      }),
    ],
  },
  TJ: {
    implementingUrl:
      "https://mz.tj.gov.cn/ZWGK5878/ZCFG9602/zcwj/202307/t20230720_6358070.html",
    implementingIssued: "2023（津民发〔2023〕23号）",
    subsidyUrl: "https://www.tj.gov.cn/zwgk/zcjd/zcwd/mzsw/cjrlxbt/",
    subsidyPoints: [
      "津民发〔2023〕23号：生活补贴对象为本市户籍低保、低保边缘家庭持证残疾人；护理补贴对象为一、二级重度残疾人。可同时申领两项。",
      "天津政务网政策问答（市民政局口径）：重度困难生活补贴300元/人/月，非重度困难生活补贴160元/人/月，重度护理补贴200元/人/月。",
    ],
    employmentUrl: "http://www.tjdpf.org.cn/system/2026/02/25/030095692.shtml",
    employmentNote:
      "津财规〔2021〕15号：安排比例低于1.5%须缴残保金。市残联2026年联网认证窗口为3月1日至10月31日。市税务局2025年征收2024年度残保金的申报期为9月25日至10月31日，征收上限按本市职工年平均工资2倍。",
    extraPolicies: [
      localSubsidy({
        id: "tj-subsidy-rule-2023",
        code: "TJ",
        name: "天津市",
        title: "天津市进一步完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见",
        shortTitle: "天津两项补贴津民发23号",
        summary:
          "津民发〔2023〕23号：明确对象范围、政策衔接与动态调整。生活补贴覆盖低保、低保边缘家庭持证残疾人；护理补贴覆盖一、二级重度残疾人。现行元/月见市政务网问答专条。",
        keyPoints: [
          "生活补贴：本市户籍低保、低保边缘家庭中的持证残疾人。",
          "护理补贴：本市户籍一、二级重度残疾人。",
          "可同时申领两项；与因公致残等福利性补贴择高，与居家养老服务补贴、高龄津贴可叠加等衔接见意见。",
          "文号津民发〔2023〕23号，市民政局网站公开。",
        ],
        eligibility:
          "具有天津市户籍、持有效残疾人证，并符合津民发〔2023〕23号对象范围与政策衔接规定的残疾人。",
        howToApply:
          "向街道乡镇社会救助窗口申请，或通过津心办、民政通等线上渠道办理。",
        body: "天津市民政局、财政局、残联《关于进一步完善我市困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（津民发〔2023〕23号）。市民政局政务公开栏目公开。河北区2025年12月一卡通政策清单仍列该文为两项补贴依据。现行元/月见天津政务网问答。",
        sourceName: "天津市民政局、财政局、残联",
        sourceUrl:
          "https://mz.tj.gov.cn/ZWGK5878/ZCFG9602/zcwj/202307/t20230720_6358070.html",
        docNo: "津民发〔2023〕23号",
        issuedAt: "2023",
        effectiveAt: "2023",
      }),
      localSubsidy({
        id: "tj-subsidy-standard",
        code: "TJ",
        name: "天津市",
        title: "天津市困难残疾人生活补贴和重度残疾人护理补贴标准",
        shortTitle: "天津两项补贴300/160/200",
        summary:
          "天津政务网转市民政局口径：困难残疾人生活补贴中，重度困难每人每月300元，非重度困难每人每月160元；重度残疾人护理补贴每人每月200元。",
        keyPoints: [
          "重度困难生活补贴300元/人/月。",
          "非重度困难生活补贴160元/人/月。",
          "重度护理补贴200元/人/月。",
          "政策依据津民发〔2023〕23号。",
        ],
        eligibility:
          "天津市符合津民发〔2023〕23号两项补贴条件的持证残疾人。",
        howToApply:
          "向街道乡镇社会救助窗口或津心办等渠道申请。",
        body: "天津政务网《残疾人两项补贴》政策问答栏目公开市民政局口径：重度困难生活补贴300元/人/月，非重度困难160元/人/月，重度护理补贴200元/人/月。市民政局2024年10月问答专题同口径。是否2026年再调，请核市民政局最新通知。",
        sourceName: "天津政务网（转市民政局）",
        sourceUrl: "https://www.tj.gov.cn/zwgk/zcjd/zcwd/mzsw/cjrlxbt/",
        docNo: "津民发〔2023〕23号（标准口径）",
        issuedAt: "2024-10",
        effectiveAt: "以市民政局现行口径为准",
      }),
      localEmployment({
        id: "tj-employment-fund-2020",
        code: "TJ",
        name: "天津市",
        title: "天津市残疾人就业保障金征收使用管理实施办法",
        shortTitle: "天津残保金1.5%",
        summary:
          "津地税货劳〔2016〕8号、津财综〔2020〕10号修订：安排比例1.5%。申报缴纳期一般为每年7月1日至9月30日。市残联网站公开该办法。",
        keyPoints: [
          "安排比例1.5%。",
          "申报期一般为每年7月1日—9月30日，以税务和残联通告为准。",
          "计入人数须签一年以上合同且工资不低于最低工资。",
        ],
        eligibility: "在天津市注册的用人单位；在本市求职的持证残疾人。",
        howToApply:
          "先经残疾人就业服务机构审核，再向税务机关申报缴纳。个人到残联就业服务机构登记。",
        body: "天津市残联网站公开《天津市残疾人就业保障金征收使用管理实施办法》（津地税货劳〔2016〕8号，津财综〔2020〕10号修订）。自2021年10月1日起施行，有效期5年。",
        sourceName: "天津市残疾人联合会",
        sourceUrl: "http://www.tjdpf.org.cn/system/2022/07/04/030050208.shtml",
        docNo: "津财综〔2020〕10号",
        issuedAt: "2020",
        effectiveAt: "2021-10-01",
      }),
      localEmployment({
        id: "tj-employment-fund-2021",
        code: "TJ",
        name: "天津市",
        title:
          "天津市残疾人就业保障金征收使用管理实施办法（津财规〔2021〕15号）",
        shortTitle: "天津残保金津财规2021",
        summary:
          "市税务局2025年第5号通告引用津财规〔2021〕15号。2024年度残保金申报缴纳时限为2025年9月25日至10月31日。征收标准上限按2024年度本市职工年平均工资的2倍计算。安排比例仍为1.5%。",
        keyPoints: [
          "现行办法文号津财规〔2021〕15号。",
          "2025年申报期：9月25日—10月31日（征收2024年度）。",
          "征收上限：本市职工年平均工资2倍。",
        ],
        eligibility: "在天津市注册的用人单位。",
        howToApply:
          "向税务登记或扣缴税款登记所在地税务机关申报缴纳。已安排就业的须先完成联网认证。",
        body: "国家税务总局天津市税务局《关于2025年用人单位申报缴纳残疾人就业保障金工作安排的通告》（2025年第5号，2025年9月24日）。依据津财规〔2021〕15号。",
        sourceName: "国家税务总局天津市税务局",
        sourceUrl:
          "https://tianjin.chinatax.gov.cn/11255000000/0100/010003/20250924085032118.shtml",
        docNo: "津财规〔2021〕15号",
        issuedAt: "2021",
        effectiveAt: "2021",
      }),
      localEmployment({
        id: "tj-employment-audit-2026",
        code: "TJ",
        name: "天津市",
        title: "天津市2026年按比例就业联网认证",
        shortTitle: "天津2026年审3—10月",
        summary:
          "天津市残联2026年2月通告：2026年联网认证时间为3月1日至10月31日。登录天津网上办事大厅「跨省通办」办理。未在期限内申报的，视为未安排残疾人就业，由税务机关征收残保金。劳务派遣计入按津残联〔2024〕41号。",
        keyPoints: [
          "2026年认证窗口：3月1日—10月31日。",
          "天津网上办事大厅跨省通办。",
          "逾期视为未安排就业。",
        ],
        eligibility:
          "天津市2025年度安排有残疾人就业的机关、团体、企事业单位和民办非企业。",
        howToApply:
          "天津网上办事大厅→特色服务→跨省通办→全国残疾人按比例就业情况联网认证。也可到区残疾人就业服务机构窗口。",
        body: "天津市残疾人联合会《关于开展2026年残疾人按比例就业情况联网认证工作的通告》（2026年2月25日）。引用津财规〔2021〕15号、津残联〔2024〕41号。",
        sourceName: "天津市残疾人联合会",
        sourceUrl: "http://www.tjdpf.org.cn/system/2026/02/25/030095692.shtml",
        docNo: "天津市残联2026年联网认证通告",
        issuedAt: "2026-02-25",
        effectiveAt: "2026-03-01",
      }),
    ],
  },
  NM: {
    implementingUrl:
      "http://www.npc.gov.cn/npc/c1773/c1849/c6680/c18674/c18676/201905/t20190522_51944.html",
    implementingIssued: "2012-03-31修订通过，2012-05-01施行（内蒙古自治区实施《中华人民共和国残疾人保障法》办法，中国人大网公开文本）",
    employmentUrl:
      "https://www.xlgl.gov.cn/xlgl/zw/zwgk/rdhy/2023061917314048259/index.html",
    employmentNote:
      "内财非税规〔2018〕9号：自治区行政区域内用人单位未达在职职工总数1.5%比例安排残疾人就业的，应缴纳残保金。内残联发〔2024〕20号明确审核征收分工。超比例奖励见内残联发〔2024〕36号（当地月最低工资5倍）。",
    extraPolicies: [
      localEmployment({
        id: "nm-employment-fund-2018",
        code: "NM",
        name: "内蒙古自治区",
        title: "内蒙古自治区残疾人就业保障金征收使用管理实施办法",
        shortTitle: "内蒙古残保金1.5%",
        summary:
          "内财非税规〔2018〕9号：安排比例1.5%。锡林郭勒盟行政公署、通辽经济技术开发区政府网解读均引用该办法。",
        keyPoints: [
          "安排比例1.5%。",
          "未达标向税务机关缴纳残保金。",
          "分档减缴按财政部公告2023年第8号。",
        ],
        eligibility: "在内蒙古注册的用人单位；在自治区求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "《内蒙古自治区残疾人就业保障金征收使用管理实施办法》（内财非税规〔2018〕9号）。锡林郭勒盟行政公署2021年征缴通知引用该文号。通辽经济技术开发区管委会2025年12月政策解读重申自治区1.5%比例。",
        sourceName: "锡林郭勒盟行政公署（引内财非税规〔2018〕9号）",
        sourceUrl:
          "https://www.xlgl.gov.cn/xlgl/zw/zwgk/rdhy/2023061917314048259/index.html",
        docNo: "内财非税规〔2018〕9号",
        issuedAt: "2018",
        effectiveAt: "2018",
      }),
      localEmployment({
        id: "nm-employment-overquota-2025",
        code: "NM",
        name: "内蒙古自治区",
        title: "内蒙古自治区超比例安排残疾人就业奖励办法（试行）",
        shortTitle: "内蒙古超比例最低工资5倍",
        summary:
          "包头市残联转载《内蒙古自治区超比例安排残疾人就业奖励办法（试行）》：安排人数超过在职职工总数1.5%（不含）且超出部分满1人的，每超额安排1人，每年按用人单位所在地月最低工资标准的5倍奖励。超比例人数=实际安排人数－在职职工人数\xD71.5%。每年申报截止6月30日。自2025年1月1日起施行。",
        keyPoints: [
          "超比例奖励：每超1人每年按当地月最低工资\xD75。",
          "申报截止每年6月30日，通过联网认证系统申请。",
          "自2025年1月1日起施行。",
        ],
        eligibility: "内蒙古自治区超比例安排残疾人就业的用人单位。",
        howToApply:
          "通过全国残疾人按比例就业情况联网认证系统线上申请。申报截止每年6月30日。",
        body: "包头市残疾人联合会网站转载《内蒙古自治区超比例安排残疾人就业奖励办法（试行）》。奖励资金原则上用于无障碍改造、专用设备和残疾人职工社保。次年由各级残疾人就业服务机构一次性发放。",
        sourceName: "包头市残疾人联合会（转自治区办法）",
        sourceUrl: "http://www.btcl.gov.cn/nd.jsp?fromColId=2&id=2859",
        docNo: "内蒙古自治区超比例安排残疾人就业奖励办法（试行）",
        issuedAt: "2025",
        effectiveAt: "2025-01-01",
      }),
    ],
  },
  HA: {
    implementingUrl: "https://public.zhongyuan.gov.cn/02Z/6078082.jhtml",
    implementingIssued: "2016-09-20（豫政〔2016〕60号，2016-01-01施行）",
    subsidyUrl: "https://public.zhongyuan.gov.cn/02Z/6078082.jhtml",
    subsidyPoints: [
      "豫政〔2016〕60号：河南省困难残疾人生活补贴和重度残疾人护理补贴实施办法。郑州市中原区政务公开办事指南列明该文及郑政办〔2016〕66号为实施依据。",
      "全省统一现行元/月未在本条锁死；请以省民政厅、市县公示为准。郑州中原区指南明确向街道窗口申请，承诺时限7个工作日。",
    ],
    employmentUrl: "https://fgw.henan.gov.cn/2021/01-05/2072521.html",
    employmentNote:
      "河南省规定安排比例为1.6%（高于国家1.5%底线）。省发展改革委2021年实施意见：分档征收时，安排比例1%（含）以上但低于我省规定比例1.6%的，按应缴费额50%缴纳。",
    extraPolicies: [
      localSubsidy({
        id: "ha-subsidy-rule-2016",
        code: "HA",
        name: "河南省",
        title: "河南省困难残疾人生活补贴和重度残疾人护理补贴实施办法",
        shortTitle: "河南两项补贴豫政60号",
        summary:
          "豫政〔2016〕60号：全面建立两项补贴制度。郑州市中原区建设路街道办事指南列明该办法及郑政办〔2016〕66号为实施依据，并公布申请材料与办理时限。本条不编造全省统一现行元/月。",
        keyPoints: [
          "制度文件：豫政〔2016〕60号。",
          "郑州配套：郑政办〔2016〕66号实施细则。",
          "申请材料含申请表、身份证、残疾人证、户口本；困难生活补贴另附低保证。",
          "中原区指南承诺时限7个工作日，结果银行发放。",
        ],
        eligibility:
          "具有河南省户籍、持有效残疾人证，并符合豫政〔2016〕60号及市县细则的残疾人。",
        howToApply:
          "向户籍地乡镇（街道）一门受理窗口申请。郑州中原区示例地址：建设西路100号院，咨询0371-67869553。",
        body: "河南省人民政府《关于印发河南省困难残疾人生活补贴和重度残疾人护理补贴实施办法的通知》（豫政〔2016〕60号）。郑州市中原区人民政府政务公开《困难残疾人生活补贴和重度残疾人护理补贴》办事指南（2021年11月25日）列明该文号。现行补贴金额以省民政厅和户籍地公示为准，本库不编造。",
        sourceName: "郑州市中原区人民政府（引豫政〔2016〕60号）",
        sourceUrl: "https://public.zhongyuan.gov.cn/02Z/6078082.jhtml",
        docNo: "豫政〔2016〕60号",
        issuedAt: "2016-09-20",
        effectiveAt: "2016-01-01",
      }),
      localEmployment({
        id: "ha-employment-fund-1.6",
        code: "HA",
        name: "河南省",
        title: "河南省残疾人按比例就业与残保金规定",
        shortTitle: "河南残保金1.6%",
        summary:
          "河南省发展改革委等8部门《关于完善残疾人就业保障金制度更好促进残疾人就业的实施意见》（豫发改价调〔2020〕1038号）：我省规定比例为1.6%。未达标缴纳残保金。分档减缴按国家公告，比较对象是省定1.6%而非1.5%。郑州市残联、税务局2026年2月26日公告仍引用该文号。",
        keyPoints: [
          "安排比例1.6%，高于国家1.5%底线。",
          "文号豫发改价调〔2020〕1038号。",
          "1%（含）以上未达1.6%的，按应缴费额50%缴纳（国家分档政策）。",
          "个人求职到残联就业服务机构登记。",
        ],
        eligibility: "在河南省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联联网认证后向税务机关申报。个人到残联就业服务机构登记。",
        body: "河南省发展和改革委员会网站公开《关于完善残疾人就业保障金制度更好促进残疾人就业的实施意见》（2021年1月5日），文中写明我省规定比例（1.6%）。郑州市残联、税务局2026年2月26日公告引用文号豫发改价调〔2020〕1038号。",
        sourceName: "河南省发展和改革委员会",
        sourceUrl: "https://fgw.henan.gov.cn/2021/01-05/2072521.html",
        docNo: "豫发改价调〔2020〕1038号",
        issuedAt: "2021-01",
        effectiveAt: "2021",
      }),
    ],
  },
  SN: {
    implementingUrl: "https://www.xyx.gov.cn/Content-1333280.html",
    implementingIssued: "2016-01-01（陕政发〔2016〕2号）",
    subsidyUrl: "https://www.xyx.gov.cn/Content-1333280.html",
    subsidyPoints: [
      "陕政发〔2016〕2号：生活补贴对象为低保家庭持证残疾人、非低保家庭中1—3级低收入及其他困难残疾人；护理补贴对象为1—2级需经常照护者。",
      "该意见载明：生活补贴18岁以下100元/月、18岁及以上60元/月；护理补贴一级120元/月、二级80元/月。有条件地方可提高；已高于者继续执行。现行元/月以市县公示为准。",
    ],
    employmentUrl:
      "http://www.weibin.gov.cn/col15477/col15480/col15503/col16841/202605/t20260529_1273875.html",
    employmentNote:
      "陕财办综〔2016〕85号：安排比例不得低于在职职工总数1.5%。年缴纳额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资。",
    extraPolicies: [
      localSubsidy({
        id: "sn-subsidy-rule-2016",
        code: "SN",
        name: "陕西省",
        title: "陕西省进一步完善残疾人两项补贴制度实施意见",
        shortTitle: "陕西两项补贴陕政发2号",
        summary:
          "陕政发〔2016〕2号：完善对象范围与标准。生活补贴分年龄档；护理补贴分一级/二级。补贴按季度发放。西安市实施细则等文件引用该文号。",
        keyPoints: [
          "生活补贴：低保家庭持证；非低保1—3级低收入及其他困难残疾人。",
          "护理补贴：1—2级且需要经常照护。",
          "意见载明标准：生活18岁以下100元、18岁及以上60元；护理一级120元、二级80元（可提高）。",
          "按季度现金发放；可同时申领两项。",
        ],
        eligibility:
          "具有陕西省户籍、持有效残疾人证，并符合陕政发〔2016〕2号及市县细则的残疾人。",
        howToApply:
          "向户籍地乡镇政府或街道办事处提交申请。现行标准以市县民政公示为准。",
        body: "陕西省人民政府《关于进一步完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（陕政发〔2016〕2号）。旬阳市政府网转载省政府意见全文；西安高新区公开的市实施细则引用该文号。本条锁定意见载明金额，不编造后续未核验的全省统一新标准。",
        sourceName: "陕西省人民政府（旬阳市政府网转载）",
        sourceUrl: "https://www.xyx.gov.cn/Content-1333280.html",
        docNo: "陕政发〔2016〕2号",
        issuedAt: "2016-01",
        effectiveAt: "2016-01-01",
      }),
      localEmployment({
        id: "sn-employment-fund-2016",
        code: "SN",
        name: "陕西省",
        title: "陕西省残疾人就业保障金征收使用管理实施办法",
        shortTitle: "陕西残保金1.5%",
        summary:
          "陕财办综〔2016〕85号：本省用人单位安排残疾人就业比例不得低于1.5%。宝鸡市渭滨区政府网2026年5月仍公开该办法全文口径。",
        keyPoints: [
          "安排比例1.5%。",
          "年缴纳额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资。",
          "分档减缴按财政部公告2023年第8号。",
        ],
        eligibility: "在陕西省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "陕西省财政厅、地方税务局、残联《关于印发〈陕西省残疾人就业保障金征收使用管理实施办法〉的通知》（陕财办综〔2016〕85号）。宝鸡市渭滨区人民政府网2026年5月29日转载。",
        sourceName: "宝鸡市渭滨区人民政府（引陕财办综〔2016〕85号）",
        sourceUrl:
          "http://www.weibin.gov.cn/col15477/col15480/col15503/col16841/202605/t20260529_1273875.html",
        docNo: "陕财办综〔2016〕85号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
    ],
  },
  JL: {
    planUrl:
      "http://jl.gov.cn/gb/2022/zb_202201/szfbgtwj/202201/t20220120_8381826.html",
    planIssued: "2021-09-30（吉政发〔2021〕20号，省政府公报全文）",
    rehabUrl:
      "http://xxgk.jl.gov.cn/szf/gkml/201812/t20181205_5350322.html",
    rehabAgeNote:
      "吉政发〔2018〕20号：具有吉林省户籍（或持有吉林省内居住证）、有康复需求的0—6岁视力、听力、言语、肢体、智力等残疾儿童和孤独症儿童；须已办理残疾人证或持具有诊断资质的县级以上医疗机构出具的医学诊断证明。自2018年10月1日起全面实施；补助标准与目录以省残联实施细则及当地执行为准。",
    employmentUrl:
      "http://jilin.chinatax.gov.cn/art/2025/9/17/art_23132_921627.html",
    employmentNote:
      "吉财税〔2016〕726号按差额人数和年平均工资计征。《吉林省残疾人保障条例》第三十条要求安排比例不低于1.6%。安置义务与残保金计征口径是否已统一，请核省残联、税务局当年解释。",
    subsidyUrl:
      "http://xxgk.jl.gov.cn/zcbm/fgw_97981/xxgkmlqy/202507/t20250703_9271906.html",
    subsidyPoints: [
      "吉民发〔2025〕26号：生活补贴由85元/人/月调整为99元/人/月，护理补贴由85元/人/月调整为93元/人/月，自2025年7月1日起执行。",
      "各地可在此基础上适当提高。市县是否上浮以当地公示为准。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "jl-subsidy-2025",
        code: "JL",
        name: "吉林省",
        title: "吉林省提高困难残疾人生活补贴和重度残疾人护理补贴标准",
        shortTitle: "吉林两项补贴99/93",
        summary:
          "吉民发〔2025〕26号：经省政府同意，生活补贴调整为每人每月99元，护理补贴调整为每人每月93元，自2025年7月1日起执行。各地可适当提高。",
        keyPoints: [
          "生活补贴99元/人/月（由85元上调）。",
          "护理补贴93元/人/月（由85元上调）。",
          "执行时间：2025年7月1日。",
          "文号：吉民发〔2025〕26号。",
        ],
        eligibility: "吉林省符合两项补贴条件的持证残疾人，对象范围以省实施意见和市县细则为准。",
        howToApply: "向户籍地乡镇街道申请。金额若当地已上浮，以当地民政公示为准。",
        body: "吉林省政府信息公开平台公开《吉林省民政厅 吉林省财政厅 吉林省残疾人联合会关于提高全省困难残疾人生活补贴和重度残疾人护理补贴标准的通知》（吉民发〔2025〕26号，成文2025年6月28日，发布2025年7月3日）。本条锁定省级标准，市县上浮请核当地文件。",
        sourceName: "吉林省民政厅、财政厅、残联",
        sourceUrl:
          "http://xxgk.jl.gov.cn/zcbm/fgw_97981/xxgkmlqy/202507/t20250703_9271906.html",
        docNo: "吉民发〔2025〕26号",
        issuedAt: "2025-06-28",
        effectiveAt: "2025-07-01",
      }),
      localEmployment({
        id: "jl-employment-fund-2016",
        code: "JL",
        name: "吉林省",
        title: "吉林省残疾人就业保障金征收使用管理办法",
        shortTitle: "吉林残保金1.5%",
        summary:
          "吉财税〔2016〕726号第七条：保障金年缴纳额按上年在职职工人数、安排比例和实际安排人数及年平均工资计算。国家税务总局吉林省税务局2025年9月17日公开解答引用该条。",
        keyPoints: [
          "安排比例执行1.5%。",
          "计征公式见吉财税〔2016〕726号第七条。",
          "分档减缴按财政部公告2023年第8号。",
        ],
        eligibility: "在吉林省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "吉林省财政厅、地税局、残联《关于印发〈吉林省残疾人就业保障金征收使用管理办法〉的通知》（吉财税〔2016〕726号）。国家税务总局吉林省税务局网站2025年9月17日「AI说税」栏目引用第七条。",
        sourceName: "国家税务总局吉林省税务局（引吉财税〔2016〕726号）",
        sourceUrl:
          "http://jilin.chinatax.gov.cn/art/2025/9/17/art_23132_921627.html",
        docNo: "吉财税〔2016〕726号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localEmployment({
        id: "jl-employment-ordinance",
        code: "JL",
        name: "吉林省",
        title: "吉林省残疾人保障条例（按比例就业）",
        shortTitle: "吉林安置比例1.6%",
        summary:
          "《吉林省残疾人保障条例》第三十条：用人单位应当按不低于在职职工总数1.6%的比例安排残疾人就业。安排一名盲人按两名计算。未达规定比例的，按国家和省有关规定缴纳残保金。长春市政府网2024年4月仍公开该条。残保金计征公式见吉财税〔2016〕726号。",
        keyPoints: [
          "安置义务比例1.6%。",
          "一名盲人按两名计算。",
          "残保金缴纳按国家和省规定办理。",
        ],
        eligibility: "在吉林省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "《吉林省残疾人保障条例》第三十条。长春市人民政府信息公开网2024年4月30日转载。本条例自2013年8月1日起施行。",
        sourceName: "长春市人民政府（转省条例）",
        sourceUrl:
          "http://zwgk.changchun.gov.cn/zcbm/scl_4030/lzyj/202404/t20240430_3304219.html",
        docNo: "吉林省残疾人保障条例",
        issuedAt: "2013",
        effectiveAt: "2013-08-01",
      }),
    ],
  },
  HL: {
    planUrl:
      "https://www.hlj.gov.cn/hlj/c108372/202112/c00_31181942.shtml",
    planIssued: "2021-12-16（黑政规〔2021〕16号）",
    rehabUrl:
      "https://www.hlj.gov.cn/hlj/c108372/201901/c00_31181304.shtml",
    rehabAgeNote:
      "黑政规〔2018〕20号：具有本省户籍（或居住证）、有康复需求并经评估认定的0—6岁视力、听力、言语、肢体、智力残疾儿童和孤独症儿童；优先低保、建档立卡贫困户、儿童福利机构收留抚养、残疾孤儿及特困供养对象。有条件地区可扩大年龄范围或放宽家庭经济条件限制。自2018年12月1日起全面实施；补助标准与目录以省残联配套及当地执行为准。",
    employmentUrl:
      "https://www.hlj.gov.cn/hlj/c108040/202211/c00_31443922.shtml",
    employmentNote:
      "黑财综〔2016〕48号：安排比例1.5%。2016年办法曾写每年4—5月向残联申报、6—11月向税务机关缴纳。黑残服发〔2026〕2号（林口县政府网2026年3月2日转发）：2026年联网认证时间为3月1日至10月31日，登录黑龙江政务服务网或省残联网站办理。",
    extraPolicies: [
      localEmployment({
        id: "hl-employment-fund-2016",
        code: "HL",
        name: "黑龙江省",
        title: "黑龙江省残疾人就业保障金征收使用管理实施办法",
        shortTitle: "黑龙江残保金1.5%",
        summary:
          "省政府门户公开：安排比例1.5%。已安排残疾人就业的用人单位应于每年4—5月向所在地残疾人就业服务机构申报；6月—11月（当月15日前）向税务机关申报缴纳。",
        keyPoints: [
          "安排比例1.5%。",
          "就业人数申报：每年4—5月，逾期视为未安排。",
          "残保金申报缴纳：6月—11月。",
        ],
        eligibility: "在黑龙江省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "4—5月向残联就业服务机构申报就业人数，6—11月向税务机关缴纳。个人到残联就业服务机构登记求职。",
        body: "黑龙江省财政厅、地方税务局、残联、人民银行哈尔滨中心支行印发的《黑龙江省残疾人就业保障金征收使用管理实施办法》，黑龙江省人民政府网公开。第六条：未达1.5%应当缴纳，由所在地税务机关征收。",
        sourceName: "黑龙江省人民政府",
        sourceUrl:
          "https://www.hlj.gov.cn/hlj/c108040/202211/c00_31443922.shtml",
        docNo: "黑龙江省残疾人就业保障金征收使用管理实施办法",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localEmployment({
        id: "hl-employment-audit-2026",
        code: "HL",
        name: "黑龙江省",
        title: "黑龙江省2026年按比例安排残疾人就业审核认定",
        shortTitle: "黑龙江2026年审3—10月",
        summary:
          "黑残服发〔2026〕2号：2026年按比例安排残疾人就业审核认定时间为3月1日至10月31日。网上登录黑龙江政务服务网搜索「全国残疾人按比例就业情况联网认证」，或省残联官网进入申报审核系统。安排比例执行黑财综〔2016〕48号的1.5%。未在期限内申报视为未安排就业。林口县政府网2026年3月2日转发该通知。",
        keyPoints: [
          "2026年认证：3月1日—10月31日。",
          "文号黑残服发〔2026〕2号。",
          "黑龙江政务服务网或 hljcl.org.cn 办理。",
          "安排比例1.5%。",
        ],
        eligibility: "黑龙江省行政区域内2025年度安排有残疾人就业的用人单位。",
        howToApply:
          "黑龙江政务服务网 zwfw.hlj.gov.cn 搜索「全国残疾人按比例就业情况联网认证」，或省残联官网首页进入申报审核系统。",
        body: "林口县人民政府网公开《林口县残疾人联合会关于开展2026年按比例安排残疾人就业审核认定工作的通知》（2026年3月2日 PDF）。通知引用《关于开展2026年按比例安排残疾人就业审核认定工作的通知》（黑残服发〔2026〕2号）、黑财综〔2016〕48号、中残就业〔2025〕13号。本条锁定全省窗口和文号；县区分段集中办理时间以当地通知为准。",
        sourceName: "黑龙江省残疾人就业服务机构（林口县政府网转发）",
        sourceUrl:
          "https://www.linkou.gov.cn/mdjlkxrmzf/bmdt31_LK/202603/1038124/files/%E6%9E%97%E5%8F%A3%E5%8E%BF%E6%AE%8B%E7%96%BE%E4%BA%BA%E8%81%94%E5%90%88%E4%BC%9A%E5%85%B3%E4%BA%8E%E5%BC%80%E5%B1%952026%E5%B9%B4%E6%8C%89%E6%AF%94%E4%BE%8B%E5%AE%89%E6%8E%92%E6%AE%8B%E7%96%BE%E4%BA%BA%E5%B0%B1%E4%B8%9A%E5%AE%A1%E6%A0%B8%E8%AE%A4%E5%AE%9A%E5%B7%A5%E4%BD%9C%E7%9A%84%E9%80%9A%E7%9F%A5.pdf",
        docNo: "黑残服发〔2026〕2号",
        issuedAt: "2026-03-02",
        effectiveAt: "2026-03-01",
      }),
    ],
  },
  GX: {
    employmentUrl: "http://www.gxdpf.org.cn/contents/646/44458.html",
    employmentNote:
      "桂财税〔2016〕47号：安排比例不得低于1.5%。自治区残联2026年2月通告：2026年联网认证申报时间为3月1日至10月31日。",
    subsidyUrl: "http://mzt.gxzf.gov.cn/xxgk/zcwj/gmf/t25960665.shtml",
    subsidyPoints: [
      "桂民发〔2025〕25号：从2025年1月1日起，自治区残疾人两项补贴标准由每人每月80元提高至每人每月90元。",
      "有条件的地方可在自治区标准上适当提高，报同级政府批准并报自治区民政厅、财政厅备案。",
      "桂民规〔2022〕2号：生活补贴对象为持证且享受广西低保待遇的残疾人；护理补贴对象为自治区户籍一、二级各类残疾人及三、四级精神残疾人（有条件地方可延伸）。",
    ],
    extraPolicies: [
      localSubsidy({
        id: "gx-subsidy-2025",
        code: "GX",
        name: "广西壮族自治区",
        title: "广西提高残疾人两项补贴标准（桂民发〔2025〕25号）",
        shortTitle: "广西两项补贴90元",
        summary:
          "桂民发〔2025〕25号：自2025年1月1日起，自治区残疾人两项补贴标准由每人每月80元提高至每人每月90元。市县可在此基础上适当提高。",
        keyPoints: [
          "自治区标准：生活补贴、护理补贴均为90元/人/月（由80元上调）。",
          "执行时间：2025年1月1日。",
          "文号：桂民发〔2025〕25号（自治区民政厅、财政厅）。",
          "对象范围仍按桂民规〔2022〕2号等文件：生活补贴以低保家庭持证残疾人为主；护理补贴覆盖一、二级及三、四级精神残疾（扩面以当地为准）。",
        ],
        eligibility:
          "广西符合两项补贴条件的持证残疾人。生活补贴通常需享受广西最低生活保障；护理补贴通常须自治区户籍且符合等级范围。具体以户籍地审核为准。",
        howToApply:
          "向户籍地乡镇人民政府或街道办事处申请。金额是否高于90元，请核市县公示；亦可拨打12385或咨询户籍地残联/民政。",
        body: "广西壮族自治区民政厅网站公开《广西壮族自治区民政厅 广西壮族自治区财政厅关于提高全区城乡最低生活保障补助水平和残疾人两项补贴标准的通知》（桂民发〔2025〕25号）。同厅《关于进一步完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（桂民规〔2022〕2号，自2022年10月1日起施行）明确对象范围与衔接规则。本条金额以桂民发〔2025〕25号为准；对象细节以桂民规〔2022〕2号和当地细则为准。",
        sourceName: "广西壮族自治区民政厅、财政厅",
        sourceUrl: "http://mzt.gxzf.gov.cn/xxgk/zcwj/gmf/t25960665.shtml",
        docNo: "桂民发〔2025〕25号",
        issuedAt: "2025-08-21",
        effectiveAt: "2025-01-01",
      }),
      localSubsidy({
        id: "gx-subsidy-rule-2022",
        code: "GX",
        name: "广西壮族自治区",
        title: "广西进一步完善残疾人两项补贴制度实施意见",
        shortTitle: "广西两项补贴对象规则",
        summary:
          "桂民规〔2022〕2号：明确生活补贴、护理补贴对象范围与政策衔接。符合条件者可同时申领两项补贴；特困供养对象不再享受两项补贴等。自2022年10月1日起施行。",
        keyPoints: [
          "生活补贴：持证且享受广西最低生活保障待遇的残疾人；有条件地方可向低保边缘等延伸。",
          "护理补贴：自治区户籍一、二级各类残疾人，以及三、四级精神残疾人；有条件地方可向三、四级智力等延伸。",
          "可同时申领生活补贴与护理补贴；与其他福利性护理补贴择高。",
          "特困人员救助供养已覆盖的，不再享受两项补贴。",
        ],
        eligibility: "广西持证残疾人，并符合桂民规〔2022〕2号及当地扩面规定。",
        howToApply: "向户籍地乡镇或街道提出申请，监护人或受托人可代办。残联办证时应一次性告知两项补贴政策。",
        body: "广西壮族自治区民政厅、财政厅、残联《关于进一步完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（桂民规〔2022〕2号）。自治区民政厅网站公开文本及重点领域解读。补贴标准以桂民发〔2025〕25号及市县提标文件为准。",
        sourceName: "广西壮族自治区民政厅、财政厅、残联",
        sourceUrl: "http://mzt.gxzf.gov.cn/xxgk/zcwj/gmg/t18765297.shtml",
        docNo: "桂民规〔2022〕2号",
        issuedAt: "2022",
        effectiveAt: "2022-10-01",
      }),
      localEmployment({
        id: "gx-employment-fund-2016",
        code: "GX",
        name: "广西壮族自治区",
        title: "广西壮族自治区残疾人就业保障金征收使用管理办法",
        shortTitle: "广西残保金1.5%",
        summary:
          "桂财税〔2016〕47号：安排比例不低于1.5%。自治区残联就业指导中心2026年2月28日通告：2025年度安排有残疾人就业的用人单位，2026年申报时间为3月1日至10月31日。",
        keyPoints: [
          "安排比例1.5%。",
          "2026年联网认证：3月1日—10月31日。",
          "分档减缴按财政部公告2023年第8号。",
        ],
        eligibility: "在广西注册的用人单位；在自治区求职的持证残疾人。",
        howToApply:
          "按规定向残联申报就业情况后向税务机关缴纳。2026年申报期见自治区残联通告。",
        body: "柳州市城中区人民政府惠企政策专题引用桂财税〔2016〕47号：安排比例不得低于1.5%。广西壮族自治区残联网站2026年2月28日发布联网认证通告，申报期2026年3月1日至10月31日。",
        sourceName:
          "广西壮族自治区残疾人联合会；柳州市城中区人民政府（引桂财税〔2016〕47号）",
        sourceUrl: "http://www.gxdpf.org.cn/contents/646/44458.html",
        docNo: "桂财税〔2016〕47号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
    ],
  },
  HI: {
    implementingUrl:
      "http://mlqzf.haikou.gov.cn/xgk/mlqzf/mlqmzj_8434/fdzdgknr/bmwj_8957/202404/t1352506.shtml",
    implementingIssued:
      "海南省民政厅《关于完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》",
    employmentUrl: "https://www.hidpf.org.cn/zcwj/wjfb/",
    employmentNote:
      "海南省政策解答：安排比例不低于1.5%。琼残规字〔2026〕1号：超比例每超1人每年按上年度当地月最低工资5倍奖励，累计不超过6年；次年3—7月申请。分档减缴按财政部公告2023年第8号。",
    extraPolicies: [
      localSubsidy({
        id: "hi-subsidy-rule",
        code: "HI",
        name: "海南省",
        title: "海南省完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见",
        shortTitle: "海南两项补贴实施意见",
        summary:
          "海南省民政厅印发《关于完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》。海口市美兰区人民政府网公开该通知及PDF附件。本条锁定制度文件来源；现行元/月以省民政厅、市县最新公示为准，本条不锁死单一金额。",
        keyPoints: [
          "省民政厅印发完善两项补贴制度的实施意见。",
          "美兰区政府网信息公开栏目公开通知及PDF全文附件。",
          "对象范围、衔接规则以意见正文为准。",
          "现行补贴元/月请核省民政厅及户籍地市县公示，本条不发明金额。",
        ],
        eligibility:
          "具有海南省户籍、持有效残疾人证，并符合该实施意见及当地扩面规定的残疾人。",
        howToApply:
          "向户籍地乡镇（街道）民政窗口申请，或按全省两项补贴信息系统办理。",
        body: "海南省民政厅关于印发《关于完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》的通知。海口市美兰区人民政府门户网站法定主动公开栏目转载，并附PDF。金额以省、市县最新公开为准。",
        sourceName: "海南省民政厅（海口市美兰区政府网转载）",
        sourceUrl:
          "http://mlqzf.haikou.gov.cn/xgk/mlqzf/mlqmzj_8434/fdzdgknr/bmwj_8957/202404/t1352506.shtml",
        docNo: "海南省两项补贴实施意见",
        issuedAt: "以美兰区公开件为准",
        effectiveAt: "以意见施行日为准",
      }),
      localEmployment({
        id: "hi-employment-fund",
        code: "HI",
        name: "海南省",
        title: "海南省残疾人就业保障金征缴规定",
        shortTitle: "海南残保金1.5%",
        summary:
          "保亭黎族苗族自治县政府网转省口径：本省行政区域内用人单位应当按照不低于在职职工总数1.5%的比例安排残疾人就业。未达标缴纳残保金。",
        keyPoints: [
          "安排比例1.5%。",
          "税务机关征收。",
          "分档减缴按财政部公告2023年第8号。",
        ],
        eligibility: "在海南省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "保亭黎族苗族自治县人民政府网《海南省残疾人就业保障金征缴政策解答》写明安排比例不低于1.5%。",
        sourceName: "保亭黎族苗族自治县人民政府（转省征缴口径）",
        sourceUrl:
          "https://baoting.hainan.gov.cn/jdhy/zcjd/sjjd/201908/t20190808_2648233.html",
        docNo: "海南省残保金征缴政策解答",
        issuedAt: "2019-08",
        effectiveAt: "2019",
      }),
      localEmployment({
        id: "hi-employment-overquota-2026",
        code: "HI",
        name: "海南省",
        title: "海南省用人单位超比例安排残疾人就业奖励办法",
        shortTitle: "海南超比例最低工资5倍",
        summary:
          "琼残规字〔2026〕1号（省残联、财政厅、人社厅，2026年2月5日在省残联网站文件发布栏目公开）：每超额安排1名残疾人就业，每年给予上年度当地月最低工资标准5倍的奖励，累计不超过6年。奖励人数按整数计算，重度残疾按1人计（不按2人加倍）。申请时间为次年3—7月，向省政务服务平台或所在地残疾人就业服务机构提出。自2026年3月1日起施行，有效期5年，同时废止琼残字〔2016〕85号。",
        keyPoints: [
          "超比例奖励：每超1人每年当地月最低工资\xD75，累计不超过6年。",
          "奖励人数＝实际安排人数（重度按1人）－职工总数\xD71.5%，取整数。",
          "申请窗口：次年3—7月。",
          "文号琼残规字〔2026〕1号，2026年3月1日起施行。",
        ],
        eligibility:
          "海南省行政区域内超比例安排残疾人就业、已完成联网认证、合同一年以上且上年度实际在岗满1年的机关、团体、企业、事业单位和民办非企业。",
        howToApply:
          "次年3—7月向海南省政务服务平台或所在地残疾人就业服务机构申请，提交申请表、残疾职工登记表、审核认定书、工资证明和在职职工人数证明。公示5个工作日后由同级残联拨付。",
        body: "海南省残联官网文件发布栏目《关于印发〈海南省用人单位超比例安排残疾人就业奖励办法〉的通知》（琼残规字〔2026〕1号，2026-02-05）。内文：奖励金额＝奖励人数\xD7当地月最低工资标准\xD75；人数均按整数部分计算；安排1名重度残疾人就业按1人计算。符合条件未在期限内申报视为自动放弃。内页正文路径以省残联网站该条为准。",
        sourceName: "海南省残疾人联合会",
        sourceUrl: "https://www.hidpf.org.cn/zcwj/wjfb/",
        docNo: "琼残规字〔2026〕1号",
        issuedAt: "2026-02-05",
        effectiveAt: "2026-03-01",
      }),
    ],
  },
  NX: {
    rehabUrl:
      "https://www.nx.gov.cn/zwgk/zc/xzgfxwj/qzf/202311/t20231106_4339519.html",
    rehabAgeNote:
      "宁政规发〔2018〕8号：自治区人民政府建立残疾儿童康复救助制度实施意见，落实国发〔2018〕20号。自2018年10月1日起施行（政府信息公开页载明原有效期至2023年10月1日；现行执行口径以自治区残联/民政最新配套为准）。",
    implementingUrl:
      "https://www.spt.gov.cn/xxgk/bmxxgkml/sptqclz/fdzdgknr_51950/shjz_51959/202512/t20251217_5111151.html",
    implementingIssued: "2022（宁民规发〔2022〕2号）",
    subsidyUrl:
      "https://www.yinchuan.gov.cn/xxgk/bmxxgkml/smzj/xxgkml_2049/shjz/zcbz_59313/202404/t20240416_4512921.html",
    subsidyPoints: [
      "宁民规发〔2022〕2号完善两项补贴制度；宁民函〔2024〕14号提高标准。",
      "银川市民政局落实宁民函〔2024〕14号：低保对象生活补贴一级240、二级200、三级120、四级115元/人/月；护理补贴130元/人/月（2024年1月1日起）。中卫沙坡头2026年1月公示仍报生活115、护理130。",
    ],
    employmentUrl: "https://www.ndpf.org.cn/zcjd/202311/t20231121_797812.html",
    employmentNote:
      "宁财（综）发〔2016〕892号：安排比例1.5%。年缴纳额按差额人数\xD7年平均工资（或当地社平工资2倍，取低值）。减免见宁财（综）发〔2017〕364号。",
    extraPolicies: [
      localSubsidy({
        id: "nx-subsidy-rule-2022",
        code: "NX",
        name: "宁夏回族自治区",
        title: "宁夏进一步完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见",
        shortTitle: "宁夏两项补贴宁民规发2号",
        summary:
          "宁民规发〔2022〕2号：自治区民政厅、财政厅、残联完善两项补贴制度。中卫市沙坡头区2025—2026年两项补贴公示均引用该文及宁民函〔2024〕14号。现行分档元/月见银川落实通知与沙坡头公示。",
        keyPoints: [
          "制度文件：宁民规发〔2022〕2号。",
          "提标文件：宁民函〔2024〕14号。",
          "沙坡头区2026年1月公示仍执行并引用上述文件。",
          "具体元/月以银川落实通知及各市县公示为准。",
        ],
        eligibility:
          "具有宁夏户籍、持有效残疾人证，并符合宁民规发〔2022〕2号及市县实施办法的残疾人。",
        howToApply:
          "向户籍地乡镇人民政府提交书面申请，由县区民政、残联审核发放。",
        body: "自治区民政厅、财政厅、残联《关于进一步完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见》（宁民规发〔2022〕2号）。中卫市沙坡头区常乐镇人民政府2025年12月17日《常乐镇2026年1月残疾人两项补贴信息公示》完整引用该文及宁民发〔2020〕81号、宁民函〔2024〕14号。",
        sourceName: "中卫市沙坡头区常乐镇人民政府（引宁民规发〔2022〕2号）",
        sourceUrl:
          "https://www.spt.gov.cn/xxgk/bmxxgkml/sptqclz/fdzdgknr_51950/shjz_51959/202512/t20251217_5111151.html",
        docNo: "宁民规发〔2022〕2号",
        issuedAt: "2022",
        effectiveAt: "2022",
      }),
      localSubsidy({
        id: "nx-subsidy-2024",
        code: "NX",
        name: "宁夏回族自治区",
        title: "宁夏提高困难残疾人生活补贴和重度残疾人护理补贴标准（银川落实口径）",
        shortTitle: "宁夏两项补贴银川分档",
        summary:
          "银川市民政局落实宁民函〔2024〕14号：自2024年1月1日起，低保对象生活补贴四级由110元提高至115元/人/月，一级240、二级200、三级120元/人/月维持；护理补贴由120元提高至130元/人/月。沙坡头2026年1月公示仍报生活115、护理130。",
        keyPoints: [
          "生活补贴（银川载明）：一级240、二级200、三级120、四级115元/人/月。",
          "护理补贴：130元/人/月。",
          "自2024年1月1日起；沙坡头2026年公示仍见115/130。",
          "其他市县分档若不一致，以当地公示为准。",
        ],
        eligibility:
          "宁夏符合两项补贴条件的持证残疾人；银川分档以该落实通知为准，其他市县核当地文件。",
        howToApply: "向户籍地乡镇或县区民政申请。",
        body: "银川市民政局《关于进一步明确分散特困人员供养标准和残疾人两项补贴标准相关事宜的通知》（2024年2月19日），落实自治区宁民函〔2024〕14号。中卫沙坡头区常乐镇2026年1月两项补贴公示标准为生活115元、护理130元。",
        sourceName: "银川市民政局（引宁民函〔2024〕14号）",
        sourceUrl:
          "https://www.yinchuan.gov.cn/xxgk/bmxxgkml/smzj/xxgkml_2049/shjz/zcbz_59313/202404/t20240416_4512921.html",
        docNo: "宁民函〔2024〕14号（银川落实）",
        issuedAt: "2024-02-19",
        effectiveAt: "2024-01-01",
      }),
      localEmployment({
        id: "nx-employment-fund-2016",
        code: "NX",
        name: "宁夏回族自治区",
        title: "宁夏回族自治区残疾人就业保障金征收使用管理实施办法",
        shortTitle: "宁夏残保金1.5%",
        summary:
          "宁财（综）发〔2016〕892号：安排比例1.5%。自治区残联网站政策解答给出计征公式，工资取单位年平均工资与当地社平工资2倍的较低者。",
        keyPoints: [
          "安排比例1.5%。",
          "计征工资取单位年平均工资和当地社平工资2倍的较低值。",
          "30人（含）以下企业免征仍须零申报。",
        ],
        eligibility: "在宁夏注册的用人单位；在自治区求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报，符合免征的也须零申报。个人到残联就业服务机构登记。",
        body: "宁夏回族自治区残联网站《残疾人就业保障金政策解答（一）》引用宁财（综）发〔2016〕892号实施办法及宁财（综）发〔2017〕364号减免办法。",
        sourceName: "宁夏回族自治区残疾人联合会",
        sourceUrl: "https://www.ndpf.org.cn/zcjd/202311/t20231121_797812.html",
        docNo: "宁财（综）发〔2016〕892号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localEmployment({
        id: "nx-employment-overquota-2017",
        code: "NX",
        name: "宁夏回族自治区",
        title: "宁夏回族自治区超比例安排残疾人就业奖励实施办法",
        shortTitle: "宁夏超比例最低工资5倍",
        summary:
          "宁残联发〔2017〕22号：安排残疾人就业超过本单位在职职工总数1.5%的，每超额安排1名残疾人，每年给予当地月最低工资标准5倍的奖励。石嘴山大武口区政府网2023年公示、银川金凤区政府文件均引用该口径。",
        keyPoints: [
          "超比例奖励：每超1人每年当地月最低工资\xD75。",
          "须先达到1.5%后再超额。",
          "文号宁残联发〔2017〕22号。",
        ],
        eligibility: "宁夏回族自治区超比例安排残疾人就业的用人单位。",
        howToApply: "向所在地残联按当年公示和申报通知申请。",
        body: "《宁夏回族自治区超比例安排残疾人就业奖励实施办法》（宁残联发〔2017〕22号）。石嘴山市大武口区人民政府网2023年12月29日奖励公示完整引用该条。银川市金凤区人民政府2022年文件亦写每超额1人享受月最低工资5倍奖励。",
        sourceName: "石嘴山大武口区人民政府（引宁残联发〔2017〕22号）",
        sourceUrl:
          "https://www.dwk.gov.cn/xxgk/zfxxgkml/yjjs/jycy/cyjybffw/202312/t20231229_4402253.html",
        docNo: "宁残联发〔2017〕22号",
        issuedAt: "2017",
        effectiveAt: "2017",
      }),
    ],
  },
  GZ: {
    implementingUrl:
      "https://czt.guizhou.gov.cn/ztzl/hmhnczbt/zcwj/202306/t20230625_80489973.html",
    implementingIssued: "2016（黔府发〔2016〕2号）",
    subsidyUrl:
      "https://czt.guizhou.gov.cn/ztzl/hmhnczbt/hmhnczbtzcqd/smzt/2026n/",
    subsidyPoints: [
      "黔府发〔2016〕2号建立两项补贴制度。生活补贴按低保对象分类施保（当地低保标准一定比例增发），本库不锁死单一生活补贴元/月。",
      "省财政厅2026年惠民惠农清单载明：重度护理补贴一级110元/人/月、二级90元/人/月（与2023年7月1日起提标方案一致）。",
    ],
    employmentUrl:
      "https://guizhou.chinatax.gov.cn/wjjb/zcfgk/szfl/fssr/202404/t20240426_84357183.html",
    employmentNote:
      "黔财非税〔2016〕57号：贵州省残疾人就业保障金征收使用管理办法。省税务局2024年4月仍公开全文。安排比例按办法执行，国家底线1.5%。",
    extraPolicies: [
      localSubsidy({
        id: "gz-subsidy-rule-2016",
        code: "GZ",
        name: "贵州省",
        title: "贵州省困难残疾人生活补贴和重度残疾人护理补贴制度实施办法",
        shortTitle: "贵州两项补贴黔府发2号",
        summary:
          "黔府发〔2016〕2号：全面建立困难残疾人生活补贴和重度残疾人护理补贴制度。生活补贴与低保分类施保衔接；护理补贴对象为一、二级持证残疾人。现行护理元/月见2026年财政厅清单专条。",
        keyPoints: [
          "制度文号黔府发〔2016〕2号，省财政厅惠民惠农专栏公开。",
          "生活补贴：分类施保，随当地低保标准动态，不锁死全省统一元/月。",
          "护理补贴对象：残疾等级一级、二级的持证残疾人。",
          "现行护理标准见省财政厅2026年清单。",
        ],
        eligibility:
          "具有贵州省户籍、持有效残疾人证，并符合黔府发〔2016〕2号及后续提标、市县规定的残疾人。",
        howToApply:
          "本人或委托向户籍地乡镇（街道）申请，经乡镇初审、县级残联复审、县民政审定后由代发金融机构发放。",
        body: "贵州省人民政府印发《贵州省困难残疾人生活补贴和重度残疾人护理补贴制度实施办法》的通知（黔府发〔2016〕2号）。贵州省财政厅惠民惠农财政补贴政策文件栏目公开。生活补贴分类施保口径见历次提标方案；护理现行标准见2026年清单专条。",
        sourceName: "贵州省人民政府（省财政厅公开）",
        sourceUrl:
          "https://czt.guizhou.gov.cn/ztzl/hmhnczbt/zcwj/202306/t20230625_80489973.html",
        docNo: "黔府发〔2016〕2号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localSubsidy({
        id: "gz-subsidy-nursing-2023",
        code: "GZ",
        name: "贵州省",
        title: "贵州省重度残疾人护理补贴标准（2026年清单口径）",
        shortTitle: "贵州护理补贴110/90",
        summary:
          "省民政厅、财政厅、残联2023年提标方案将一级、二级重度护理补贴分别提高到110元、90元/人/月（2023年7月1日起）。省财政厅2026年惠民惠农补贴清单仍载明一级110元/人/月、二级90元/人/月。生活补贴继续分类施保，本条不发明生活补贴绝对元数。",
        keyPoints: [
          "护理补贴：一级110元/人/月，二级90元/人/月。",
          "2023年7月1日起提标；2026年省财政厅清单仍载此护理标准。",
          "生活补贴：分类施保，以当地低保增发比例为准。",
          "对象：残疾等级一级、二级的持证残疾人（护理）。",
        ],
        eligibility:
          "贵州省符合护理补贴条件的一、二级持证残疾人；生活补贴对象按分类施保及当地规定。",
        howToApply:
          "向户籍地乡镇申请；发放通过代发金融机构按月支付。",
        body: "贵定县人民政府网公开《省民政厅省财政厅省残疾人联合会关于印发贵州省2023年百岁老人生活补贴省级补助和残疾人两项补贴提标方案的通知》：护理一级110、二级90元/人/月，自2023年7月1日起。贵州省财政厅2026年惠民惠农财政补贴资金清单（省民政厅事项）载明同一护理标准。生活补贴分类施保，不在本条锁死元/月。",
        sourceName: "贵州省财政厅2026年清单；2023年提标方案（贵定县政府网）",
        sourceUrl:
          "https://czt.guizhou.gov.cn/ztzl/hmhnczbt/hmhnczbtzcqd/smzt/2026n/",
        docNo: "贵州省两项补贴护理标准（2026清单）",
        issuedAt: "2023-07-01",
        effectiveAt: "2023-07-01",
      }),
      localEmployment({
        id: "gz-employment-fund-2016",
        code: "GZ",
        name: "贵州省",
        title: "贵州省残疾人就业保障金征收使用管理办法",
        shortTitle: "贵州残保金",
        summary:
          "黔财非税〔2016〕57号：省财政厅、地方税务局、残联印发。国家税务总局贵州省税务局法规库2024年4月26日仍公开该通知及PDF。未按规定比例安排就业的缴纳残保金，国家底线1.5%。",
        keyPoints: [
          "文号黔财非税〔2016〕57号。",
          "税务机关征收。",
          "分档减缴按财政部公告2023年第8号。",
        ],
        eligibility: "在贵州省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "贵州省财政厅、地方税务局、残联《关于印发〈贵州省残疾人就业保障金征收使用管理办法〉的通知》（黔财非税〔2016〕57号）。国家税务总局贵州省税务局网站公开。",
        sourceName: "国家税务总局贵州省税务局",
        sourceUrl:
          "https://guizhou.chinatax.gov.cn/wjjb/zcfgk/szfl/fssr/202404/t20240426_84357183.html",
        docNo: "黔财非税〔2016〕57号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localEmployment({
        id: "gz-employment-overquota-2021",
        code: "GZ",
        name: "贵州省",
        title: "贵州省扶持残疾人就业创业办法（岗位补贴与超比例奖励）",
        shortTitle: "贵州岗位补贴300超比例2000",
        summary:
          "黔残联发〔2021〕11号：省残联对符合条件的民营企业、民办非企业，按安置残疾人数给予岗位补贴300元/人/年；按超比例部分残疾人数给予奖励2000元/人/年，超比例不足1人不奖，同一用人单位每年超比例奖励不超过10万元。贵阳市花溪区残联2025年6月公告仍执行该口径。",
        keyPoints: [
          "岗位补贴：300元/人/年（省残联）。",
          "超比例奖励：2000元/人/年，不足1人不奖。",
          "同一单位超比例奖励每年上限10万元。",
        ],
        eligibility:
          "贵州省符合办法规定、已联网认证并应缴尽缴或免缴残保金的民营企业和民办非企业。",
        howToApply: "向所在区县残联申请，按当年公告报送材料。",
        body: "《贵州省扶持残疾人就业创业办法》（黔残联发〔2021〕11号）。贵阳市花溪区人民政府网《花溪区残联关于申请2024年度残疾人按比例就业岗位补贴和超比例安排残疾人就业奖励的公告》（2025年6月19日）完整引用上述标准。",
        sourceName: "贵阳市花溪区残联（引黔残联发〔2021〕11号）",
        sourceUrl:
          "https://www.huaxi.gov.cn/xwzx/tzgg/202506/t20250619_88162573.html",
        docNo: "黔残联发〔2021〕11号",
        issuedAt: "2021",
        effectiveAt: "2021",
      }),
    ],
  },
  XZ: {
    implementingIssued: "2016（藏政发〔2016〕44号）",
    subsidyUrl:
      "https://mzt.xizang.gov.cn/zxzx/gzdt/202503/t20250305_465410.html",
    subsidyPoints: [
      "藏政发〔2016〕44号建立制度。自治区民政厅、财政厅提标通知：自2025年1月1日起，生活补贴由120元提高至144元/人/月，护理补贴由240元提高至288元/人/月。",
      "拉萨市民政局2025年一季度落实情况与自治区本级2025年一卡通清单同口径。",
    ],
    employmentUrl:
      "https://linzhi.gov.cn/linzhi/c100004/202011/9109c8dcd7f44b3b85257deaf22e3365.shtml",
    employmentNote:
      "藏财税〔2020〕17号起由税务部门征收。林芝市政府网公告：暂按年度征收，申报缴纳时间为1月至9月。安排比例按国家1.5%底线。",
    extraPolicies: [
      localSubsidy({
        id: "xz-subsidy-2025",
        code: "XZ",
        name: "西藏自治区",
        title: "西藏提高困难残疾人生活补贴和重度残疾人护理补贴标准（2025年）",
        shortTitle: "西藏2025两项补贴144/288",
        summary:
          "自治区民政厅、财政厅提标通知：自2025年1月1日起，困难残疾人生活补贴由120元/人/月提高至144元/人/月；重度残疾人护理补贴由240元/人/月提高至288元/人/月。",
        keyPoints: [
          "生活补贴144元/人/月（原120元）。",
          "护理补贴288元/人/月（原240元）。",
          "自2025年1月1日起执行。",
          "制度依据藏政发〔2016〕44号。",
        ],
        eligibility:
          "西藏自治区符合两项补贴条件的持证残疾人，对象范围以藏政发〔2016〕44号及当地审核为准。",
        howToApply: "向户籍地县区民政窗口申请，资金按一卡通渠道发放。",
        body: "西藏自治区民政厅网站2025年3月5日发布：自治区民政厅、财政厅联合印发《关于提高我区困难残疾人生活补贴和重度残疾人护理补贴标准的通知》，明确自2025年1月1日起生活补贴144元/人/月、护理补贴288元/人/月。那曲市民政局转载同口径。自治区本级2025年一卡通清单亦载明该标准并引用藏政发〔2016〕44号。",
        sourceName: "西藏自治区民政厅",
        sourceUrl:
          "https://mzt.xizang.gov.cn/zxzx/gzdt/202503/t20250305_465410.html",
        docNo: "西藏两项补贴提标通知（2025年1月1日起）",
        issuedAt: "2025-03",
        effectiveAt: "2025-01-01",
      }),
      localEmployment({
        id: "xz-employment-fund-2020",
        code: "XZ",
        name: "西藏自治区",
        title: "西藏自治区残疾人就业保障金交由税务部门征收",
        shortTitle: "西藏残保金1—9月申报",
        summary:
          "自治区财政厅、税务局、残联公告：残保金由税务部门征收。林芝市政府网转载：暂按年度征收，当年征收上一年度，申报缴纳时间为1月至9月。安排比例执行国家1.5%底线。",
        keyPoints: [
          "税务机关征收。",
          "申报缴纳时间：1月至9月。",
          "安排比例按国家1.5%底线。",
        ],
        eligibility: "在西藏注册的用人单位；在自治区求职的持证残疾人。",
        howToApply:
          "按规定向残联申报就业情况后，1—9月向税务机关缴纳上年度残保金。",
        body: "林芝市人民政府网转载《西藏自治区财政厅 国家税务总局西藏自治区税务局 西藏自治区残疾人联合会关于残疾人就业保障金交由税务部门征收的公告》（2020年11月）。文号口径为藏财税〔2020〕17号。",
        sourceName: "林芝市人民政府（转自治区公告）",
        sourceUrl:
          "https://linzhi.gov.cn/linzhi/c100004/202011/9109c8dcd7f44b3b85257deaf22e3365.shtml",
        docNo: "藏财税〔2020〕17号",
        issuedAt: "2020",
        effectiveAt: "2020",
      }),
    ],
  },
  AH: {
    implementingUrl:
      "https://www.guangde.gov.cn/OpennessContent/show/3253817.html",
    implementingIssued: "2022-12-06（皖民务字〔2022〕116号）",
    subsidyUrl: "https://www.ahjx.gov.cn/Jczwgk/show/3508544.html",
    subsidyPoints: [
      "皖民务字〔2022〕116号《工作规范》：生活补贴对象为持证四级及以上且纳入低保或脱贫人口（稳定脱贫户除外）的残疾人；护理补贴对象为一、二级重度残疾人。",
      "皖民务函〔2024〕237号：自2025年1月1日起，全省两项补贴基础标准由86元/月调整为94元/月，各地不得低于省定基础标准。",
    ],
    employmentUrl: "https://cl.huainan.gov.cn/xwdt/tzgg/551854479.html",
    employmentNote:
      "淮南市残联、税务局2026年2月通告：2026年全省口径联网认证时间为3月1日至10月31日。安排比例执行国家1.5%底线。省征收办法全文仍待财政厅官网核对。",
    extraPolicies: [
      localSubsidy({
        id: "ah-subsidy-norm-2022",
        code: "AH",
        name: "安徽省",
        title: "安徽省困难残疾人生活补贴和重度残疾人护理补贴工作规范",
        shortTitle: "安徽两项补贴工作规范",
        summary:
          "皖民务字〔2022〕116号：规范对象范围、申请审核、主动发现与动态复核。生活补贴覆盖低保或脱贫人口（稳定脱贫户除外）中四级及以上持证残疾人；护理补贴覆盖一、二级重度残疾人。",
        keyPoints: [
          "生活补贴：户籍持证四级及以上，且纳入低保或脱贫人口（稳定脱贫户除外）。",
          "护理补贴：户籍持证一、二级重度残疾人。",
          "有条件地方可向低保边缘及三、四级智力/精神等扩面。",
          "向户籍地乡镇（街道）申请；支持全国两项补贴信息系统办理。",
        ],
        eligibility:
          "具有安徽省户籍、持有效残疾人证，并符合皖民务字〔2022〕116号对象范围的残疾人。",
        howToApply:
          "本人或监护人向户籍地乡镇人民政府（街道办事处）申请，或通过国家政务服务平台、民政一体化平台网办。",
        body: "安徽省民政厅等《关于印发〈安徽省困难残疾人生活补贴和重度残疾人护理补贴工作规范〉的通知》（皖民务字〔2022〕116号，2022年12月6日）。广德市政府网转载全文；旌德县政府网标注文号。现行省定基础标准见皖民务函〔2024〕237号专条。",
        sourceName: "安徽省民政厅等（广德市政府网转载）",
        sourceUrl: "https://www.guangde.gov.cn/OpennessContent/show/3253817.html",
        docNo: "皖民务字〔2022〕116号",
        issuedAt: "2022-12-06",
        effectiveAt: "2022-12-06",
      }),
      localSubsidy({
        id: "ah-subsidy-2025",
        code: "AH",
        name: "安徽省",
        title: "安徽省调整残疾人两项补贴标准（2025年）",
        shortTitle: "安徽2025两项补贴94元",
        summary:
          "皖民务函〔2024〕237号：自2025年1月1日起，全省残疾人两项补贴基础标准由每人每月86元调整为94元，各地发放不得低于省级基础标准。",
        keyPoints: [
          "省定基础标准94元/人/月（原86元）。",
          "生活补贴与护理补贴均适用该省定基础标准口径。",
          "自2025年1月1日起执行；年初低于新标准的应补齐差额。",
          "市县可高于省定基础标准。",
        ],
        eligibility: "安徽省符合两项补贴条件的持证残疾人。",
        howToApply: "向户籍地乡镇街道或县民政申请；以当地公示为准。",
        body: "关于调整残疾人“两项补贴”标准的通知（皖民务函〔2024〕237号）。绩溪县政府网2025年1月7日公开。铜陵等地转发口径一致。2026年是否再调，请核省民政厅最新通知。",
        sourceName: "安徽省有关部门（绩溪县政府网公开皖民务函〔2024〕237号）",
        sourceUrl: "https://www.ahjx.gov.cn/Jczwgk/show/3508544.html",
        docNo: "皖民务函〔2024〕237号",
        issuedAt: "2024",
        effectiveAt: "2025-01-01",
      }),
      localEmployment({
        id: "ah-employment-audit-2026",
        code: "AH",
        name: "安徽省",
        title: "安徽省残疾人按比例就业联网认证（2026年）",
        shortTitle: "安徽2026年审",
        summary:
          "淮南市残联、国家税务总局淮南市税务局2026年2月27日通告：2026年残疾人按比例就业情况联网认证时间为2026年3月1日至10月31日，11月1日起关闭网上申报。安排比例执行国家1.5%底线。",
        keyPoints: [
          "2026年联网认证：3月1日—10月31日。",
          "11月1日起关闭网上申报。",
          "安排比例1.5%。",
        ],
        eligibility: "在安徽省注册、安排有残疾人就业的用人单位。",
        howToApply:
          "登录全国一体化政务服务平台或本省政务服务网，搜索「全国残疾人按比例就业情况联网认证」。",
        body: "淮南市残疾人联合会网站《淮南市残疾人联合会 国家税务总局淮南市税务局关于开展2026年安徽省残疾人按比例就业情况联网认证暨征收残疾人就业保障金工作的通告》（2026年2月27日）。本条锁定申报窗口，省征收办法全文以财政厅文件为准。",
        sourceName: "淮南市残疾人联合会、税务局",
        sourceUrl: "https://cl.huainan.gov.cn/xwdt/tzgg/551854479.html",
        docNo: "2026年安徽按比例就业联网认证通告（淮南市公开）",
        issuedAt: "2026-02-27",
        effectiveAt: "2026-03-01",
      }),
    ],
  },
  GS: {
    rehabUrl:
      "https://www.huining.gov.cn/xxgk/xzxxgk/xzyz/fdzdgknr/shjz/art/2023/art_340444553c7b414ca2e91bb85a244a39.html",
    rehabAgeNote:
      "甘政发〔2018〕62号：救助对象为具有甘肃户籍（含居住证发放地在甘肃）且符合条件的0—6岁视力、听力、言语、肢体、智力等残疾儿童和孤独症儿童；包括城乡低保、建档立卡贫困户、儿童福利机构收留抚养、残疾孤儿、特困供养及其他经济困难家庭残疾儿童。有条件地区可扩大年龄范围或放宽家庭经济条件限制。自2018年10月1日起实施；具体补助项目与额度以省残联配套及市县执行为准，本库不锁死过期金额。",
    employmentUrl:
      "https://gansu.gscn.com.cn/system/2026/03/11/013467987.shtml",
    employmentNote:
      "甘政办发〔2020〕87号：安排比例1.5%，未达标缴纳残保金。省残联2026年通告：联网认证时间为3月1日至10月31日。中央驻甘及省直单位到省残疾人职业教育和就业服务中心（兰州市城关区民主西路168号）办理。",
    extraPolicies: [
      localEmployment({
        id: "gs-employment-ordinance",
        code: "GS",
        name: "甘肃省",
        title: "甘肃省残疾人就业办法（按比例就业）",
        shortTitle: "甘肃按比例1.5%",
        summary:
          "司法部转载《甘肃省残疾人就业办法》：用人单位应当按不低于在职职工总数1.5%安排残疾人就业。未安排或未达比例的，应当缴纳残保金。保障金具体缴纳办法由省财政厅会同省残联制定。自2013年4月10日起施行。",
        keyPoints: [
          "安排比例1.5%。",
          "未达标缴纳残保金。",
          "集中就业单位残疾职工应占25%以上。",
        ],
        eligibility: "在甘肃省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "《甘肃省残疾人就业办法》第八条、第二十七条。司法部地方性法规规章库转载。省政府办公厅转发的征收使用管理办法公式为年缴纳额=（上年职工人数\xD71.5%－上年实际安排人数）\xD7上年职工年平均工资。",
        sourceName: "司法部（转甘肃省残疾人就业办法）",
        sourceUrl:
          "https://www.moj.gov.cn/pub/sfbgw/flfggz/flfggzdfzwgz/201305/t20130524_140073.html",
        docNo: "甘肃省残疾人就业办法",
        issuedAt: "2013",
        effectiveAt: "2013-04-10",
      }),
      localEmployment({
        id: "gs-employment-fund-2020",
        code: "GS",
        name: "甘肃省",
        title: "甘肃省残疾人就业保障金征收使用管理实施办法",
        shortTitle: "甘肃残保金甘政办发2020",
        summary:
          "甘政办发〔2020〕87号：安排比例1.5%。用人单位安排残疾人就业比例在1%（含）至1.5%之间的，按规定应缴费额分档减缴。省残联2026年联网认证通告仍引用该办法。",
        keyPoints: [
          "文号甘政办发〔2020〕87号。",
          "安排比例1.5%。",
          "1%—1.5%分档减缴。",
        ],
        eligibility: "在甘肃省注册的用人单位。",
        howToApply: "先完成联网认证，再向税务机关申报缴纳。",
        body: "甘肃省人民政府办公厅《关于转发〈甘肃省残疾人就业保障金征收使用管理实施办法〉的通知》（甘政办发〔2020〕87号）。省政府门户公开。",
        sourceName: "甘肃省人民政府办公厅",
        sourceUrl:
          "http://www.gansu.gov.cn/art/c103795/c103796/c103800/202010/1385160.shtml",
        docNo: "甘政办发〔2020〕87号",
        issuedAt: "2020",
        effectiveAt: "2020",
      }),
      localEmployment({
        id: "gs-employment-audit-2026",
        code: "GS",
        name: "甘肃省",
        title: "甘肃省2026年按比例就业联网认证",
        shortTitle: "甘肃2026年审3—10月",
        summary:
          "省残联2026年通告（甘肃日报转载）：认证时间为2026年3月1日至10月31日。可登录国家政务服务平台、甘肃省政务服务网或中国残疾人就业创业网络服务平台办理。中央驻甘及省直机关到省残疾人职业教育和就业服务中心（兰州市城关区民主西路168号403室，电话0931-8413576）。依据甘政办发〔2020〕87号。",
        keyPoints: [
          "2026年认证：3月1日—10月31日。",
          "依据甘政办发〔2020〕87号。",
          "省直单位：兰州民主西路168号403室。",
        ],
        eligibility:
          "甘肃省2025年度安排有残疾人就业的机关、团体、企事业单位和民办非企业。",
        howToApply:
          "国家或甘肃省政务服务网跨省通办专区；或到同级残联、残疾人就业服务机构窗口。",
        body: "甘肃省残疾人联合会《关于开展2026年度残疾人按比例就业情况联网认证工作的通告》。中国甘肃网-甘肃日报2026年3月11日转载。",
        sourceName: "甘肃省残疾人联合会（甘肃日报转载）",
        sourceUrl:
          "https://gansu.gscn.com.cn/system/2026/03/11/013467987.shtml",
        docNo: "甘肃省残联2026年联网认证通告",
        issuedAt: "2026-03",
        effectiveAt: "2026-03-01",
      }),
    ],
  },
  QH: {
    subsidyUrl:
      "http://www.qinghai.gov.cn/msfw/system/2025/04/04/030069272.shtml",
    subsidyPoints: [
      "省民政厅、财政厅、残联《关于提高困难残疾人生活补贴标准的通知》：自2025年1月1日起，一、二级困难生活补贴由100元提高至120元/人/月，三、四级由50元提高至70元/人/月。",
      "省新闻办2026年1月民政厅专场：一、二级护理补贴达到100元/人/月；生活补贴一二级120、三四级70元/人/月。",
    ],
    employmentUrl:
      "https://www.qhcl.org.cn/xwzx/tzgg/202603/t20260305_394132.html",
    employmentNote:
      "青财综字〔2016〕1045号：安排比例不得低于1.5%。省残联2026年3月1日通告（官网3月5日公开）：2025年度安排有残疾人就业的用人单位，审核认定时间为2026年3月1日至10月31日。优先国家政务服务网跨省通办选择青海省，或到县（区）残联就业服务窗口。",
    extraPolicies: [
      localSubsidy({
        id: "qh-subsidy-2025",
        code: "QH",
        name: "青海省",
        title: "青海省提高困难残疾人生活补贴标准（2025年）",
        shortTitle: "青海2025生活补贴120/70",
        summary:
          "青民发口径：自2025年1月1日起，一、二级困难残疾人生活补贴由100元提高至120元/人/月，三、四级由50元提高至70元/人/月。省新闻办2026年1月介绍：一、二级护理补贴达到100元/人/月。",
        keyPoints: [
          "生活补贴：一、二级120元/人/月；三、四级70元/人/月。",
          "自2025年1月1日起。",
          "护理补贴：一、二级达到100元/人/月（2026年1月省新闻办民政厅专场口径）。",
          "省财政承担80%，市州县配套20%。",
        ],
        eligibility:
          "青海省符合困难残疾人生活补贴及重度护理补贴条件的持证残疾人。",
        howToApply:
          "向户籍地乡镇（街道）提出申请，经民政资格认定后通过一卡通发放。",
        body: "青海省人民政府网2025年4月4日转《青海日报》：省民政厅、财政厅、残联联合印发《关于提高困难残疾人生活补贴标准的通知》，明确自2025年1月1日起一二级120元、三四级70元。青海新闻网2026年1月29日省新闻办民政厅专场介绍护理补贴一二级达到100元/人/月、生活补贴同上。",
        sourceName: "青海省人民政府网；青海新闻办民政厅专场",
        sourceUrl:
          "http://www.qinghai.gov.cn/msfw/system/2025/04/04/030069272.shtml",
        docNo: "青海提高困难残疾人生活补贴标准通知（2025）",
        issuedAt: "2025-04",
        effectiveAt: "2025-01-01",
      }),
      localEmployment({
        id: "qh-employment-fund-2016",
        code: "QH",
        name: "青海省",
        title: "青海省残疾人就业保障金征收使用管理实施办法",
        shortTitle: "青海残保金1.5%",
        summary:
          "青海省政府网2016年7月公开：本省用人单位安排残疾人就业比例不得低于1.5%，未达标应当缴纳残保金。互助县人民政府网公示引用青财综字〔2016〕1045号。省财政厅曾就修订公开征求意见，是否已发新文请核财政厅、税务局当年口径。",
        keyPoints: [
          "安排比例1.5%。",
          "文号青财综字〔2016〕1045号。",
          "分档减缴按财政部公告2023年第8号。",
        ],
        eligibility: "在青海省注册的用人单位；在本省求职的持证残疾人。",
        howToApply:
          "单位经残联审核后向税务机关申报。个人到残联就业服务机构登记。",
        body: "青海省人民政府网《我省残疾人就业保障金征收使用管理出台新规定》（2016年7月20日）。互助县人民政府网2020年公示引用《关于印发青海省残疾人就业保障金征收使用管理实施办法的通知》（青财综字〔2016〕1045号）。",
        sourceName: "青海省人民政府、互助县人民政府",
        sourceUrl:
          "http://www.qinghai.gov.cn/ztzl/system/2016/07/20/010224943.shtml",
        docNo: "青财综字〔2016〕1045号",
        issuedAt: "2016",
        effectiveAt: "2016",
      }),
      localEmployment({
        id: "qh-employment-audit-2026",
        code: "QH",
        name: "青海省",
        title: "青海省2026年度按比例安排残疾人就业审核认定",
        shortTitle: "青海2026年审3—10月",
        summary:
          "省残联2026年3月1日通告（官网通知公告栏目3月5日公开）：审核对象为青海省行政区域内2025年度安排有残疾人就业的机关、团体、企事业单位和民办非企业。审核时间2026年3月1日至10月31日。网上登录国家政务服务网跨省通办专区选择中国残联「全国残疾人按比例就业情况联网认证」办理地选青海省；也可到所属县（区）残联就业服务窗口。未在期限内申报视为未安排就业，由税务机关征收残保金。安排比例执行青财综字〔2016〕1045号的1.5%。",
        keyPoints: [
          "2026年认证：3月1日—10月31日。",
          "国家政务服务网跨省通办，办理地选青海省。",
          "安排比例1.5%。",
          "逾期视为未安排就业。",
        ],
        eligibility:
          "青海省行政区域内2025年度安排有残疾人就业的各级国家机关、社会团体、企业事业单位、民办非企业。",
        howToApply:
          "国家政务服务网→跨省通办→法人办事→中国残疾人联合会→全国残疾人按比例就业情况联网认证→选择青海省。或到所属县（区）残联就业服务窗口。咨询当地县区残联。",
        body: "青海省残疾人联合会《关于开展青海省2026年度残疾人按比例安排残疾人就业审核认定工作的通告》（2026年3月1日，官网2026年3月5日公开）。引用《残疾人就业条例》《残疾人就业保障金征收使用管理办法》及《青海省残疾人就业保障金征收使用管理实施办法》。内页正文路径：qhcl.org.cn/xwzx/tzgg/202603/t20260305_394132.html。",
        sourceName: "青海省残疾人联合会",
        sourceUrl:
          "https://www.qhcl.org.cn/xwzx/tzgg/202603/t20260305_394132.html",
        docNo: "青海省残联2026年审核认定通告",
        issuedAt: "2026-03-01",
        effectiveAt: "2026-03-01",
      }),
    ],
  },
};
