import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { implementStackUsingQueues } from "./sources/implement-stack-using-queues.ts?fn";
import { generateImplementStackUsingQueuesSteps } from "./step-generator";
import type { ImplementStackUsingQueuesInput } from "./step-generator";
import { implementStackUsingQueuesEducational } from "./educational";

import typescriptSource from "./sources/implement-stack-using-queues.ts?raw";
import pythonSource from "./sources/implement-stack-using-queues.py?raw";
import javaSource from "./sources/ImplementStackUsingQueues.java?raw";
import rustSource from "./sources/implement-stack-using-queues.rs?raw";
import cppSource from "./sources/ImplementStackUsingQueues.cpp?raw";
import goSource from "./sources/implement-stack-using-queues.go?raw";

function executeImplementStackUsingQueues(input: ImplementStackUsingQueuesInput): number[] {
  return implementStackUsingQueues(input.values) as number[];
}

const implementStackUsingQueuesDefinition: AlgorithmDefinition<ImplementStackUsingQueuesInput> = {
  meta: {
    id: ALGORITHM_ID.IMPLEMENT_STACK_USING_QUEUES!,
    name: "Implement Stack Using Queues",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-operations",
    description:
      "Simulate a LIFO stack with a single queue: after each enqueue, rotate all prior elements behind the new one so the queue front always holds the stack top, yielding O(1) pop and O(n) push",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { values: [1, 2, 3, 4, 5] },
  },
  execute: executeImplementStackUsingQueues,
  generateSteps: generateImplementStackUsingQueuesSteps,
  educational: implementStackUsingQueuesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(implementStackUsingQueuesDefinition);
