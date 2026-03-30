import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateMajorityElementSteps } from "./step-generator";
import type { MajorityElementInput } from "./step-generator";
import { majorityElementEducational } from "./educational";

import typescriptSource from "./sources/majority-element.ts?raw";
import pythonSource from "./sources/majority-element.py?raw";
import javaSource from "./sources/MajorityElement.java?raw";

function executeMajorityElement(input: MajorityElementInput): number {
  const { numbers } = input;
  const frequencyMap = new Map<number, number>();
  const threshold = Math.floor(numbers.length / 2);
  for (const currentNum of numbers) {
    const updatedCount = (frequencyMap.get(currentNum) ?? 0) + 1;
    frequencyMap.set(currentNum, updatedCount);
    if (updatedCount > threshold) return currentNum;
  }
  return -1;
}

const definition: AlgorithmDefinition<MajorityElementInput> = {
  meta: {
    id: ALGORITHM_ID.MAJORITY_ELEMENT!,
    name: "Majority Element",
    category: CATEGORY.HASH_MAPS!,
    technique: "counting",
    description:
      "Find the element appearing more than n/2 times by counting frequencies and checking against a threshold",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numbers: [2, 2, 1, 1, 1, 2, 2] },
  },
  execute: executeMajorityElement,
  generateSteps: generateMajorityElementSteps,
  educational: majorityElementEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(definition);
