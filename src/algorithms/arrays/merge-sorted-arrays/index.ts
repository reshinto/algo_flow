/**
 * Merge Two Sorted Arrays algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { mergeSortedArrays } from "./sources/merge-sorted-arrays.ts?fn";
import { generateMergeSortedArraysSteps } from "./step-generator";
import { mergeSortedArraysEducational } from "./educational";

import typescriptSource from "./sources/merge-sorted-arrays.ts?raw";
import pythonSource from "./sources/merge-sorted-arrays.py?raw";
import javaSource from "./sources/MergeSortedArrays.java?raw";

interface MergeSortedArraysInput {
  firstArray: number[];
  secondArray: number[];
}

const mergeSortedArraysDefinition: AlgorithmDefinition<MergeSortedArraysInput> = {
  meta: {
    id: ALGORITHM_ID.MERGE_SORTED_ARRAYS!,
    name: "Merge Two Sorted Arrays",
    category: CATEGORY.ARRAYS!,
    description:
      "Combines two pre-sorted arrays into a single sorted array in O(n+m) time using two pointers",
    timeComplexity: {
      best: "O(n+m)",
      average: "O(n+m)",
      worst: "O(n+m)",
    },
    spaceComplexity: "O(n+m)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      firstArray: [1, 3, 5, 7, 9],
      secondArray: [2, 4, 6, 8, 10],
    },
  },
  execute: (input: MergeSortedArraysInput) =>
    mergeSortedArrays(input.firstArray, input.secondArray),
  generateSteps: generateMergeSortedArraysSteps,
  educational: mergeSortedArraysEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(mergeSortedArraysDefinition);
