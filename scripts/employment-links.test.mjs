import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const ALLOWLIST = [
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
];

const FORBIDDEN = [
  "mohrss.gov.cn",
  "zjcl.org.cn",
  "jyjy.jscl.gov.cn",
  "kstbcs.bdpf.org.cn",
  "wangshen.bdpf.org.cn",
];

test("employment-links.ts allowlist matches PASS URLs only", () => {
  const src = readFileSync(join(root, "src/data/employment-links.ts"), "utf8");
  const urls = [...src.matchAll(/https?:\/\/[^"'`\s]+/g)].map((m) => m[0]);
  const unique = [...new Set(urls)];
  assert.deepEqual(unique.sort(), [...ALLOWLIST].sort());
  for (const bad of FORBIDDEN) {
    assert.equal(
      src.includes(bad),
      false,
      `employment-links must not include ${bad}`,
    );
  }
});

test("jobs.tsx uses employment deep-link allowlist, not generic org kinds", () => {
  const src = readFileSync(join(root, "src/routes/_app/jobs.tsx"), "utf8");
  assert.match(src, /EMPLOYMENT_PORTALS/);
  assert.match(src, /isEmploymentDeepLink/);
  assert.match(src, /headingAs="h3"/);
  assert.equal(src.includes("JOB_KINDS"), false);
  assert.equal(src.includes("listOrgs"), false);
});

test("OrgCard headingAs defaults to h2 for 黄页", () => {
  const src = readFileSync(join(root, "src/components/org-card.tsx"), "utf8");
  assert.match(src, /headingAs = "h2"/);
  const orgs = readFileSync(join(root, "src/routes/_app/orgs.tsx"), "utf8");
  assert.match(orgs, /<OrgCard org=\{o\} \/>/);
});

test("llm.ts body-read catch treats TimeoutError as timeout", () => {
  const src = readFileSync(join(root, "src/lib/server/llm.ts"), "utf8");
  assert.match(src, /export function isLlmTimeoutError/);
  assert.match(src, /Headers arrived but the JSON body stalled/);
  const catchBlocks = src.split("} catch");
  assert.ok(catchBlocks.length >= 3, "expected header fetch catch and body catch");
});
