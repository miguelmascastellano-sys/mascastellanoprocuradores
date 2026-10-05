import { marked } from "marked";
import xss from "xss";

const { FilterXSS, whiteList } = xss as unknown as typeof import("xss");

const sanitizer = new FilterXSS({
  whiteList: {
    ...whiteList,
    a: ["href", "title", "target", "rel", "class"],
    h2: ["id"], h3: ["id"], h4: ["id"],
  },
  stripIgnoreTagBody: ["script", "style"],
});

const CITY_LINKS: Array<{ regex: RegExp; href: string }> = [
  { regex: /\bAlicante\b/g, href: "/procurador-alicante" },
  { regex: /\bBenidorm\b/g, href: "/procurador-benidorm" },
  { regex: /\bD[ée]nia\b/g, href: "/procurador-denia" },
  { regex: /\bGand[ií]a\b/g, href: "/procurador-gandia" },
];

/** Wraps city mentions in <a> links, only in text outside links/headings. Works without a DOM (SSR-safe). */
function autolinkCities(html: string): string {
  const linked = new Set<string>();
  let skipDepth = 0;
  return html
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (part.startsWith("<")) {
        if (/^<(a|h[1-6]|code|pre)[\s>]/i.test(part)) skipDepth++;
        else if (/^<\/(a|h[1-6]|code|pre)>/i.test(part)) skipDepth = Math.max(0, skipDepth - 1);
        return part;
      }
      if (skipDepth > 0) return part;
      let out = part;
      for (const { regex, href } of CITY_LINKS) {
        if (linked.has(href)) continue;
        regex.lastIndex = 0;
        let done = false;
        out = out.replace(regex, (m) => {
          if (done) return m;
          done = true;
          linked.add(href);
          return `<a href="${href}" class="text-primary underline">${m}</a>`;
        });
      }
      return out;
    })
    .join("");
}

export function renderMarkdown(md: string): string {
  const raw = marked.parse(md, { async: false }) as string;
  const linked = autolinkCities(raw);
  return sanitizer.process(linked);
}

export function estimateReadTime(md: string): string {
  const words = md.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}
