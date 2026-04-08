/**
 * Smooth Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { smoothSort } from "./sources/smooth-sort.ts?fn";
import { generateSmoothSortSteps } from "./step-generator";
import { smoothSortEducational } from "./educational";

import typescriptSource from "./sources/smooth-sort.ts?raw";
import pythonSource from "./sources/smooth-sort.py?raw";
import javaSource from "./sources/SmoothSort.java?raw";
import rustSource from "./sources/smooth-sort.rs?raw";
import cppSource from "./sources/SmoothSort.cpp?raw";
import goSource from "./sources/smooth-sort.go?raw";

const smoothSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.SMOOTH_SORT!,
    name: "Smooth Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "A Leonardo heap variant of heap sort; adaptive — achieves O(n) on nearly-sorted data while maintaining O(n log n) worst case",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: smoothSort,
  generateSteps: generateSmoothSortSteps,
  educational: smoothSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(smoothSortDefinition);
