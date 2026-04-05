import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { slidingWindowMaxMonotonic } from "./sources/sliding-window-maximum.ts?fn";
import { generateSlidingWindowMaximumSteps } from "./step-generator";
import type { SlidingWindowMaximumInput } from "./step-generator";
import { slidingWindowMaximumEducational } from "./educational";

import typescriptSource from "./sources/sliding-window-maximum.ts?raw";
import pythonSource from "./sources/sliding-window-maximum.py?raw";
import javaSource from "./sources/SlidingWindowMaximum.java?raw";

function executeSlidingWindowMaximum(input: SlidingWindowMaximumInput): number[] {
  return slidingWindowMaxMonotonic(input.nums, input.windowSize) as number[];
}

const slidingWindowMaximumDefinition: AlgorithmDefinition<SlidingWindowMaximumInput> = {
  meta: {
    id: ALGORITHM_ID.SLIDING_WINDOW_MAXIMUM!,
    name: "Sliding Window Maximum",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-operations",
    description:
      "Find the maximum in each sliding window of size k using a monotonic deque that stores indices in decreasing order of their values for O(n) performance",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { nums: [1, 3, -1, -3, 5, 3, 6, 7], windowSize: 3 },
  },
  execute: executeSlidingWindowMaximum,
  generateSteps: generateSlidingWindowMaximumSteps,
  educational: slidingWindowMaximumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(slidingWindowMaximumDefinition);
