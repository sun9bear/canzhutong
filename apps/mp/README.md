# canzhutong WeChat mini-program shell

uni-app Vue3 + Vite under apps/mp.

## Preview
1. In apps/mp run package install then script dev:mp-weixin
2. Open WeChat DevTools
3. Import directory apps/mp/dist/dev/mp-weixin
4. Set VITE_MP_APPID and manifest mp-weixin.appid

## Pages
Tab: home / library / ask / me
Other: policy-detail / a11y

Policy placeholders are empty (no fabricated money/URLs).
wx.login stub shows message when AppID missing.

## Root scripts
mp:install mp:dev mp:build proxy into apps/mp

## Output dirs
dist/dev/mp-weixin (dev)
dist/build/mp-weixin (prod)
