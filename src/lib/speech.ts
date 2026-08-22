import { stripMarkdownForSpeech } from "@/lib/markdown";

type SpeechListener = (speaking: boolean) => void;

const listeners = new Set<SpeechListener>();
let current: SpeechSynthesisUtterance | null = null;

function notify(speaking: boolean) {
  listeners.forEach((fn) => fn(speaking));
}

export function subscribeSpeech(fn: SpeechListener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function canListen() {
  if (typeof window === "undefined") return false;
  const w = window as Window & {
    SpeechRecognition?: unknown;
    webkitSpeechRecognition?: unknown;
  };
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
}

function pickZhVoice(): SpeechSynthesisVoice | undefined {
  if (!canSpeak()) return undefined;
  const voices = window.speechSynthesis.getVoices();
  const score = (v: SpeechSynthesisVoice) => {
    const lang = v.lang.toLowerCase().replace("_", "-");
    if (lang === "zh-cn") return 5;
    if (lang.startsWith("zh-cn")) return 4;
    if (lang.startsWith("zh")) return 3;
    if (/chinese|中文|普通话|汉语/i.test(v.name)) return 2;
    return 0;
  };
  return voices
    .filter((v) => score(v) > 0)
    .sort((a, b) => score(b) - score(a))[0];
}

export function stopSpeak() {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  current = null;
  notify(false);
}

export function speak(text: string, rate = 0.92) {
  if (!canSpeak()) return false;
  const trimmed = stripMarkdownForSpeech(text).slice(0, 4000);
  if (!trimmed) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(trimmed);
  u.lang = "zh-CN";
  u.rate = rate;
  u.pitch = 1;
  const voice = pickZhVoice();
  if (voice) u.voice = voice;
  u.onend = () => {
    if (current === u) {
      current = null;
      notify(false);
    }
  };
  u.onerror = () => {
    if (current === u) {
      current = null;
      notify(false);
    }
  };
  current = u;
  notify(true);
  window.speechSynthesis.speak(u);
  return true;
}

export function isSpeaking() {
  return current !== null;
}

type Recog = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
};

function RecognitionCtor(): (new () => Recog) | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: new () => Recog;
    webkitSpeechRecognition?: new () => Recog;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function startListen(handlers: {
  onResult: (text: string, isFinal: boolean) => void;
  onEnd?: () => void;
  onError?: (message: string) => void;
}): { stop: () => void } | null {
  const Ctor = RecognitionCtor();
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = "zh-CN";
  rec.continuous = false;
  rec.interimResults = true;
  rec.onresult = (ev) => {
    const last = ev.results[ev.results.length - 1];
    const transcript = last?.[0]?.transcript ?? "";
    const isFinal = Boolean(last && "isFinal" in last ? last.isFinal : true);
    if (transcript) handlers.onResult(transcript, isFinal);
  };
  rec.onend = () => handlers.onEnd?.();
  rec.onerror = (ev) => {
    const err = ev.error ?? "语音识别失败";
    if (err === "aborted" || err === "no-speech") {
      handlers.onEnd?.();
      return;
    }
    handlers.onError?.(err === "not-allowed" ? "没有麦克风权限" : "语音识别暂时不可用");
  };
  try {
    rec.start();
  } catch {
    handlers.onError?.("无法启动语音识别");
    return null;
  }
  return {
    stop: () => {
      try {
        rec.stop();
      } catch {
        /* ignore */
      }
    },
  };
}

export function warmVoices() {
  if (!canSpeak()) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    window.speechSynthesis.getVoices();
  });
}
