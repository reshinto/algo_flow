/**
 * Shell Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { shellSort } from "./sources/shell-sort.ts?fn";
import { generateShellSortSteps } from "./step-generator";
import { shellSortEducational } from "./educational";

import typescriptSource from "./sources/shell-sort.ts?raw";
import pythonSource from "./sources/shell-sort.py?raw";
import javaSource from "./sources/ShellSort.java?raw";

const shellSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.SHELL_SORT!,
    name: "Shell Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Generalized insertion sort that compares elements separated by a shrinking gap sequence",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n^(3/2))",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: shellSort,
  generateSteps: generateShellSortSteps,
  educational: shellSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(shellSortDefinition);
