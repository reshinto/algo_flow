import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapExtractMin } from "./sources/heap-extract-min.ts?fn";
import { generateHeapExtractMinSteps } from "./step-generator";
import type { HeapExtractMinInput } from "./step-generator";
import { heapExtractMinEducational } from "./educational";

import typescriptSource from "./sources/heap-extract-min.ts?raw";
import pythonSource from "./sources/heap-extract-min.py?raw";
import javaSource from "./sources/HeapExtractMin.java?raw";

function executeHeapExtractMin(input: HeapExtractMinInput): number[] {
  const result = heapExtractMin(input.array) as {
    extractedValue: number;
    remainingHeap: number[];
  };
  return result.remainingHeap;
}

const heapExtractMinDefinition: AlgorithmDefinition<HeapExtractMinInput> = {
  meta: {
    id: ALGORITHM_ID.HEAP_EXTRACT_MIN!,
    name: "Heap Extract Min",
    category: CATEGORY.HEAPS!,
    technique: "operations",
    description:
      "Remove and return the minimum element (root) from a min-heap, then restore the heap property via sift-down",
    timeComplexity: {
      best: "O(log n)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [1, 3, 5, 7, 9, 8, 6] },
  },
  execute: executeHeapExtractMin,
  generateSteps: generateHeapExtractMinSteps,
  educational: heapExtractMinEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(heapExtractMinDefinition);
