/**
 * Circle Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { circleSort } from "./sources/circle-sort.ts?fn";
import { generateCircleSortSteps } from "./step-generator";
import { circleSortEducational } from "./educational";

import typescriptSource from "./sources/circle-sort.ts?raw";
import pythonSource from "./sources/circle-sort.py?raw";
import javaSource from "./sources/CircleSort.java?raw";
import rustSource from "./sources/circle-sort.rs?raw";
import cppSource from "./sources/CircleSort.cpp?raw";
import goSource from "./sources/circle-sort.go?raw";

const circleSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.CIRCLE_SORT!,
    name: "Circle Sort",
    category: CATEGORY.SORTING!,
    technique: "exchange",
    description:
      "Recursively compares elements from outer edges toward center, repeating until no swaps occur",
    timeComplexity: {
      best: "O(n log n log n)",
      average: "O(n log n log n)",
      worst: "O(n log n log n)",
    },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: circleSort,
  generateSteps: generateCircleSortSteps,
  educational: circleSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(circleSortDefinition);
