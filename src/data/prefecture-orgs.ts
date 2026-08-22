/** Official-page patches. Empty fields stay empty — do not invent phones. */
export type OrgPatch = {
  address?: string;
  postcode?: string;
  phones?: string[];
  website?: string;
  hours?: string;
  notes?: string;
  sourceName?: string;
  sourceUrl?: string;
};

export const PREFECTURE_ORG_PATCHES: Record<string, OrgPatch> = {
  SUZ: {
    address: "苏州市西环路717号阳光大厦2号楼",
    phones: ["0512-65168685"],
    website: "https://www.cl.suzhou.gov.cn/",
    notes:
      "官网页脚：联系电话65168685（业务咨询、维权热线），已补区号0512。个人事项也可打12385。",
    sourceName: "苏州市残疾人联合会官网",
    sourceUrl: "https://www.cl.suzhou.gov.cn/",
  },
  XUZ: {
    address: "徐州市云龙区汉风路1号B区",
    phones: ["0516-83907775"],
    website: "https://www.xzcl.gov.cn/",
    notes:
      "电话和地址取自徐州市残联官网页脚。另有组织人事公示曾写汉风路行政中心西综合楼B620，以官网页脚为准。",
    sourceName: "徐州市残疾人联合会官网",
    sourceUrl: "https://www.xzcl.gov.cn/",
  },
  WX: {
    address: "无锡市健康路36号",
    phones: ["0510-82724056", "0510-82718206", "0510-82718209"],
    website: "https://cl.wuxi.gov.cn/",
    notes:
      "市残联机关地址、电话取自官网机构概况（原文未写区号，按无锡0510补全）。2026年联网认证通告另列残疾人综合服务中心0510-82718206、0510-82718209。干预中心、托养中心为另址。锡山区窗口见本黄页区县条目。",
    sourceName: "无锡市残联网站机构概况",
    sourceUrl: "https://cl.wuxi.gov.cn/zfxxgk/jggk/index.shtml",
  },
  NTG: {
    address: "南通市崇川区崇文路1号19楼",
    phones: ["0513-81006901"],
    website: "https://cl.nantong.gov.cn/",
    notes:
      "地址来自市残联公开通知页脚；0513-81006901为官网Tel。采购公告中的经办人手机不作机关总机。",
    sourceName: "南通市残疾人联合会官网",
    sourceUrl: "https://cl.nantong.gov.cn/",
  },
  LYG: {
    address: "连云港市海州区绿园路98号",
    phones: ["0518-85850162"],
    website: "http://cl.lyg.gov.cn/",
    notes:
      "官网版权栏：地址海州区绿园路98号，电话0518-85850162。康复处另有0518-85850160。",
    sourceName: "连云港市残疾人联合会官网",
    sourceUrl:
      "http://cl.lyg.gov.cn/scl/sysj_xxgk/content/2cbad81a-39e5-4ece-9951-ff4f913df533.html",
  },
  HAS: {
    address: "淮安市健康西路130号",
    phones: ["0517-83605914","0517-83664731"],
    website: "http://cl.huaian.gov.cn/",
    notes:
      "官网列出市残联0517-83605914；页脚值班电话0517-83664731。各区另有分机，办证请到区残联。",
    sourceName: "淮安市残疾人联合会官网",
    sourceUrl: "http://cl.huaian.gov.cn/",
  },
  CZO: {
    address: "常州市天宁区光华路2号",
    phones: ["0519-89966011"],
    website: "https://cl.jscz.org.cn/",
    notes:
      "主办单位页脚：常州市残疾人联合会，地址天宁区光华路2号，电话0519-89966011。网站技术电话不是办事电话。",
    sourceName: "常州市残联网站页脚",
    sourceUrl: "https://cl.jscz.org.cn/",
  },
  TZS: {
    address: "泰州市海陵区梅兰东路309号",
    postcode: "225300",
    notes:
      "地址取自市政府公开的征求意见通讯地址（市残联办公室）。机关总机官网未公布，请打12385或当地12345。",
    sourceName: "泰州市人民政府公开征求意见（市残联通讯地址）",
    sourceUrl:
      "http://www.taizhou.gov.cn/api-gateway/jpaas-jsurvey-web-server/front/dczj/showJsurveys.do?formId=e41a6b4a39484a938087dbcc46d7034a",
  },
  HUZ: {
    address: "湖州市凤凰路177号",
    postcode: "313000",
    phones: ["0572-2107319"],
    website: "https://www.hzcl.gov.cn/",
    notes: "湖州市残联官网页脚。注意 hzcl.gov.cn 是湖州，不是杭州。",
    sourceName: "湖州市残疾人联合会官网",
    sourceUrl: "https://www.hzcl.gov.cn/",
  },
  WZS: {
    address: "温州市学院西路162号",
    phones: ["0577-89720033"],
    website: "https://cjrlhh.wenzhou.gov.cn/",
    notes:
      "官网页脚：单位地址学院西路162号，联系电话89720033（原文未写区号，按温州0577补全）。",
    sourceName: "温州市残疾人联合会官网",
    sourceUrl: "https://cjrlhh.wenzhou.gov.cn/",
  },
  NGB: {
    address: "宁波市鄞州区和济街95号",
    postcode: "315100",
    phones: ["0574-89184392"],
    website: "http://www.nbcl.org.cn/",
    notes:
      "市残联官网2026年5月7日向社会组织购买服务公告：地址鄞州区和济街95号，邮编315100，维权部电话0574-89184392。该号码是维权部项目联系人，不是确认的机关总机。办事也可拨12385或到区县窗口。",
    sourceName: "宁波市残疾人联合会官网",
    sourceUrl: "http://www.nbcl.org.cn/art/2026/5/7/art_6636_640885.html",
  },
  YCH: {
    website: "https://www.yccl.gov.cn/",
    notes: "盐城市残联官网。机关总机官网首页未公布。各区县儿童康复经办电话见本黄页区县条目。",
    sourceName: "盐城市残疾人联合会官网",
    sourceUrl: "https://www.yccl.gov.cn/",
  },
  SQN: {
    address: "宿迁市宿城区滨河路9号",
    phones: ["0527-84357620"],
    notes:
      "地址、电话取自江苏省残联2026年儿童康复救助经办机构名录「宿迁市残疾人康复指导中心（代办苏宿工业园区）」一条，办公地点写明在市残联。该号码是康复指导中心电话。",
    sourceName: "江苏省残联2026年度残疾儿童康复救助经办机构信息",
    sourceUrl:
      "https://www.jscl.gov.cn/html/category/TZGG/article/690d73c3eedc4c1d827605c865d33f11.html",
  },
  TNA: {
    phones: ["0531-89730856","0531-68966371"],
    website: "http://zwfw.jinan.gov.cn/",
    notes:
      "济南市政务服务网「全国残疾人按比例就业情况联网认证」咨询电话。办理地点：市中区站前路9号省市一体化行政审批服务大厅3楼综合受理窗口。机关办公地址请再核市残联。",
    sourceName: "济南市政务服务网",
    sourceUrl:
      "http://zwfw.jinan.gov.cn/jpaas-jiq-web-jnywtb/front/transition/ywTransToDetail?areaCode=370100000000&innerCode=068d017e-bc22-409e-9d49-11abdb1c366c&taskType=GG",
  },
  ZOS: {
    address: "舟山市临城新区临长路195号",
    phones: ["0580-2181901"],
    website: "http://zscl.gov.cn/",
    notes:
      "官网页脚：地址临城新区临长路195号，信访电话0580-2181901。办证、补贴到区县残联窗口，也可拨12385。",
    sourceName: "舟山市残疾人联合会官网",
    sourceUrl: "http://zscl.gov.cn/list/5.html",
  },
  ZBO: {
    phones: ["0533-2182477"],
    website: "http://www.zbgxyg.org.cn/",
    notes:
      "淄博市残联官网页脚联系电话。中文域名：淄博市残疾人联合会.公益。办公地址该页未写。",
    sourceName: "淄博市残疾人联合会官网",
    sourceUrl: "http://www.zbgxyg.org.cn/",
  },
  WEH: {
    address: "威海市世昌大道45号",
    postcode: "264200",
    phones: ["0631-5232591","0631-5897679","0631-5890179"],
    website: "http://canlian.weihai.gov.cn/",
    notes:
      "官网页脚：办公室0631-5232591，政策咨询0631-5897679，就业咨询5890179（已补区号0631）。",
    sourceName: "威海市残疾人联合会官网",
    sourceUrl: "http://canlian.weihai.gov.cn/",
  },
  JNG: {
    address: "济宁市太白湖新区省运会指挥中心",
    postcode: "272019",
    website: "http://www.jnscl.org.cn/",
    notes: "官网页脚地址、邮编。机关总机该页未公布，请拨12385或到区县窗口。",
    sourceName: "济宁市残疾人联合会官网",
    sourceUrl: "http://www.jnscl.org.cn/",
  },
  YNT: {
    phones: ["0535-6883000","0535-6883335","0535-6883353"],
    website: "https://ytcl.yantai.gov.cn/",
    notes:
      "官网组织机构栏目（2024-01-04）：维权6883000、康复6883335、教育就业6883353，原文未写区号，按烟台0535补全。办公室6886557。两项补贴标准见烟台2026年办事指南专条。",
    sourceName: "烟台市残联组织机构",
    sourceUrl: "https://ytcl.yantai.gov.cn/art/2024/1/4/art_110754_2889614.html",
  },
  WEF: {
    address: "潍坊市市政府综合办公大楼一楼",
    postcode: "261061",
    website: "http://www.wfscl.org.cn/",
    notes: "官网页脚地址、邮编。机关总机请以官网或12385为准。",
    sourceName: "潍坊市残疾人联合会官网",
    sourceUrl: "http://www.wfscl.org.cn/",
  },
  TAO: {
    website: "http://www.qingdao.gov.cn/",
    notes:
      "请通过青岛政务网残联栏目、区残联窗口或12385办理。市南区办证室见本黄页区县条目。",
    sourceName: "青岛市政府网",
    sourceUrl: "http://www.qingdao.gov.cn/",
  },
  TAI: {
    phones: ["0538-6992582"],
    notes:
      "泰安市行政审批服务局《残疾人服务一件事》指南（2025-09-08）列出的市残联咨询电话。该号码与泰山区残联相同。各县市区电话见本黄页区县条目。",
    sourceName: "泰安市残疾人服务一件事服务指南",
    sourceUrl: "http://smzj.taian.gov.cn/art/2025/9/8/art_360740_10330776.html",
  },
  ZZE: {
    address: "枣庄市薛城区民生路629号",
    postcode: "277800",
    website: "http://www.zzscl.org.cn/",
    notes: "官网页脚地址、邮编。机关总机该页未写。两项补贴标准见枣民字〔2024〕9号专条。",
    sourceName: "枣庄市残疾人联合会官网",
    sourceUrl: "http://www.zzscl.org.cn/",
  },
  DZH: {
    address: "德州市经济开发区东风东路1566号",
    phones: ["0534-2671698"],
    website: "http://canlian.dezhou.gov.cn/",
    notes:
      "官网页脚地址东风东路1566号。2026年德城区联网认证通告咨询0534-2671698（德城区残联）。市本级总机官网页脚未写，其他县区请核当地窗口。页脚举报电话不是办事电话，本条不收录。",
    sourceName: "德州市残疾人联合会官网；德城区2026年审核认定公告",
    sourceUrl: "http://www.decheng.gov.cn/n55840578/n55840694/c99235131/content.html",
  },
  LYI: {
    phones: ["0539-7907305"],
    website: "http://www.sddpf.org.cn/col/col85247/index.html",
    notes:
      "临沂市残联栏目在省残联网站。2026年沂南县联网认证窗口：银杏路10号，0539-7907305；郯城县府前街127号，0539-6150288。市本级总机未在本条收录。2026年两项补贴见市民政局专条。",
    sourceName: "沂南县人民政府（2026年联网认证通告）；山东省残联临沂市栏目",
    sourceUrl: "http://www.yinan.gov.cn/info/6127/171693.htm",
  },
  CCN: {
    address: "长春市南关区大经路1898号",
    postcode: "130041",
    phones: ["0431-88631873"],
    website: "http://www.ccdpf.org.cn/",
    notes:
      "市残联官网页脚：咨询电话0431-88631873，地址南关区大经路1898号。2026年联网认证通告由市残疾人培训就业服务中心发布，网上走吉林省政务服务网或 jldpf.org.cn。各区县审核窗口电话见「长春2026年审」专条。",
    sourceName: "长春市残疾人联合会",
    sourceUrl: "http://www.ccdpf.org.cn/",
  },
  FOC: {
    phones: ["0591-83226521"],
    website: "https://www.fzcl.gov.cn/",
    notes:
      "福州市政府网残疾人证办理指南咨询热线：市残联康复（组联）处0591-83226521。各县市区办证大厅见本黄页区县条目。",
    sourceName: "福州市政府网残疾人证办理",
    sourceUrl: "https://www.fuzhou.gov.cn/nrrh/fzcl/202309/t20230926_4686128.htm",
  },
  HEZ: {
    notes:
      "菏泽鲁西新区2026年4月公开两项补贴标准，见政策库专条。市本级机关总机未在本条收录，请拨12385或到区县窗口。",
    sourceName: "菏泽鲁西新区社会事业局",
    sourceUrl:
      "http://hzlxxq.heze.gov.cn/2c90808883d172a50183e92b23f20071/2c9080888606476701866dfdfb0f006e/2052219261245669376.html",
  },
  YZS: {
    address: "永州市冷水滩区湘江东路166号（潇湘大厦14楼）",
    phones: ["0746-2875209"],
    website: "https://cl.yzcity.gov.cn/",
    notes:
      "市残联2026年7月8日《各级残联组织办公（办证）地址及联系电话一览表》将0746-2875209列为办公联系电话。网站页脚同时把该号码标为党风廉政建设举报电话。办证请到各区县政务窗口，也可拨12385。",
    sourceName: "永州市残联办公办证地址电话一览表",
    sourceUrl: "https://cl.yzcity.gov.cn/cl/0201/202607/b8696f6878c747b7934a80f3b48ba72d.shtml",
  },
  QZJ: {
    phones: ["0595-27399952","0595-27550919"],
    notes:
      "泉州市政府网《残疾人服务》指南（2025-10-10）：残疾人服务“一件事”咨询电话0595-27399952、0595-27550919，责任单位泉州市残联。另有残疾人心理援助热线0595-22107892（周一至周日8:30–12:00、14:30–21:00）。",
    sourceName: "泉州市政府网残疾人服务指南",
    sourceUrl: "https://www.quanzhou.gov.cn/zfb/wsbs/nrrh/202510/t20251010_3216756.htm",
  },
  DLC: {
    phones: ["0411-83797601"],
    website: "https://www.daliandpf.org.cn/",
    notes: "大连市残联官网页脚电话（0411）83797601。办公地址该页未写入本条。",
    sourceName: "大连市残疾人联合会官网",
    sourceUrl: "https://www.daliandpf.org.cn/",
  },
  HYS: {
    address: "衡阳市延安路",
    phones: ["0734-8888001"],
    website: "http://www.hydpf.org/",
    notes:
      "官网页脚：地址衡阳市延安路，联系电话0734-8888001。页脚未写门牌号。2026年1月市残联转发湘民发〔2026〕4号，本市是否高于省指导110元请核当地公示。",
    sourceName: "衡阳市残疾人联合会官网",
    sourceUrl: "http://www.hydpf.org/",
  },
  SHE: {
    address: "沈阳市皇姑区北陵大街5号",
    phones: ["024-83960566"],
    website: "https://www.sydpf.cn/",
    notes:
      "市残联官网 sydpf.cn。2026年联网认证通告：市直窗口在皇姑区北陵大街5号市残疾人服务中心1楼就业服务大厅，电话024-83960566。区县就业服务机构电话见通告附件3。",
    sourceName: "沈阳市残疾人联合会",
    sourceUrl: "https://www.sydpf.cn/zwgk/gsgg/202602/t20260227_4992107.html",
  },
  DGG: {
    address: "东莞市莞城街道创业路6号",
    postcode: "523011",
    phones: ["0769-22237183"],
    website: "http://www.gddgdpf.org.cn/",
    notes:
      "东莞市残联官网页脚：地址莞城街道创业路6号，电话0769-22237183，邮编523011。2026年生活补贴见市民政局专条。",
    sourceName: "东莞市残疾人联合会官网",
    sourceUrl: "http://www.gddgdpf.org.cn/",
  },
  HUI: {
    address: "惠州市惠城区三新北路31号7楼",
    phones: ["0752-2892155"],
    website: "http://cl.huizhou.gov.cn/",
    notes:
      "市残联网站表彰公示联系栏：电话0752-2892155，地址惠城区三新北路31号7楼。",
    sourceName: "惠州市残疾人联合会官网",
    sourceUrl:
      "http://cl.huizhou.gov.cn/pages/cms/hzcl/html/tzgg/423fcb35533b4891b997314c5fca48c7.html?cataId=54c30787ce204aee818110ef87118b79",
  },
  GZH: {
    address: "赣州市市政中心",
    postcode: "341000",
    phones: ["0797-8391785"],
    website: "http://www.gzhdpf.org.cn/",
    notes:
      "赣州市残联官网页脚：电话0797-8391785，地址市政中心，邮编341000。2026年市本级年审窗口：章贡区长征大道市政中心双子楼南楼1607室，电话0797-8991783。",
    sourceName: "赣州市残疾人联合会官网",
    sourceUrl: "http://www.gzhdpf.org.cn/c100762/202603/707cd7667be64c5fad3220df279d68e1.shtml",
  },
  JIU: {
    address: "九江市八里湖新区市民服务中心西楼A区4楼",
    phones: ["0792-8587464"],
    website: "https://www.jjdpf.org.cn/",
    notes:
      "九江市残联官网页脚：地址八里湖新区市民服务中心西楼A区4楼，电话0792-8587464。",
    sourceName: "九江市残疾人联合会官网",
    sourceUrl: "https://www.jjdpf.org.cn/",
  },
  KMG: {
    website: "http://cl.km.gov.cn/",
    notes:
      "昆明市残联官网 cl.km.gov.cn。机关总机、办公地址该站首页未写入本条。两项补贴见省云民发〔2026〕2号及安宁等县市公示。",
    sourceName: "昆明市残疾人联合会官网",
    sourceUrl: "http://cl.km.gov.cn/",
  },
  NNG: {
    address: "南宁市北湖北路42号",
    phones: ["0771-2832905","0771-2832180"],
    website: "http://www.gxnndpf.org.cn/",
    notes:
      "市残联官网：地址北湖北路42号，页脚电话0771-2832905。《联系我们》列办公室0771-2832905、0771-2832180。",
    sourceName: "南宁市残疾人联合会官网",
    sourceUrl: "http://www.gxnndpf.org.cn/html/cljj/lxwm/",
  },
  URC: {
    phones: ["0991-3776030"],
    notes:
      "自治区残联官网领导信箱回复：可咨询乌鲁木齐市残联，联系电话3776030。原文未写区号，按乌鲁木齐0991补全。办公地址该条未写。",
    sourceName: "新疆维吾尔自治区残疾人联合会",
    sourceUrl:
      "https://www.xjdpf.org.cn/xwz/ldxx-xx.jsp?urltype=leadermail.LeaderMailContentUrl&wbtreeid=1234&leadermailid=B65BE214DE7D93B14AA57D4BEF15BE97",
  },
  SJZ: {
    address: "石家庄市新华区兴凯路219号",
    phones: ["0311-87851860"],
    website: "http://www.sjzcl.org/",
    notes:
      "市残联官网页脚：地址新华区兴凯路219号，联系电话0311-87851860，残疾人服务热线12385。采购公告联系电话不是机关总机，本条不另收。",
    sourceName: "石家庄市残疾人联合会官网",
    sourceUrl: "http://www.sjzcl.org/",
  },
  SXS: {
    website: "http://sxcl.sx.gov.cn/",
    notes:
      "绍兴市残联官网 sxcl.sx.gov.cn。机关总机、办公地址该站首页未写入本条，请拨12385。",
    sourceName: "绍兴市残疾人联合会官网",
    sourceUrl: "http://sxcl.sx.gov.cn/",
  },
  ZUH: {
    address: "珠海市香洲区兴业路6号",
    website: "https://www.zhdpf.org.cn/",
    notes:
      "市残联官网页脚：地址香洲区兴业路6号，咨询电话12385。页脚传真0756-2771896不是办事总机。",
    sourceName: "珠海市残疾人联合会官网",
    sourceUrl: "https://www.zhdpf.org.cn/",
  },
  RZH: {
    website: "http://www.sddpf.org.cn/col/col85494/index.html",
    notes: "日照市残联栏目在省残联网站。市本级总机未在本条收录。",
    sourceName: "山东省残联日照市栏目",
    sourceUrl: "http://www.sddpf.org.cn/col/col85494/index.html",
  },
  TANG: {
    address: "唐山市龙泽南路51号",
    phones: ["0315-2823094"],
    website: "https://hbtsdpf.org.cn/",
    notes:
      "市残联官网页脚：地址龙泽南路51号，就业服务热线0315-2823094。页脚另有信访热线，本条不收录为办事电话。",
    sourceName: "唐山市残疾人联合会官网",
    sourceUrl: "https://hbtsdpf.org.cn/",
  },
  HET: {
    address: "呼和浩特市新城区水岸小镇G区4号楼5楼",
    postcode: "010000",
    phones: ["0471-3966871"],
    website: "http://www.hscjr.org.cn/",
    notes:
      "市残联官网（hscjr.org.cn）页脚：地址新城区水岸小镇G区4号楼5楼，电话0471-3966871，邮编010000。2026年联网认证通告在市残疾人就业服务中心网站 hhhtcjrjy.cn。2025年招聘公示另写监督举报0471-3966971，不是办事总机。",
    sourceName: "呼和浩特市残疾人联合会官网；市残疾人就业服务中心",
    sourceUrl: "http://www.hhhtcjrjy.cn/contents/146/812.html",
  },
  JYG: {
    address: "嘉峪关市迎宾西路689号",
    phones: ["0937-6321621","0937-6324742"],
    website: "https://www.jygcanlian.cn/",
    notes:
      "市残联官网组织机构栏目：地址迎宾西路689号。办公室0937-6321621，业务科0937-6324742。同页另有维权科0937-6316501、康复托养中心、就业中心分机，办事优先打办公室或12385。",
    sourceName: "嘉峪关市残疾人联合会官网",
    sourceUrl: "https://www.jygcanlian.cn/lxwm",
  },
  JMN2: {
    address: "江门市龙湾东路40号2幢",
    postcode: "529000",
    website: "http://www.jmdpf.org.cn/",
    notes:
      "市残联官网页脚：地址龙湾东路40号2幢，邮编529000。机关总机该页未公布。2026年两项补贴见江财社〔2026〕29号专条。",
    sourceName: "江门市残疾人联合会官网",
    sourceUrl: "http://www.jmdpf.org.cn/",
  },
  SWA: {
    address: "汕尾市城区政和路4号大院内",
    phones: ["0660-3386882"],
    website: "https://swsadmin.shanwei.gov.cn/sdpf/zwgk/list_11.shtml",
    notes:
      "汕尾市政府网市残联政务公开栏目页脚：地址城区政和路4号大院内，电话0660-3386882。页脚传真0660-3385027不是办事电话。",
    sourceName: "汕尾市残疾人联合会（市政府网）",
    sourceUrl: "https://swsadmin.shanwei.gov.cn/sdpf/zwgk/list_11.shtml",
  },
  NCH: {
    address: "南昌市红谷滩区丽景路869号",
    phones: ["0791-86806267"],
    notes:
      "江西省2025年残疾儿童康复救助经办机构信息（赣州市残联网站转载）：南昌市残联在红谷滩区丽景路869号，0791-86806267为该名录中的康复救助经办电话，不是确认的机关总机。",
    sourceName: "江西省残疾儿童康复救助经办机构信息（2025年）",
    sourceUrl:
      "http://www.gzhdpf.org.cn/c100762/202601/f6199837fe644198b4a83df0267155e9/files/46c676e162834d86ac925523bdc5f45b.pdf",
  },
  CGO: {
    address: "郑州市二七区淮河路53号",
    postcode: "450052",
    phones: ["0371-67580958","0371-67181093"],
    website: "https://zz.henancjr.org.cn/",
    notes:
      "市残联官网页脚：地址淮河路53号。2026年联网认证窗口：中原区中原西路80号郑发大厦三楼市政务服务中心综合受理区，电话0371-67580958、0371-67181093（市残联税务局公告附件未写区号，按郑州0371补全）。就业服务中心机关在经开区第四大街64号，0371-67398011，见黄页「郑州就业服务中心」。市残联机关总机官网未公布。",
    sourceName: "郑州市残联2026年联网认证公告；市残联官网",
    sourceUrl: "http://www.cjrkfjyzx.com/show.asp?id=523",
  },
  ZHA: {
    website: "http://www.gdzjcl.org.cn/",
    notes:
      "湛江市残联官网 gdzjcl.org.cn。机关地址、总机该站首页未写入本条，请拨12385。",
    sourceName: "湛江市残疾人联合会官网",
    sourceUrl: "http://www.gdzjcl.org.cn/",
  },
  INC: {
    address: "银川市金凤区宁安南街369号",
    postcode: "750011",
    phones: ["0951-5180058","0951-5180085"],
    website: "http://cl.yinchuan.gov.cn/",
    notes:
      "市残联官网页脚：联系电话0951-5180058、0951-5180085。地址、邮编取自官网2025年11月规划征求意见公告：金凤区宁安南街369号，邮编750011。",
    sourceName: "银川市残疾人联合会官网",
    sourceUrl: "http://cl.yinchuan.gov.cn/",
  },
  HHS: {
    phones: ["0745-8665882"],
    website: "http://www.hhsdpf.org.cn/",
    notes:
      "市残联官网 hhsdpf.org.cn。2026年市本级联网认证通告咨询电话0745-8665882（原文写745-8665882，按怀化0745补全区号）。机关办公地址该通告未写。鹤城区级单位到区残联。",
    sourceName: "怀化市残疾人联合会",
    sourceUrl:
      "http://www.hhsdpf.org.cn/hhsdpf/c121993/202603/08aff47f67c4465890a497bc865b0e04.shtml",
  },
  JYS: {
    phones: ["0663-8256863"],
    website: "https://jydpf.org/",
    notes:
      "2026年联网认证通告：市残疾人就业培训服务中心0663-8256863。区县残联：榕城0663-8622670、揭东0663-6190928、揭西0663-5586339、普宁0663-2220572、惠来0663-6612708。机关办公地址该通告未写。",
    sourceName: "揭阳市人民政府（揭阳残联）",
    sourceUrl: "http://www.jieyang.gov.cn/zzzq/gsgg/content/post_1018991.html",
  },
  TCG: {
    address: "沙湾市政府高层16楼1606室",
    phones: ["0993-6017935"],
    notes:
      "沙湾市残联2026年联网认证通告：窗口在沙湾市政府高层16楼1606室（市残疾人劳动就业服务所），电话0993-6017935（原文写6017935，按沙湾0993补全区号）。此为沙湾窗口，塔城地区其他县市请核当地残联。",
    sourceName: "沙湾市人民政府（市残联）",
    sourceUrl: "https://www.xjsw.gov.cn/zwdt/gsgg/content_31323",
  },
  MDJ: {
    address: "林口县党政中心一楼112A室",
    phones: ["0453-3527145"],
    notes:
      "林口县残联2026年审核认定通知：窗口在林口县党政中心一楼112A室（县残疾人就业服务所），电话0453-3527145。此为林口窗口，牡丹江市本级及其他县区请核当地残联。",
    sourceName: "林口县残疾人联合会（县政府网）",
    sourceUrl:
      "https://www.linkou.gov.cn/mdjlkxrmzf/bmdt31_LK/202603/1038124/files/%E6%9E%97%E5%8F%A3%E5%8E%BF%E6%AE%8B%E7%96%BE%E4%BA%BA%E8%81%94%E5%90%88%E4%BC%9A%E5%85%B3%E4%BA%8E%E5%BC%80%E5%B1%952026%E5%B9%B4%E6%8C%89%E6%AF%94%E4%BE%8B%E5%AE%89%E6%8E%92%E6%AE%8B%E7%96%BE%E4%BA%BA%E5%B0%B1%E4%B8%9A%E5%AE%A1%E6%A0%B8%E8%AE%A4%E5%AE%9A%E5%B7%A5%E4%BD%9C%E7%9A%84%E9%80%9A%E7%9F%A5.pdf",
  },
  ZZS2: {
    address: "湖南省醴陵市中兴街58号",
    phones: ["0731-23269125"],
    website: "http://www.llcl.org/",
    notes:
      "醴陵市残联2026年联网认证通告：地址中兴街58号，咨询0731-23269125。此为醴陵窗口，株洲市本级及其他县区请核当地残联。",
    sourceName: "醴陵市残疾人联合会",
    sourceUrl: "http://www.llcl.org/llcl/zhm/articleview.asp?id=560&menu=4",
  },
  MAS: {
    address: "马鞍山市花山区重阳路与江东大道交叉口",
    postcode: "243100",
    phones: ["0555-3899300"],
    website: "http://www.masscl.com.cn/",
    notes:
      "官网页脚：地址花山区重阳路与江东大道交叉口，邮编243100，电话0555-3899300。2026年联网认证已于3月启动，见政策库专条。",
    sourceName: "马鞍山市残疾人联合会官网",
    sourceUrl: "http://www.masscl.com.cn/",
  },
  BAO: {
    address: "宝鸡市金台大道21号",
    postcode: "721000",
    phones: ["0917-3577985"],
    website: "https://www.bjdpf.org.cn/",
    notes:
      "市残联官网页脚：电话0917-3577985，地址金台大道21号，邮编721000。2026年联网认证通告见官网通知栏。各县区两项补贴请核当地公示。",
    sourceName: "宝鸡市残疾人联合会官网",
    sourceUrl: "https://www.bjdpf.org.cn/",
  },
  BTO: {
    address: "包头市青山区幸福南路4号",
    postcode: "014030",
    phones: ["0472-3322910"],
    website: "http://www.btcl.gov.cn/",
    notes:
      "市残联官网页脚：地址青山区幸福南路4号，邮编014030，电话0472-3322910。页脚传真0472-3322919不是办事电话。2026年联网认证见政策库专条。",
    sourceName: "包头市残疾人联合会官网",
    sourceUrl: "http://www.btcl.gov.cn/",
  },
  TYN: {
    address: "太原市羊市街33号",
    postcode: "030002",
    phones: ["0351-8821920"],
    website: "https://taiyuan.gov.cn/nsbm.html",
    notes:
      "太原市政府门户市残联栏目页脚：主办单位太原市残疾人联合会，联系电话0351-8821920（原文两个连字符），地址羊市街33号，邮编030002。2026年联网认证见尖草坪区通告专条。",
    sourceName: "太原市人民政府（市残联栏目）",
    sourceUrl: "https://taiyuan.gov.cn/nsbm.html",
  },
  ZYS2: {
    address: "遵义市新蒲新区府前路建投大厦3号楼420室",
    phones: ["0851-27613050"],
    website: "https://cl.zunyi.gov.cn/",
    notes: "市残联网站页脚：地址新蒲新区府前路建投大厦3号楼420室，电话0851-27613050。办证、补贴到区县窗口。",
    sourceName: "遵义市残疾人联合会官网",
    sourceUrl: "https://cl.zunyi.gov.cn/",
  },
  GYS: {
    address: "广元市东坝兴安路459号",
    phones: ["0839-2301201"],
    website: "https://cl.cngy.gov.cn/",
    notes:
      "市残联网站页脚：地址东坝兴安路459号，电话0839-2301201。2026年联网认证3月1日至10月31日见政策库专条。超比例奖励1000元/人年。安排比例执行省1.6%。",
    sourceName: "广元市残疾人联合会官网",
    sourceUrl: "https://cl.cngy.gov.cn/",
  },
  KWE: {
    website: "https://www.gydpf.org.cn/",
    notes:
      "贵阳市残联官网 gydpf.org.cn。机关总机、办公地址该站首页未写入本条，请拨12385或到区残联窗口。岗位补贴、超比例奖励见政策库专条。",
    sourceName: "贵阳市残疾人联合会官网",
    sourceUrl: "https://www.gydpf.org.cn/",
  },
  XNN: {
    address: "西宁市城北区海湖大道体育公园向北100米",
    notes:
      "地址取自西宁市公共资源交易网2026年8月7日「西宁市残疾人联合会（本级）」采购公告中的采购人联系地址。该公告电话0971-6163831是项目联系人，不是确认的机关总机，本条不收录。办事请打12385。",
    sourceName: "西宁市公共资源交易网（市残联本级采购公告）",
    sourceUrl: "http://111.44.251.34/xin/jyxx/001002/001002001/20260807/2388303491425146.html",
  },
  AKS: {
    address: "安康市汉滨区新城办香溪路枣树巷三号",
    phones: ["0915-3203311"],
    notes:
      "安康市政府网2026年联网认证通告「市本级」窗口：汉滨区新城办香溪路枣树巷三号，0915-3203311。各县区窗口见本黄页安康区县条目。",
    sourceName: "安康市人民政府（2026年联网认证通告）",
    sourceUrl: "https://www.ankang.gov.cn/Content-2905181.html",
  },
  JXS: {
    phones: ["0467-2665562"],
    notes:
      "鸡冠区残联2026年联网认证通告咨询0467-2665562。此为鸡冠区窗口，鸡西市本级及其他县区请核当地残联。",
    sourceName: "鸡西市鸡冠区残疾人联合会",
    sourceUrl: "https://www.jgq.gov.cn/jgq/c101106/202602/c06_356362.shtml",
  },
  HEH: {
    address: "孙吴县中央街354号",
    phones: ["0456-8424996"],
    notes:
      "孙吴县残联2026年联网认证通知：窗口中央街354号，电话0456-8424996。此为孙吴窗口，黑河市本级及其他县市请核当地残联。北安申报期另为4月1日起。",
    sourceName: "孙吴县残疾人联合会",
    sourceUrl: "https://www.hljsunwu.gov.cn/swx/c100750/202604/c11_351416.shtml",
  },
  JYS2: {
    address: "酒泉市新城区市政大厦",
    website: "https://jqscl.org.cn/",
    notes: "市残联官网页脚通讯地址：甘肃省酒泉市新城区市政大厦。机关总机该页未写入本条，请拨12385。",
    sourceName: "酒泉市残疾人联合会官网",
    sourceUrl: "https://jqscl.org.cn/",
  },
  WZS2: {
    address: "吴忠市利通区富平北街581号",
    postcode: "751100",
    notes:
      "地址取自宁夏政府采购网2026年6月市残联本级采购公告：利通区富平北街581号。市政府2022年规划征求意见曾写富平路581号、0953-2255165，该号码是否仍为办事电话请再核，本条暂不收录。请拨12385。",
    sourceName: "宁夏政府采购网（吴忠市残联本级采购公告）",
    sourceUrl:
      "https://www.ccgp-ningxia.gov.cn/site/NoticeFullProcess.do?noticeType=gzgg&noticeId=8b80b27b9e4a1644019eee870d4e0b4a&tab=SX&type=110",
  },
  ZYS: {
    address: "资阳市民服务中心A栋501-16",
    website: "https://zycanlian.org.cn/",
    notes:
      "市残联官网页脚：地址资阳市民服务中心A栋501-16。页脚「投诉电话」028-26110285不是办事总机，本条不收录。请拨12385或到区县窗口。",
    sourceName: "资阳市残疾人联合会官网",
    sourceUrl: "https://zycanlian.org.cn/",
  },
  JLS: {
    address: "吉林市昌邑区解放东路66号",
    phones: ["0432-62401596"],
    website: "http://jlsdpf.jlcity.gov.cn/",
    notes:
      "市残联官网页脚：地址昌邑区解放东路66号，监督电话0432-62401596。该号码页脚标明为监督电话，不是确认的办事总机。办事请拨12385或到区县窗口。",
    sourceName: "吉林市残疾人联合会官网",
    sourceUrl: "http://jlsdpf.jlcity.gov.cn/",
  },
  LYA2: {
    address: "洛阳市洛龙区金城寨街26号",
    notes:
      "河南省政府采购网、全国公共资源交易平台2026年洛阳市残联本级采购公告多次写采购人地址洛龙区金城寨街26号。公告中的项目联系人电话不是确认的机关总机，本条不收录。请拨12385。",
    sourceName: "河南省政府采购网（洛阳市残联本级采购公告）",
    sourceUrl: "https://zfcg.henan.gov.cn/luoyang/content?infoId=2001114&channelCode=H641402&bz=1",
  },
  LXA: {
    address: "拉萨市城关区古泽西路2号",
    phones: ["0891-6363983"],
    notes:
      "拉萨市司法局2025年11月行政执法公示：市残联办公地址城关区古泽西路2号，监督电话0891-6363983。该号码为监督电话，不是确认的办事总机。请拨12385。",
    sourceName: "拉萨市司法局行政执法公示",
    sourceUrl: "https://sfj.lasa.gov.cn/sfj/ztxx/202511/642ef4a4a6a94fd480d7d1e2b5a934d1.shtml",
  },
  HAK: {
    address: "海口市美兰区海甸一西路",
    notes:
      "海口市公共资源交易中心2026年8月17日市残联采购公告：采购人地址美兰区海甸一西路。公告手机号是项目联系人，本条不收录为机关总机。秀英区窗口见本黄页区县条目。请拨12385。",
    sourceName: "海口市公共资源交易中心（市残联采购公告）",
    sourceUrl: "http://ggzy.haikou.gov.cn/gonggao/94672",
  },
  LFG: {
    address: "廊坊市广阳区祥云北道廊坊市市民服务中心",
    postcode: "065000",
    notes:
      "廊坊市政府网2026年4月20日市残联征集评残线索公告：来信寄广阳区祥云北道廊坊市市民服务中心（廊坊市残疾人联合会收），邮编065000。机关总机该公告未写，请拨12385。",
    sourceName: "廊坊市人民政府（市残联征集线索公告）",
    sourceUrl: "https://www.lf.gov.cn/Item/155171.aspx",
  },
  SQS: {
    phones: ["0370-2070511"],
    website: "https://www.sqcl.gov.cn/",
    notes:
      "市残联官网页脚联系电话0370-2070511。2026年3月23日发布全市联网认证和残保金申报缴纳公告，正文请打开官网通知。机关门牌该页脚未写。",
    sourceName: "商丘市残疾人联合会官网",
    sourceUrl: "https://www.sqcl.gov.cn/",
  },
  EZS: {
    address: "鄂州市鄂城区古楼街道与武昌大道交叉口100米",
    phones: ["027-56909170"],
    notes:
      "鄂城区政府网2026年联网认证通告：鄂城区残疾人劳动就业康复服务站咨询027-56909170，地址古楼街道与武昌大道交叉口100米。此为鄂城区窗口，市本级及其他区请核当地残联。",
    sourceName: "鄂州市鄂城区人民政府",
    sourceUrl: "https://www.echeng.gov.cn/zxzx/bmxx/202602/t20260228_752042.html",
  },
  XMN: {
    address: "厦门市思明区仙岳路468号",
    notes:
      "厦门招投标系统2026年6月市残联辅助器具供应服务征集公告：征集人联系地址思明区仙岳路468号。公告电话是项目联系人，本条不收录为机关总机。请拨12385。",
    sourceName: "厦门招投标系统（市残联2026年征集公告）",
    sourceUrl: "https://www.xmztb.com/freecms/site/wxpt/ggxx/info/2026/ff8080819f15f902019f17d06ab20028.html",
  },
  TLT: {
    phones: ["0475-2730867"],
    website: "https://canl.tongliao.gov.cn/shicl/",
    notes:
      "市残联官网页脚联系电话0475-2730867。页脚地址只写「通辽市残疾人联合会」，未写街道门牌。",
    sourceName: "通辽市残疾人联合会官网",
    sourceUrl: "https://canl.tongliao.gov.cn/shicl/",
  },
  LAA: {
    phones: ["0564-3370859"],
    notes:
      "六安市政府网2026年2月25日联网认证通告：市残联业务咨询0564-3370859。机关门牌该通告未写。审核期3月1日—10月31日。",
    sourceName: "六安市人民政府（市残联2026年审通告）",
    sourceUrl: "https://www.luan.gov.cn/public/6609131/10769739.html",
  },
  ZJK: {
    address: "张家口市高新区朝阳西大街16号",
    phones: ["0313-7157000"],
    website: "https://www.zjkscl.gov.cn/",
    notes:
      "市残联官网机构查询：市残疾人劳动服务中心、市残疾人康复指导中心均在高新区朝阳西大街16号，电话7157000（原文未写区号，按张家口0313补全）。宣化、康保窗口见本黄页区县条目。",
    sourceName: "张家口市残疾人联合会官网",
    sourceUrl: "https://www.zjkscl.gov.cn/project/search.html",
  },
  YBS: {
    address: "宜宾市叙州区南岸西区永安路6号（市残疾人康复中心8楼）",
    phones: ["0831-8201212"],
    notes:
      "四川省公共资源交易平台2026年6月、全国公共资源交易平台2026年7月市残联采购公告：采购人地址叙州区南岸西区永安路6号（市残疾人康复中心8楼），联系方式0831-8201212。该号码是采购公告联系电话，不是确认的机关总机。",
    sourceName: "四川省公共资源交易平台（宜宾市残联采购公告）",
    sourceUrl: "https://ggzyjy.sc.gov.cn/jyxx/002002/002002001/20260626/8a69c96d9eff818c019f03732ffd6dca.html",
  },
  YUL2: {
    address: "榆林市高新区广源路6号",
    notes:
      "陕西省编办事业单位年报（2026年4月）：榆林市残疾人服务中心住所高新区广源路6号。机关总机该年报未写，请拨12385。",
    sourceName: "陕西省事业单位监督管理（榆林市残疾人服务中心年报）",
    sourceUrl: "https://www.sxbb.gov.cn/site-sxdjgl/yearlyReport_view/315543",
  },
  BOZ: {
    notes:
      "谯城区政府网2026年2月27日残联、税务局联合通告：全区联网认证2026年3月1日至10月31日。咨询0558-5534854。市本级门牌该通告未写。谯城窗口见本黄页区县条目。",
    sourceName: "亳州市谯城区人民政府",
    sourceUrl: "https://www.bzqc.gov.cn/XxgkContent/show/2974256.html",
  },
};

