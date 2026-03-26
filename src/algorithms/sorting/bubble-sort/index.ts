/**
 * Bubble Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";

import { bubbleSort } from "./bubble-sort";
import { generateBubbleSortSteps } from "./step-generator";
import { bubbleSortEducational } from "./educational";

import typescriptSource from "./sources/bubble-sort.ts?raw";
import pythonSource from "./sources/bubble-sort.py?raw";
import javaSource from "./sources/BubbleSort.java?raw";

const bubbleSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "sorting",
    description:
      "A simple comparison-based sorting algorithm that repeatedly swaps adjacent elements",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: bubbleSort,
  generateSteps: generateBubbleSortSteps,
  educational: bubbleSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(bubbleSortDefinition);
