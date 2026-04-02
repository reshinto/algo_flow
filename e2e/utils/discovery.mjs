import fs from "node:fs";
import path from "node:path";

export function discoverAlgorithms() {
  const algorithmsDir = path.join(process.cwd(), "src/algorithms");
  const categories = fs
    .readdirSync(algorithmsDir)
    .filter((entry) => fs.statSync(path.join(algorithmsDir, entry)).isDirectory());

  const allAlgorithms = [];
  const representativeSet = new Set();

  for (const category of categories) {
    const categoryDir = path.join(algorithmsDir, category);
    let firstInCategory = true;

    function walkDir(dir) {
      const entries = fs.readdirSync(dir).sort();
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        if (!fs.statSync(fullPath).isDirectory()) continue;

        const indexFile = path.join(fullPath, "index.ts");
        if (fs.existsSync(indexFile)) {
          const content = fs.readFileSync(indexFile, "utf-8");
          const nameMatch = content.match(/name:\s*"([^"]+)"/);
          if (nameMatch) {
            const name = nameMatch[1];
            allAlgorithms.push(name);
            if (firstInCategory) {
              representativeSet.add(name);
              firstInCategory = false;
            }
          }
        } else {
          walkDir(fullPath);
        }
      }
    }

    walkDir(categoryDir);
  }
  return { allAlgorithms, representativeSet };
}
