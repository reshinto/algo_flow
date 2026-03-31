import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapPeek } from "./sources/heap-peek.ts?fn";
import { generateHeapPeekSteps } from "./step-generator";
import type { HeapPeekInput } from "./step-generator";
import { heapPeekEducational } from "./educational";

import typescriptSource from "./sources/heap-peek.ts?raw";
import pythonSource from "./sources/heap-peek.py?raw";
import javaSource from "./sources/HeapPeek.java?raw";

function executeHeapPeek(input: HeapPeekInput): number[] {
  const result = heapPeek(input.array) as number | undefined;
  return result !== undefined ? [result] : [];
}

const heapPeekDefinition: AlgorithmDefinition<HeapPeekInput> = {
  meta: {
    id: ALGORITHM_ID.HEAP_PEEK!,
    name: "Heap Peek",
    category: CATEGORY.HEAPS!,
    technique: "operations",
    description:
      "Return the minimum element from a min-heap in O(1) time by reading the root without removing it",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [1, 3, 5, 7, 9, 8, 6] },
  },
  execute: executeHeapPeek,
  generateSteps: generateHeapPeekSteps,
  educational: heapPeekEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(heapPeekDefinition);
