/**
 * Slow Sort algorithm registration module.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { slowSort } from "./sources/slow-sort.ts?fn";
import { generateSlowSortSteps } from "./step-generator";
import { slowSortEducational } from "./educational";

import typescriptSource from "./sources/slow-sort.ts?raw";
import pythonSource from "./sources/slow-sort.py?raw";
import javaSource from "./sources/SlowSort.java?raw";
import rustSource from "./sources/slow-sort.rs?raw";
import cppSource from "./sources/SlowSort.cpp?raw";
import goSource from "./sources/slow-sort.go?raw";

const slowSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.SLOW_SORT!,
    name: "Slow Sort",
    category: CATEGORY.SORTING!,
    technique: "concurrent",
    description:
      "Multiply-and-surrender: recursively find max of both halves, place at end, recurse on n-1",
    timeComplexity: {
      best: "Ω(n^(log n))",
      average: "Ω(n^(log n))",
      worst: "Ω(n^(log n))",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [5, 3, 1, 4, 2],
  },
  execute: slowSort,
  generateSteps: generateSlowSortSteps,
  educational: slowSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(slowSortDefinition);
