import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { designCircularQueue } from "./sources/design-circular-queue.ts?fn";
import { generateDesignCircularQueueSteps } from "./step-generator";
import type { DesignCircularQueueInput } from "./step-generator";
import { designCircularQueueEducational } from "./educational";

import typescriptSource from "./sources/design-circular-queue.ts?raw";
import pythonSource from "./sources/design-circular-queue.py?raw";
import javaSource from "./sources/DesignCircularQueue.java?raw";
import rustSource from "./sources/design-circular-queue.rs?raw";
import cppSource from "./sources/DesignCircularQueue.cpp?raw";
import goSource from "./sources/design-circular-queue.go?raw";

function executeDesignCircularQueue(input: DesignCircularQueueInput): string[] {
  return designCircularQueue(input.operations, input.capacity) as string[];
}

const designCircularQueueDefinition: AlgorithmDefinition<DesignCircularQueueInput> = {
  meta: {
    id: ALGORITHM_ID.DESIGN_CIRCULAR_QUEUE!,
    name: "Design Circular Queue",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-design",
    description:
      "Implement a fixed-capacity FIFO queue using a ring buffer with front/rear pointers and modular arithmetic — O(1) per operation with no memory reallocation",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      operations: ["enqueue 1", "enqueue 2", "dequeue", "enqueue 3"],
      capacity: 3,
    },
  },
  execute: executeDesignCircularQueue,
  generateSteps: generateDesignCircularQueueSteps,
  educational: designCircularQueueEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(designCircularQueueDefinition);
