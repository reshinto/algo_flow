/**
 * Bead Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { beadSort } from "./sources/bead-sort.ts?fn";
import { generateBeadSortSteps } from "./step-generator";
import { beadSortEducational } from "./educational";

import typescriptSource from "./sources/bead-sort.ts?raw";
import pythonSource from "./sources/bead-sort.py?raw";
import javaSource from "./sources/BeadSort.java?raw";

const beadSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.BEAD_SORT!,
    name: "Bead Sort",
    category: CATEGORY.SORTING!,
    technique: "distribution",
    description:
      "Simulates beads on an abacus falling under gravity — column by column drops produce a sorted order — O(n × max)",
    timeComplexity: {
      best: "O(n × max)",
      average: "O(n × max)",
      worst: "O(n × max)",
    },
    spaceComplexity: "O(n × max)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [6, 3, 5, 1, 2, 4, 9],
  },
  execute: beadSort,
  generateSteps: generateBeadSortSteps,
  educational: beadSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(beadSortDefinition);