/** 南京市区县残联及办证大厅。 */
export const NJ_DISTRICTS = [
  { id: "xuanwu", name: "南京市玄武区残疾人联合会", shortName: "玄武残联", address: "玄武区花园路2号万豪大厦五楼", phones: ["025-84818405"], notes: "办证大厅同址，电话025-84819760。" },
  { id: "qinhuai", name: "南京市秦淮区残疾人联合会", shortName: "秦淮残联", address: "秦淮区太平巷18号", phones: ["025-84854689"], notes: "办证大厅同址同电话。" },
  { id: "jianye", name: "南京市建邺区残疾人联合会", shortName: "建邺残联", address: "南京市雨润大街99号三号楼1109室", phones: ["025-87778038"], notes: "办证大厅：雨润大街99号三号楼1102室，电话025-87778447。" },
  { id: "gulou", name: "南京市鼓楼区残疾人联合会", shortName: "鼓楼残联", address: "南京市鼓楼区山西路84号三楼", phones: ["025-84714093"], notes: "办证大厅：山西路84号三楼A314，电话025-83230476。" },
  { id: "qixia", name: "南京市栖霞区残疾人联合会", shortName: "栖霞残联", address: "栖霞区文苑路118号政务办公中心8楼", phones: ["025-85336008"], notes: "办证大厅：文苑路118号一楼A厅40号窗口，电话025-85561817。" },
  { id: "yuhuatai", name: "南京市雨花台区残疾人联合会", shortName: "雨花台残联", address: "竹影路5号1号楼", phones: ["025-52883395"], notes: "办证大厅：竹影路5号1号楼516室，电话025-52883096。" },
  { id: "jiangning", name: "南京市江宁区残疾人联合会", shortName: "江宁残联", address: "江宁区竹山路78－4号5楼", phones: ["025-51192205"], notes: "办证大厅同址五楼，电话同机关。" },
  {
    id: "pukou",
    name: "南京市浦口区残疾人联合会",
    shortName: "浦口残联",
    address: "浦口区江浦街道上河街26号",
    phones: ["025-58882129","025-58882155"],
    notes: "办证大厅：江浦街道象山路4号B座政务服务中心1楼5号窗口，电话025-69659314、025-69659315。",
  },
  { id: "liuhe", name: "南京市六合区残疾人联合会", shortName: "六合残联", address: "六合区金江公路汪杨98号", phones: ["025-57759957"], notes: "办证大厅：龙池路333号市民中心一楼，电话025-57501230。" },
  {
    id: "jiangbei",
    name: "南京市江北新区残疾人联合会",
    shortName: "江北新区残联",
    address: "凤滁路48号A座320室",
    phones: ["025-88020952"],
    notes: "办证大厅：丽景路2号江北新区政务服务中心残联窗口，电话025-57067173、025-57067192。",
  },
  { id: "lishui", name: "南京市溧水区残疾人联合会", shortName: "溧水残联", address: "溧水区永阳街道后巷18号", phones: ["025-56220659"], notes: "办证大厅：永阳街道后巷18号一楼综合服务大厅，电话025-56220085。" },
  { id: "gaochun", name: "南京市高淳区残疾人联合会", shortName: "高淳残联", address: "高淳区淳溪街道汶溪路193－2号", phones: ["025-57338390"], notes: "办证大厅同址同电话。" },
] as const;

