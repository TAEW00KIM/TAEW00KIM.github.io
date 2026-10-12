// GitHub Pages serves /en/ from dist/en/index.html. The same bundle picks the language from the path;
// the static head is also switched to English so crawlers and link previews see it before JS runs.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");
const en = html
  .replace('<html lang="ko">', '<html lang="en">')
  .replace(
    /<meta name="description" content="[^"]*" \/>/,
    '<meta name="description" content="Portfolio of Kim Taewoo, a software engineer. I like finding and fixing the problems that come up when running a service." />',
  );
if (en === html) throw new Error("copy-en: index.html was not changed; check the patterns");
mkdirSync("dist/en", { recursive: true });
writeFileSync("dist/en/index.html", en);
