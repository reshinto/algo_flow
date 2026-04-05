import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { interleaveFirstHalfQueue } from "./sources/interleave-first-half-queue.ts?fn";
import { generateInterleaveFirstHalfQueueSteps } from "./step-generator";
import type { InterleaveFirstHalfQueueInput } from "./step-generator";
import { interleaveFirstHalfQueueEducational } from "./educational";

import typescriptSource from "./sources/interleave-first-half-queue.ts?raw";
import pythonSource from "./sources/interleave-first-half-queue.py?raw";
import javaSource from "./sources/InterleaveFirstHalfQueue.java?raw";

function executeInterleaveFirstHalfQueue(input: InterleaveFirstHalfQueueInput): number[] {
  return interleaveFirstHalfQueue(input.values) as number[];
}

const interleaveFirstHalfQueueDefinition: AlgorithmDefinition<InterleaveFirstHalfQueueInput> = {
  meta: {
    id: ALGORITHM_ID.INTERLEAVE_FIRST_HALF_QUEUE!,
    name: "Interleave First Half Queue",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-applications",
    description:
      "Interleave the first half of a queue with the second half using a stack — [1,2,3,4,5,6] becomes [1,4,2,5,3,6]",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { values: [1, 2, 3, 4, 5, 6] },
  },
  execute: executeInterleaveFirstHalfQueue,
  generateSteps: generateInterleaveFirstHalfQueueSteps,
  educational: interleaveFirstHalfQueueEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(interleaveFirstHalfQueueDefinition);