/** 江苏省残联2026年度残疾儿童康复救助经办机构信息。 */
export const JS_COUNTY_REHAB = [
  { parent: "YCH", id: "tinghu", name: "盐城市亭湖区残疾人联合会", shortName: "亭湖残联", address: "盐城市亭湖区建军东路84号", phones: ["0515-88150709"], notes: "经办科室：康复科。" },
  { parent: "YCH", id: "yandu", name: "盐城市盐都区残疾人联合会", shortName: "盐都残联", address: "盐城市盐都区崇礼路19号", phones: ["0515-81992853"], notes: "经办科室：康复科。" },
  { parent: "YCH", id: "dafeng", name: "盐城市大丰区残疾人医疗康复就业培训中心", shortName: "大丰康复培训中心", address: "盐城市大丰区新村东路19号", phones: ["0515-69860603"], notes: "名录中的儿童康复救助经办机构。" },
  { parent: "YCH", id: "xiangshui", name: "响水县残疾人联合会", shortName: "响水残联", address: "响水县迎宾大道与黄海路交界处向西150米", phones: [], notes: "名录只写了经办人手机，不收录。请拨12385或到窗口。" },
  { parent: "YCH", id: "binhai", name: "滨海县残疾人联合会", shortName: "滨海残联", address: "滨海县育才西路266号阳光大厦607室", phones: ["0515-84219105"], notes: "经办科室：康复科。" },
  { parent: "YCH", id: "funing", name: "阜宁县残疾人联合会", shortName: "阜宁残联", address: "盐城市阜宁县城西路90号山阳桥西侧", phones: ["0515-87290959"], notes: "经办科室：康复科。" },
  { parent: "YCH", id: "sheyang", name: "射阳县残疾人联合会", shortName: "射阳残联", address: "射阳县解放东路30号", phones: ["0515-89201810"], notes: "经办机构：康复服务中心。" },
  { parent: "YCH", id: "jianhu", name: "建湖县残疾人联合会", shortName: "建湖残联", address: "建湖县湖中南路399号", phones: ["0515-86235608"], notes: "经办科室：康复股。" },
  { parent: "YCH", id: "dongtai", name: "东台市残疾人联合会", shortName: "东台残联", address: "东台市金海东路永胜南路4号", phones: ["0515-85331089"], notes: "经办科室：综合科。" },
  { parent: "YCH", id: "yannan", name: "盐南高新区社会事务管理局", shortName: "盐南高新区残联事务", address: "盐南高新区新龙广场6号楼7楼", phones: ["0515-69960502"], notes: "经办科室：残疾人事务科。" },
  { parent: "YCH", id: "ycjkq", name: "盐城经济技术开发区社会事业局", shortName: "盐城经开区残联事务", address: "盐城经济技术开发区松江路18号", phones: ["0515-68820831"], notes: "经办科室：残疾人事务科。" },
  { parent: "YZH", id: "baoying", name: "宝应县残疾人联合会", shortName: "宝应残联", address: "宝应县白田北路19号", phones: ["0514-80901565"], notes: "经办科室：康复部。" },
  { parent: "YZH", id: "gaoyou", name: "高邮市残疾人联合会", shortName: "高邮残联", address: "高邮市城市商务大厦13A-9", phones: ["0514-85080785"], notes: "经办科室：康复部。" },
  { parent: "YZH", id: "yizheng", name: "仪征市残疾人联合会", shortName: "仪征残联", address: "仪征市沿山河东路806号", phones: ["0514-89316865"], notes: "经办科室：康复部。" },
  { parent: "YZH", id: "jiangdu", name: "扬州市江都区残疾人联合会", shortName: "江都残联", address: "江都区仙女镇工农路40号", phones: ["0514-86860492"], notes: "经办科室：康复部。" },
  { parent: "YZH", id: "guangling", name: "扬州市广陵区残疾人联合会", shortName: "广陵残联", address: "广陵区汤汪街道连运西路229号", phones: ["0514-87562909"], notes: "经办科室：康复部。" },
  { parent: "YZH", id: "hanjiang", name: "扬州市邗江区残疾人联合会", shortName: "邗江残联", address: "邗江区邗上街道幸福街256号（百祥园南门）", phones: ["0514-87896951"], notes: "经办科室：康复部。" },
  { parent: "YZH", id: "yzkfq", name: "扬州经济开发区残疾人工作办公室", shortName: "扬州经开区残工办", address: "扬州市维扬路108号开发大厦709室", phones: ["0514-87962307"], notes: "开发区残疾人工作办公室。" },
  { parent: "YZH", id: "stkj", name: "扬州生态科技新城社会事业局", shortName: "生态科技新城残联", address: "扬州市生态科技新城新万福路88号管委会社会事业局201室", phones: ["0514-82920668"], notes: "经办：民政（残联）股。" },
  { parent: "YZH", id: "shugang", name: "蜀冈-瘦西湖风景名胜区残疾人工作办公室", shortName: "蜀冈瘦西湖残工办", address: "扬州市上方寺路1号官河商务中心B座205室", phones: ["0514-87314233"], notes: "景区残疾人工作办公室。" },
  { parent: "ZJG", id: "danyang", name: "丹阳市残疾人联合会", shortName: "丹阳残联", address: "丹阳市云阳街道健康路15号", phones: ["0511-86700306"], notes: "经办科室：康复科。" },
  { parent: "ZJG", id: "jurong", name: "句容市残疾人联合会", shortName: "句容残联", address: "句容市袁巷路与243省道交叉口6楼619室", phones: ["0511-80300600"], notes: "经办科室：康复科。" },
  { parent: "ZJG", id: "yangzhong", name: "扬中市残疾人联合会", shortName: "扬中残联", address: "扬中市三茅街道扬子河北路358号", phones: ["0511-88215223"], notes: "经办机构：康复中心。" },
  { parent: "ZJG", id: "dantu", name: "镇江市丹徒区残疾人联合会", shortName: "丹徒残联", address: "镇江市丹徒新城广场东路158号", phones: ["0511-80962000"], notes: "经办科室：康教科。" },
  { parent: "ZJG", id: "jingkou", name: "镇江市京口区残疾人联合会", shortName: "京口残联", address: "镇江市京口区象山街道景阳山庄北大门一号楼西侧", phones: ["0511-80618085"], notes: "经办机构：康复中心。" },
  { parent: "ZJG", id: "runzhou", name: "镇江市润州区残疾人联合会", shortName: "润州残联", address: "镇江市润州区御桥巷5号", phones: ["0511-88056810"], notes: "经办科室：综合科。" },
  { parent: "ZJG", id: "zjkfq", name: "镇江经开区残疾人联合会", shortName: "镇江经开区残联", address: "镇江经开区金港大道98号社会发展局", phones: ["0511-83176297"], notes: "经办科室：综合科。" },
  { parent: "TZS", id: "jingjiang", name: "靖江市残疾人联合会", shortName: "靖江残联", address: "靖江市植善路1号", phones: ["0523-80502311"], notes: "经办科室：康复科。" },
  { parent: "TZS", id: "taixing", name: "泰兴市残疾人联合会", shortName: "泰兴残联", address: "泰兴市鼓楼南路387号", phones: ["0523-82802170"], notes: "经办科室：康复科。" },
  { parent: "TZS", id: "xinghua", name: "兴化市残疾人联合会", shortName: "兴化残联", address: "兴化市水乡路136号", phones: ["0523-83116108"], notes: "经办科室：康复科。" },
  { parent: "TZS", id: "hailing", name: "泰州市海陵区残疾人联合会", shortName: "海陵残联", address: "海陵区城东街道森园路310号海陵区残疾人综合服务中心四楼", phones: ["0523-82936730"], notes: "经办科室：康复科。" },
  { parent: "TZS", id: "gaogang", name: "泰州市高港区残疾人联合会", shortName: "高港残联", address: "泰州市高港区港城东路369号", phones: ["0523-86960255"], notes: "经办科室：康复科。" },
  { parent: "TZS", id: "jiangyan", name: "泰州市姜堰区残疾人联合会", shortName: "姜堰残联", address: "姜堰区陵园西村80号", phones: ["0523-80776681"], notes: "经办科室：康复科。" },
  { parent: "SQN", id: "shuyang", name: "沭阳县残疾人联合会", shortName: "沭阳残联", address: "沭阳县南湖街道长安路349号", phones: ["0527-80906612"], notes: "经办科室：康复教就科。" },
  { parent: "SQN", id: "siyang", name: "泗阳县残疾人联合会", shortName: "泗阳残联", address: "江苏省宿迁市泗阳县众兴镇长春西路", phones: ["0527-80703575"], notes: "经办科室：康复科。" },
  { parent: "SQN", id: "sihong", name: "泗洪县残疾人联合会", shortName: "泗洪残联", address: "江苏省宿迁市泗洪县和谐路7号", phones: ["0527-86233998"], notes: "经办科室：康复科。" },
  { parent: "SQN", id: "suyu", name: "宿迁市宿豫区残疾人联合会", shortName: "宿豫残联", address: "宿迁市宿豫区贺兰山路一号", phones: ["0527-84285886"], notes: "经办科室：康复科。" },
  { parent: "SQN", id: "sucheng", name: "宿迁市宿城区残疾人联合会", shortName: "宿城残联", address: "宿迁市宿城区市民服务中心西侧六楼", phones: ["0527-80903008"], notes: "经办科室：康复科。" },
  { parent: "SQN", id: "sqkfq", name: "宿迁经济技术开发区政法和社会事业局", shortName: "宿迁经开区残联事务", address: "宿迁市人民大道888号开发区管委会507室", phones: ["0527-88859618"], notes: "经办科室：社会保障处。" },
  { parent: "SQN", id: "hubin", name: "湖滨新区政法和社会管理办公室", shortName: "湖滨新区残联科", address: "宿迁市湖滨新区嘉创大厦1320办公室", phones: ["0527-80986800"], notes: "经办科室：残联科。" },
  { parent: "SQN", id: "yanghe", name: "洋河新区社会事业局", shortName: "洋河新区残联", address: "宿迁市洋河新区南大街17号", phones: ["0527-82668407"], notes: "经办科室：民政科。" },
] as const;

