/**
 * Vite plugin enabling `?fn` imports for algorithm TypeScript source files.
 *
 * Usage: `import { myFunc } from "./sources/my-algo.ts?fn"`
 *
 * The plugin:
 * 1. Strips `// @step:` visualization markers from the source
 * 2. Transpiles TypeScript → JavaScript via OxC
 * 3. Auto-exports all top-level function declarations
 *
 * This allows algorithm source files (`sources/*.ts`) to serve dual purpose:
 * - `?raw`  — raw string for Monaco code display (with @step markers intact)
 * - `?fn`   — executable ESM module for algorithm execution and unit tests
 *
 * Only applies to `.ts` files. Python, Java, and other language source files
 * remain unaffected — they are always imported via `?raw`.
 */
import type { Plugin } from "vite";
import { transformWithOxc } from "vite";
import { readFileSync } from "fs";

const FN_SUFFIX = "?fn";

export function fnImportPlugin(): Plugin {
  return {
    name: "vite-plugin-fn-import",
    enforce: "pre",

    async resolveId(source, importer) {
      if (!source.endsWith(FN_SUFFIX)) return null;
      const cleanSource = source.slice(0, -FN_SUFFIX.length);
      const resolved = await this.resolve(cleanSource, importer, { skipSelf: true });
      if (!resolved) return null;
      return resolved.id + FN_SUFFIX;
    },

    async load(id) {
      if (!id.endsWith(FN_SUFFIX)) return null;
      const filePath = id.slice(0, -FN_SUFFIX.length);

      // Only handle TypeScript files — Python/Java remain ?raw only
      if (!filePath.endsWith(".ts")) return null;

      let rawSource: string;
      try {
        rawSource = readFileSync(filePath, "utf-8");
      } catch {
        return null;
      }

      // Strip all @step: visualization markers (inline comments + their leading whitespace)
      const stripped = rawSource.replace(/\s*\/\/ @step:[^\n]*/g, "");

      // Transpile TypeScript → JavaScript via Vite's built-in OxC transform
      const { code } = await transformWithOxc(stripped, filePath, {
        lang: "ts",
        target: "es2020",
      });

      // Auto-export all top-level function declarations so callers can import by name
      const exported = code.replace(/^function\s+/gm, "export function ");

      return { code: exported, map: null };
    },
  };
}
