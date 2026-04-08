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
import rustSource from "./sources/spread-sort.rs?raw";
import cppSource from "./sources/SpreadSort.cpp?raw";
import goSource from "./sources/spread-sort.go?raw";

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
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: spreadSort,
  generateSteps: generateSpreadSortSteps,
  educational: spreadSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(spreadSortDefinition);
