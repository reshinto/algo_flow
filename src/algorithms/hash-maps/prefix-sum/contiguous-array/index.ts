import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateContiguousArraySteps } from "./step-generator";
import type { ContiguousArrayInput } from "./step-generator";
import { contiguousArrayEducational } from "./educational";

import typescriptSource from "./sources/contiguous-array.ts?raw";
import pythonSource from "./sources/contiguous-array.py?raw";
import javaSource from "./sources/ContiguousArray.java?raw";

function executeContiguousArray(input: ContiguousArrayInput): number {
  const { numbers } = input;
  const prefixSumMap = new Map<number, number>();
  prefixSumMap.set(0, -1);
  let runningSum = 0;
  let maxLength = 0;
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    runningSum += numbers[elementIndex] === 0 ? -1 : 1;
    const previousIndex = prefixSumMap.get(runningSum);
    if (previousIndex !== undefined) {
      maxLength = Math.max(maxLength, elementIndex - previousIndex);
    } else {
      prefixSumMap.set(runningSum, elementIndex);
    }
  }
  return maxLength;
}

const definition: AlgorithmDefinition<ContiguousArrayInput> = {
  meta: {
    id: ALGORITHM_ID.CONTIGUOUS_ARRAY!,
    name: "Contiguous Array",
    category: CATEGORY.HASH_MAPS!,
    technique: "prefix-sum",
    description: "Find the longest subarray with equal 0s and 1s using prefix sum and hash map",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numbers: [0, 1, 0, 1, 1, 0] },
  },
  execute: executeContiguousArray,
  generateSteps: generateContiguousArraySteps,
  educational: contiguousArrayEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(definition);
