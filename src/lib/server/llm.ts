import { getLlmConfig } from "./ai-settings";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatCompletionResult =
  | { ok: true; text: string }
  | { ok: false; error: string; status?: number };

/**
 * OpenAI-compatible chat completion against admin-configured (or DeepSeek / XAI env fallback) LLM.
 */
export async function chatCompletion(opts: {
  system?: string;
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  temperature?: number;
  max_tokens?: number;
}): Promise<ChatCompletionResult> {
  const config = await getLlmConfig();
  if (!config) {
    return { ok: false, error: "no_config" };
  }

  const messages: ChatMessage[] = [];
  if (opts.system) {
    messages.push({ role: "system", content: opts.system });
  }
  for (const m of opts.messages) {
    messages.push({ role: m.role, content: m.content });
  }

  const url = `${config.baseUrl.replace(/\/+$/, "")}/chat/completions`;

  const LLM_TIMEOUT_MS = 30_000;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        temperature: opts.temperature ?? 0.2,
        max_tokens: opts.max_tokens ?? 1200,
        messages,
      }),
      signal: AbortSignal.timeout(LLM_TIMEOUT_MS),
    });
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    if (name === "TimeoutError" || name === "AbortError") {
      return { ok: false, error: "timeout" };
    }
    return { ok: false, error: "network_error" };
  }

  if (!res.ok) {
    return { ok: false, error: "upstream_error", status: res.status };
  }

  try {
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content ?? "";
    return { ok: true, text };
  } catch {
    return { ok: false, error: "parse_error" };
  }
}
