import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { rabinKarpSearch } from "./sources/rabin-karp-search.ts?fn";
import { generateRabinKarpSearchSteps } from "./step-generator";
import type { RabinKarpSearchInput } from "./step-generator";
import { rabinKarpSearchEducational } from "./educational";

import typescriptSource from "./sources/rabin-karp-search.ts?raw";
import pythonSource from "./sources/rabin-karp-search.py?raw";
import javaSource from "./sources/RabinKarpSearch.java?raw";
import rustSource from "./sources/rabin-karp-search.rs?raw";
import cppSource from "./sources/RabinKarpSearch.cpp?raw";
import goSource from "./sources/rabin-karp-search.go?raw";

function executeRabinKarpSearch(input: RabinKarpSearchInput): number {
  return rabinKarpSearch(input.text, input.pattern) as number;
}

const rabinKarpSearchDefinition: AlgorithmDefinition<RabinKarpSearchInput> = {
  meta: {
    id: ALGORITHM_ID.RABIN_KARP_SEARCH!,
    name: "Rabin-Karp Search",
    category: CATEGORY.STRINGS!,
    technique: "pattern-matching",
    description:
      "Find the first occurrence of a pattern in text using rolling hashes to skip windows efficiently, with character verification on hash matches to avoid false positives",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n * m)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "GEEKS FOR GEEKS", pattern: "GEEK" },
  },
  execute: executeRabinKarpSearch,
  generateSteps: generateRabinKarpSearchSteps,
  educational: rabinKarpSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(rabinKarpSearchDefinition);
