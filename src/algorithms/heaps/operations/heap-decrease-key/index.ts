import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapDecreaseKey } from "./sources/heap-decrease-key.ts?fn";
import { generateHeapDecreaseKeySteps } from "./step-generator";
import type { HeapDecreaseKeyInput } from "./step-generator";
import { heapDecreaseKeyEducational } from "./educational";

import typescriptSource from "./sources/heap-decrease-key.ts?raw";
import pythonSource from "./sources/heap-decrease-key.py?raw";
import javaSource from "./sources/HeapDecreaseKey.java?raw";

function executeHeapDecreaseKey(input: HeapDecreaseKeyInput): number[] {
  return heapDecreaseKey(input.array, input.targetIndex, input.newValue) as number[];
}

const heapDecreaseKeyDefinition: AlgorithmDefinition<HeapDecreaseKeyInput> = {
  meta: {
    id: ALGORITHM_ID.HEAP_DECREASE_KEY!,
    name: "Heap Decrease Key",
    category: CATEGORY.HEAPS!,
    technique: "operations",
    description:
      "Decrease the value at a given index in a min-heap, then sift-up to restore the heap property",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [1, 5, 3, 7, 9, 8, 6], targetIndex: 3, newValue: 2 },
  },
  execute: executeHeapDecreaseKey,
  generateSteps: generateHeapDecreaseKeySteps,
  educational: heapDecreaseKeyEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(heapDecreaseKeyDefinition);
