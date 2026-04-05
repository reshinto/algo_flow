import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { maxFrequencyStack } from "./sources/max-frequency-stack.ts?fn";
import { generateMaxFrequencyStackSteps } from "./step-generator";
import type { MaxFrequencyStackInput } from "./step-generator";
import { maxFrequencyStackEducational } from "./educational";

import typescriptSource from "./sources/max-frequency-stack.ts?raw";
import pythonSource from "./sources/max-frequency-stack.py?raw";
import javaSource from "./sources/MaxFrequencyStack.java?raw";

function executeMaxFrequencyStack(input: MaxFrequencyStackInput): number[] {
  return maxFrequencyStack(input.values) as number[];
}

const maxFrequencyStackDefinition: AlgorithmDefinition<MaxFrequencyStackInput> = {
  meta: {
    id: ALGORITHM_ID.MAX_FREQUENCY_STACK!,
    name: "Max Frequency Stack",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "stack-design",
    description:
      "Design a stack-like data structure that pops the most frequently pushed element, using a frequency map and a stack-of-stacks grouped by frequency",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { values: [5, 7, 5, 7, 4, 5] },
  },
  execute: executeMaxFrequencyStack,
  generateSteps: generateMaxFrequencyStackSteps,
  educational: maxFrequencyStackEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(maxFrequencyStackDefinition);
