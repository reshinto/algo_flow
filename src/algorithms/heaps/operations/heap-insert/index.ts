import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapInsert } from "./sources/heap-insert.ts?fn";
import { generateHeapInsertSteps } from "./step-generator";
import type { HeapInsertInput } from "./step-generator";
import { heapInsertEducational } from "./educational";

import typescriptSource from "./sources/heap-insert.ts?raw";
import pythonSource from "./sources/heap-insert.py?raw";
import javaSource from "./sources/HeapInsert.java?raw";

function executeHeapInsert(input: HeapInsertInput): number[] {
  return heapInsert(input.array, input.value) as number[];
}

const heapInsertDefinition: AlgorithmDefinition<HeapInsertInput> = {
  meta: {
    id: ALGORITHM_ID.HEAP_INSERT!,
    name: "Heap Insert",
    category: CATEGORY.HEAPS!,
    technique: "operations",
    description:
      "Insert a value into an existing min-heap by appending at the end and sifting up to restore the heap property",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [1, 3, 5, 7, 9, 8, 6], value: 2 },
  },
  execute: executeHeapInsert,
  generateSteps: generateHeapInsertSteps,
  educational: heapInsertEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(heapInsertDefinition);
