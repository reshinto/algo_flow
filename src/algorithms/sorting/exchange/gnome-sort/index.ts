/**
 * Gnome Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { gnomeSort } from "./sources/gnome-sort.ts?fn";
import { generateGnomeSortSteps } from "./step-generator";
import { gnomeSortEducational } from "./educational";

import typescriptSource from "./sources/gnome-sort.ts?raw";
import pythonSource from "./sources/gnome-sort.py?raw";
import javaSource from "./sources/GnomeSort.java?raw";

const gnomeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.GNOME_SORT!,
    name: "Gnome Sort",
    category: CATEGORY.SORTING!,
    technique: "exchange",
    description:
      "Moves forward when elements are in order, swaps and steps back when out of order — like insertion sort with swaps",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: gnomeSort,
  generateSteps: generateGnomeSortSteps,
  educational: gnomeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(gnomeSortDefinition);
