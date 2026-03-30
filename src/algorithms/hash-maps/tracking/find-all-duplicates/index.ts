import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { CATEGORY } from "@/utils/constants";
import { generateFindAllDuplicatesSteps } from "./step-generator";
import type { FindAllDuplicatesInput } from "./step-generator";
import { findAllDuplicatesEducational } from "./educational";

import typescriptSource from "./sources/find-all-duplicates.ts?raw";
import pythonSource from "./sources/find-all-duplicates.py?raw";
import javaSource from "./sources/FindAllDuplicates.java?raw";

function executeFindAllDuplicates(input: FindAllDuplicatesInput): number[] {
  const seenSet = new Set<number>();
  const duplicates: number[] = [];
  for (const currentNum of input.numbers) {
    if (seenSet.has(currentNum)) duplicates.push(currentNum);
    else seenSet.add(currentNum);
  }
  return duplicates;
}

const definition: AlgorithmDefinition<FindAllDuplicatesInput> = {
  meta: {
    id: "find-all-duplicates-hashmap",
    name: "Find All Duplicates (Hash Map)",
    category: CATEGORY.HASH_MAPS!,
    technique: "tracking",
    description: "Find all elements appearing twice using a hash set",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numbers: [4, 3, 2, 7, 8, 2, 3, 1] },
  },
  execute: executeFindAllDuplicates,
  generateSteps: generateFindAllDuplicatesSteps,
  educational: findAllDuplicatesEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(definition);
