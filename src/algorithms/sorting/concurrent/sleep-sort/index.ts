/**
 * Sleep Sort algorithm registration module.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sleepSort } from "./sources/sleep-sort.ts?fn";
import { generateSleepSortSteps } from "./step-generator";
import { sleepSortEducational } from "./educational";

import typescriptSource from "./sources/sleep-sort.ts?raw";
import pythonSource from "./sources/sleep-sort.py?raw";
import javaSource from "./sources/SleepSort.java?raw";

const sleepSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.SLEEP_SORT!,
    name: "Sleep Sort",
    category: CATEGORY.SORTING!,
    technique: "concurrent",
    description:
      "Each element sleeps for a duration equal to its value; smaller values wake first, producing sorted output (simulated)",
    timeComplexity: {
      best: "O(n)",
      average: "O(n + max)",
      worst: "O(max)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [5, 3, 8, 1, 4, 2, 7, 6],
  },
  execute: sleepSort,
  generateSteps: generateSleepSortSteps,
  educational: sleepSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(sleepSortDefinition);
