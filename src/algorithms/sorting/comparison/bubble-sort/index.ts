/**
 * Bubble Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bubbleSort } from "./sources/bubble-sort.ts?fn";
import { generateBubbleSortSteps } from "./step-generator";
import { bubbleSortEducational } from "./educational";

import typescriptSource from "./sources/bubble-sort.ts?raw";
import pythonSource from "./sources/bubble-sort.py?raw";
import javaSource from "./sources/BubbleSort.java?raw";
import rustSource from "./sources/bubble-sort.rs?raw";
import cppSource from "./sources/BubbleSort.cpp?raw";
import goSource from "./sources/bubble-sort.go?raw";

const bubbleSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.BUBBLE_SORT!,
    name: "Bubble Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "A simple comparison-based sorting algorithm that repeatedly swaps adjacent elements",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: bubbleSort,
  generateSteps: generateBubbleSortSteps,
  educational: bubbleSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bubbleSortDefinition);
