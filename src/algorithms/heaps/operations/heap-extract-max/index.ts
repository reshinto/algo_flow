import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapExtractMax } from "./sources/heap-extract-max.ts?fn";
import { generateHeapExtractMaxSteps } from "./step-generator";
import type { HeapExtractMaxInput } from "./step-generator";
import { heapExtractMaxEducational } from "./educational";

import typescriptSource from "./sources/heap-extract-max.ts?raw";
import pythonSource from "./sources/heap-extract-max.py?raw";
import javaSource from "./sources/HeapExtractMax.java?raw";

function executeHeapExtractMax(input: HeapExtractMaxInput): number[] {
  const result = heapExtractMax(input.array) as {
    extractedValue: number;
    remainingHeap: number[];
  };
  return result.remainingHeap;
}

const heapExtractMaxDefinition: AlgorithmDefinition<HeapExtractMaxInput> = {
  meta: {
    id: ALGORITHM_ID.HEAP_EXTRACT_MAX!,
    name: "Heap Extract Max",
    category: CATEGORY.HEAPS!,
    technique: "operations",
    description:
      "Remove and return the maximum element (root) from a max-heap, then restore the heap property via sift-down",
    timeComplexity: {
      best: "O(log n)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [9, 7, 8, 3, 5, 6, 1] },
  },
  execute: executeHeapExtractMax,
  generateSteps: generateHeapExtractMaxSteps,
  educational: heapExtractMaxEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(heapExtractMaxDefinition);
