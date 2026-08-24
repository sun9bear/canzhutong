# M16 municipal draft review

Reviewed 6 NEW entries in `src/data/prefecture-facts.ts`. Each `sourceUrl` was opened and checked against: (1) official gov / 残联 / 民政 article page, not a portal homepage, encyclopedia, or uncertain reprint; (2) yuan amounts or formulas in the entry vs page text.

Data file was not edited. No commit.

## Results

| City | Code | Entry ID | Verdict | Reason |
| --- | --- | --- | --- | --- |
| 威海 | WEH | weh-subsidy-2025 | PASS | 威海市民政局政策问答页（2025-08-05）正文写明生活补贴一二级213、三四级160，护理补贴一级192、二级160，与条目一致；非首页。 |
| 晋城 | JCN | jcn-subsidy-2024 | PASS | 晋城市政府网一卡通政策清单（信息来源市民政局，2024-04-03）写明生活82元/人/月、护理一二级109、三四级智力精神54.5，与条目一致。 |
| 晋城 | JCN | jcn-employment-overquota-2025 | PASS | 晋城市政府网公示公告（来源市残联就业服务指导中心）写明奖励标准为上年度全日制用人单位最低工资（月最低工资×12）的50%、比例超过1.5%（不含），公式与条目一致。 |
| 赣州 | GZH | gzh-subsidy-2025 | PASS | 全南县政府网《办理指南（2025版）》正文写明赣州户籍生活/护理各110元/人/月，与条目一致；属县政府文章页，条目已标明全南办理指南口径。 |
| 怀化 | HHS | hhs-subsidy-2024 | PASS | 怀化市民政局2024-12-20公示正文写明全市13县市区自2024-01-01每项「不低于90元/月/人、不低于1080元/年/人」，与条目一致。 |
| 怀化 | HHS | hhs-subsidy-2025 | FAIL | 市政府网新闻中心转载怀化新闻网「十四五」报道（信息来源新闻网、记者获悉），属新闻转载而非民政/残联政策或公示页；100元虽与报道一致，不满足官方政策页要求。 |

## Summary counts

| Verdict | Count |
| --- | --- |
| PASS | 5 |
| FAIL | 1 |
| Total reviewed | 6 |

## Source checks (opened)

1. **weh-subsidy-2025** — https://mzj.weihai.gov.cn/art/2025/8/5/art_19420_4514365.html  
   威海市民政局「政策问答」《残疾人两项补贴政策》。交叉页市政府网文字解读 https://www.weihai.gov.cn/art/2024/4/3/art_51913_4759386.html 同档 213/160、192/160，与问答一致。

2. **jcn-subsidy-2024** — https://www.jcgov.gov.cn/zwgk/czxx_23406/hmhn/202404/t20240409_1967773.shtml  
   晋城市人民政府信息公开《晋城市民政局2024年惠民惠农财政补贴资金「一卡通」政策清单》。

3. **jcn-employment-overquota-2025** — https://www.jcgov.gov.cn/dtxx/gsgg/202502/t20250228_2107186.shtml  
   晋城市人民政府公示公告《关于申报2025年度超比例安排残疾人就业奖励的公告》。公告另写「超出部分为1人以上（含1人）」；条目摘要略去「含1人」，公式本身仍与正文一致，未因此判 FAIL。

4. **gzh-subsidy-2025** — https://www.quannan.gov.cn/qnxrmzfwyyh/shjzyflqu/202509/ee240b30146047229a9a6e30f7438ccf.shtml  
   全南县人民政府网龙源坝镇村（居）务公开《【办理指南】残疾人两项补贴申请办理指南和补贴标准（2025版）》。非赣州市民政/市残联本站文，但为县政府文章页且金额在正文，条目 status 已限定全南口径。

5. **hhs-subsidy-2024** — https://www.huaihua.gov.cn/mzj/c108777/202412/919a58aa239b4fa3b0cca6145f676789.shtml  
   怀化市民政局频道通知公告《提高残疾人两项补贴标准情况公示》。

6. **hhs-subsidy-2025** — http://www.huaihua.gov.cn/huaihua/c101115/202511/90bade75989944bd9b2ecccd9fec85ab.shtml  
   怀化市人民政府网新闻中心《非凡「十四五」·怀化答卷｜怀化残疾人两项补贴提至每月100元》，信息来源怀化新闻网。

## Post-review action

Dropped FAIL entry `hhs-subsidy-2025` from `src/data/prefecture-facts.ts` (kept only PASS).
