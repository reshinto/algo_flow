import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { countBits } from "./sources/count-bits.ts?fn";
import { generateCountBitsSteps } from "./step-generator";
import { countBitsEducational } from "./educational";

import typescriptSource from "./sources/count-bits.ts?raw";
import pythonSource from "./sources/count-bits.py?raw";
import javaSource from "./sources/CountBits.java?raw";
import rustSource from "./sources/count-bits.rs?raw";
import cppSource from "./sources/CountBits.cpp?raw";
import goSource from "./sources/count-bits.go?raw";

interface CountBitsInput {
  targetNumber: number;
}

const countBitsDefinition: AlgorithmDefinition<CountBitsInput> = {
  meta: {
    id: ALGORITHM_ID.COUNT_BITS!,
    name: "Count Bits (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A bottom-up dynamic programming approach that computes the number of 1-bits in every integer from 0 to n using a half-index bit manipulation recurrence",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { targetNumber: 15 },
  },
  execute: (input: CountBitsInput) => countBits(input.targetNumber),
  generateSteps: generateCountBitsSteps,
  educational: countBitsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(countBitsDefinition);
