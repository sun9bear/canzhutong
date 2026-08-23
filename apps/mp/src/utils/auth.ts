/**
 * WeChat login stub. Requires VITE_MP_APPID (and matching manifest mp-weixin.appid).
 */
export function getMpAppId(): string {
  return (import.meta.env.VITE_MP_APPID as string | undefined)?.trim() || "";
}

export function isAppIdConfigured(): boolean {
  const id = getMpAppId();
  return Boolean(id) && id !== "touristappid" && !id.startsWith("your-");
}

export type LoginStubResult =
  | { ok: true; code: string }
  | { ok: false; message: string };

/** Stub wx.login — does not call backend; surfaces missing AppID clearly. */
export function stubWxLogin(): Promise<LoginStubResult> {
  if (!isAppIdConfigured()) {
    const message =
      "未配置 AppID：请在 apps/mp/.env 设置 VITE_MP_APPID，并同步填写 src/manifest.json → mp-weixin.appid 后重新编译。";
    return Promise.resolve({ ok: false, message });
  }

  return new Promise((resolve) => {
    // #ifdef MP-WEIXIN
    uni.login({
      provider: "weixin",
      success: (res) => {
        if (res.code) {
          resolve({ ok: true, code: res.code });
        } else {
          resolve({ ok: false, message: "wx.login 未返回 code" });
        }
      },
      fail: (err) => {
        resolve({
          ok: false,
          message: err?.errMsg || "wx.login 调用失败",
        });
      },
    });
    // #endif
    // #ifndef MP-WEIXIN
    resolve({
      ok: false,
      message: "当前非微信小程序运行环境，无法调用 wx.login",
    });
    // #endif
  });
}