/** 泰安市《残疾人服务一件事》服务指南咨询电话栏。 */
export const SD_TAI_WINDOWS = [
  { parent: "TAI", id: "taishan", name: "泰安市泰山区残疾人联合会", shortName: "泰山区残联", address: "", phones: ["0538-6992582"], notes: "与市残联同一咨询电话。" },
  { parent: "TAI", id: "daiyue", name: "泰安市岱岳区残疾人联合会", shortName: "岱岳区残联", address: "", phones: ["0538-8568321"], notes: "" },
  { parent: "TAI", id: "xintai", name: "新泰市残疾人联合会", shortName: "新泰残联", address: "", phones: ["0538-7226759"], notes: "" },
  { parent: "TAI", id: "feicheng", name: "肥城市残疾人联合会", shortName: "肥城残联", address: "", phones: ["0538-3212006"], notes: "" },
  { parent: "TAI", id: "ningyang", name: "宁阳县残疾人联合会", shortName: "宁阳残联", address: "", phones: ["0538-5616058"], notes: "" },
  { parent: "TAI", id: "dongping", name: "东平县残疾人联合会", shortName: "东平残联", address: "", phones: ["0538-2827196"], notes: "" },
  { parent: "TAI", id: "gaoxin", name: "泰安高新区社会事务服务中心", shortName: "泰安高新区残联事务", address: "", phones: ["0538-8939727"], notes: "高新区社会事务服务中心。" },
  { parent: "TAI", id: "jingqu", name: "泰山景区社会事务服务中心", shortName: "泰山景区残联事务", address: "", phones: ["0538-5369533"], notes: "泰山景区社会事务服务中心。" },
] as const;

