import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bstFromSortedArray } from "./sources/bst-from-sorted-array.ts?fn";
import { generateBstFromSortedArraySteps } from "./step-generator";
import type { BstFromSortedArrayInput } from "./step-generator";
import { bstFromSortedArrayEducational } from "./educational";

import typescriptSource from "./sources/bst-from-sorted-array.ts?raw";
import pythonSource from "./sources/bst-from-sorted-array.py?raw";
import javaSource from "./sources/BSTFromSortedArray.java?raw";

interface BSTNodeShape {
  value: number;
  left: BSTNodeShape | null;
  right: BSTNodeShape | null;
}

function executeBstFromSortedArray(input: BstFromSortedArrayInput): number | null {
  const result = bstFromSortedArray(input.sortedArray) as BSTNodeShape | null;
  return result ? result.value : null;
}

const bstFromSortedArrayDefinition: AlgorithmDefinition<BstFromSortedArrayInput> = {
  meta: {
    id: ALGORITHM_ID.BST_FROM_SORTED_ARRAY!,
    name: "BST from Sorted Array",
    category: CATEGORY.TREES!,
    technique: "bst-operations",
    description:
      "Build a height-balanced BST from a sorted array by recursively picking the middle element as root",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { sortedArray: [1, 2, 3, 4, 5, 6, 7] },
  },
  execute: executeBstFromSortedArray,
  generateSteps: generateBstFromSortedArraySteps,
  educational: bstFromSortedArrayEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(bstFromSortedArrayDefinition);
