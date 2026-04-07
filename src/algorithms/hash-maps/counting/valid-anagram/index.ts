import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateValidAnagramSteps } from "./step-generator";
import type { ValidAnagramInput } from "./step-generator";
import { validAnagramEducational } from "./educational";

import typescriptSource from "./sources/valid-anagram.ts?raw";
import pythonSource from "./sources/valid-anagram.py?raw";
import javaSource from "./sources/ValidAnagram.java?raw";
import rustSource from "./sources/valid-anagram.rs?raw";
import cppSource from "./sources/ValidAnagram.cpp?raw";
import goSource from "./sources/valid-anagram.go?raw";

function executeValidAnagram(input: ValidAnagramInput): boolean {
  const { textA, textB } = input;
  if (textA.length !== textB.length) return false;
  const charCounts = new Map<string, number>();
  for (const currentChar of textA) {
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
  }
  for (const currentChar of textB) {
    const updatedCount = (charCounts.get(currentChar) ?? 0) - 1;
    if (updatedCount < 0) return false;
    charCounts.set(currentChar, updatedCount);
  }
  return true;
}

const definition: AlgorithmDefinition<ValidAnagramInput> = {
  meta: {
    id: ALGORITHM_ID.VALID_ANAGRAM!,
    name: "Valid Anagram",
    category: CATEGORY.HASH_MAPS!,
    technique: "counting",
    description:
      "Determine if two strings are anagrams by building a frequency map from one string and decrementing for the other",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { textA: "anagram", textB: "nagaram" },
  },
  execute: executeValidAnagram,
  generateSteps: generateValidAnagramSteps,
  educational: validAnagramEducational,
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