/** 福州市政府网《残疾人证办理》办证大厅名录（原文电话未写区号，按0591补全）。 */
export const FJ_FZ_WINDOWS = [
  { parent: "FOC", id: "gulou", name: "福州市鼓楼区残疾人联合会", shortName: "鼓楼残联", address: "福州市鼓东路189号鼓东街道三楼", phones: ["0591-87604785"], notes: "邮编350001。" },
  { parent: "FOC", id: "taijiang", name: "福州市台江区残疾人联合会", shortName: "台江残联", address: "福州市台江区广达路438号双丰大厦8A", phones: ["0591-83295264"], notes: "邮编350004。" },
  { parent: "FOC", id: "cangshan", name: "福州市仓山区残疾人联合会", shortName: "仓山残联", address: "福州市仓山区工农路64号", phones: ["0591-83135626"], notes: "邮编350007。" },
  { parent: "FOC", id: "jinan", name: "福州市晋安区残疾人联合会", shortName: "晋安残联", address: "福州市晋安区福马路241号1层", phones: ["0591-87621922"], notes: "邮编350011。" },
  { parent: "FOC", id: "mawei", name: "福州市马尾区残疾人联合会", shortName: "马尾残联", address: "福州市马尾区罗星西路30号时代广场3楼", phones: ["0591-83682933"], notes: "邮编350015。" },
  { parent: "FOC", id: "changle", name: "福州市长乐区残疾人联合会", shortName: "长乐残联", address: "福州市长乐区航城街道爱心路245号一层", phones: ["0591-28928541"], notes: "邮编350200。" },
  { parent: "FOC", id: "gaoxin", name: "福州市高新区社会事业管理局", shortName: "福州高新区残联事务", address: "福州市闽侯上街镇科技东路8号创业大厦5楼", phones: ["0591-62335156"], notes: "邮编350108。" },
  { parent: "FOC", id: "fuqing", name: "福清市残疾人联合会", shortName: "福清残联", address: "福州市福清市龙江街道苍霞村朝霞路13号福乐家园", phones: ["0591-85266571"], notes: "邮编350300。" },
  { parent: "FOC", id: "minhou", name: "闽侯县残疾人联合会", shortName: "闽侯残联", address: "福州市闽侯县甘蔗街道入城路308号", phones: ["0591-22982526"], notes: "邮编350100。" },
  { parent: "FOC", id: "lianjiang", name: "连江县残疾人联合会", shortName: "连江残联", address: "福州市连江县莲荷东路百凤花园15#205", phones: ["0591-26213100"], notes: "邮编350500。" },
  { parent: "FOC", id: "minqing", name: "闽清县残疾人联合会", shortName: "闽清残联", address: "福州市闽清县梅溪镇溪口大街793号", phones: ["0591-62063259"], notes: "邮编350800。" },
  { parent: "FOC", id: "luoyuan", name: "罗源县残疾人联合会", shortName: "罗源残联", address: "福州市罗源县莲花西区楼中楼5号楼", phones: ["0591-26858300"], notes: "邮编350600。" },
  { parent: "FOC", id: "yongtai", name: "永泰县残疾人联合会", shortName: "永泰残联", address: "永泰县龙峰村龙峰园367-7", phones: ["0591-24833120"], notes: "邮编350700。" },
] as const;

