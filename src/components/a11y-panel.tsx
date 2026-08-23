import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Accessibility, RotateCcw, Volume2, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useA11y, type Contrast, type FontScale, type Spacing } from "@/lib/a11y";
import { canSpeak, speak, warmVoices } from "@/lib/speech";
import { cn } from "@/lib/utils";

type Ui = { open: boolean; setOpen: (v: boolean) => void };

const A11yUi = createContext<Ui | null>(null);

export function A11yProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const hydrate = useA11y((s) => s.hydrate);

  useEffect(() => {
    hydrate();
    warmVoices();
  }, [hydrate]);

  return (
    <A11yUi.Provider value={{ open, setOpen }}>
      {children}
      <A11yPanel />
    </A11yUi.Provider>
  );
}

export function A11yTrigger({ className }: { className?: string }) {
  const ctx = useContext(A11yUi);
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-medium",
        "text-fg hover:bg-surface-2",
        className,
      )}
      aria-haspopup="dialog"
      aria-expanded={ctx?.open ?? false}
      aria-controls="a11y-panel"
      onClick={() => ctx?.setOpen(true)}
    >
      <Accessibility className="size-5" aria-hidden />
      <span>无障碍</span>
    </button>
  );
}

function Choice<T extends string>({
  legend,
  value,
  onChange,
  options,
  columns = 2,
}: {
  legend: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
  columns?: 2 | 4;
}) {
  return (
    <fieldset>
      <legend className="text-base font-medium">{legend}</legend>
      <div className={cn("mt-2 grid gap-2", columns === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2")}>
        {options.map((o) => {
          const on = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.id)}
              className={cn(
                "min-h-12 rounded-lg border px-3 py-2 text-base font-medium",
                on ? "border-primary bg-primary text-primary-fg" : "border-border bg-bg text-fg hover:bg-surface-2",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-14 w-full items-center justify-between gap-3 rounded-lg border border-border bg-bg px-3 py-2 text-left"
    >
      <span>
        <span className="block text-base font-medium">{label}</span>
        <span className="block text-sm text-muted">{hint}</span>
      </span>
      <span
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full",
          checked ? "bg-primary" : "bg-surface-2",
        )}
        aria-hidden
      >
        <span
          className={cn(
            "absolute top-0.5 size-6 rounded-full shadow-card transition-transform",
            checked ? "left-5 bg-primary-fg" : "left-0.5 bg-fg",
          )}
        />
      </span>
    </button>
  );
}

function A11yPanel() {
  const ctx = useContext(A11yUi);
  const fontScale = useA11y((s) => s.fontScale);
  const contrast = useA11y((s) => s.contrast);
  const spacing = useA11y((s) => s.spacing);
  const underlineLinks = useA11y((s) => s.underlineLinks);
  const easyRead = useA11y((s) => s.easyRead);
  const reduceMotion = useA11y((s) => s.reduceMotion);
  const setFontScale = useA11y((s) => s.setFontScale);
  const setContrast = useA11y((s) => s.setContrast);
  const setSpacing = useA11y((s) => s.setSpacing);
  const setUnderlineLinks = useA11y((s) => s.setUnderlineLinks);
  const setEasyRead = useA11y((s) => s.setEasyRead);
  const setReduceMotion = useA11y((s) => s.setReduceMotion);
  const reset = useA11y((s) => s.reset);

  return (
    <Dialog.Root open={ctx?.open ?? false} onOpenChange={ctx?.setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-fg/40" />
        <Dialog.Content
          id="a11y-panel"
          aria-describedby="a11y-desc"
          className="fixed inset-x-0 bottom-0 z-50 max-h-[90dvh] overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-card outline-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] md:inset-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="font-display text-xl font-semibold">无障碍设置</Dialog.Title>
              <Dialog.Description id="a11y-desc" className="mt-1 text-sm text-muted">
                字号、对比和朗读会保存在本机，下次打开仍然有效。
              </Dialog.Description>
            </div>
            <Dialog.Close className="grid size-11 place-items-center rounded-md hover:bg-surface-2" aria-label="关闭无障碍设置">
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>

          <div className="space-y-5">
            <Choice<FontScale>
              legend="字号"
              value={fontScale}
              onChange={setFontScale}
              columns={4}
              options={[
                { id: "md", label: "标准" },
                { id: "lg", label: "大" },
                { id: "xl", label: "特大" },
                { id: "xxl", label: "超大" },
              ]}
            />
            <Choice<Contrast>
              legend="对比"
              value={contrast}
              onChange={setContrast}
              options={[
                { id: "standard", label: "标准" },
                { id: "high", label: "黑白高对比" },
                { id: "dark", label: "黑底白字" },
                { id: "yellow", label: "黑底黄字" },
              ]}
            />
            <Choice<Spacing>
              legend="行距"
              value={spacing}
              onChange={setSpacing}
              options={[
                { id: "normal", label: "默认行距" },
                { id: "loose", label: "宽松行距" },
              ]}
            />
            <ToggleRow
              label="下划线链接"
              hint="所有链接加下划线，不只靠颜色区分"
              checked={underlineLinks}
              onChange={setUnderlineLinks}
            />
            <ToggleRow
              label="简易模式"
              hint="放大点击区域、加宽间距，适合低视力和操作困难"
              checked={easyRead}
              onChange={setEasyRead}
            />
            <ToggleRow
              label="减少动效"
              hint="关闭位移动画，减轻眩晕"
              checked={reduceMotion}
              onChange={setReduceMotion}
            />

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-border bg-bg px-4 text-base font-medium"
                onClick={() => {
                  if (!canSpeak()) return;
                  speak("这是朗读试听。残助通支持大字、高对比、读屏和文字咨询。");
                }}
              >
                <Volume2 className="size-5" aria-hidden />
                试听朗读
              </button>
              <button
                type="button"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-border bg-bg px-4 text-base font-medium"
                onClick={() => reset()}
              >
                <RotateCcw className="size-5" aria-hidden />
                恢复默认
              </button>
            </div>

            <p className="text-sm text-muted">
              可用文字提问。读屏请打开系统功能：iPhone 旁白、安卓 TalkBack。
              <Link to="/access" className="ml-1 font-medium text-primary" onClick={() => ctx?.setOpen(false)}>
                无障碍说明
              </Link>
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
