/** 把模型常用的 Markdown 转成朗读文本：不读星号、井号、反引号等标记。 */
export function stripMarkdownForSpeech(src: string): string {
  let t = src.replace(/\r\n/g, "\n");
  t = t.replace(/```[\s\S]*?```/g, (block) => block.replace(/```\w*/g, " ").trim());
  t = t.replace(/`([^`]+)`/g, "$1");
  t = t.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1");
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  t = t.replace(/^#{1,6}\s+/gm, "");
  // 1. / 1) / 1、 / 1． 以及 - * +
  t = t.replace(/^\s{0,3}(?:[-*+]\s+|\d+(?:[.)]\s+|、\s*|．\s*))/gm, "");
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
  | { type: "ol"; start: number; items: InlineNode[][] }
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

/** 中文建议常用「一、二、三」作小节标题（非阿拉伯数字列表）。 */
function isCnSectionHeading(line: string): boolean {
  return /^[一二三四五六七八九十百]+[、．.]\s*\S/.test(line.trim());
}

/**
 * 有序项：1. / 1) / 1、 / 1．（中文模型极爱用顿号）。
 * 返回起始编号；非列表行返回 null。
 */
function matchOrdered(line: string): { n: number; rest: string } | null {
  // 中文「1、项」常无空格；Markdown「1. 项」一般有空格
  const m = line.match(/^\s{0,3}(\d+)(?:[.)]\s+|、\s*|．\s*)(.*)$/);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n) || n < 1) return null;
  return { n, rest: (m[2] ?? "").trimStart() };
}

function matchUnordered(line: string): string | null {
  const m = line.match(/^\s{0,3}[-*+]\s+(.*)$/);
  return m ? (m[1] ?? "") : null;
}

function isBlank(line: string | undefined): boolean {
  return !line || !line.trim();
}

/**
 * 跳过空行后，若下一有序项编号正好接上 expected，则视为同一列表续写
 *（修复「1. 2.\n\n3. 4.」被拆成两个从 1 起算的 ol）。
 */
function peekContinuesOl(
  lines: string[],
  from: number,
  expected: number,
): boolean {
  let j = from;
  while (j < lines.length && isBlank(lines[j])) j += 1;
  if (j >= lines.length) return false;
  const hit = matchOrdered(lines[j] ?? "");
  return Boolean(hit && hit.n === expected);
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
    if (isBlank(line)) {
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

    if (isCnSectionHeading(line)) {
      blocks.push({
        type: "h",
        level: 2,
        children: parseInline(line.trim()),
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

    if (matchUnordered(line) !== null) {
      const items: InlineNode[][] = [];
      while (i < lines.length) {
        const rest = matchUnordered(lines[i] ?? "");
        if (rest === null) break;
        items.push(parseInline(rest));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    const ordered = matchOrdered(line);
    if (ordered) {
      const start = ordered.n;
      const items: InlineNode[][] = [];
      let expected = start;
      while (i < lines.length) {
        // 允许空行后续写同一编号序列
        if (isBlank(lines[i])) {
          if (peekContinuesOl(lines, i, expected)) {
            while (i < lines.length && isBlank(lines[i])) i += 1;
            continue;
          }
          break;
        }
        const hit = matchOrdered(lines[i] ?? "");
        if (!hit || hit.n !== expected) break;
        items.push(parseInline(hit.rest));
        expected += 1;
        i += 1;
      }
      blocks.push({ type: "ol", start, items });
      continue;
    }

    const buf: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      !isBlank(lines[i]) &&
      !headingLevel(lines[i] ?? "") &&
      !isCnSectionHeading(lines[i] ?? "") &&
      matchUnordered(lines[i] ?? "") === null &&
      matchOrdered(lines[i] ?? "") === null &&
      !/^\s{0,3}>\s?/.test(lines[i] ?? "")
    ) {
      buf.push(lines[i] ?? "");
      i += 1;
    }
    flushPara(buf);
  }
  return blocks;
}