/** 永州市残联2026年7月8日《各级残联组织办公（办证）地址及联系电话一览表》。 */
export const HN_YZ_WINDOWS = [
  {
    parent: "YZS",
    id: "lengshuitan",
    name: "永州市冷水滩区残疾人联合会",
    shortName: "冷水滩残联",
    address: "冷水滩区紫霞东路236号",
    phones: ["0746-2820808","0746-8533155"],
    notes: "办证：冷水滩区政务服务中心13-14号窗口，0746-8533155。",
  },
  { parent: "YZS", id: "lingling", name: "永州市零陵区残疾人联合会", shortName: "零陵残联", address: "零陵区荔枝东路1号", phones: ["0746-6222462"], notes: "办证：零陵区政务服务中心一楼10号窗口。" },
  {
    parent: "YZS",
    id: "qiyang",
    name: "祁阳市残疾人联合会",
    shortName: "祁阳残联",
    address: "祁阳市浯溪中路246号",
    phones: ["0746-3222231","0746-3216872"],
    notes: "办证：祁阳市人民医院一住院部一楼办证窗口，0746-3216872。",
  },
  { parent: "YZS", id: "dongan", name: "东安县残疾人联合会", shortName: "东安残联", address: "东安县白牙市镇建设北路23号", phones: ["0746-4223180"], notes: "办证：东安县政务中心一楼27号办证窗口。" },
  { parent: "YZS", id: "shuangpai", name: "双牌县残疾人联合会", shortName: "双牌残联", address: "双牌县紫阳路42号", phones: ["0746-7723528"], notes: "办证：双牌县政务中心（双牌之家15号窗口）。" },
  { parent: "YZS", id: "daoxian", name: "道县残疾人联合会", shortName: "道县残联", address: "道县道州中路316号", phones: ["0746-5236418","0746-5272109"], notes: "办证：道县政务中心一楼29号窗口，0746-5272109。" },
  { parent: "YZS", id: "jianghua", name: "江华县残疾人联合会", shortName: "江华残联", address: "江华县阳华路印象瑶都4单元9楼", phones: ["0746-2322688"], notes: "办证：江华县瑶都大道政务中心一楼残疾人一件事一次办窗口。" },
  { parent: "YZS", id: "jiangyong", name: "江永县残疾人联合会", shortName: "江永残联", address: "江永县潇浦镇凤亭路12号", phones: ["0746-5726656"], notes: "办证：江永县政务中心一楼综合窗口。" },
  {
    parent: "YZS",
    id: "ningyuan",
    name: "宁远县残疾人联合会",
    shortName: "宁远残联",
    address: "宁远县水市路358号",
    phones: ["0746-7323938","0746-7327002"],
    notes: "办证：宁远县政务中心一楼16号窗口，0746-7327002。",
  },
  { parent: "YZS", id: "xintian", name: "新田县残疾人联合会", shortName: "新田残联", address: "新田县龙泉大道36-1号", phones: ["0746-4767812"], notes: "办证：新田县政务服务中心一楼15号窗口。" },
  {
    parent: "YZS",
    id: "lanshan",
    name: "蓝山县残疾人联合会",
    shortName: "蓝山残联",
    address: "蓝山县塔峰镇湘粤路279号",
    phones: ["0746-2214337","0746-2226061"],
    notes: "办证：蓝山县政务中心一楼A02窗口，0746-2226061。",
  },
  { parent: "YZS", id: "jindong", name: "金洞管理区残疾人联合会", shortName: "金洞残联", address: "金洞管理区人岭街5号", phones: ["0746-3859318"], notes: "办证：金洞管理区政务大楼二楼211室。" },
  { parent: "YZS", id: "huilongxu", name: "回龙圩管理区残疾人联合会", shortName: "回龙圩残联", address: "回龙圩管理区民政和退役军人事务局", phones: ["0746-5911821"], notes: "办证：回龙圩管理区政务大厅一楼窗口。" },
] as const;

