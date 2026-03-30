import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateNumberOfGoodPairsSteps } from "./step-generator";
import type { NumberOfGoodPairsInput } from "./step-generator";
import { numberOfGoodPairsEducational } from "./educational";

import typescriptSource from "./sources/number-of-good-pairs.ts?raw";
import pythonSource from "./sources/number-of-good-pairs.py?raw";
import javaSource from "./sources/NumberOfGoodPairs.java?raw";

function executeNumberOfGoodPairs(input: NumberOfGoodPairsInput): number {
  const { numbers } = input;
  const frequencyMap = new Map<number, number>();
  let totalPairs = 0;
  for (const currentNum of numbers) {
    totalPairs += frequencyMap.get(currentNum) ?? 0;
    frequencyMap.set(currentNum, (frequencyMap.get(currentNum) ?? 0) + 1);
  }
  return totalPairs;
}

const definition: AlgorithmDefinition<NumberOfGoodPairsInput> = {
  meta: {
    id: ALGORITHM_ID.NUMBER_OF_GOOD_PAIRS!,
    name: "Number of Good Pairs",
    category: CATEGORY.HASH_MAPS!,
    technique: "counting",
    description: "Count pairs of equal elements using frequency tracking",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numbers: [1, 2, 3, 1, 1, 3] },
  },
  execute: executeNumberOfGoodPairs,
  generateSteps: generateNumberOfGoodPairsSteps,
  educational: numberOfGoodPairsEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(definition);
