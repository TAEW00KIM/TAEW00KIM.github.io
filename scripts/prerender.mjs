// Runs after `vite build` and `vite build --ssr`. Writes prerendered ko (dist/index.html) and en (dist/en/index.html)
// pages with per-language head tags and JSON-LD, plus robots.txt, sitemap.xml and llms.txt files.
// Every fact in JSON-LD and llms.txt comes from the data modules.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ORIGIN = "https://kimtaewoo.dev";
const { render, datasets } = await import(pathToFileURL(path.resolve("dist-server/entry-server.js")).href);

const today = new Date().toISOString().slice(0, 10);
let lastmod = today;
// ProfilePage dateModified needs a full ISO 8601 datetime; the sitemap keeps the date.
let modifiedAt = new Date().toISOString();
try {
  const out = execSync("git log -1 --format=%cI", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z)$/.test(out)) {
    modifiedAt = out;
    lastmod = out.slice(0, 10);
  }
} catch {
  /* fall back to now */
}

const base = readFileSync("dist/index.html", "utf8");

const sub = (html, from, to) => {
  const next = html.replace(from, () => to);
  if (next === html) throw new Error(`prerender: pattern not found: ${from}`);
  return next;
};

const url = (lang) => (lang === "en" ? `${ORIGIN}/en/` : `${ORIGIN}/`);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const jsonLd = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

function projectsInOrder(d) {
  const byId = new Map(d.projects.map((p) => [p.id, p]));
  return d.projectGroups.flatMap((g) => g.ids.filter((id) => byId.has(id)).map((id) => byId.get(id)));
}
// Data strings mark emphasis with **...** and links with [text](url) for the page; JSON-LD, llms.txt and meta get plain text.
const plain = (s) => s.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
const projSummary = (p) => plain(p.summary ? p.summary : [p.problem, p.result].filter(Boolean).join(" "));
// JSON-LD describes only what is on screen: problem + result lines when the card shows them, otherwise the summary lead.
const projOnScreen = (p) => plain(p.problem || p.solution || p.result ? [p.problem, p.result].filter(Boolean).join(" ") : p.summary);

function buildLd(lang) {
  const d = datasets[lang];
  const other = datasets[lang === "en" ? "ko" : "en"];
  const personId = `${ORIGIN}/#person`;
  const edu = d.experience.tabs.find((t) => t.id === "edu")?.items[0];
  const person = {
    "@type": "Person",
    "@id": personId,
    name: lang === "en" ? d.site.nameEn : d.site.nameKo,
    alternateName: lang === "en" ? other.site.nameKo : other.site.nameEn,
    jobTitle: d.site.role,
    url: url(lang),
    email: `mailto:${d.site.email}`,
    sameAs: [d.site.github],
    ...(edu ? { alumniOf: { "@type": "CollegeOrUniversity", name: edu.org } } : {}),
    knowsAbout: d.resume.skills.flatMap((s) => s.items),
  };
  const prefix = lang === "en" ? `${ORIGIN}/en/` : `${ORIGIN}/`;
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    inLanguage: d.ui.lang,
    dateModified: modifiedAt,
    url: url(lang),
    description: plain(d.ui.description),
    mainEntity: person,
  };
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projectsInOrder(d).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: projOnScreen(p),
        url: `${prefix}#p-${p.id}`,
        author: { "@id": personId },
      },
    })),
  };
  return [profile, list];
}

// Search engine ownership tokens. Empty value = not registered yet (a placeholder comment is written instead).
const siteVerification = {
  "google-site-verification": "",
  "naver-site-verification": "d396bad56f5e85874c5ab485e4e33c9939361e4d",
  "msvalidate.01": "",
};
const verification = Object.entries(siteVerification)
  .map(([n, v]) =>
    v
      ? `    <meta name="${n}" content="${v}" />`
      : `    <!-- ${n}: add <meta name="${n}" content="..."> here after registering -->`,
  )
  .join("\n");