/** 安康市政府网2026年联网认证通告列出的市本级及县区窗口。 */
export const SN_AKS_WINDOWS = [
  { parent: "AKS", id: "hanbin", name: "安康市汉滨区残疾人联合会", shortName: "汉滨残联", address: "汉滨区老城办南马道25号", phones: ["0915-3213833"], notes: "安康市政府网2026年联网认证通告汉滨区窗口。" },
  { parent: "AKS", id: "hanyin", name: "汉阴县残疾人联合会", shortName: "汉阴残联", address: "汉阴县城关镇东关街一号", phones: ["0915-5216912"], notes: "安康市政府网2026年联网认证通告汉阴窗口。" },
  { parent: "AKS", id: "shiquan", name: "石泉县残疾人联合会", shortName: "石泉残联", address: "石泉县城关镇春潮广场对面创投大厦十楼", phones: ["0915-8226017"], notes: "安康市政府网2026年联网认证通告石泉窗口。" },
  { parent: "AKS", id: "ningshan", name: "宁陕县残疾人联合会", shortName: "宁陕残联", address: "宁陕县城关镇子午路139号", phones: ["0915-6826090"], notes: "安康市政府网2026年联网认证通告宁陕窗口。" },
  { parent: "AKS", id: "ziyang", name: "紫阳县残疾人联合会", shortName: "紫阳残联", address: "紫阳县城关镇紫府路东段", phones: ["0915-4428359"], notes: "安康市政府网2026年联网认证通告紫阳窗口。" },
  { parent: "AKS", id: "langao", name: "岚皋县残疾人联合会", shortName: "岚皋残联", address: "岚皋县城关镇花里路14号", phones: ["0915-2518673"], notes: "安康市政府网2026年联网认证通告岚皋窗口。" },
  { parent: "AKS", id: "pingli", name: "平利县残疾人联合会", shortName: "平利残联", address: "平利县城关镇商贸小区1号", phones: ["0915-8419830"], notes: "安康市政府网2026年联网认证通告平利窗口。" },
  { parent: "AKS", id: "zhenping", name: "镇坪县残疾人联合会", shortName: "镇坪残联", address: "镇坪县城关镇电力局下100米", phones: ["0915-8820261"], notes: "安康市政府网2026年联网认证通告镇坪窗口。" },
  { parent: "AKS", id: "xunyang", name: "旬阳市残疾人联合会", shortName: "旬阳残联", address: "旬阳市城关镇老城社区坤顺路80号", phones: ["0915-7212253"], notes: "安康市政府网2026年联网认证通告旬阳窗口。" },
  { parent: "AKS", id: "baihe", name: "白河县残疾人联合会", shortName: "白河残联", address: "白河县城关镇旬白路124号", phones: ["0915-7821638"], notes: "安康市政府网2026年联网认证通告白河窗口。" },
] as const;

/** 青岛市南区政务服务网办证室。 */
export const SD_TAO_WINDOWS = [
  { parent: "TAO", id: "shinan", name: "青岛市市南区残疾人联合会", shortName: "市南残联", address: "青岛市市南区宁夏路286号", phones: ["0532-88729904"], notes: "市南区残联办证室，青岛市南区政务服务网办事指南。" },
] as const;

/** 广州市增城区政府网机构职责页。 */
export const GD_GZ_WINDOWS = [
  {
    parent: "GZC",
    id: "zengcheng",
    name: "广州市增城区残疾人联合会",
    shortName: "增城残联",
    address: "广州市荔城街岗前西路1号",
    phones: ["020-82749375"],
    notes: "区政府网机构职责页：办公电话020-82749375。该页同时把同一号码列为投诉电话。",
  },
] as const;

