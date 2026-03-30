import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateFirstUniqueCharacterSteps } from "./step-generator";
import type { FirstUniqueCharacterInput } from "./step-generator";
import { firstUniqueCharacterEducational } from "./educational";

import typescriptSource from "./sources/first-unique-character.ts?raw";
import pythonSource from "./sources/first-unique-character.py?raw";
import javaSource from "./sources/FirstUniqueCharacter.java?raw";

function executeFirstUniqueCharacter(input: FirstUniqueCharacterInput): number {
  const { text } = input;
  const charCounts = new Map<string, number>();
  for (const currentChar of text) {
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
  }
  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    if (charCounts.get(text[charIndex]!) === 1) return charIndex;
  }
  return -1;
}

const definition: AlgorithmDefinition<FirstUniqueCharacterInput> = {
  meta: {
    id: ALGORITHM_ID.FIRST_UNIQUE_CHARACTER!,
    name: "First Unique Character",
    category: CATEGORY.HASH_MAPS!,
    technique: "counting",
    description:
      "Find the index of the first non-repeating character in a string using a two-pass frequency count",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "leetcode" },
  },
  execute: executeFirstUniqueCharacter,
  generateSteps: generateFirstUniqueCharacterSteps,
  educational: firstUniqueCharacterEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(definition);
