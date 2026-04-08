/** Registry entry for Naive Pattern Search — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { naivePatternSearch } from "./sources/naive-pattern-search.ts?fn";
import { generateNaivePatternSearchSteps } from "./step-generator";
import type { NaivePatternSearchInput } from "./step-generator";
import { naivePatternSearchEducational } from "./educational";

import typescriptSource from "./sources/naive-pattern-search.ts?raw";
import pythonSource from "./sources/naive-pattern-search.py?raw";
import javaSource from "./sources/NaivePatternSearch.java?raw";
import rustSource from "./sources/naive-pattern-search.rs?raw";
import cppSource from "./sources/NaivePatternSearch.cpp?raw";
import goSource from "./sources/naive-pattern-search.go?raw";

function executeNaivePatternSearch(input: NaivePatternSearchInput): number {
  return naivePatternSearch(input.text, input.pattern) as number;
}

const naivePatternSearchDefinition: AlgorithmDefinition<NaivePatternSearchInput> = {
  meta: {
    id: ALGORITHM_ID.NAIVE_PATTERN_SEARCH!,
    name: "Naive Pattern Search",
    category: CATEGORY.STRINGS!,
    technique: "pattern-matching",
    description:
      "Find the first occurrence of a pattern in text by checking every position — simple O(nm) brute-force with O(1) space",
    timeComplexity: {
      best: "O(n)",
      average: "O(nm)",
      worst: "O(nm)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "AABAACAADAABAABA", pattern: "AABA" },
  },
  execute: executeNaivePatternSearch,
  generateSteps: generateNaivePatternSearchSteps,
  educational: naivePatternSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(naivePatternSearchDefinition);
