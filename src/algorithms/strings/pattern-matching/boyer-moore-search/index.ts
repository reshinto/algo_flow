import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { boyerMooreSearch } from "./sources/boyer-moore-search.ts?fn";
import { generateBoyerMooreSearchSteps } from "./step-generator";
import type { BoyerMooreSearchInput } from "./step-generator";
import { boyerMooreSearchEducational } from "./educational";

import typescriptSource from "./sources/boyer-moore-search.ts?raw";
import pythonSource from "./sources/boyer-moore-search.py?raw";
import javaSource from "./sources/BoyerMooreSearch.java?raw";

function executeBoyerMooreSearch(input: BoyerMooreSearchInput): number {
  return boyerMooreSearch(input.text, input.pattern) as number;
}

const boyerMooreSearchDefinition: AlgorithmDefinition<BoyerMooreSearchInput> = {
  meta: {
    id: ALGORITHM_ID.BOYER_MOORE_SEARCH!,
    name: "Boyer-Moore Search",
    category: CATEGORY.STRINGS!,
    technique: "pattern-matching",
    description:
      "Find the first occurrence of a pattern in text using the bad character heuristic to skip large sections of text, achieving sub-linear performance on typical inputs",
    timeComplexity: {
      best: "O(n/m)",
      average: "O(n)",
      worst: "O(nm)",
    },
    spaceComplexity: "O(σ)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "ABAAABCD", pattern: "ABC" },
  },
  execute: executeBoyerMooreSearch,
  generateSteps: generateBoyerMooreSearchSteps,
  educational: boyerMooreSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(boyerMooreSearchDefinition);
