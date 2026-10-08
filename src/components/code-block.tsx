import { useState } from "react";
import { cn } from "@/lib/utils";
import { MdIcon } from "@/britta/icon";

type Lang = "tsx" | "kt" | "css" | "json" | "gradle";

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "\u0026amp;")
    .replaceAll("<", "\u0026lt;")
    .replaceAll(">", "\u0026gt;");
}

function highlight(code: string, lang: Lang): string {
  let src = escapeHtml(code);
  src = src.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, `<span class="tok-cm">$1</span>`);
  src = src.replace(
    /("[^]*?"|&#39;[^]*?&#39;|`[^]*?`)/g,
    `<span class="tok-str">$1</span>`,
  );
  const kws =
    lang === "kt"
      ? "fun|val|var|class|object|package|import|override|private|public|internal|data|sealed|if|else|when|return|null|true|false|Composable|remember"
      : lang === "css"
        ? "root|from|import|media"
        : "const|let|var|function|return|export|import|from|type|interface|extends|as|new|true|false|null|undefined|async|await";
  src = src.replace(
    new RegExp(`\\b(${kws})\\b`, "g"),
    `<span class="tok-kw">$1</span>`,
  );
  src = src.replace(
    /\b([A-Z][A-Za-z0-9_]+)\b/g,
    `<span class="tok-type">$1</span>`,
  );
  src = src.replace(
    /\b(\d+(?:\.\d+)?(?:px|dp|sp|rem)?)\b/g,
    `<span class="tok-num">$1</span>`,
  );
  return src;
}

export function CodeBlock({
  tabs,
  className,
}: {
  tabs: { id: string; label: string; lang: Lang; code: string }[];
  className?: string;
}) {
  const [tab, setTab] = useState(tabs[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const active = tabs.find((t) => t.id === tab) ?? tabs[0];
  if (!active) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(active.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-surface-container-low ring-1 ring-outline-variant/70",
        className,
      )}
    >
      <div className="flex items-center gap-1 border-b border-outline-variant/70 px-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "relative h-10 px-3 text-xs font-medium",
              t.id === active.id ? "text-on-surface" : "text-on-surface-variant",
            )}
          >
            {t.label}
            {t.id === active.id ? (
              <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" />
            ) : null}
          </button>
        ))}
        <button
          type="button"
          onClick={copy}
          className="ml-auto mr-1 inline-flex h-8 items-center gap-1 rounded-full px-2 text-xs text-on-surface-variant hover:bg-on-surface/10"
        >
          <MdIcon name={copied ? "check" : "content_copy"} size={16} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="britta-code max-h-[420px] overflow-auto p-4 text-[12.5px] leading-5 text-on-surface">
        <code
          dangerouslySetInnerHTML={{ __html: highlight(active.code, active.lang) }}
        />
      </pre>
    </div>
  );
}
