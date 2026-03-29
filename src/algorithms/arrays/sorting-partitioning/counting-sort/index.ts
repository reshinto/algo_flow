/**
 * Counting Sort algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { countingSort } from "./sources/counting-sort.ts?fn";
import { generateCountingSortSteps } from "./step-generator";
import { countingSortEducational } from "./educational";

import typescriptSource from "./sources/counting-sort.ts?raw";
import pythonSource from "./sources/counting-sort.py?raw";
import javaSource from "./sources/CountingSort.java?raw";

interface CountingSortInput {
  inputArray: number[];
}

const countingSortDefinition: AlgorithmDefinition<CountingSortInput> = {
  meta: {
    id: ALGORITHM_ID.COUNTING_SORT!,
    name: "Counting Sort",
    category: CATEGORY.ARRAYS!,
    technique: "sorting-partitioning",
    description:
      "A non-comparison integer sort that counts element frequencies and reconstructs the sorted array in O(n+k) time",
    timeComplexity: {
      best: "O(n+k)",
      average: "O(n+k)",
      worst: "O(n+k)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [4, 2, 2, 8, 3, 3, 1, 7, 5],
    },
  },
  execute: (input: CountingSortInput) => countingSort(input.inputArray),
  generateSteps: generateCountingSortSteps,
  educational: countingSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(countingSortDefinition);
