import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { pqEnqueue } from "./sources/pq-enqueue.ts?fn";
import { generatePqEnqueueSteps } from "./step-generator";
import type { PqEnqueueInput } from "./step-generator";
import { pqEnqueueEducational } from "./educational";

import typescriptSource from "./sources/pq-enqueue.ts?raw";
import pythonSource from "./sources/pq-enqueue.py?raw";
import javaSource from "./sources/PqEnqueue.java?raw";
import rustSource from "./sources/pq-enqueue.rs?raw";
import cppSource from "./sources/PqEnqueue.cpp?raw";
import goSource from "./sources/pq-enqueue.go?raw";

function executePqEnqueue(input: PqEnqueueInput): number[] {
  return pqEnqueue(input.array, input.value) as number[];
}

const pqEnqueueDefinition: AlgorithmDefinition<PqEnqueueInput> = {
  meta: {
    id: ALGORITHM_ID.PQ_ENQUEUE!,
    name: "PQ Enqueue",
    category: CATEGORY.HEAPS!,
    technique: "priority-queue",
    description:
      "Insert an element into a min-heap-based priority queue by appending and sifting up to restore heap order",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { array: [2, 5, 8, 10, 15], value: 3 },
  },
  execute: executePqEnqueue,
  generateSteps: generatePqEnqueueSteps,
  educational: pqEnqueueEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(pqEnqueueDefinition);
