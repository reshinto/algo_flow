import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapReplaceRoot } from "./sources/heap-replace-root.ts?fn";
import { generateHeapReplaceRootSteps } from "./step-generator";
import type { HeapReplaceRootInput } from "./step-generator";
import { heapReplaceRootEducational } from "./educational";

import typescriptSource from "./sources/heap-replace-root.ts?raw";
import pythonSource from "./sources/heap-replace-root.py?raw";
import javaSource from "./sources/HeapReplaceRoot.java?raw";

function executeHeapReplaceRoot(input: HeapReplaceRootInput): {
  replacedValue: number;
  newHeap: number[];
} {
  return heapReplaceRoot(input.array, input.newValue) as {
    replacedValue: number;
    newHeap: number[];
  };
}

const heapReplaceRootDefinition: AlgorithmDefinition<HeapReplaceRootInput> = {
  meta: {
    id: ALGORITHM_ID.HEAP_REPLACE_ROOT!,
    name: "Heap Replace Root",
    category: CATEGORY.HEAPS!,
    technique: "operations",
    description:
      "Replace the root of a min-heap with a new value and sift-down — more efficient than extract-min followed by insert",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [1, 3, 5, 7, 9, 8, 6], newValue: 10 },
  },
  execute: executeHeapReplaceRoot,
  generateSteps: generateHeapReplaceRootSteps,
  educational: heapReplaceRootEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(heapReplaceRootDefinition);
