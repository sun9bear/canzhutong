import { stripMarkdownForSpeech } from "@/lib/markdown";

type SpeechListener = (speaking: boolean) => void;

const listeners = new Set<SpeechListener>();
let current: SpeechSynthesisUtterance | null = null;
let queue: SpeechSynthesisUtterance[] = [];
let resumeTimer: ReturnType<typeof setInterval> | null = null;
let voicesWarmed = false;

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

/** 微信内置浏览器常挂空 speechSynthesis，点了也没声。 */
export function isLikelySilentSpeechEnv() {
  if (typeof navigator === "undefined") return false;
  return /MicroMessenger|MiniProgramEnv|miniProgram/i.test(navigator.userAgent);
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
  if (!voices.length) return undefined;
  const score = (v: SpeechSynthesisVoice) => {
    const lang = v.lang.toLowerCase().replace("_", "-");
    if (lang === "zh-cn") return 5;
    if (lang.startsWith("zh-cn")) return 4;
    if (lang === "zh-tw" || lang === "zh-hk") return 2;
    if (lang.startsWith("zh")) return 3;
    if (/chinese|中文|普通话|汉语|xiaoxiao|xiaoyi|huihui/i.test(v.name)) return 2;
    return 0;
  };
  return voices
    .filter((v) => score(v) > 0)
    .sort((a, b) => score(b) - score(a))[0];
}

function clearResume() {
  if (resumeTimer) {
    clearInterval(resumeTimer);
    resumeTimer = null;
  }
}

/** Chrome 会在长朗读中把 speechSynthesis 置为 paused 且不再继续。 */
function armResume() {
  clearResume();
  if (!canSpeak()) return;
  resumeTimer = setInterval(() => {
    if (!canSpeak()) return;
    try {
      if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {
      /* ignore */
    }
  }, 5000);
}

function finishAll() {
  current = null;
  queue = [];
  clearResume();
  notify(false);
}

/**
 * Chrome 对单次 utterance 过长会静默截断；按句号等切段排队。
 * 同步 speak 第一段，避免打断 iOS 手势激活链。
 */
function chunkForSpeech(text: string, maxLen = 220): string[] {
  const t = text.trim();
  if (!t) return [];
  if (t.length <= maxLen) return [t];
  const chunks: string[] = [];
  let rest = t;
  while (rest.length > maxLen) {
    let cut = -1;
    for (const sep of ["。", "！", "？", "；", "，", ",", " "]) {
      const idx = rest.lastIndexOf(sep, maxLen);
      if (idx >= Math.floor(maxLen * 0.35)) {
        cut = idx + sep.length;
        break;
      }
    }
    if (cut < 0) cut = maxLen;
    const piece = rest.slice(0, cut).trim();
    if (piece) chunks.push(piece);
    rest = rest.slice(cut).trim();
  }
  if (rest) chunks.push(rest);
  return chunks;
}

function bindUtterance(u: SpeechSynthesisUtterance) {
  u.onend = () => {
    if (current !== u) return;
    const next = queue.shift();
    if (next) {
      current = next;
      try {
        window.speechSynthesis.speak(next);
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      } catch {
        finishAll();
      }
      return;
    }
    finishAll();
  };
  u.onerror = () => {
    if (current === u) finishAll();
  };
}

export function stopSpeak() {
  if (!canSpeak()) return;
  queue = [];
  current = null;
  clearResume();
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
  notify(false);
}

export function speak(text: string, rate = 0.92) {
  if (!canSpeak()) return false;
  warmVoices();
  const trimmed = stripMarkdownForSpeech(text).slice(0, 8000);
  if (!trimmed) return false;

  const chunks = chunkForSpeech(trimmed);
  if (!chunks.length) return false;

  // 仅在确有播放/排队时 cancel。cancel 后立刻 speak 在 Chrome 上常会静音。
  // 先清空 current/queue，避免 cancel 触发的旧 onend 误续播或 finishAll。
  const synth = window.speechSynthesis;
  const busy = Boolean(current) || synth.speaking || synth.pending;
  queue = [];
  current = null;
  clearResume();
  if (busy) {
    try {
      synth.cancel();
    } catch {
      /* ignore */
    }
  }

  const voice = pickZhVoice();
  const utterances = chunks.map((piece) => {
    const u = new SpeechSynthesisUtterance(piece);
    u.lang = "zh-CN";
    u.rate = rate;
    u.pitch = 1;
    // 不强行塞无效 voice；部分安卓/微信设了 voice 反而无声
    if (voice) u.voice = voice;
    bindUtterance(u);
    return u;
  });

  const first = utterances[0]!;
  queue = utterances.slice(1);
  current = first;
  notify(true);
  armResume();

  const kick = () => {
    if (current !== first) return;
    try {
      // 部分 Chrome：paused 卡死时需先 resume
      if (synth.paused) synth.resume();
      synth.speak(first);
      if (synth.paused) synth.resume();
    } catch {
      finishAll();
    }
  };

  if (busy) {
    // cancel 之后稍延后，规避 Chrome 静音竞态；仍尽量贴近用户点击
    setTimeout(kick, 40);
  } else {
    // 空闲时同步 speak，保住 iOS Safari 手势链
    kick();
  }
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
  if (!canSpeak() || voicesWarmed) {
    if (canSpeak()) window.speechSynthesis.getVoices();
    return;
  }
  voicesWarmed = true;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    window.speechSynthesis.getVoices();
  });
}
