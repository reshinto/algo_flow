/** Registry entry for First Non-Repeating Character — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { firstNonRepeatingCharacter } from "./sources/first-non-repeating-character.ts?fn";
import { generateFirstNonRepeatingCharacterSteps } from "./step-generator";
import type { FirstNonRepeatingCharacterInput } from "./step-generator";
import { firstNonRepeatingCharacterEducational } from "./educational";

import typescriptSource from "./sources/first-non-repeating-character.ts?raw";
import pythonSource from "./sources/first-non-repeating-character.py?raw";
import javaSource from "./sources/FirstNonRepeatingCharacter.java?raw";

function executeFirstNonRepeatingCharacter(input: FirstNonRepeatingCharacterInput): number {
  return firstNonRepeatingCharacter(input.text) as number;
}

const firstNonRepeatingCharacterDefinition: AlgorithmDefinition<FirstNonRepeatingCharacterInput> = {
  meta: {
    id: ALGORITHM_ID.FIRST_NON_REPEATING_CHARACTER!,
    name: "First Non-Repeating Character",
    category: CATEGORY.STRINGS!,
    technique: "character-frequency",
    description:
      "Find the index of the first character that appears exactly once by building a frequency map in O(n) time and scanning left-to-right",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "leetcode" },
  },
  execute: executeFirstNonRepeatingCharacter,
  generateSteps: generateFirstNonRepeatingCharacterSteps,
  educational: firstNonRepeatingCharacterEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(firstNonRepeatingCharacterDefinition);
