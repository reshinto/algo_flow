/**
 * Hash-Based Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { hashSearch } from "./sources/hash-search.ts?fn";
import { generateHashSearchSteps } from "./step-generator";
import { hashSearchEducational } from "./educational";

import typescriptSource from "./sources/hash-search.ts?raw";
import pythonSource from "./sources/hash-search.py?raw";
import javaSource from "./sources/HashSearch.java?raw";
import rustSource from "./sources/hash-search.rs?raw";
import cppSource from "./sources/HashSearch.cpp?raw";
import goSource from "./sources/hash-search.go?raw";

const hashSearchDefinition: AlgorithmDefinition<{
  array: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.HASH_SEARCH!,
    name: "Hash-Based Search",
    category: CATEGORY.SEARCHING!,
    technique: "hashing",
    description:
      "A two-phase search that builds a hash map in O(n) then performs O(1) lookup — works on unsorted arrays at the cost of O(n) extra space",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    },
  },
  execute: ({ array, targetValue }) => hashSearch(array, targetValue),
  generateSteps: generateHashSearchSteps,
  educational: hashSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(hashSearchDefinition);
