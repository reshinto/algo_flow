/**
 * Proxmap Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { proxmapSort } from "./sources/proxmap-sort.ts?fn";
import { generateProxmapSortSteps } from "./step-generator";
import { proxmapSortEducational } from "./educational";

import typescriptSource from "./sources/proxmap-sort.ts?raw";
import pythonSource from "./sources/proxmap-sort.py?raw";
import javaSource from "./sources/ProxmapSort.java?raw";

const proxmapSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.PROXMAP_SORT!,
    name: "Proxmap Sort",
    category: CATEGORY.SORTING!,
    technique: "distribution",
    description:
      "Maps each element to its approximate final position using a linear scale, then resolves clusters with insertion sort — O(n) average",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: proxmapSort,
  generateSteps: generateProxmapSortSteps,
  educational: proxmapSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(proxmapSortDefinition);
