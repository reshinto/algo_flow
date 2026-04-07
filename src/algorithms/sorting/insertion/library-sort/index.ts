/**
 * Library Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { librarySort } from "./sources/library-sort.ts?fn";
import { generateLibrarySortSteps } from "./step-generator";
import { librarySortEducational } from "./educational";

import typescriptSource from "./sources/library-sort.ts?raw";
import pythonSource from "./sources/library-sort.py?raw";
import javaSource from "./sources/LibrarySort.java?raw";
import rustSource from "./sources/library-sort.rs?raw";
import cppSource from "./sources/LibrarySort.cpp?raw";
import goSource from "./sources/library-sort.go?raw";

const librarySortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.LIBRARY_SORT!,
    name: "Library Sort",
    category: CATEGORY.SORTING!,
    technique: "insertion",
    description:
      "Insertion sort with intentional gaps (like library shelf spacing), enabling O(n log n) average performance by reducing shift distances",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: librarySort,
  generateSteps: generateLibrarySortSteps,
  educational: librarySortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(librarySortDefinition);
