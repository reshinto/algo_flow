import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { uglyNumberIi } from "./sources/ugly-number-ii.ts?fn";
import { generateUglyNumberIiSteps } from "./step-generator";
import type { UglyNumberIiInput } from "./step-generator";
import { uglyNumberIiEducational } from "./educational";

import typescriptSource from "./sources/ugly-number-ii.ts?raw";
import pythonSource from "./sources/ugly-number-ii.py?raw";
import javaSource from "./sources/UglyNumberIi.java?raw";
import rustSource from "./sources/ugly-number-ii.rs?raw";
import cppSource from "./sources/UglyNumberIi.cpp?raw";
import goSource from "./sources/ugly-number-ii.go?raw";

function executeUglyNumberIi(input: UglyNumberIiInput): number {
  return uglyNumberIi(input.nthPosition) as number;
}

const uglyNumberIiDefinition: AlgorithmDefinition<UglyNumberIiInput> = {
  meta: {
    id: ALGORITHM_ID.UGLY_NUMBER_II!,
    name: "Ugly Number II",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Find the nth ugly number (only prime factors 2, 3, 5) by repeatedly extracting the minimum from a min-heap and generating candidates",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nthPosition: 10 },
  },
  execute: executeUglyNumberIi,
  generateSteps: generateUglyNumberIiSteps,
  educational: uglyNumberIiEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(uglyNumberIiDefinition);
