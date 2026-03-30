import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateMissingNumberSteps } from "./step-generator";
import type { MissingNumberInput } from "./step-generator";
import { missingNumberEducational } from "./educational";

import typescriptSource from "./sources/missing-number.ts?raw";
import pythonSource from "./sources/missing-number.py?raw";
import javaSource from "./sources/MissingNumber.java?raw";

function executeMissingNumber(input: MissingNumberInput): number {
  const numberSet = new Set(input.numbers);
  for (let checkValue = 0; checkValue <= input.numbers.length; checkValue++) {
    if (!numberSet.has(checkValue)) return checkValue;
  }
  return -1;
}

const definition: AlgorithmDefinition<MissingNumberInput> = {
  meta: {
    id: ALGORITHM_ID.MISSING_NUMBER!,
    name: "Missing Number",
    category: CATEGORY.HASH_MAPS!,
    technique: "tracking",
    description: "Find the missing number in range [0, n] using a hash set",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numbers: [3, 0, 1] },
  },
  execute: executeMissingNumber,
  generateSteps: generateMissingNumberSteps,
  educational: missingNumberEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(definition);
