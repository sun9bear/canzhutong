import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { A11yProvider } from "@/components/a11y-panel";
import { RouteAnnouncer } from "@/components/route-announcer";
import appCss from "../styles.css?url";

const APP_NAME = "残助通";
const host = import.meta.env.VITE_PUBLIC_HOSTNAME;
const ogImage = host ? `https://${host}/og.jpg` : undefined;
const xBanner = host
  ? `https://og.grok.me/v1/banner.png?host=${encodeURIComponent(host)}&title=${encodeURIComponent(APP_NAME)}&color=1B4D47`
  : undefined;

const A11Y_BOOT = `(function(){try{var d=document.documentElement;var s={};try{s=JSON.parse(localStorage.getItem("cz-a11y")||"{}")}catch(e){}var f=s.fontScale||localStorage.getItem("cz-a11y-font");var c=s.contrast||localStorage.getItem("cz-a11y-contrast");if(f)d.setAttribute("data-type",f);if(c)d.setAttribute("data-contrast",c);if(s.spacing)d.setAttribute("data-spacing",s.spacing);if(s.underlineLinks)d.setAttribute("data-links","on");if(s.easyRead)d.setAttribute("data-easy","on");if(s.reduceMotion)d.setAttribute("data-motion","reduce");}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: APP_NAME },
      {
        name: "description",
        content: "中国残疾人法律法规政策查询与智能咨询。支持大字、高对比、读屏和文字咨询。",
      },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "theme-color", content: "#1B4D47" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: "权威政策 · 智能咨询 · 无障碍" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]
        : []),
      ...(xBanner
        ? [
            { property: "x:game:image", content: xBanner },
            { property: "x:game:image:width", content: "1200" },
            { property: "x:game:image:height", content: "264" },
          ]
        : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: A11Y_BOOT }} />
        <PreviewHostBridge />
        <AuthProvider>
          <A11yProvider>
            <RouteAnnouncer />
            <Outlet />
          </A11yProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
