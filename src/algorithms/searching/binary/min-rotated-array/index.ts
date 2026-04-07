/**
 * Minimum in Rotated Sorted Array algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minRotatedArray } from "./sources/min-rotated-array.ts?fn";
import { generateMinRotatedArraySteps } from "./step-generator";
import { minRotatedArrayEducational } from "./educational";

import typescriptSource from "./sources/min-rotated-array.ts?raw";
import pythonSource from "./sources/min-rotated-array.py?raw";
import javaSource from "./sources/MinRotatedArray.java?raw";
import rustSource from "./sources/min-rotated-array.rs?raw";
import cppSource from "./sources/MinRotatedArray.cpp?raw";
import goSource from "./sources/min-rotated-array.go?raw";

const minRotatedArrayDefinition: AlgorithmDefinition<{ sortedArray: number[] }> = {
  meta: {
    id: ALGORITHM_ID.MIN_ROTATED_ARRAY!,
    name: "Minimum in Rotated Sorted Array",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "A binary search variant that finds the minimum element in a sorted array that has been rotated at an unknown pivot point",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
    },
  },
  execute: ({ sortedArray }) => minRotatedArray(sortedArray),
  generateSteps: generateMinRotatedArraySteps,
  educational: minRotatedArrayEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(minRotatedArrayDefinition);
