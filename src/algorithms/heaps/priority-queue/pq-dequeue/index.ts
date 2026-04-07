import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { pqDequeue } from "./sources/pq-dequeue.ts?fn";
import { generatePqDequeueSteps } from "./step-generator";
import type { PqDequeueInput } from "./step-generator";
import { pqDequeueEducational } from "./educational";

import typescriptSource from "./sources/pq-dequeue.ts?raw";
import pythonSource from "./sources/pq-dequeue.py?raw";
import javaSource from "./sources/PqDequeue.java?raw";
import rustSource from "./sources/pq-dequeue.rs?raw";
import cppSource from "./sources/PqDequeue.cpp?raw";
import goSource from "./sources/pq-dequeue.go?raw";

function executePqDequeue(input: PqDequeueInput): {
  dequeuedValue: number;
  remainingQueue: number[];
} {
  return pqDequeue(input.array) as { dequeuedValue: number; remainingQueue: number[] };
}

const pqDequeueDefinition: AlgorithmDefinition<PqDequeueInput> = {
  meta: {
    id: ALGORITHM_ID.PQ_DEQUEUE!,
    name: "PQ Dequeue",
    category: CATEGORY.HEAPS!,
    technique: "priority-queue",
    description:
      "Remove and return the highest-priority (smallest) element from a min-heap priority queue by extracting the root and sifting down",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { array: [2, 5, 3, 10, 15, 8, 7] },
  },
  execute: executePqDequeue,
  generateSteps: generatePqDequeueSteps,
  educational: pqDequeueEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(pqDequeueDefinition);
