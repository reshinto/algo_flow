/** Registry entry for Palindrome Check — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { palindromeCheck } from "./sources/palindrome-check.ts?fn";
import { generatePalindromeCheckSteps } from "./step-generator";
import type { PalindromeCheckInput } from "./step-generator";
import { palindromeCheckEducational } from "./educational";

import typescriptSource from "./sources/palindrome-check.ts?raw";
import pythonSource from "./sources/palindrome-check.py?raw";
import javaSource from "./sources/PalindromeCheck.java?raw";
import rustSource from "./sources/palindrome-check.rs?raw";
import cppSource from "./sources/PalindromeCheck.cpp?raw";
import goSource from "./sources/palindrome-check.go?raw";

function executePalindromeCheck(input: PalindromeCheckInput): boolean {
  return palindromeCheck(input.text) as boolean;
}

const palindromeCheckDefinition: AlgorithmDefinition<PalindromeCheckInput> = {
  meta: {
    id: ALGORITHM_ID.PALINDROME_CHECK!,
    name: "Palindrome Check",
    category: CATEGORY.STRINGS!,
    technique: "palindrome",
    description:
      "Determine whether a string reads the same forwards and backwards using two inward-moving pointers in O(n) time",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "racecar" },
  },
  execute: executePalindromeCheck,
  generateSteps: generatePalindromeCheckSteps,
  educational: palindromeCheckEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(palindromeCheckDefinition);
