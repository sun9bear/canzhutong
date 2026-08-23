import { createFileRoute, Link } from "@tanstack/react-router";
import { A11yTrigger } from "@/components/a11y-panel";
import { ReadAloud } from "@/components/read-aloud";

export const Route = createFileRoute("/_app/access")({
  component: AccessPage,
});

const INTRO =
  "残助通按无障碍优先设计。可放大字号、提高对比、加宽行距；支持读屏、跳过链接和朗读。咨询支持全程文字，不必依赖电话或语音。";

function AccessPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-2xl font-semibold">无障碍说明</h1>
        <p className="text-muted">{INTRO}</p>
        <div className="flex flex-wrap gap-2">
          <A11yTrigger className="border border-border bg-surface" />
          <ReadAloud text={INTRO} label="朗读本页说明" />
        </div>
      </header>

      <section className="rounded-xl bg-surface p-5 shadow-card">
        <h2 className="font-display text-lg font-semibold">低视力</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>默认字号为「大」。点顶部「无障碍」，可调到标准、特大或超大。</li>
          <li>黑白高对比、黑底白字、黑底黄字三种模式，按自己看清的选。</li>
          <li>打开「下划线链接」，不用只靠颜色找按钮。</li>
          <li>手机可双指放大。本应用不限制缩放。</li>
        </ul>
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-card">
        <h2 className="font-display text-lg font-semibold">盲人与读屏</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>请打开系统读屏：iPhone「旁白」、安卓「TalkBack」、Windows「讲述人」或 NVDA。</li>
          <li>每个页面开头可用「跳到正文」「跳到导航」。键盘 Tab 可见焦点环；切换页面后会朗读页名并把焦点放到标题。</li>
          <li>政策页、问答回复有「朗读」按钮，用系统语音读中文。</li>
          <li>底部四个按钮都有文字，不只靠图标。</li>
        </ul>
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-card">
        <h2 className="font-display text-lg font-semibold">听障、言语障碍</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>「问一问」支持打字咨询。语音输入是可选项，全程文字即可完成。</li>
          <li>不会自动播放声音。朗读必须你自己点。</li>
          <li>重要提示都用文字显示，不用铃声或语音提示。</li>
          <li>暂无实时手语视频。办理业务也可到当地残联窗口或政务服务网，窗口应提供文字交流。</li>
        </ul>
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-card">
        <h2 className="font-display text-lg font-semibold">联系方式（不依赖电话）</h2>
        <ul className="mt-3 space-y-3">
          <li>
            <Link to="/ask" className="font-medium text-primary">
              在本应用文字提问
            </Link>
            <span className="block text-sm text-muted">支持全程打字。</span>
          </li>
          <li>
            <a href="tel:12385" className="font-medium text-primary">
              全国残疾人服务热线 12385
            </a>
            <span className="block text-sm text-muted">
              也可到县级残联、政务服务中心当面办理。
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
