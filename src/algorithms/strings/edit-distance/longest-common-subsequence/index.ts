/** Registry entry for Longest Common Subsequence — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { longestCommonSubsequence } from "./sources/longest-common-subsequence.ts?fn";
import { generateLongestCommonSubsequenceSteps } from "./step-generator";
import type { LongestCommonSubsequenceInput } from "./step-generator";
import { longestCommonSubsequenceEducational } from "./educational";

import typescriptSource from "./sources/longest-common-subsequence.ts?raw";
import pythonSource from "./sources/longest-common-subsequence.py?raw";
import javaSource from "./sources/LongestCommonSubsequence.java?raw";

function executeLongestCommonSubsequence(input: LongestCommonSubsequenceInput): number {
  return longestCommonSubsequence(input.source, input.target) as number;
}

const longestCommonSubsequenceDefinition: AlgorithmDefinition<LongestCommonSubsequenceInput> = {
  meta: {
    id: ALGORITHM_ID.LONGEST_COMMON_SUBSEQUENCE!,
    name: "Longest Common Subsequence",
    category: CATEGORY.STRINGS!,
    technique: "edit-distance",
    description:
      "Find the length of the longest subsequence present in both strings using dynamic programming — characters need not be contiguous but must maintain relative order",
    timeComplexity: {
      best: "O(nm)",
      average: "O(nm)",
      worst: "O(nm)",
    },
    spaceComplexity: "O(nm)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { source: "ABCBDAB", target: "BDCAB" },
  },
  execute: executeLongestCommonSubsequence,
  generateSteps: generateLongestCommonSubsequenceSteps,
  educational: longestCommonSubsequenceEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(longestCommonSubsequenceDefinition);
