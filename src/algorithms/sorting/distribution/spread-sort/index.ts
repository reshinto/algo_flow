/**
 * Spread Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { spreadSort } from "./sources/spread-sort.ts?fn";
import { generateSpreadSortSteps } from "./step-generator";
import { spreadSortEducational } from "./educational";

import typescriptSource from "./sources/spread-sort.ts?raw";
import pythonSource from "./sources/spread-sort.py?raw";
import javaSource from "./sources/SpreadSort.java?raw";

const spreadSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.SPREAD_SORT!,
    name: "Spread Sort",
    category: CATEGORY.SORTING!,
    technique: "distribution",
    description:
      "Distributes elements into √n value-range bins, insertion sorts each bin, then collects — O(n) average",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: spreadSort,
  generateSteps: generateSpreadSortSteps,
  educational: spreadSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(spreadSortDefinition);
