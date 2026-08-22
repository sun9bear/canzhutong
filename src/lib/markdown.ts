/** 把模型常用的 Markdown 转成朗读文本：不读星号、井号、反引号等标记。 */
export function stripMarkdownForSpeech(src: string): string {
  let t = src.replace(/\r\n/g, "\n");
  t = t.replace(/```[\s\S]*?```/g, (block) => block.replace(/```\w*/g, " ").trim());
  t = t.replace(/`([^`]+)`/g, "$1");
  t = t.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1");
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  t = t.replace(/^#{1,6}\s+/gm, "");
  t = t.replace(/^\s{0,3}([-*+]|\d+[.)])\s+/gm, "");
  t = t.replace(/^\s{0,3}>\s?/gm, "");
  t = t.replace(/^\s{0,3}([-*_]){3,}\s*$/gm, "");
  t = t.replace(/(\*\*|__)([\s\S]*?)\1/g, "$2");
  t = t.replace(/(\*|_)([^*\n]+)\1/g, "$2");
  t = t.replace(/~~([^~]+)~~/g, "$1");
  t = t.replace(/[*#`]+/g, "");
  t = t.replace(/[ \t]+\n/g, "\n");
  t = t.replace(/\n{3,}/g, "\n\n");
  t = t.replace(/\n/g, "。");
  t = t.replace(/[：:]\s*。/g, "：");
  t = t.replace(/[。]{2,}/g, "。");
  t = t.replace(/[。，、]{2,}/g, "。");
  t = t.replace(/\s+/g, " ");
  return t.trim();
}

export type InlineNode =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  | { type: "em"; value: string }
  | { type: "code"; value: string }
  | { type: "link"; value: string; href: string };

type Block =
  | { type: "p"; children: InlineNode[] }
  | { type: "h"; level: 1 | 2 | 3; children: InlineNode[] }
  | { type: "ul"; items: InlineNode[][] }
  | { type: "ol"; items: InlineNode[][] }
  | { type: "quote"; children: InlineNode[] };

function parseInline(raw: string): InlineNode[] {
  const out: InlineNode[] = [];
  const re =
    /(\*\*([^*]+)\*\*|__([^_]+)__|`([^`]+)`|\[([^\]]+)\]\((https?:[^)]+)\)|\*([^*]+)\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    if (m.index > last) out.push({ type: "text", value: raw.slice(last, m.index) });
    if (m[2] || m[3]) out.push({ type: "strong", value: m[2] || m[3] });
    else if (m[4]) out.push({ type: "code", value: m[4] });
    else if (m[5] && m[6]) out.push({ type: "link", value: m[5], href: m[6] });
    else if (m[7]) out.push({ type: "em", value: m[7] });
    last = m.index + m[0].length;
  }
  if (last < raw.length) out.push({ type: "text", value: raw.slice(last) });
  return out.length ? out : [{ type: "text", value: raw }];
}

function headingLevel(line: string): 1 | 2 | 3 | 0 {
  if (/^###\s+/.test(line)) return 3;
  if (/^##\s+/.test(line)) return 2;
  if (/^#\s+/.test(line)) return 1;
  return 0;
}

export function parseMarkdownBlocks(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const flushPara = (buf: string[]) => {
    const text = buf.join("\n").trim();
    if (text) blocks.push({ type: "p", children: parseInline(text.replace(/\n/g, " ")) });
  };

  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (!line.trim()) {
      i += 1;
      continue;
    }

    const h = headingLevel(line);
    if (h) {
      blocks.push({
        type: "h",
        level: h,
        children: parseInline(line.replace(/^#{1,6}\s+/, "")),
      });
      i += 1;
      continue;
    }

    if (/^\s{0,3}>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s{0,3}>\s?/.test(lines[i] ?? "")) {
        buf.push((lines[i] ?? "").replace(/^\s{0,3}>\s?/, ""));
        i += 1;
      }
      blocks.push({ type: "quote", children: parseInline(buf.join(" ")) });
      continue;
    }

    if (/^\s{0,3}[-*+]\s+/.test(line)) {
      const items: InlineNode[][] = [];
      while (i < lines.length && /^\s{0,3}[-*+]\s+/.test(lines[i] ?? "")) {
        items.push(parseInline((lines[i] ?? "").replace(/^\s{0,3}[-*+]\s+/, "")));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\s{0,3}\d+[.)]\s+/.test(line)) {
      const items: InlineNode[][] = [];
      while (i < lines.length && /^\s{0,3}\d+[.)]\s+/.test(lines[i] ?? "")) {
        items.push(parseInline((lines[i] ?? "").replace(/^\s{0,3}\d+[.)]\s+/, "")));
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const buf: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      (lines[i] ?? "").trim() &&
      !headingLevel(lines[i] ?? "") &&
      !/^\s{0,3}([-*+]|\d+[.)]|>)\s+/.test(lines[i] ?? "")
    ) {
      buf.push(lines[i] ?? "");
      i += 1;
    }
    flushPara(buf);
  }
  return blocks;
}
