/** Registry entry for Character Frequency Sort — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { characterFrequencySort } from "./sources/character-frequency-sort.ts?fn";
import { generateCharacterFrequencySortSteps } from "./step-generator";
import type { CharacterFrequencySortInput } from "./step-generator";
import { characterFrequencySortEducational } from "./educational";

import typescriptSource from "./sources/character-frequency-sort.ts?raw";
import pythonSource from "./sources/character-frequency-sort.py?raw";
import javaSource from "./sources/CharacterFrequencySort.java?raw";

function executeCharacterFrequencySort(input: CharacterFrequencySortInput): string {
  return characterFrequencySort(input.text) as string;
}

const characterFrequencySortDefinition: AlgorithmDefinition<CharacterFrequencySortInput> = {
  meta: {
    id: ALGORITHM_ID.CHARACTER_FREQUENCY_SORT!,
    name: "Character Frequency Sort",
    category: CATEGORY.STRINGS!,
    technique: "character-frequency",
    description:
      "Sort a string so characters with higher frequencies appear first, using bucket sort for O(n) time without comparison-based sorting",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "tree" },
  },
  execute: executeCharacterFrequencySort,
  generateSteps: generateCharacterFrequencySortSteps,
  educational: characterFrequencySortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(characterFrequencySortDefinition);
