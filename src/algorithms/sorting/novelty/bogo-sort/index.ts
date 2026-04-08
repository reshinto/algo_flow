/**
 * Bogo Sort algorithm registration module.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bogoSort } from "./sources/bogo-sort.ts?fn";
import { generateBogoSortSteps } from "./step-generator";
import { bogoSortEducational } from "./educational";

import typescriptSource from "./sources/bogo-sort.ts?raw";
import pythonSource from "./sources/bogo-sort.py?raw";
import javaSource from "./sources/BogoSort.java?raw";
import rustSource from "./sources/bogo-sort.rs?raw";
import cppSource from "./sources/BogoSort.cpp?raw";
import goSource from "./sources/bogo-sort.go?raw";

const bogoSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.BOGO_SORT!,
    name: "Bogo Sort",
    category: CATEGORY.SORTING!,
    technique: "novelty",
    description:
      "Randomly shuffles the array until it is sorted; uses seeded PRNG for determinism, capped at 100 iterations",
    timeComplexity: {
      best: "O(n)",
      average: "O(n·n!)",
      worst: "O(∞)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [3, 1, 2],
  },
  execute: bogoSort,
  generateSteps: generateBogoSortSteps,
  educational: bogoSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bogoSortDefinition);
