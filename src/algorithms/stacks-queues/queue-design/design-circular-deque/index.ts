import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { designCircularDeque } from "./sources/design-circular-deque.ts?fn";
import { generateDesignCircularDequeSteps } from "./step-generator";
import type { DesignCircularDequeInput } from "./step-generator";
import { designCircularDequeEducational } from "./educational";

import typescriptSource from "./sources/design-circular-deque.ts?raw";
import pythonSource from "./sources/design-circular-deque.py?raw";
import javaSource from "./sources/DesignCircularDeque.java?raw";

function executeDesignCircularDeque(input: DesignCircularDequeInput): string[] {
  return designCircularDeque(input.operations, input.capacity) as string[];
}

const designCircularDequeDefinition: AlgorithmDefinition<DesignCircularDequeInput> = {
  meta: {
    id: ALGORITHM_ID.DESIGN_CIRCULAR_DEQUE!,
    name: "Design Circular Deque",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-design",
    description:
      "Implement a fixed-capacity double-ended queue using a ring buffer with front/rear pointers and modular arithmetic — O(1) per operation at both ends with no memory reallocation",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      operations: ["pushBack 1", "pushFront 2", "popBack", "pushBack 3"],
      capacity: 3,
    },
  },
  execute: executeDesignCircularDeque,
  generateSteps: generateDesignCircularDequeSteps,
  educational: designCircularDequeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(designCircularDequeDefinition);
