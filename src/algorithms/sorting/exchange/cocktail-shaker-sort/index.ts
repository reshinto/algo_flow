/**
 * Cocktail Shaker Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { cocktailShakerSort } from "./sources/cocktail-shaker-sort.ts?fn";
import { generateCocktailShakerSortSteps } from "./step-generator";
import { cocktailShakerSortEducational } from "./educational";

import typescriptSource from "./sources/cocktail-shaker-sort.ts?raw";
import pythonSource from "./sources/cocktail-shaker-sort.py?raw";
import javaSource from "./sources/CocktailShakerSort.java?raw";

const cocktailShakerSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.COCKTAIL_SHAKER_SORT!,
    name: "Cocktail Shaker Sort",
    category: CATEGORY.SORTING!,
    technique: "exchange",
    description:
      "Bidirectional bubble sort that sweeps left-to-right then right-to-left, eliminating the turtle problem",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: cocktailShakerSort,
  generateSteps: generateCocktailShakerSortSteps,
  educational: cocktailShakerSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(cocktailShakerSortDefinition);
