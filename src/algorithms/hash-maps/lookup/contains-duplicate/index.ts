import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { containsDuplicate } from "./sources/contains-duplicate.ts?fn";
import { generateContainsDuplicateSteps } from "./step-generator";
import type { ContainsDuplicateInput } from "./step-generator";
import { containsDuplicateEducational } from "./educational";

import typescriptSource from "./sources/contains-duplicate.ts?raw";
import pythonSource from "./sources/contains-duplicate.py?raw";
import javaSource from "./sources/ContainsDuplicate.java?raw";
import rustSource from "./sources/contains-duplicate.rs?raw";
import cppSource from "./sources/ContainsDuplicate.cpp?raw";
import goSource from "./sources/contains-duplicate.go?raw";

function executeContainsDuplicate(input: ContainsDuplicateInput): boolean {
  return containsDuplicate(input.numbers);
}

const containsDuplicateDefinition: AlgorithmDefinition<ContainsDuplicateInput> = {
  meta: {
    id: ALGORITHM_ID.CONTAINS_DUPLICATE!,
    name: "Contains Duplicate",
    category: CATEGORY.HASH_MAPS!,
    technique: "lookup",
    description:
      "Detect whether any value appears more than once in O(n) time using a hash set for O(1) membership checks",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { numbers: [1, 2, 3, 1] },
  },
  execute: executeContainsDuplicate,
  generateSteps: generateContainsDuplicateSteps,
  educational: containsDuplicateEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(containsDuplicateDefinition);
