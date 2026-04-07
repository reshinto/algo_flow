import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { kmpSearch } from "./sources/kmp-search.ts?fn";
import { generateKmpSearchSteps } from "./step-generator";
import type { KmpSearchInput } from "./step-generator";
import { kmpSearchEducational } from "./educational";

import typescriptSource from "./sources/kmp-search.ts?raw";
import pythonSource from "./sources/kmp-search.py?raw";
import javaSource from "./sources/KmpSearch.java?raw";
import rustSource from "./sources/kmp-search.rs?raw";
import cppSource from "./sources/KmpSearch.cpp?raw";
import goSource from "./sources/kmp-search.go?raw";

function executeKmpSearch(input: KmpSearchInput): number {
  return kmpSearch(input.text, input.pattern) as number;
}

const kmpSearchDefinition: AlgorithmDefinition<KmpSearchInput> = {
  meta: {
    id: ALGORITHM_ID.KMP_SEARCH!,
    name: "KMP Search",
    category: CATEGORY.STRINGS!,
    technique: "pattern-matching",
    description:
      "Find the first occurrence of a pattern in text in O(n + m) using a failure table to skip redundant comparisons",
    timeComplexity: {
      best: "O(m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(m)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "ABABDABACDABABCABAB", pattern: "ABABCABAB" },
  },
  execute: executeKmpSearch,
  generateSteps: generateKmpSearchSteps,
  educational: kmpSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(kmpSearchDefinition);
