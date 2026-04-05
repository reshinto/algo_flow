import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { numberOfRecentCalls } from "./sources/number-of-recent-calls.ts?fn";
import { generateNumberOfRecentCallsSteps } from "./step-generator";
import type { NumberOfRecentCallsInput } from "./step-generator";
import { numberOfRecentCallsEducational } from "./educational";

import typescriptSource from "./sources/number-of-recent-calls.ts?raw";
import pythonSource from "./sources/number-of-recent-calls.py?raw";
import javaSource from "./sources/NumberOfRecentCalls.java?raw";

function executeNumberOfRecentCalls(input: NumberOfRecentCallsInput): number[] {
  return numberOfRecentCalls(input.timestamps) as number[];
}

const numberOfRecentCallsDefinition: AlgorithmDefinition<NumberOfRecentCallsInput> = {
  meta: {
    id: ALGORITHM_ID.NUMBER_OF_RECENT_CALLS!,
    name: "Number of Recent Calls",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-operations",
    description:
      "Count how many calls were made within the last 3000 milliseconds using a queue as a sliding time window that expires outdated timestamps from the front",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(w)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { timestamps: [1, 100, 3001, 3002] },
  },
  execute: executeNumberOfRecentCalls,
  generateSteps: generateNumberOfRecentCallsSteps,
  educational: numberOfRecentCallsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(numberOfRecentCallsDefinition);