/** 区县残联窗口，来源均为当地政府网或残联栏目。 */
export const MORE_COUNTY_WINDOWS = [
  {
    parent: "SZ",
    id: "futian",
    name: "深圳市福田区残疾人联合会",
    shortName: "福田残联",
    address: "深圳市福田区上梅林梅坳七路福康之家",
    postcode: "518036",
    phones: ["0755-83925022","0755-82886928","0755-83175480","0755-83177848","0755-83175704"],
    hours: "工作日上午9:00–12:00，下午14:00–18:00",
    notes: "福田区政府网：权益保障0755-83925022，就业年审0755-82886928，康复0755-83175480，心理咨询0755-83177848，辅具借用0755-83175704。",
    sourceName: "福田区残疾人联合会",
    sourceUrl: "https://www.szft.gov.cn/bmxx_qt/qcjrlhh/",
    website: "https://www.szft.gov.cn/bmxx_qt/qcjrlhh/",
  },
  {
    parent: "BJ",
    id: "haidian",
    name: "北京市海淀区残疾人联合会",
    shortName: "海淀残联",
    address: "北京市海淀区杏石口路28号",
    postcode: "100195",
    phones: ["010-88458428"],
    hours: "工作日",
    notes: "区残联网站联系方式：机关010-88458428。就业保障金审核010-88466302。信访室号码不作为办事电话收录。",
    sourceName: "海淀区残疾人联合会",
    sourceUrl: "https://hdqw.bjhd.gov.cn/hdcl/zwgk/lxfs/",
    website: "https://hdqw.bjhd.gov.cn/hdcl/zwgk/lxfs/",
  },
  {
    parent: "CD",
    id: "wuhou",
    name: "成都市武侯区残疾人联合会",
    shortName: "武侯残联",
    address: "成都市武侯区金雁路175号残疾人综合服务中心大楼五楼",
    postcode: "",
    phones: ["028-87420077"],
    hours: "工作日9:00–12:00，13:00–17:00",
    notes: "武侯区政府网机构简介：办公电话028-87420077。",
    sourceName: "成都市武侯区政府网",
    sourceUrl: "http://www.cdwh.gov.cn/gkml/cdswhqcjrlhh/jgjj/1510972670210998272.shtml",
    website: "http://www.cdwh.gov.cn/gkml/cdswhqcjrlhh/jgjj/1510972670210998272.shtml",
  },
  {
    parent: "TNA",
    id: "zhangqiu",
    name: "济南市章丘区残疾人服务一件事窗口",
    shortName: "章丘一件事窗口",
    address: "济南市章丘区开先大道789号政务服务大厅1楼西厅B1-14号",
    postcode: "",
    phones: ["0531-83229080"],
    hours: "工作日，以大厅公告为准",
    notes: "济南政务服务网办事指南：该号码是章丘区残疾人服务一件事窗口咨询电话，不是市残联总机。",
    sourceName: "济南市政务服务网",
    sourceUrl: "http://zwfw.jinan.gov.cn/jpaas-jiq-web-jnywtb/front/transition/ywTransToDetail?areaCode=370114000000&innerCode=170ec406-aa0e-4b5f-be69-e947688df945&taskType=QR",
    website: "http://zwfw.jinan.gov.cn/",
  },
  {
    parent: "CSX",
    id: "changsha-county",
    name: "长沙县残疾人联合会",
    shortName: "长沙县残联",
    address: "长沙县星沙街道望仙路73号",
    postcode: "",
    phones: ["0731-84065036"],
    hours: "工作日",
    notes: "长沙县残联2025年11月托养服务公示：地址星沙街道望仙路73号，联系电话0731-84065036。2026年资金公示另写0731-84013836。",
    sourceName: "长沙县残疾人联合会",
    sourceUrl: "http://csx.gov.cn/zwgk/qtxxgkml/cl/tzgg/202512/t20251202_12089855.html",
    website: "http://csx.gov.cn/zwgk/qtxxgkml/cl/tzgg/202512/t20251202_12089855.html",
  },
  {
    parent: "WX",
    id: "xishan",
    name: "无锡市锡山区残疾人联合会",
    shortName: "锡山残联",
    address: "无锡市锡山区锡沪路东亭中段81号",
    postcode: "",
    phones: ["0510-88216533"],
    hours: "工作日",
    notes: "锡山区残联网站页脚：地址锡沪路东亭中段81号，联系电话88216533（原文未写区号，按无锡0510补全）。",
    sourceName: "无锡市锡山区残疾人联合会",
    sourceUrl: "https://dangqun.jsxishan.gov.cn/cl/",
    website: "https://dangqun.jsxishan.gov.cn/cl/",
  },
  {
    parent: "HAK",
    id: "xiuying",
    name: "海口市秀英区残疾人联合会",
    shortName: "秀英残联",
    address: "海口市秀英区向荣路福秀小区C栋121办公室",
    postcode: "",
    phones: ["0898-68653817"],
    hours: "工作日",
    notes: "秀英区政府网2025年5月区残联公告：地址向荣路福秀小区C栋121办公室，联系电话68653817（原文未写区号，按海口0898补全）。",
    sourceName: "海口市秀英区残疾人联合会",
    sourceUrl: "https://xyqzf.haikou.gov.cn/hksxyqzf/gsgg/202505/174754c3095345e999aaa03fecd4c44d.shtml",
    website: "https://xyqzf.haikou.gov.cn/hksxyqzf/gsgg/202505/174754c3095345e999aaa03fecd4c44d.shtml",
  },
  {
    parent: "SZ",
    id: "longgang",
    name: "深圳市龙岗区残疾人联合会",
    shortName: "龙岗残联",
    address: "龙岗区中心城清辉路龙岗区残疾人综合服务中心",
    postcode: "",
    phones: ["0755-33293881"],
    hours: "工作日",
    notes: "龙岗区政府网：咨询电话0755-33293881。监督投诉0755-33293861不作为办事电话收录。",
    sourceName: "龙岗区残疾人联合会",
    sourceUrl: "https://www.lg.gov.cn/bmzz/cl/index.html",
    website: "https://www.lg.gov.cn/bmzz/cl/index.html",
  },
  {
    parent: "CSX",
    id: "tianxin",
    name: "长沙市天心区残疾人联合会",
    shortName: "天心残联",
    address: "长沙市天心区湘府中路298号2108室",
    postcode: "",
    phones: ["0731-85899108"],
    hours: "法定工作日，夏季上午9:00–12:00、下午13:30–17:30；冬季上午9:00–12:00、下午13:00–17:00",
    notes: "天心区政府网机构介绍：办公地址湘府中路298号2108室，联系电话0731-85899108。",
    sourceName: "长沙市天心区人民政府（区残联机构介绍）",
    sourceUrl: "http://www.tianxin.gov.cn/zwgk8/qtdwxxgkml/qcl/zzjg59/jgjs45/",
    website: "http://www.tianxin.gov.cn/zwgk8/qtdwxxgkml/qcl/zzjg59/jgjs45/",
  },
  {
    parent: "GZC",
    id: "tianhe",
    name: "广州市天河区残疾人联合会",
    shortName: "天河残联",
    address: "广州市天河区天府路1号区机关大院3号楼1楼",
    postcode: "510655",
    phones: ["020-38622439"],
    hours: "周一至周五 9:00–12:00、14:00–18:00（法定节假日除外）",
    notes: "天河区政府网：办公室020-38622439，地址天府路1号区机关大院3号楼1楼。",
    sourceName: "广州市天河区人民政府（区残联）",
    sourceUrl: "http://www.thnet.gov.cn/gzjg/qztt/qcl/index.html",
    website: "http://www.thnet.gov.cn/gzjg/qztt/qcl/index.html",
  },
  {
    parent: "ZHA",
    id: "xuwen",
    name: "徐闻县残疾人劳动服务所",
    shortName: "徐闻劳动服务所",
    address: "徐闻县徐城街道爱心路8号徐闻县残疾人康复中心大楼602室",
    postcode: "",
    phones: ["0759-4901092"],
    hours: "工作日，以大厅公告为准",
    notes: "徐闻县政府网2026年联网认证通告窗口。引用湛残联〔2026〕7号。此为徐闻窗口，湛江市本级及其他县区请核当地残联。",
    sourceName: "徐闻县人民政府",
    sourceUrl: "http://www.xuwen.gov.cn/gkmlpt/content/2/2155/post_2155421.html",
    website: "http://www.xuwen.gov.cn/gkmlpt/content/2/2155/post_2155421.html",
  },
  {
    parent: "HRB",
    id: "daoli",
    name: "哈尔滨市道里区残疾人联合会",
    shortName: "道里残联",
    address: "哈尔滨市道里区安平街110号",
    postcode: "150010",
    phones: ["0451-84532060"],
    hours: "工作日",
    notes: "道里区政府网2025年政府信息公开年报：地址安平街110号，邮编150010，联系电话0451-84532060。此为道里区窗口，哈尔滨市本级请核市残联。",
    sourceName: "哈尔滨市道里区残疾人联合会",
    sourceUrl: "http://www.hrbdl.gov.cn/hebdlq/c112289c/202602/c01_1108994.shtml",
    website: "http://www.hrbdl.gov.cn/hebdlq/c112289c/202602/c01_1108994.shtml",
  },
  {
    parent: "TZZ",
    id: "jiaojiang",
    name: "台州市椒江区残疾人联合会",
    shortName: "椒江残联",
    address: "台州市椒江区海门街道中山东路281号",
    postcode: "318000",
    phones: ["0576-88817060"],
    hours: "工作日",
    notes: "浙江省政务服务网民意征集（椒江区残疾人竞技体育贡献奖励办法征求意见）：通信地址海门街道中山东路281号椒江区残疾人联合会，电话0576-88817060，邮编318000。此为椒江窗口，台州市本级请核市残联。",
    sourceName: "浙江省政务服务网（椒江区残联征求意见）",
    sourceUrl: "http://minyi.zjzwfw.gov.cn/dczjnewls/dczj/idea/phonetopic_11509.html",
    website: "http://minyi.zjzwfw.gov.cn/dczjnewls/dczj/idea/phonetopic_11509.html",
  },
  {
    parent: "YFS",
    id: "luoding",
    name: "罗定市残疾人联合会",
    shortName: "罗定残联",
    address: "罗定市红岗横路38号",
    postcode: "",
    phones: ["0766-3865728"],
    hours: "工作日",
    notes: "罗定市政府网2026年联网认证通知：柜台在残联一楼（红岗横路38号），咨询0766-3865728。此为罗定窗口，云浮市本级及其他县区请核当地残联。",
    sourceName: "罗定市人民政府",
    sourceUrl: "https://www.luoding.gov.cn/ldsrmzf/zwgk/ztzl/yshj/ysdt/content/post_1995752.html",
    website: "https://www.luoding.gov.cn/ldsrmzf/zwgk/ztzl/yshj/ysdt/content/post_1995752.html",
  },
  {
    parent: "EZS",
    id: "echeng",
    name: "鄂城区残疾人劳动就业康复服务站",
    shortName: "鄂城就业服务站",
    address: "鄂州市鄂城区古楼街道与武昌大道交叉口100米",
    postcode: "",
    phones: ["027-56909170"],
    hours: "工作日，以大厅公告为准",
    notes: "鄂城区政府网2026年联网认证通告咨询窗口。此为鄂城区窗口，鄂州其他区请核当地残联。",
    sourceName: "鄂州市鄂城区人民政府",
    sourceUrl: "https://www.echeng.gov.cn/zxzx/bmxx/202602/t20260228_752042.html",
    website: "https://www.echeng.gov.cn/zxzx/bmxx/202602/t20260228_752042.html",
  },
  {
    parent: "JXS2",
    id: "xiuzhou",
    name: "嘉兴市秀洲区残疾人联合会",
    shortName: "秀洲残联",
    address: "嘉兴市秀洲区九里路556号",
    postcode: "",
    phones: [],
    hours: "工作日",
    notes: "全国公共资源交易平台2026年7月秀洲区残联采购公告：采购人地址秀洲区九里路556号。项目联系人电话未作为机关总机收录。请拨12385。",
    sourceName: "全国公共资源交易平台（秀洲区残联采购公告）",
    sourceUrl: "https://www.ggzy.gov.cn/information/deal/html/a/330000/0201/20260731/003339adc6bf076a45c9b882f36b2c02ab5e.html",
    website: "https://www.ggzy.gov.cn/information/deal/html/a/330000/0201/20260731/003339adc6bf076a45c9b882f36b2c02ab5e.html",
  },
  {
    parent: "LHW",
    id: "anning",
    name: "兰州市安宁区残疾人联合会",
    shortName: "安宁残联",
    address: "兰州市安宁区学府路1999号区残联5楼510办公室",
    postcode: "",
    phones: ["0931-7661088"],
    hours: "工作日",
    notes: "安宁区政府网2025年3月按比例就业通告：地址学府路1999号区残联5楼510办公室，电话0931-7661088。此为安宁区窗口，兰州市本级请核市残联。",
    sourceName: "兰州市安宁区人民政府",
    sourceUrl: "http://www.lzanning.gov.cn/art/2025/3/4/art_12222_1459706.html",
    website: "http://www.lzanning.gov.cn/art/2025/3/4/art_12222_1459706.html",
  },
  {
    parent: "BBU",
    id: "yuhui",
    name: "蚌埠市禹会区残疾人联合会",
    shortName: "禹会残联",
    address: "蚌埠市禹会区政务服务大楼13楼",
    postcode: "233000",
    phones: ["0552-4011532"],
    hours: "工作日上午8:00–12:00，下午14:30–17:30",
    notes: "禹会区政府网机构简介：办公地址政务服务大楼13楼，电话4011532（原文未写区号，按蚌埠0552补全），邮编233000。此为禹会窗口，蚌埠市本级请核市残联。",
    sourceName: "蚌埠市禹会区人民政府",
    sourceUrl: "https://www.yuhui.gov.cn/zfjg/5090062.html",
    website: "https://www.yuhui.gov.cn/zfjg/5090062.html",
  },
  {
    parent: "BOZ",
    id: "qiaocheng",
    name: "亳州市谯城区残疾人联合会",
    shortName: "谯城残联",
    address: "",
    postcode: "",
    phones: ["0558-5534854"],
    hours: "工作日",
    notes: "谯城区政府网2026年2月27日联网认证通告咨询电话0558-5534854。机关门牌该通告未写。此为谯城窗口，亳州其他县区请核当地残联。",
    sourceName: "亳州市谯城区人民政府",
    sourceUrl: "https://www.bzqc.gov.cn/XxgkContent/show/2974256.html",
    website: "https://www.bzqc.gov.cn/XxgkContent/show/2974256.html",
  },
  {
    parent: "ZJK",
    id: "xuanhua",
    name: "张家口市宣化区残疾人劳动就业服务中心",
    shortName: "宣化就业服务中心",
    address: "张家口市宣化区财神庙街35号",
    postcode: "",
    phones: ["0313-3238305"],
    hours: "工作日",
    notes: "张家口市残联官网机构查询：宣化区残疾人劳动就业服务中心在财神庙街35号，电话3238305（原文未写区号，按张家口0313补全）。",
    sourceName: "张家口市残疾人联合会官网",
    sourceUrl: "https://www.zjkscl.gov.cn/project/search.html",
    website: "https://www.zjkscl.gov.cn/project/search.html",
  },
  {
    parent: "ZJK",
    id: "kangbao",
    name: "康保县残疾人劳动服务中心",
    shortName: "康保劳动服务中心",
    address: "康保县西经路残联办公室",
    postcode: "",
    phones: ["0313-5519796"],
    hours: "工作日",
    notes: "张家口市残联官网机构查询：康保县残疾人劳动服务中心在西经路残联办公室，电话0313-5519796。",
    sourceName: "张家口市残疾人联合会官网",
    sourceUrl: "https://www.zjkscl.gov.cn/project/search.html",
    website: "https://www.zjkscl.gov.cn/project/search.html",
  },
] as const;
