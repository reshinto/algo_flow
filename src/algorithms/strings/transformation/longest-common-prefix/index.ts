/** Registry entry for Longest Common Prefix — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { longestCommonPrefix } from "./sources/longest-common-prefix.ts?fn";
import { generateLongestCommonPrefixSteps } from "./step-generator";
import type { LongestCommonPrefixInput } from "./step-generator";
import { longestCommonPrefixEducational } from "./educational";

import typescriptSource from "./sources/longest-common-prefix.ts?raw";
import pythonSource from "./sources/longest-common-prefix.py?raw";
import javaSource from "./sources/LongestCommonPrefix.java?raw";

function executeLongestCommonPrefix(input: LongestCommonPrefixInput): string {
  return longestCommonPrefix(input.words) as string;
}

const longestCommonPrefixDefinition: AlgorithmDefinition<LongestCommonPrefixInput> = {
  meta: {
    id: ALGORITHM_ID.LONGEST_COMMON_PREFIX!,
    name: "Longest Common Prefix",
    category: CATEGORY.STRINGS!,
    technique: "transformation",
    description:
      "Find the longest prefix shared by all strings using vertical scanning — compare characters column by column in O(n*m) time",
    timeComplexity: {
      best: "O(n*m)",
      average: "O(n*m)",
      worst: "O(n*m)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { words: ["flower", "flow", "flight"] },
  },
  execute: executeLongestCommonPrefix,
  generateSteps: generateLongestCommonPrefixSteps,
  educational: longestCommonPrefixEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(longestCommonPrefixDefinition);
