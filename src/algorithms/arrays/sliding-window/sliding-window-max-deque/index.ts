/**
 * Sliding Window Maximum (Deque) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { slidingWindowMaxDeque } from "./sources/sliding-window-max-deque.ts?fn";
import { generateSlidingWindowMaxDequeSteps } from "./step-generator";
import { slidingWindowMaxDequeEducational } from "./educational";

import typescriptSource from "./sources/sliding-window-max-deque.ts?raw";
import pythonSource from "./sources/sliding-window-max-deque.py?raw";
import javaSource from "./sources/SlidingWindowMaxDeque.java?raw";

interface SlidingWindowMaxDequeInput {
  inputArray: number[];
  windowSize: number;
}

const slidingWindowMaxDequeDefinition: AlgorithmDefinition<SlidingWindowMaxDequeInput> = {
  meta: {
    id: ALGORITHM_ID.SLIDING_WINDOW_MAX_DEQUE!,
    name: "Sliding Window Maximum (Deque)",
    category: CATEGORY.ARRAYS!,
    technique: "sliding-window",
    description:
      "Finds the maximum element in every sliding window of size k using a monotonic decreasing deque of indices for O(n) performance",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [1, 3, -1, -3, 5, 3, 6, 7],
      windowSize: 3,
    },
  },
  execute: (input: SlidingWindowMaxDequeInput) =>
    slidingWindowMaxDeque(input.inputArray, input.windowSize),
  generateSteps: generateSlidingWindowMaxDequeSteps,
  educational: slidingWindowMaxDequeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(slidingWindowMaxDequeDefinition);