function page(lang) {
  const d = datasets[lang];
  let html = base;
  if (lang === "en") {
    const og = {
      desc: "I measure a problem first to narrow down its cause, and I recheck wrong conclusions to correct them.",
    };
    const swaps = [
      ['<html lang="ko">', '<html lang="en">'],
      [/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(plain(d.ui.description))}" />`],
      [/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="Kim Taewoo | Full-stack Engineer" />'],
      [/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${og.desc}" />`],
      [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url("en")}" />`],
      [/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${ORIGIN}/og-en.png" />`],
      [/<meta property="og:image:alt" content="[^"]*" \/>/, '<meta property="og:image:alt" content="Kim Taewoo, Full-stack Engineer" />'],
      [/<meta property="og:locale" content="[^"]*" \/>/, '<meta property="og:locale" content="en_US" />'],
    ];
    for (const [from, to] of swaps) html = sub(html, from, to);
  } else {
    html = sub(html, /<title>[^<]*<\/title>/, `<title>${esc(d.ui.docTitle)}</title>`);
  }
  const ogTitle = html.match(/<meta property="og:title" content="([^"]*)" \/>/)?.[1];
  const ogDesc = html.match(/<meta property="og:description" content="([^"]*)" \/>/)?.[1];
  if (!ogTitle || !ogDesc) throw new Error("prerender: og tags not found");
  const head = [
    `    <meta name="twitter:title" content="${ogTitle}" />`,
    `    <meta name="twitter:description" content="${ogDesc}" />`,
    `    <meta name="robots" content="index, follow, max-image-preview:large" />`,
    `    <link rel="canonical" href="${url(lang)}" />`,
    `    <link rel="alternate" hreflang="ko" href="${url("ko")}" />`,
    `    <link rel="alternate" hreflang="en" href="${url("en")}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${url("ko")}" />`,
    verification,
    ...buildLd(lang).map((o) => `    <script type="application/ld+json">${jsonLd(o)}</script>`),
  ].join("\n");
  html = sub(html, "</head>", `${head}\n  </head>`);
  html = sub(html, '<div id="root"></div>', `<div id="root">${render(lang)}</div>`);
  return html;
}

mkdirSync("dist/en", { recursive: true });
writeFileSync("dist/index.html", page("ko"));
writeFileSync("dist/en/index.html", page("en"));

// robots.txt: edit this list to add or remove bots. Each bot gets its own group with Allow: /.
const botSections = [
  {
    title: "Search crawlers",
    bots: [
      ["Googlebot", "Google Search crawler"],
      ["Bingbot", "Bing Search crawler (blogs.bing.com/webmaster)"],
      ["Yeti", "Naver Search crawler (searchadvisor.naver.com/guide/seo-basic-robots)"],
    ],
  },
  {
    title: "AI search and user-triggered fetchers",
    bots: [
      ["OAI-SearchBot", "OpenAI search index crawler for ChatGPT search"],
      ["ChatGPT-User", "OpenAI fetcher that runs when a ChatGPT user asks for a page (OpenAI notes robots.txt may not apply)"],
      ["PerplexityBot", "Perplexity search index crawler"],
      ["Claude-SearchBot", "Anthropic search index crawler for Claude search results"],
      ["Claude-User", "Anthropic fetcher that runs when a Claude user asks for a page"],
    ],
  },
  {
    title: "AI training crawlers (allowed on purpose)",
    bots: [
      ["GPTBot", "OpenAI model training crawler"],
      ["ClaudeBot", "Anthropic model training crawler"],
      ["Google-Extended", "Google token that controls use for Gemini training and grounding"],
      ["Applebot-Extended", "Apple token that controls use for Apple AI model training"],
      ["CCBot", "Common Crawl crawler, its open dataset is widely used for AI training"],
    ],
  },
];
writeFileSync(
  "dist/robots.txt",
  [
    "# All search and AI crawlers are allowed on purpose: this is a public portfolio meant to be found.",
    "# Nothing is disallowed. Every built file (pages, images, resume.pdf, llms.txt) is meant to be public.",
    "# Bot names below are the tokens documented by each operator. Daum is not listed by name because",
    "# no official token could be confirmed; it is still covered by the * group.",
    "User-agent: *",
    "Allow: /",
    "",
    ...botSections.flatMap((sec) => [
      `# ${sec.title}`,
      "",
      ...sec.bots.flatMap(([name, what]) => [`# ${what}`, `User-agent: ${name}`, "Allow: /", ""]),
    ]),
    `Sitemap: ${ORIGIN}/sitemap.xml`,
    "",
  ].join("\n"),
);

// sitemap.xml
const alt = [
  `    <xhtml:link rel="alternate" hreflang="ko" href="${url("ko")}" />`,
  `    <xhtml:link rel="alternate" hreflang="en" href="${url("en")}" />`,
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${url("ko")}" />`,
].join("\n");
const entry = (l) => `  <url>\n    <loc>${url(l)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alt}\n  </url>`;
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entry("ko")}\n${entry("en")}\n</urlset>\n`,
);

// llms.txt
function llms(lang) {
  const d = datasets[lang];
  const ko = lang === "ko";
  const prefix = url(lang);
  const work = d.experience.tabs.find((t) => t.id === "work");
  const title = ko ? `${d.site.nameKo} (${d.site.nameEn})` : `${d.site.nameEn} (${datasets.ko.site.nameKo})`;
  const lines = [
    `# ${title}`,
    "",
    `> ${plain(d.ui.description)}`,
    "",
    plain(d.hero.tagline.join(" ")),
    "",
    `## ${ko ? "프로젝트" : "Projects"}`,
    "",
    ...projectsInOrder(d).map((p) => `- [${p.title}](${prefix}#p-${p.id}): ${projSummary(p)}`),
    "",
  ];
  if (work) {
    lines.push(`## ${ko ? "경력" : "Experience"}`, "", ...work.items.map((i) => `- ${i.title}, ${i.org}, ${i.period}`), "");
  }
  lines.push(
    `## ${ko ? "링크" : "Links"}`,
    "",
    `- [${ko ? "English" : "한국어"}](${url(ko ? "en" : "ko")})`,
    `- [${d.resume.pdfLabel}](${ORIGIN}${d.site.resumePdf})`,
    `- [GitHub](${d.site.github})`,
    "",
  );
  return lines.join("\n");
}
writeFileSync("dist/llms.txt", llms("ko"));
writeFileSync("dist/en/llms.txt", llms("en"));
console.log(`prerender: ok (lastmod ${lastmod})`);
