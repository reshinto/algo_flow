import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { implementQueueUsingStacks } from "./sources/implement-queue-using-stacks.ts?fn";
import { generateImplementQueueUsingStacksSteps } from "./step-generator";
import type { ImplementQueueUsingStacksInput } from "./step-generator";
import { implementQueueUsingStacksEducational } from "./educational";

import typescriptSource from "./sources/implement-queue-using-stacks.ts?raw";
import pythonSource from "./sources/implement-queue-using-stacks.py?raw";
import javaSource from "./sources/ImplementQueueUsingStacks.java?raw";

function executeImplementQueueUsingStacks(input: ImplementQueueUsingStacksInput): number[] {
  return implementQueueUsingStacks(input.values) as number[];
}

const implementQueueUsingStacksDefinition: AlgorithmDefinition<ImplementQueueUsingStacksInput> = {
  meta: {
    id: ALGORITHM_ID.IMPLEMENT_QUEUE_USING_STACKS!,
    name: "Implement Queue Using Stacks",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-operations",
    description:
      "Simulate a FIFO queue with two stacks: push to the input stack, transfer all to the output stack on dequeue when empty, yielding amortized O(1) per operation",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { values: [1, 2, 3, 4, 5] },
  },
  execute: executeImplementQueueUsingStacks,
  generateSteps: generateImplementQueueUsingStacksSteps,
  educational: implementQueueUsingStacksEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(implementQueueUsingStacksDefinition);
