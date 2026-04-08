import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { containsDuplicateII } from "./sources/contains-duplicate-ii.ts?fn";
import { generateContainsDuplicateIISteps } from "./step-generator";
import type { ContainsDuplicateIIInput } from "./step-generator";
import { containsDuplicateIIEducational } from "./educational";

import typescriptSource from "./sources/contains-duplicate-ii.ts?raw";
import pythonSource from "./sources/contains-duplicate-ii.py?raw";
import javaSource from "./sources/ContainsDuplicateII.java?raw";
import rustSource from "./sources/contains-duplicate-ii.rs?raw";
import cppSource from "./sources/ContainsDuplicateII.cpp?raw";
import goSource from "./sources/contains-duplicate-ii.go?raw";

function executeContainsDuplicateII(input: ContainsDuplicateIIInput): boolean {
  return containsDuplicateII(input.numbers, input.maxDistance);
}

const containsDuplicateIIDefinition: AlgorithmDefinition<ContainsDuplicateIIInput> = {
  meta: {
    id: ALGORITHM_ID.CONTAINS_DUPLICATE_II!,
    name: "Contains Duplicate II",
    category: CATEGORY.HASH_MAPS!,
    technique: "lookup",
    description:
      "Detect whether two equal values appear within k index positions of each other in O(n) time using a hash map of value→lastSeenIndex",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(min(n, k))",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { numbers: [1, 2, 3, 1], maxDistance: 3 },
  },
  execute: executeContainsDuplicateII,
  generateSteps: generateContainsDuplicateIISteps,
  educational: containsDuplicateIIEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(containsDuplicateIIDefinition);
