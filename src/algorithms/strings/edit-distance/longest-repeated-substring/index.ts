/** Registry entry for Longest Repeated Substring — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { longestRepeatedSubstring } from "./sources/longest-repeated-substring.ts?fn";
import { generateLongestRepeatedSubstringSteps } from "./step-generator";
import type { LongestRepeatedSubstringInput } from "./step-generator";
import { longestRepeatedSubstringEducational } from "./educational";

import typescriptSource from "./sources/longest-repeated-substring.ts?raw";
import pythonSource from "./sources/longest-repeated-substring.py?raw";
import javaSource from "./sources/LongestRepeatedSubstring.java?raw";

function executeLongestRepeatedSubstring(input: LongestRepeatedSubstringInput): string {
  return longestRepeatedSubstring(input.text) as string;
}

const longestRepeatedSubstringDefinition: AlgorithmDefinition<LongestRepeatedSubstringInput> = {
  meta: {
    id: ALGORITHM_ID.LONGEST_REPEATED_SUBSTRING!,
    name: "Longest Repeated Substring",
    category: CATEGORY.STRINGS!,
    technique: "edit-distance",
    description:
      "Find the longest substring that appears at least twice in the string using a DP matrix that compares the string with itself, skipping the diagonal to avoid trivial self-matches",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n²)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "banana" },
  },
  execute: executeLongestRepeatedSubstring,
  generateSteps: generateLongestRepeatedSubstringSteps,
  educational: longestRepeatedSubstringEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(longestRepeatedSubstringDefinition);
