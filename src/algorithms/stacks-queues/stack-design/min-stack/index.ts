import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minStack } from "./sources/min-stack.ts?fn";
import { generateMinStackSteps } from "./step-generator";
import type { MinStackInput } from "./step-generator";
import { minStackEducational } from "./educational";

import typescriptSource from "./sources/min-stack.ts?raw";
import pythonSource from "./sources/min-stack.py?raw";
import javaSource from "./sources/MinStack.java?raw";
import rustSource from "./sources/min-stack.rs?raw";
import cppSource from "./sources/MinStack.cpp?raw";
import goSource from "./sources/min-stack.go?raw";

function executeMinStack(input: MinStackInput): number {
  return minStack(input.values) as number;
}

const minStackDefinition: AlgorithmDefinition<MinStackInput> = {
  meta: {
    id: ALGORITHM_ID.MIN_STACK!,
    name: "Min Stack",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "stack-design",
    description:
      "Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time using a paired auxiliary min-tracking stack",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { values: [5, 3, 7, 1, 8] },
  },
  execute: executeMinStack,
  generateSteps: generateMinStackSteps,
  educational: minStackEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(minStackDefinition);
