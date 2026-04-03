/**
 * Radix Sort MSD algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { radixSortMsd } from "./sources/radix-sort-msd.ts?fn";
import { generateRadixSortMsdSteps } from "./step-generator";
import { radixSortMsdEducational } from "./educational";

import typescriptSource from "./sources/radix-sort-msd.ts?raw";
import pythonSource from "./sources/radix-sort-msd.py?raw";
import javaSource from "./sources/RadixSortMsd.java?raw";

const radixSortMsdDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.RADIX_SORT_MSD!,
    name: "Radix Sort (MSD)",
    category: CATEGORY.SORTING!,
    technique: "distribution",
    description:
      "Sorts integers recursively from most to least significant digit using bucket partitioning",
    timeComplexity: {
      best: "O(d·(n+k))",
      average: "O(d·(n+k))",
      worst: "O(d·(n+k))",
    },
    spaceComplexity: "O(n + k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: radixSortMsd,
  generateSteps: generateRadixSortMsdSteps,
  educational: radixSortMsdEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(radixSortMsdDefinition);
