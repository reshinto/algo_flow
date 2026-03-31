import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sortNearlySorted } from "./sources/sort-nearly-sorted.ts?fn";
import { generateSortNearlySortedSteps } from "./step-generator";
import type { SortNearlySortedInput } from "./step-generator";
import { sortNearlySortedEducational } from "./educational";

import typescriptSource from "./sources/sort-nearly-sorted.ts?raw";
import pythonSource from "./sources/sort-nearly-sorted.py?raw";
import javaSource from "./sources/SortNearlySorted.java?raw";

function executeSortNearlySorted(input: SortNearlySortedInput): number[] {
  return sortNearlySorted(input.array, input.kValue) as number[];
}

const sortNearlySortedDefinition: AlgorithmDefinition<SortNearlySortedInput> = {
  meta: {
    id: ALGORITHM_ID.SORT_NEARLY_SORTED!,
    name: "Sort Nearly Sorted",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Sort an array where each element is at most k positions from its sorted position using a sliding min-heap window — O(n log k)",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log k)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [6, 5, 3, 2, 8, 10, 9], kValue: 3 },
  },
  execute: executeSortNearlySorted,
  generateSteps: generateSortNearlySortedSteps,
  educational: sortNearlySortedEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(sortNearlySortedDefinition);
