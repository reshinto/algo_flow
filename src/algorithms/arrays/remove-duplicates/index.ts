/**
 * Remove Duplicates (Sorted) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { removeDuplicates } from "./sources/remove-duplicates.ts?fn";
import { generateRemoveDuplicatesSteps } from "./step-generator";
import { removeDuplicatesEducational } from "./educational";

import typescriptSource from "./sources/remove-duplicates.ts?raw";
import pythonSource from "./sources/remove-duplicates.py?raw";
import javaSource from "./sources/RemoveDuplicates.java?raw";

interface RemoveDuplicatesInput {
  sortedArray: number[];
}

const removeDuplicatesDefinition: AlgorithmDefinition<RemoveDuplicatesInput> = {
  meta: {
    id: ALGORITHM_ID.REMOVE_DUPLICATES!,
    name: "Remove Duplicates (Sorted)",
    category: CATEGORY.ARRAYS!,
    description:
      "An in-place two-pointer technique that removes consecutive duplicates from a sorted array, returning the count of unique elements",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      sortedArray: [1, 1, 2, 2, 3, 4, 4, 5],
    },
  },
  execute: (input: RemoveDuplicatesInput) => removeDuplicates(input.sortedArray),
  generateSteps: generateRemoveDuplicatesSteps,
  educational: removeDuplicatesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(removeDuplicatesDefinition);
