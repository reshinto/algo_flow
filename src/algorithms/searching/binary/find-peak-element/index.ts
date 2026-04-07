/**
 * Find Peak Element algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { findPeakElement } from "./sources/find-peak-element.ts?fn";
import { generateFindPeakElementSteps } from "./step-generator";
import { findPeakElementEducational } from "./educational";

import typescriptSource from "./sources/find-peak-element.ts?raw";
import pythonSource from "./sources/find-peak-element.py?raw";
import javaSource from "./sources/FindPeakElement.java?raw";
import rustSource from "./sources/find-peak-element.rs?raw";
import cppSource from "./sources/FindPeakElement.cpp?raw";
import goSource from "./sources/find-peak-element.go?raw";

const findPeakElementDefinition: AlgorithmDefinition<{ array: number[] }> = {
  meta: {
    id: ALGORITHM_ID.FIND_PEAK_ELEMENT!,
    name: "Find Peak Element",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "A binary search variant that finds a peak element in an unsorted array in O(log n) time by following the slope — moving toward whichever neighbor is larger until a local maximum is found",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      array: [1, 3, 20, 4, 1, 0],
    },
  },
  execute: ({ array }) => findPeakElement(array),
  generateSteps: generateFindPeakElementSteps,
  educational: findPeakElementEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(findPeakElementDefinition);
