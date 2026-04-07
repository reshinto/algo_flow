import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { perfectSquares } from "./sources/perfect-squares.ts?fn";
import { generatePerfectSquaresSteps } from "./step-generator";
import { perfectSquaresEducational } from "./educational";

import typescriptSource from "./sources/perfect-squares.ts?raw";
import pythonSource from "./sources/perfect-squares.py?raw";
import javaSource from "./sources/PerfectSquares.java?raw";
import rustSource from "./sources/perfect-squares.rs?raw";
import cppSource from "./sources/PerfectSquares.cpp?raw";
import goSource from "./sources/perfect-squares.go?raw";

interface PerfectSquaresInput {
  targetNumber: number;
}

const perfectSquaresDefinition: AlgorithmDefinition<PerfectSquaresInput> = {
  meta: {
    id: ALGORITHM_ID.PERFECT_SQUARES!,
    name: "Perfect Squares (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "optimization",
    description:
      "A bottom-up dynamic programming approach that finds the minimum number of perfect square numbers summing to a target using a DP table",
    timeComplexity: {
      best: "O(n · √n)",
      average: "O(n · √n)",
      worst: "O(n · √n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { targetNumber: 12 },
  },
  execute: (input: PerfectSquaresInput) => perfectSquares(input.targetNumber),
  generateSteps: generatePerfectSquaresSteps,
  educational: perfectSquaresEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(perfectSquaresDefinition);
