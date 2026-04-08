import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapIncreaseKey } from "./sources/heap-increase-key.ts?fn";
import { generateHeapIncreaseKeySteps } from "./step-generator";
import type { HeapIncreaseKeyInput } from "./step-generator";
import { heapIncreaseKeyEducational } from "./educational";

import typescriptSource from "./sources/heap-increase-key.ts?raw";
import pythonSource from "./sources/heap-increase-key.py?raw";
import javaSource from "./sources/HeapIncreaseKey.java?raw";
import rustSource from "./sources/heap-increase-key.rs?raw";
import cppSource from "./sources/HeapIncreaseKey.cpp?raw";
import goSource from "./sources/heap-increase-key.go?raw";

function executeHeapIncreaseKey(input: HeapIncreaseKeyInput): number[] {
  return heapIncreaseKey(input.array, input.targetIndex, input.newValue) as number[];
}

const heapIncreaseKeyDefinition: AlgorithmDefinition<HeapIncreaseKeyInput> = {
  meta: {
    id: ALGORITHM_ID.HEAP_INCREASE_KEY!,
    name: "Heap Increase Key",
    category: CATEGORY.HEAPS!,
    technique: "operations",
    description:
      "Increase the value at a given index in a min-heap, then sift-down to restore the heap property",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { array: [1, 3, 5, 7, 9, 8, 6], targetIndex: 1, newValue: 10 },
  },
  execute: executeHeapIncreaseKey,
  generateSteps: generateHeapIncreaseKeySteps,
  educational: heapIncreaseKeyEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(heapIncreaseKeyDefinition);
