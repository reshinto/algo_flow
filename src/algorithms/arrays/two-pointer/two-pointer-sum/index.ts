/**
 * Two Sum (Sorted Array) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { twoPointerSum } from "./sources/two-pointer-sum.ts?fn";
import { generateTwoPointerSumSteps } from "./step-generator";
import { twoPointerSumEducational } from "./educational";

import typescriptSource from "./sources/two-pointer-sum.ts?raw";
import pythonSource from "./sources/two-pointer-sum.py?raw";
import javaSource from "./sources/TwoPointerSum.java?raw";
import rustSource from "./sources/two-pointer-sum.rs?raw";
import cppSource from "./sources/TwoPointerSum.cpp?raw";
import goSource from "./sources/two-pointer-sum.go?raw";

interface TwoPointerSumInput {
  sortedArray: number[];
  target: number;
}

const twoPointerSumDefinition: AlgorithmDefinition<TwoPointerSumInput> = {
  meta: {
    id: ALGORITHM_ID.TWO_POINTER_SUM!,
    name: "Two Sum (Sorted, Two Pointer)",
    category: CATEGORY.ARRAYS!,
    technique: "two-pointer",
    description:
      "A two-pointer technique that finds a pair of elements in a sorted array summing to a target, using O(1) space by converging pointers from both ends",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      sortedArray: [1, 2, 4, 6, 8, 11, 15],
      target: 10,
    },
  },
  execute: (input: TwoPointerSumInput) => twoPointerSum(input.sortedArray, input.target),
  generateSteps: generateTwoPointerSumSteps,
  educational: twoPointerSumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(twoPointerSumDefinition);
