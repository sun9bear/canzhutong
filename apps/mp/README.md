# canzhutong WeChat mini-program

uni-app Vue3 + Vite under apps/mp.

## Preview
1. From repo root invoke script mp:data (writes public/data/policies.json from src/data)
2. In apps/mp: package install, then script dev:mp-weixin (or root script mp:dev)
3. Open WeChat DevTools; import apps/mp/dist/dev/mp-weixin
4. Optional: set VITE_MP_APPID and src/manifest.json mp-weixin.appid

## Policy data (read-only, same as H5)
H5 seeds Postgres from TypeScript under src/data.
The mini-program does not log in and does not query the DB directly.

Shared static dump:
- Export: scripts/export-mp-policies.mjs (root script mp:data)
- Also runs before root production build
- Output: public/data/policies.json
- MP runtime URL: {base}/data/policies.json

Base URL (first match wins):
1. VITE_API_BASE
2. VITE_MP_DATA_BASE
3. Default https://canzhutong.vercel.app

Local tip: start H5 on port 8080 after mp:data, set apps/mp/.env:
  VITE_API_BASE=http://127.0.0.1:8080
In DevTools, disable legal-domain checks for local origins.
Do not bundle the full JSON into the mini package (size limit).

## Pages
Tab: home / library / ask / me
Other: policy-detail / a11y

Home featured list, library, and detail load real policies from the shared JSON.
wx.login stub still shows the missing-AppID message when AppID is unset.

## DevTools test plan
1. Switch all four tabs: home / library / ask / me
2. Home shows featured policies after JSON loads
3. Library lists real titles; search a known keyword (e.g. subsidy-related)
4. Open one policy detail: summary, key points, source URL (copy)
5. Me -> WeChat login stub -> missing AppID message if unset

## Root scripts
mp:data mp:install mp:dev mp:build

## Output dirs
dist/dev/mp-weixin (dev)
dist/build/mp-weixin (prod)
