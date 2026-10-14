// GitHub Pages serves /en/ from dist/en/index.html. The same bundle picks the language from the path;
// the static head is also switched to English so crawlers and link previews see it before JS runs.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");
const swaps = [
  ['<html lang="ko">', '<html lang="en">'],
  [
    /<meta name="description" content="[^"]*" \/>/,
    '<meta name="description" content="Portfolio of Kim Taewoo, a software engineer. I like finding and fixing the problems that come up when running a service." />',
  ],
  [/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="Kim Taewoo | Software Engineer" />'],
  [
    /<meta property="og:description" content="[^"]*" \/>/,
    '<meta property="og:description" content="I like finding and fixing the problems that come up when running a service." />',
  ],
  [/<meta property="og:url" content="[^"]*" \/>/, '<meta property="og:url" content="https://kimtaewoo.dev/en/" />'],
  [/<meta property="og:image" content="[^"]*" \/>/, '<meta property="og:image" content="https://kimtaewoo.dev/og-en.png" />'],
  [/<meta property="og:image:alt" content="[^"]*" \/>/, '<meta property="og:image:alt" content="Kim Taewoo, Software Engineer" />'],
  [/<meta property="og:locale" content="[^"]*" \/>/, '<meta property="og:locale" content="en_US" />'],
];
let en = html;
for (const [from, to] of swaps) {
  const next = en.replace(from, to);
  if (next === en) throw new Error(`copy-en: pattern not found: ${from}`);
  en = next;
}
mkdirSync("dist/en", { recursive: true });
writeFileSync("dist/en/index.html", en);
