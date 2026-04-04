/**
 * Strand Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { strandSort } from "./sources/strand-sort.ts?fn";
import { generateStrandSortSteps } from "./step-generator";
import { strandSortEducational } from "./educational";

import typescriptSource from "./sources/strand-sort.ts?raw";
import pythonSource from "./sources/strand-sort.py?raw";
import javaSource from "./sources/StrandSort.java?raw";

const strandSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.STRAND_SORT!,
    name: "Strand Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Repeatedly extracts sorted sublists (strands) from the input and merges them into a growing sorted output",
    timeComplexity: {
      best: "O(n)",
      average: "O(n√n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: strandSort,
  generateSteps: generateStrandSortSteps,
  educational: strandSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(strandSortDefinition);
