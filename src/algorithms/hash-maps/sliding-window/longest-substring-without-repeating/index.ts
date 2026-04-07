import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateLongestSubstringWithoutRepeatingSteps } from "./step-generator";
import type { LongestSubstringInput } from "./step-generator";
import { longestSubstringWithoutRepeatingEducational } from "./educational";

import typescriptSource from "./sources/longest-substring-without-repeating.ts?raw";
import pythonSource from "./sources/longest-substring-without-repeating.py?raw";
import javaSource from "./sources/LongestSubstringWithoutRepeating.java?raw";
import rustSource from "./sources/longest-substring-without-repeating.rs?raw";
import cppSource from "./sources/LongestSubstringWithoutRepeating.cpp?raw";
import goSource from "./sources/longest-substring-without-repeating.go?raw";

function executeLongestSubstring(input: LongestSubstringInput): number {
  const { text } = input;
  const charIndexMap = new Map<string, number>();
  let windowStart = 0;
  let maxLength = 0;
  for (let windowEnd = 0; windowEnd < text.length; windowEnd++) {
    const currentChar = text[windowEnd]!;
    const previousIndex = charIndexMap.get(currentChar);
    if (previousIndex !== undefined && previousIndex >= windowStart) {
      windowStart = previousIndex + 1;
    }
    charIndexMap.set(currentChar, windowEnd);
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  return maxLength;
}

const definition: AlgorithmDefinition<LongestSubstringInput> = {
  meta: {
    id: ALGORITHM_ID.LONGEST_SUBSTRING_WITHOUT_REPEATING!,
    name: "Longest Substring Without Repeating",
    category: CATEGORY.HASH_MAPS!,
    technique: "sliding-window",
    description:
      "Find the longest substring without repeating characters using a sliding window and hash map",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(min(n, k))",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "abcabcbb" },
  },
  execute: executeLongestSubstring,
  generateSteps: generateLongestSubstringWithoutRepeatingSteps,
  educational: longestSubstringWithoutRepeatingEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(definition);
