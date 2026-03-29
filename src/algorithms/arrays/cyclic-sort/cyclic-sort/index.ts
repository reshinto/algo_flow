/**
 * Cyclic Sort registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { cyclicSort } from "./sources/cyclic-sort.ts?fn";
import { generateCyclicSortSteps } from "./step-generator";
import { cyclicSortEducational } from "./educational";

import typescriptSource from "./sources/cyclic-sort.ts?raw";
import pythonSource from "./sources/cyclic-sort.py?raw";
import javaSource from "./sources/CyclicSort.java?raw";

interface CyclicSortInput {
  inputArray: number[];
}

const cyclicSortDefinition: AlgorithmDefinition<CyclicSortInput> = {
  meta: {
    id: ALGORITHM_ID.CYCLIC_SORT!,
    name: "Cyclic Sort",
    category: CATEGORY.ARRAYS!,
    technique: "cyclic-sort",
    description:
      "An O(n) in-place sorting algorithm for arrays containing values 1..n that places each element directly at its correct index, achieving the minimum possible number of writes",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [3, 5, 2, 1, 4, 6],
    },
  },
  execute: (input: CyclicSortInput) => cyclicSort(input.inputArray),
  generateSteps: generateCyclicSortSteps,
  educational: cyclicSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(cyclicSortDefinition);
