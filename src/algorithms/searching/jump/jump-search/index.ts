/**
 * Jump Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { jumpSearch } from "./sources/jump-search.ts?fn";
import { generateJumpSearchSteps } from "./step-generator";
import { jumpSearchEducational } from "./educational";

import typescriptSource from "./sources/jump-search.ts?raw";
import pythonSource from "./sources/jump-search.py?raw";
import javaSource from "./sources/JumpSearch.java?raw";
import rustSource from "./sources/jump-search.rs?raw";
import cppSource from "./sources/JumpSearch.cpp?raw";
import goSource from "./sources/jump-search.go?raw";

const jumpSearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.JUMP_SEARCH!,
    name: "Jump Search",
    category: CATEGORY.SEARCHING!,
    technique: "jump",
    description:
      "A sorted-array search that jumps forward by √n steps to find the target block, then performs a linear scan within that block",
    timeComplexity: {
      best: "O(1)",
      average: "O(√n)",
      worst: "O(√n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 56,
    },
  },
  execute: ({ sortedArray, targetValue }) => jumpSearch(sortedArray, targetValue),
  generateSteps: generateJumpSearchSteps,
  educational: jumpSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(jumpSearchDefinition);
