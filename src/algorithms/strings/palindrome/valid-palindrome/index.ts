/** Registry entry for Valid Palindrome — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { validPalindrome } from "./sources/valid-palindrome.ts?fn";
import { generateValidPalindromeSteps } from "./step-generator";
import type { ValidPalindromeInput } from "./step-generator";
import { validPalindromeEducational } from "./educational";

import typescriptSource from "./sources/valid-palindrome.ts?raw";
import pythonSource from "./sources/valid-palindrome.py?raw";
import javaSource from "./sources/ValidPalindrome.java?raw";
import rustSource from "./sources/valid-palindrome.rs?raw";
import cppSource from "./sources/ValidPalindrome.cpp?raw";
import goSource from "./sources/valid-palindrome.go?raw";

function executeValidPalindrome(input: ValidPalindromeInput): boolean {
  return validPalindrome(input.text) as boolean;
}

const validPalindromeDefinition: AlgorithmDefinition<ValidPalindromeInput> = {
  meta: {
    id: ALGORITHM_ID.VALID_PALINDROME!,
    name: "Valid Palindrome",
    category: CATEGORY.STRINGS!,
    technique: "palindrome",
    description:
      "Determine whether a string is a palindrome when only alphanumeric characters are considered and case is ignored, using two inward-moving pointers that skip non-alphanumeric characters",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "A man, a plan, a canal: Panama" },
  },
  execute: executeValidPalindrome,
  generateSteps: generateValidPalindromeSteps,
  educational: validPalindromeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(validPalindromeDefinition);
