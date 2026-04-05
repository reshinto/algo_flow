/** Registry entry for Longest Common Substring — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { longestCommonSubstring } from "./sources/longest-common-substring.ts?fn";
import { generateLongestCommonSubstringSteps } from "./step-generator";
import type { LongestCommonSubstringInput } from "./step-generator";
import { longestCommonSubstringEducational } from "./educational";

import typescriptSource from "./sources/longest-common-substring.ts?raw";
import pythonSource from "./sources/longest-common-substring.py?raw";
import javaSource from "./sources/LongestCommonSubstring.java?raw";

function executeLongestCommonSubstring(input: LongestCommonSubstringInput): number {
  return longestCommonSubstring(input.source, input.target) as number;
}

const longestCommonSubstringDefinition: AlgorithmDefinition<LongestCommonSubstringInput> = {
  meta: {
    id: ALGORITHM_ID.LONGEST_COMMON_SUBSTRING!,
    name: "Longest Common Substring",
    category: CATEGORY.STRINGS!,
    technique: "edit-distance",
    description:
      "Find the length of the longest contiguous sequence of characters shared by two strings using dynamic programming",
    timeComplexity: {
      best: "O(nm)",
      average: "O(nm)",
      worst: "O(nm)",
    },
    spaceComplexity: "O(nm)",
    supportedLanguages: ["typescript", "python", "java"],
    // "ABABC" and "BABCBA" share longest common substring "BABC" of length 4
    defaultInput: { source: "ABABC", target: "BABCBA" },
  },
  execute: executeLongestCommonSubstring,
  generateSteps: generateLongestCommonSubstringSteps,
  educational: longestCommonSubstringEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(longestCommonSubstringDefinition);
