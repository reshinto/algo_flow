import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { pqChangePriority } from "./sources/pq-change-priority.ts?fn";
import { generatePqChangePrioritySteps } from "./step-generator";
import type { PqChangePriorityInput } from "./step-generator";
import { pqChangePriorityEducational } from "./educational";

import typescriptSource from "./sources/pq-change-priority.ts?raw";
import pythonSource from "./sources/pq-change-priority.py?raw";
import javaSource from "./sources/PqChangePriority.java?raw";
import rustSource from "./sources/pq-change-priority.rs?raw";
import cppSource from "./sources/PqChangePriority.cpp?raw";
import goSource from "./sources/pq-change-priority.go?raw";

function executePqChangePriority(input: PqChangePriorityInput): number[] {
  return pqChangePriority(input.array, input.targetIndex, input.newValue) as number[];
}

const pqChangePriorityDefinition: AlgorithmDefinition<PqChangePriorityInput> = {
  meta: {
    id: ALGORITHM_ID.PQ_CHANGE_PRIORITY!,
    name: "PQ Change Priority",
    category: CATEGORY.HEAPS!,
    technique: "priority-queue",
    description:
      "Change the priority of an element at a given index in a min-heap priority queue, then restore heap order by sifting up or down",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { array: [2, 5, 3, 10, 15, 8, 7], targetIndex: 4, newValue: 1 },
  },
  execute: executePqChangePriority,
  generateSteps: generatePqChangePrioritySteps,
  educational: pqChangePriorityEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(pqChangePriorityDefinition);
