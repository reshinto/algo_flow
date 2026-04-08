/**
 * Heap Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapSort } from "./sources/heap-sort.ts?fn";
import { generateHeapSortSteps } from "./step-generator";
import { heapSortEducational } from "./educational";

import typescriptSource from "./sources/heap-sort.ts?raw";
import pythonSource from "./sources/heap-sort.py?raw";
import javaSource from "./sources/HeapSort.java?raw";
import rustSource from "./sources/heap-sort.rs?raw";
import cppSource from "./sources/HeapSort.cpp?raw";
import goSource from "./sources/heap-sort.go?raw";

const heapSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.HEAP_SORT!,
    name: "Heap Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Builds a max-heap from the array then repeatedly extracts the maximum to sort in-place",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: heapSort,
  generateSteps: generateHeapSortSteps,
  educational: heapSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(heapSortDefinition);
