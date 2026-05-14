import { marked } from "marked";
import DOMPurify from "dompurify";

const CITY_LINKS: Array<{ regex: RegExp; href: string }> = [
  { regex: /\bAlicante\b/g, href: "/procurador-alicante" },
  { regex: /\bBenidorm\b/g, href: "/procurador-benidorm" },
  { regex: /\bD[ée]nia\b/g, href: "/procurador-denia" },
  { regex: /\bGand[ií]a\b/g, href: "/procurador-gandia" },
];

/** Wraps city mentions in <a> links, but only inside text nodes (skips existing links/headings). */
function autolinkCities(html: string): string {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") return html;
  const doc = new DOMParser().parseFromString(`<div id="root">${html}</div>`, "text/html");
  const root = doc.getElementById("root");
  if (!root) return html;

  const SKIP = new Set(["A", "H1", "H2", "H3", "H4", "CODE", "PRE"]);
  const replacedPerCity = new Map<string, boolean>();

  const walk = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (SKIP.has(el.tagName)) return;
      Array.from(el.childNodes).forEach(walk);
      return;
    }
    if (node.nodeType !== Node.TEXT_NODE) return;
    const text = node.nodeValue ?? "";
    if (!text.trim()) return;

    let html = text;
    let changed = false;
    for (const { regex, href } of CITY_LINKS) {
      // Only first occurrence per city across whole article
      if (replacedPerCity.get(href)) continue;
      const match = regex.exec(html);
      regex.lastIndex = 0;
      if (!match) continue;
      const matched = match[0];
      html = html.replace(
        matched,
        `<a href="${href}" class="text-primary underline">${matched}</a>`,
      );
      replacedPerCity.set(href, true);
      changed = true;
    }

    if (changed) {
      const span = doc.createElement("span");
      span.innerHTML = html;
      const parent = node.parentNode;
      if (parent) {
        while (span.firstChild) parent.insertBefore(span.firstChild, node);
        parent.removeChild(node);
      }
    }
  };

  Array.from(root.childNodes).forEach(walk);
  return root.innerHTML;
}

export function renderMarkdown(md: string): string {
  const raw = marked.parse(md, { async: false }) as string;
  const linked = autolinkCities(raw);
  return DOMPurify.sanitize(linked, { ADD_ATTR: ["target", "rel"] });
}

export function estimateReadTime(md: string): string {
  const words = md.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}
