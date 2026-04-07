/**
 * Radix Sort LSD algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { radixSortLsd } from "./sources/radix-sort-lsd.ts?fn";
import { generateRadixSortLsdSteps } from "./step-generator";
import { radixSortLsdEducational } from "./educational";

import typescriptSource from "./sources/radix-sort-lsd.ts?raw";
import pythonSource from "./sources/radix-sort-lsd.py?raw";
import javaSource from "./sources/RadixSortLsd.java?raw";
import rustSource from "./sources/radix-sort-lsd.rs?raw";
import cppSource from "./sources/RadixSortLsd.cpp?raw";
import goSource from "./sources/radix-sort-lsd.go?raw";

const radixSortLsdDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.RADIX_SORT_LSD!,
    name: "Radix Sort (LSD)",
    category: CATEGORY.SORTING!,
    technique: "distribution",
    description:
      "Sorts integers digit by digit from least to most significant using bucket distribution",
    timeComplexity: {
      best: "O(d·(n+k))",
      average: "O(d·(n+k))",
      worst: "O(d·(n+k))",
    },
    spaceComplexity: "O(n + k)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: radixSortLsd,
  generateSteps: generateRadixSortLsdSteps,
  educational: radixSortLsdEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(radixSortLsdDefinition);
