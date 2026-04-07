import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapSortVisualization } from "./sources/heap-sort-visualization.ts?fn";
import { generateHeapSortVisualizationSteps } from "./step-generator";
import type { HeapSortVisualizationInput } from "./step-generator";
import { heapSortVisualizationEducational } from "./educational";

import typescriptSource from "./sources/heap-sort-visualization.ts?raw";
import pythonSource from "./sources/heap-sort-visualization.py?raw";
import javaSource from "./sources/HeapSortVisualization.java?raw";
import rustSource from "./sources/heap-sort-visualization.rs?raw";
import cppSource from "./sources/HeapSortVisualization.cpp?raw";
import goSource from "./sources/heap-sort-visualization.go?raw";

function executeHeapSortVisualization(input: HeapSortVisualizationInput): number[] {
  return heapSortVisualization(input.array) as number[];
}

const heapSortVisualizationDefinition: AlgorithmDefinition<HeapSortVisualizationInput> = {
  meta: {
    id: ALGORITHM_ID.HEAP_SORT_VISUALIZATION!,
    name: "Heap Sort (Tree View)",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Sort an array in-place via max-heap: build the heap bottom-up, then repeatedly extract the max and sift-down — visualized as a shrinking heap tree",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { array: [9, 5, 7, 1, 3, 8, 2, 6, 4] },
  },
  execute: executeHeapSortVisualization,
  generateSteps: generateHeapSortVisualizationSteps,
  educational: heapSortVisualizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(heapSortVisualizationDefinition);
