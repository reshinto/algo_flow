/**
 * Interpolation Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { interpolationSearch } from "./sources/interpolation-search.ts?fn";
import { generateInterpolationSearchSteps } from "./step-generator";
import { interpolationSearchEducational } from "./educational";

import typescriptSource from "./sources/interpolation-search.ts?raw";
import pythonSource from "./sources/interpolation-search.py?raw";
import javaSource from "./sources/InterpolationSearch.java?raw";
import rustSource from "./sources/interpolation-search.rs?raw";
import cppSource from "./sources/InterpolationSearch.cpp?raw";
import goSource from "./sources/interpolation-search.go?raw";

const interpolationSearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.INTERPOLATION_SEARCH!,
    name: "Interpolation Search",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "A search algorithm that estimates the target position using value interpolation, achieving O(log log n) average performance on uniformly distributed sorted arrays",
    timeComplexity: {
      best: "O(1)",
      average: "O(log log n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    },
  },
  execute: ({ sortedArray, targetValue }) => interpolationSearch(sortedArray, targetValue),
  generateSteps: generateInterpolationSearchSteps,
  educational: interpolationSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(interpolationSearchDefinition);
