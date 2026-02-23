#!/usr/bin/env node
/**
 * Build-time blog translation script.
 *
 * Usage:
 *   node scripts/translate.mjs          # translate only missing files
 *   node scripts/translate.mjs --force  # re-translate all files
 *
 * Environment variables:
 *   OPENAI_API_KEY     API key (required)
 *   OPENAI_BASE_URL    API base URL (default: https://api.openai.com/v1)
 *   TRANSLATE_MODEL    Model name (default: gpt-4o)
 *
 * Examples:
 *   # OpenAI
 *   OPENAI_API_KEY=sk-xxx node scripts/translate.mjs
 *
 *   # DeepSeek
 *   OPENAI_BASE_URL=https://api.deepseek.com/v1 OPENAI_API_KEY=sk-xxx TRANSLATE_MODEL=deepseek-chat node scripts/translate.mjs
 *
 *   # Local Ollama
 *   OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_API_KEY=unused TRANSLATE_MODEL=qwen2.5 node scripts/translate.mjs
 *
 * Convention:
 *   content/blog/*.mdx          ← English source posts  (lang: en)
 *   content/blog/zh/*.mdx       ← Chinese source posts  (lang: zh)
 *
 * The script generates:
 *   EN → content/blog/zh/[slug].mdx
 *   ZH → content/blog/[slug].mdx   (English translation of a ZH-first post)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const EN_DIR = path.join(ROOT, "content", "blog");
const ZH_DIR = path.join(ROOT, "content", "blog", "zh");
const FORCE = process.argv.includes("--force");

const MODEL = process.env.TRANSLATE_MODEL ?? "gpt-4o";

const client = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
  apiKey: process.env.OPENAI_API_KEY ?? "unused",
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function readMdx(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  // Split frontmatter from body
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatterRaw: "", body: raw };
  return { frontmatterRaw: match[1], body: match[2] };
}

function parseFrontmatter(raw) {
  const result = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) result[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return result;
}

function rebuildFrontmatter(original, overrides) {
  // Replace translatable fields (title, description) while keeping others intact
  let out = original;
  for (const [key, val] of Object.entries(overrides)) {
    out = out.replace(
      new RegExp(`^(${key}:\\s*)(.*)$`, "m"),
      `$1${JSON.stringify(val)}`
    );
  }
  return out;
}

async function translate(text, fromLang, toLang) {
  const langName = { en: "English", zh: "Simplified Chinese" };
  const systemPrompt = `You are a professional technical translator specializing in academic soil science and knowledge engineering content.
Translate the given ${langName[fromLang]} text to ${langName[toLang]}.

Rules:
- Preserve all Markdown formatting (headings, bold, italic, lists, tables)
- Preserve all MDX/JSX tags exactly as-is (e.g. <ComponentName>, <br/>, etc.)
- Preserve all code blocks (content between triple backticks) UNCHANGED — do not translate code
- Preserve all inline code (content between single backticks) UNCHANGED
- Preserve all URLs and file paths UNCHANGED
- Translate only natural language prose, headings text, and list item text
- Output ONLY the translated content, no explanations`;

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 8192,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: text },
    ],
  });

  return response.choices[0].message.content.trim();
}

async function translateFile(srcPath, destPath, fromLang, toLang) {
  if (!FORCE && fs.existsSync(destPath)) {
    console.log(`  ⏭  Skipping (exists): ${path.relative(ROOT, destPath)}`);
    return;
  }

  console.log(
    `  🔄  ${path.relative(ROOT, srcPath)} → ${path.relative(ROOT, destPath)}`
  );

  const { frontmatterRaw, body } = readMdx(srcPath);
  const fm = parseFrontmatter(frontmatterRaw);

  // Translate title and description separately
  const [translatedTitle, translatedDescription, translatedBody] =
    await Promise.all([
      fm.title ? translate(fm.title, fromLang, toLang) : Promise.resolve(""),
      fm.description
        ? translate(fm.description, fromLang, toLang)
        : Promise.resolve(""),
      translate(body, fromLang, toLang),
    ]);

  // Rebuild frontmatter with translated fields + update lang
  const overrides = {
    ...(fm.title ? { title: translatedTitle } : {}),
    ...(fm.description ? { description: translatedDescription } : {}),
  };
  let newFrontmatter = rebuildFrontmatter(frontmatterRaw, overrides);
  // Update lang field
  newFrontmatter = newFrontmatter.replace(
    /^lang:\s*.*$/m,
    `lang: ${toLang}`
  );
  // If no lang field existed, add one
  if (!/^lang:/m.test(newFrontmatter)) {
    newFrontmatter = newFrontmatter.trimEnd() + `\nlang: ${toLang}`;
  }

  const output = `---\n${newFrontmatter}\n---\n${translatedBody}`;
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, output, "utf8");
  console.log(`  ✅  Written: ${path.relative(ROOT, destPath)}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌  OPENAI_API_KEY is not set.");
    process.exit(1);
  }

  console.log("🌐  Blog Translation Script");
  console.log(`    Model: ${MODEL}`);
  console.log(`    Mode: ${FORCE ? "force (re-translate all)" : "incremental (skip existing)"}\n`);

  fs.mkdirSync(ZH_DIR, { recursive: true });

  // ── Pass 1: EN → ZH ──────────────────────────────────────────────────────
  console.log("Pass 1: English → Chinese");
  const enFiles = fs.existsSync(EN_DIR)
    ? fs
        .readdirSync(EN_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => path.join(EN_DIR, f))
    : [];

  for (const srcPath of enFiles) {
    const slug = path.basename(srcPath, ".mdx");
    const { frontmatterRaw } = readMdx(srcPath);
    const fm = parseFrontmatter(frontmatterRaw);
    // Only translate EN-source files; skip if this file is itself a ZH translation
    if (fm.lang === "zh") continue;

    const destPath = path.join(ZH_DIR, `${slug}.mdx`);
    await translateFile(srcPath, destPath, "en", "zh");
  }

  // ── Pass 2: ZH → EN ──────────────────────────────────────────────────────
  console.log("\nPass 2: Chinese → English");
  const zhFiles = fs.existsSync(ZH_DIR)
    ? fs
        .readdirSync(ZH_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => path.join(ZH_DIR, f))
    : [];

  for (const srcPath of zhFiles) {
    const slug = path.basename(srcPath, ".mdx");
    const { frontmatterRaw } = readMdx(srcPath);
    const fm = parseFrontmatter(frontmatterRaw);
    // Only translate ZH-source files (lang: zh), skip auto-generated ones
    if (fm.lang !== "zh") continue;

    const destPath = path.join(EN_DIR, `${slug}.mdx`);
    await translateFile(srcPath, destPath, "zh", "en");
  }

  console.log("\n✨  Translation complete.");
}

main().catch((err) => {
  console.error("❌  Fatal:", err.message);
  process.exit(1);
});
