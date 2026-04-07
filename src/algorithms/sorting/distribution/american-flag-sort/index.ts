/**
 * American Flag Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { americanFlagSort } from "./sources/american-flag-sort.ts?fn";
import { generateAmericanFlagSortSteps } from "./step-generator";
import { americanFlagSortEducational } from "./educational";

import typescriptSource from "./sources/american-flag-sort.ts?raw";
import pythonSource from "./sources/american-flag-sort.py?raw";
import javaSource from "./sources/AmericanFlagSort.java?raw";
import rustSource from "./sources/american-flag-sort.rs?raw";
import cppSource from "./sources/AmericanFlagSort.cpp?raw";
import goSource from "./sources/american-flag-sort.go?raw";

const americanFlagSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.AMERICAN_FLAG_SORT!,
    name: "American Flag Sort",
    category: CATEGORY.SORTING!,
    technique: "distribution",
    description:
      "In-place MSD radix sort — counts digit frequencies, permutes elements in-place bucket by bucket — O(n·d)",
    timeComplexity: {
      best: "O(n·d)",
      average: "O(n·d)",
      worst: "O(n·d)",
    },
    spaceComplexity: "O(d)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: americanFlagSort,
  generateSteps: generateAmericanFlagSortSteps,
  educational: americanFlagSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(americanFlagSortDefinition);
