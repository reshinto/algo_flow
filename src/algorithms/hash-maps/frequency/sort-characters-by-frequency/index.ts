import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sortCharactersByFrequency } from "./sources/sort-characters-by-frequency.ts?fn";
import { generateSortCharactersByFrequencySteps } from "./step-generator";
import type { SortCharactersByFrequencyInput } from "./step-generator";
import { sortCharactersByFrequencyEducational } from "./educational";

import typescriptSource from "./sources/sort-characters-by-frequency.ts?raw";
import pythonSource from "./sources/sort-characters-by-frequency.py?raw";
import javaSource from "./sources/SortCharactersByFrequency.java?raw";
import rustSource from "./sources/sort-characters-by-frequency.rs?raw";
import cppSource from "./sources/SortCharactersByFrequency.cpp?raw";
import goSource from "./sources/sort-characters-by-frequency.go?raw";

function executeSortCharactersByFrequency(input: SortCharactersByFrequencyInput): string {
  return sortCharactersByFrequency(input.text) as string;
}

const sortCharactersByFrequencyDefinition: AlgorithmDefinition<SortCharactersByFrequencyInput> = {
  meta: {
    id: ALGORITHM_ID.SORT_CHARACTERS_BY_FREQUENCY!,
    name: "Sort Characters by Frequency",
    category: CATEGORY.HASH_MAPS!,
    technique: "frequency",
    description:
      "Sort a string so more-frequent characters appear first in O(n) time using a frequency map and bucket sort",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "tree" },
  },
  execute: executeSortCharactersByFrequency,
  generateSteps: generateSortCharactersByFrequencySteps,
  educational: sortCharactersByFrequencyEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(sortCharactersByFrequencyDefinition);
