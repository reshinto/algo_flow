/** Registry entry for Longest Palindromic Substring — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { longestPalindromicSubstring } from "./sources/longest-palindromic-substring.ts?fn";
import { generateLongestPalindromicSubstringSteps } from "./step-generator";
import type { LongestPalindromicSubstringInput } from "./step-generator";
import { longestPalindromicSubstringEducational } from "./educational";

import typescriptSource from "./sources/longest-palindromic-substring.ts?raw";
import pythonSource from "./sources/longest-palindromic-substring.py?raw";
import javaSource from "./sources/LongestPalindromicSubstring.java?raw";
import rustSource from "./sources/longest-palindromic-substring.rs?raw";
import cppSource from "./sources/LongestPalindromicSubstring.cpp?raw";
import goSource from "./sources/longest-palindromic-substring.go?raw";

function executeLongestPalindromicSubstring(input: LongestPalindromicSubstringInput): string {
  return longestPalindromicSubstring(input.text) as string;
}

const longestPalindromicSubstringDefinition: AlgorithmDefinition<LongestPalindromicSubstringInput> =
  {
    meta: {
      id: ALGORITHM_ID.LONGEST_PALINDROMIC_SUBSTRING!,
      name: "Longest Palindromic Substring",
      category: CATEGORY.STRINGS!,
      technique: "palindrome",
      description:
        "Find the longest substring that reads the same forwards and backwards by expanding outward from each possible center in O(n²) time",
      timeComplexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
      defaultInput: { text: "babad" },
    },
    execute: executeLongestPalindromicSubstring,
    generateSteps: generateLongestPalindromicSubstringSteps,
    educational: longestPalindromicSubstringEducational,
    sources: {
      typescript: typescriptSource,
      python: pythonSource,
      java: javaSource,
      rust: rustSource,
      cpp: cppSource,
      go: goSource,
    },
  };

registry.register(longestPalindromicSubstringDefinition);
