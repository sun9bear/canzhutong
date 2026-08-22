import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { canListen, startListen } from "@/lib/speech";
import { cn } from "@/lib/utils";

export function VoiceInput({
  onText,
  disabled,
}: {
  onText: (text: string) => void;
  disabled?: boolean;
}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const handle = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    setSupported(canListen());
    return () => handle.current?.stop();
  }, []);

  if (!supported) return null;

  function stop() {
    handle.current?.stop();
    handle.current = null;
    setListening(false);
  }

  function toggle() {
    if (listening) {
      stop();
      return;
    }
    setHint(null);
    const h = startListen({
      onResult: (text, isFinal) => {
        if (isFinal) {
          onText(text);
          setHint(null);
        } else {
          setHint(text);
        }
      },
      onEnd: () => {
        setListening(false);
        handle.current = null;
      },
      onError: (message) => {
        setHint(message);
        setListening(false);
        handle.current = null;
      },
    });
    if (!h) {
      setHint("此浏览器不支持语音输入，请改用打字。");
      return;
    }
    handle.current = h;
    setListening(true);
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-pressed={listening}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-1 rounded-md border px-3 text-sm font-medium",
          listening ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface text-fg hover:bg-surface-2",
        )}
      >
        {listening ? <Square className="size-4" aria-hidden /> : <Mic className="size-5" aria-hidden />}
        {listening ? "停止" : "语音输入"}
      </button>
      <span className="sr-only" aria-live="polite">
        {listening ? "正在听，请说话" : hint ?? ""}
      </span>
      {listening || hint ? (
        <span className="max-w-40 text-right text-xs text-muted" aria-hidden={Boolean(hint && !listening)}>
          {listening ? hint || "正在听…" : hint}
        </span>
      ) : null}
    </div>
  );
}
