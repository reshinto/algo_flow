import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { catalanNumber } from "./sources/catalan-numbers.ts?fn";
import { generateCatalanNumbersSteps } from "./step-generator";
import { catalanNumbersEducational } from "./educational";

import typescriptSource from "./sources/catalan-numbers.ts?raw";
import pythonSource from "./sources/catalan-numbers.py?raw";
import javaSource from "./sources/CatalanNumbers.java?raw";
import rustSource from "./sources/catalan-numbers.rs?raw";
import cppSource from "./sources/CatalanNumbers.cpp?raw";
import goSource from "./sources/catalan-numbers.go?raw";

interface CatalanInput {
  targetIndex: number;
}

const catalanNumbersDefinition: AlgorithmDefinition<CatalanInput> = {
  meta: {
    id: ALGORITHM_ID.CATALAN_NUMBERS!,
    name: "Catalan Numbers (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "counting",
    description:
      "A bottom-up dynamic programming approach that computes the n-th Catalan number by summing products of all left-right sub-structure pairs in a DP table",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { targetIndex: 8 },
  },
  execute: (input: CatalanInput) => catalanNumber(input.targetIndex),
  generateSteps: generateCatalanNumbersSteps,
  educational: catalanNumbersEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(catalanNumbersDefinition);
