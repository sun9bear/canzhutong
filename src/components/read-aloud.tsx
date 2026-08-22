import { useEffect, useState } from "react";
import { Pause, Volume2 } from "lucide-react";
import { canSpeak, isSpeaking, speak, stopSpeak, subscribeSpeech } from "@/lib/speech";
import { cn } from "@/lib/utils";

export function ReadAloud({
  text,
  label = "朗读",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    return subscribeSpeech((speaking) => {
      if (!speaking) setOn(false);
    });
  }, []);

  function toggle() {
    setHint(null);
    if (on || isSpeaking()) {
      stopSpeak();
      setOn(false);
      return;
    }
    if (!canSpeak()) {
      setHint("此浏览器不能朗读。请打开手机读屏：iPhone 旁白，安卓 TalkBack。");
      return;
    }
    const ok = speak(text);
    setOn(ok);
    if (!ok) setHint("朗读未能开始，请改用读屏。");
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium",
          on ? "border-primary bg-primary-soft text-primary" : "text-fg hover:bg-surface-2",
          className,
        )}
      >
        {on ? <Pause className="size-4" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
        {on ? "停止朗读" : label}
      </button>
      {hint ? (
        <p className="max-w-xs text-sm text-muted" role="status">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
