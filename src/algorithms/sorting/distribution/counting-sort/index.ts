/**
 * Counting Sort (Distribution) algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { countingSortDistribution } from "./sources/counting-sort-distribution.ts?fn";
import { generateCountingSortSteps } from "./step-generator";
import { countingSortEducational } from "./educational";

import typescriptSource from "./sources/counting-sort-distribution.ts?raw";
import pythonSource from "./sources/counting-sort-distribution.py?raw";
import javaSource from "./sources/CountingSortDistribution.java?raw";
import rustSource from "./sources/counting-sort-distribution.rs?raw";
import cppSource from "./sources/CountingSortDistribution.cpp?raw";
import goSource from "./sources/counting-sort-distribution.go?raw";

const countingSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.COUNTING_SORT_DISTRIBUTION!,
    name: "Counting Sort (Distribution)",
    category: CATEGORY.SORTING!,
    technique: "distribution",
    description:
      "Counts occurrences of each value, then reconstructs the sorted array — runs in O(n + k) time",
    timeComplexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)",
    },
    spaceComplexity: "O(n + k)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: countingSortDistribution,
  generateSteps: generateCountingSortSteps,
  educational: countingSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(countingSortDefinition);
