import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { mergeKSortedArrays } from "./sources/merge-k-sorted-arrays.ts?fn";
import { generateMergeKSortedArraysSteps } from "./step-generator";
import type { MergeKSortedArraysInput } from "./step-generator";
import { mergeKSortedArraysEducational } from "./educational";

import typescriptSource from "./sources/merge-k-sorted-arrays.ts?raw";
import pythonSource from "./sources/merge-k-sorted-arrays.py?raw";
import javaSource from "./sources/MergeKSortedArrays.java?raw";

function executeMergeKSortedArrays(input: MergeKSortedArraysInput): number[] {
  return mergeKSortedArrays(input.arrays) as number[];
}

const mergeKSortedArraysDefinition: AlgorithmDefinition<MergeKSortedArraysInput> = {
  meta: {
    id: ALGORITHM_ID.MERGE_K_SORTED_ARRAYS!,
    name: "Merge K Sorted Arrays",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Merge k sorted arrays into a single sorted array using a min-heap — O(N log k) time where N is the total number of elements",
    timeComplexity: {
      best: "O(N)",
      average: "O(N log k)",
      worst: "O(N log k)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      arrays: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
    },
  },
  execute: executeMergeKSortedArrays,
  generateSteps: generateMergeKSortedArraysSteps,
  educational: mergeKSortedArraysEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(mergeKSortedArraysDefinition);
