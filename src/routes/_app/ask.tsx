import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReadAloud } from "@/components/read-aloud";
import { ReadableMd } from "@/components/readable-md";
import { VoiceInput } from "@/components/voice-input";
import { QUICK_QUESTIONS } from "@/data/copy";
import { RegionPicker } from "@/components/region-picker";
import { askPolicy, type ChatTurn } from "@/lib/server/chat";

type Search = { q?: string };

export const Route = createFileRoute("/_app/ask")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: AskPage,
});

type Msg = ChatTurn & {
  citations?: { id: string; title: string; docNo: string; regionName: string }[];
};

function AskPage() {
  const { q } = Route.useSearch();
  const [region, setRegion] = useState("CN");
  const [input, setInput] = useState(q ?? "");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const boot = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    if (boot.current) return;
    if (q) {
      boot.current = true;
      void send(q);
    }
  }, [q]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;
    setError(null);
    setInput("");
    const nextHistory: ChatTurn[] = [...messages, { role: "user", content: question }];
    setMessages((m) => [...m, { role: "user", content: question }]);
    setPending(true);
    try {
      const res = await askPolicy({
        data: {
          question,
          region: region === "CN" ? undefined : region,
          history: nextHistory.slice(-6),
        },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setMessages((m) => [
        ...m,
        { role: "assistant", content: res.text, citations: res.citations },
      ]);
    } catch {
      setError("网络异常，请稍后重试。");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col">
      <header className="mb-4">
        <h1 className="font-display text-2xl font-semibold">问一问</h1>
        <p className="mt-1 text-muted">
          用打字提问即可，不必说话或打电话。回答只依据政策库摘录，不编造金额。
        </p>
        <div className="mt-3">
          <RegionPicker value={region} onChange={setRegion} allowAll={false} idPrefix="ask" />
        </div>
      </header>

      <div className="flex-1 space-y-4" aria-live="polite" aria-relevant="additions">
        {messages.length === 0 && !pending ? (
          <ul className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="min-h-11 rounded-full border border-border bg-surface px-3 py-2 text-left text-sm hover:border-primary"
                  onClick={() => void send(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {messages.map((m, i) => (
          <div
            key={`${m.role}-${i}`}
            className={
              m.role === "user"
                ? "ml-8 rounded-xl bg-primary px-4 py-3 text-primary-fg"
                : "mr-4 rounded-xl bg-surface px-4 py-3 shadow-card"
            }
          >
            <p className="sr-only">{m.role === "user" ? "你问：" : "回答："}</p>
            {m.role === "assistant" ? (
              <ReadableMd text={m.content} className="leading-relaxed" />
            ) : (
              <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
            )}
            {m.role === "assistant" ? (
              <div className="mt-3">
                <ReadAloud text={m.content} label="朗读回答" />
              </div>
            ) : null}
            {m.citations && m.citations.length > 0 ? (
              <ul className="mt-3 space-y-1 border-t border-border pt-2 text-sm">
                {m.citations.map((c) => (
                  <li key={c.id}>
                    <Link to="/library/$policyId" params={{ policyId: c.id }} className="text-primary">
                      {c.regionName} · {c.title}
                    </Link>
                    {c.docNo ? <span className="text-subtle"> {c.docNo}</span> : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
        {pending ? (
          <p className="text-sm text-muted">正在对照政策库…</p>
        ) : null}
        {error ? (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}
        <div ref={bottomRef} />
      </div>

      <form
        className="sticky bottom-16 mt-4 flex flex-wrap items-end gap-2 bg-bg py-3 md:bottom-0"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <label className="sr-only" htmlFor="ask-input">
          输入问题
        </label>
        <Textarea
          id="ask-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="描述你的情况和问题，例如：我是二级肢体残疾、低保家庭，两项补贴怎么申请？"
          className="min-h-20 min-w-[12rem] flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
        />
        <div className="flex items-end gap-2">
          <VoiceInput
            disabled={pending}
            onText={(text) => {
              setInput((prev) => {
                const next = prev.trim() ? `${prev.trim()} ${text}` : text;
                return next;
              });
              inputRef.current?.focus();
            }}
          />
          <Button type="submit" disabled={pending}>
            <Send className="size-4" aria-hidden />
            发送
          </Button>
        </div>
      </form>
    </div>
  );
}
