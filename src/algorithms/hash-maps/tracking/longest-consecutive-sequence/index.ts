import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { longestConsecutiveSequence } from "./sources/longest-consecutive-sequence.ts?fn";
import {
  generateLongestConsecutiveSequenceSteps,
  type LongestConsecutiveSequenceInput,
} from "./step-generator";
import { longestConsecutiveSequenceEducational } from "./educational";

import typescriptSource from "./sources/longest-consecutive-sequence.ts?raw";
import pythonSource from "./sources/longest-consecutive-sequence.py?raw";
import javaSource from "./sources/LongestConsecutiveSequence.java?raw";

function executeLongestConsecutiveSequence(input: LongestConsecutiveSequenceInput): number {
  return longestConsecutiveSequence(input.numbers);
}

const longestConsecutiveSequenceDefinition: AlgorithmDefinition<LongestConsecutiveSequenceInput> = {
  meta: {
    id: ALGORITHM_ID.LONGEST_CONSECUTIVE_SEQUENCE!,
    name: "Longest Consecutive Sequence",
    category: CATEGORY.HASH_MAPS!,
    technique: "tracking",
    description:
      "Find the length of the longest run of consecutive integers in O(n) using a hash set to check for sequence starts",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numbers: [100, 4, 200, 1, 3, 2] },
  },
  execute: executeLongestConsecutiveSequence,
  generateSteps: generateLongestConsecutiveSequenceSteps,
  educational: longestConsecutiveSequenceEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(longestConsecutiveSequenceDefinition);
