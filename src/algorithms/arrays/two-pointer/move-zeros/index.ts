/**
 * Move Zeros to End algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { moveZeros } from "./sources/move-zeros.ts?fn";
import { generateMoveZerosSteps } from "./step-generator";
import { moveZerosEducational } from "./educational";

import typescriptSource from "./sources/move-zeros.ts?raw";
import pythonSource from "./sources/move-zeros.py?raw";
import javaSource from "./sources/MoveZeros.java?raw";
import rustSource from "./sources/move-zeros.rs?raw";
import cppSource from "./sources/MoveZeros.cpp?raw";
import goSource from "./sources/move-zeros.go?raw";

interface MoveZerosInput {
  inputArray: number[];
}

const moveZerosDefinition: AlgorithmDefinition<MoveZerosInput> = {
  meta: {
    id: ALGORITHM_ID.MOVE_ZEROS!,
    name: "Move Zeros to End",
    category: CATEGORY.ARRAYS!,
    technique: "two-pointer",
    description:
      "An in-place two-pointer technique that moves all zeros to the end of the array while preserving the relative order of non-zero elements",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      inputArray: [0, 1, 0, 3, 12, 0, 5],
    },
  },
  execute: (input: MoveZerosInput) => moveZeros(input.inputArray),
  generateSteps: generateMoveZerosSteps,
  educational: moveZerosEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(moveZerosDefinition);
