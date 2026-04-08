import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { reorganizeString } from "./sources/reorganize-string.ts?fn";
import { generateReorganizeStringSteps } from "./step-generator";
import type { ReorganizeStringInput } from "./step-generator";
import { reorganizeStringEducational } from "./educational";

import typescriptSource from "./sources/reorganize-string.ts?raw";
import pythonSource from "./sources/reorganize-string.py?raw";
import javaSource from "./sources/ReorganizeString.java?raw";
import rustSource from "./sources/reorganize-string.rs?raw";
import cppSource from "./sources/ReorganizeString.cpp?raw";
import goSource from "./sources/reorganize-string.go?raw";

function executeReorganizeString(input: ReorganizeStringInput): string {
  return reorganizeString(input.text) as string;
}

const reorganizeStringDefinition: AlgorithmDefinition<ReorganizeStringInput> = {
  meta: {
    id: ALGORITHM_ID.REORGANIZE_STRING!,
    name: "Reorganize String",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Rearrange a string so no two adjacent characters are the same using a greedy max-heap by frequency (LeetCode 767) — O(n log 26) ≈ O(n)",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log k)",
      worst: "O(n log k)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "aabbc" },
  },
  execute: executeReorganizeString,
  generateSteps: generateReorganizeStringSteps,
  educational: reorganizeStringEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(reorganizeStringDefinition);
