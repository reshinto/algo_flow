import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateFindTheDifferenceSteps } from "./step-generator";
import type { FindTheDifferenceInput } from "./step-generator";
import { findTheDifferenceEducational } from "./educational";

import typescriptSource from "./sources/find-the-difference.ts?raw";
import pythonSource from "./sources/find-the-difference.py?raw";
import javaSource from "./sources/FindTheDifference.java?raw";

function executeFindTheDifference(input: FindTheDifferenceInput): string {
  const { original, modified } = input;
  const charCounts = new Map<string, number>();
  for (const currentChar of original) {
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
  }
  for (const currentChar of modified) {
    const count = (charCounts.get(currentChar) ?? 0) - 1;
    charCounts.set(currentChar, count);
    if (count < 0) return currentChar;
  }
  return "";
}

const definition: AlgorithmDefinition<FindTheDifferenceInput> = {
  meta: {
    id: ALGORITHM_ID.FIND_THE_DIFFERENCE!,
    name: "Find the Difference",
    category: CATEGORY.HASH_MAPS!,
    technique: "counting",
    description: "Find the extra character added to a modified string using frequency counting",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { original: "abcd", modified: "abcde" },
  },
  execute: executeFindTheDifference,
  generateSteps: generateFindTheDifferenceSteps,
  educational: findTheDifferenceEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(definition);
