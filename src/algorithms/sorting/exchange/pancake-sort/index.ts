/**
 * Pancake Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { pancakeSort } from "./sources/pancake-sort.ts?fn";
import { generatePancakeSortSteps } from "./step-generator";
import { pancakeSortEducational } from "./educational";

import typescriptSource from "./sources/pancake-sort.ts?raw";
import pythonSource from "./sources/pancake-sort.py?raw";
import javaSource from "./sources/PancakeSort.java?raw";
import rustSource from "./sources/pancake-sort.rs?raw";
import cppSource from "./sources/PancakeSort.cpp?raw";
import goSource from "./sources/pancake-sort.go?raw";

const pancakeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.PANCAKE_SORT!,
    name: "Pancake Sort",
    category: CATEGORY.SORTING!,
    technique: "exchange",
    description:
      "Sorts using only prefix reversals — find max, flip to front, flip to sorted position",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: pancakeSort,
  generateSteps: generatePancakeSortSteps,
  educational: pancakeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(pancakeSortDefinition);
