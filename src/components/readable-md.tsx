import { parseMarkdownBlocks, type InlineNode } from "@/lib/markdown";

function InlineBits({ bits }: { bits: InlineNode[] }) {
  return (
    <>
      {bits.map((b, i) => {
        if (b.type === "strong") return <strong key={i}>{b.value}</strong>;
        if (b.type === "em") return <em key={i}>{b.value}</em>;
        if (b.type === "code") return <span key={i}>{b.value}</span>;
        if (b.type === "link") {
          return (
            <a key={i} href={b.href} className="underline" rel="noreferrer" target="_blank">
              {b.value}
            </a>
          );
        }
        return <span key={i}>{b.value}</span>;
      })}
    </>
  );
}

export function ReadableMd({ text, className }: { text: string; className?: string }) {
  const blocks = parseMarkdownBlocks(text);
  if (!blocks.length) {
    return <p className={className}>{text}</p>;
  }
  return (
    <div className={className ? `readable-md ${className}` : "readable-md"}>
      {blocks.map((b, i) => {
        if (b.type === "h") {
          const Tag = b.level === 1 ? "h2" : b.level === 2 ? "h3" : "h4";
          return (
            <Tag key={i}>
              <InlineBits bits={b.children} />
            </Tag>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i}>
              {b.items.map((item, j) => (
                <li key={j}>
                  <InlineBits bits={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (b.type === "ol") {
          return (
            <ol key={i}>
              {b.items.map((item, j) => (
                <li key={j}>
                  <InlineBits bits={item} />
                </li>
              ))}
            </ol>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote key={i}>
              <InlineBits bits={b.children} />
            </blockquote>
          );
        }
        return (
          <p key={i}>
            <InlineBits bits={b.children} />
          </p>
        );
      })}
    </div>
  );
}
