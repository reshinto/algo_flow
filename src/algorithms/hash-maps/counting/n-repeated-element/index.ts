import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateNRepeatedElementSteps } from "./step-generator";
import type { NRepeatedElementInput } from "./step-generator";
import { nRepeatedElementEducational } from "./educational";

import typescriptSource from "./sources/n-repeated-element.ts?raw";
import pythonSource from "./sources/n-repeated-element.py?raw";
import javaSource from "./sources/NRepeatedElement.java?raw";
import rustSource from "./sources/n-repeated-element.rs?raw";
import cppSource from "./sources/NRepeatedElement.cpp?raw";
import goSource from "./sources/n-repeated-element.go?raw";

function executeNRepeatedElement(input: NRepeatedElementInput): number {
  const { numbers } = input;
  const frequencyMap = new Map<number, number>();
  const targetCount = numbers.length / 2;
  for (const currentNum of numbers) {
    const updatedCount = (frequencyMap.get(currentNum) ?? 0) + 1;
    frequencyMap.set(currentNum, updatedCount);
    if (updatedCount === targetCount) return currentNum;
  }
  return -1;
}

const definition: AlgorithmDefinition<NRepeatedElementInput> = {
  meta: {
    id: ALGORITHM_ID.N_REPEATED_ELEMENT!,
    name: "N-Repeated Element",
    category: CATEGORY.HASH_MAPS!,
    technique: "counting",
    description:
      "Find the element repeated n times in an array of size 2n with n+1 unique elements",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { numbers: [1, 2, 3, 3] },
  },
  execute: executeNRepeatedElement,
  generateSteps: generateNRepeatedElementSteps,
  educational: nRepeatedElementEducational,
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
