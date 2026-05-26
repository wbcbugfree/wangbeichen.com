import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const featuresPath = path.join(repoRoot, "lib", "features.ts");
const outDir = path.join(repoRoot, "out");

const features = fs.readFileSync(featuresPath, "utf8");
const blogDisabled = /BLOG_ENABLED\s*=\s*false/.test(features);

if (!blogDisabled) {
  process.exit(0);
}

for (const target of [
  path.join(outDir, "blog"),
  path.join(outDir, "blog.html"),
  path.join(outDir, "blog.txt"),
]) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`Pruned disabled blog export: ${path.relative(repoRoot, target)}`);
  }
}
