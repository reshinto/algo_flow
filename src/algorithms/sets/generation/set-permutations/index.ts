import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { setPermutations } from "./sources/set-permutations.ts?fn";
import { generateSetPermutationsSteps } from "./step-generator";
import type { SetPermutationsInput } from "./step-generator";
import { setPermutationsEducational } from "./educational";

import typescriptSource from "./sources/set-permutations.ts?raw";
import pythonSource from "./sources/set-permutations.py?raw";
import javaSource from "./sources/SetPermutations.java?raw";
import rustSource from "./sources/set-permutations.rs?raw";
import cppSource from "./sources/SetPermutations.cpp?raw";
import goSource from "./sources/set-permutations.go?raw";

function executeSetPermutations(input: SetPermutationsInput): number[][] {
  return setPermutations(input.elements) as number[][];
}

const setPermutationsDefinition: AlgorithmDefinition<SetPermutationsInput> = {
  meta: {
    id: ALGORITHM_ID.SET_PERMUTATIONS!,
    name: "Set Permutations",
    category: CATEGORY.SETS!,
    technique: "generation",
    description:
      "Generate all n! orderings of a set using backtracking with in-place swaps in O(n × n!) time",
    timeComplexity: {
      best: "O(n × n!)",
      average: "O(n × n!)",
      worst: "O(n × n!)",
    },
    spaceComplexity: "O(n × n!)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { elements: [1, 2, 3] },
  },
  execute: executeSetPermutations,
  generateSteps: generateSetPermutationsSteps,
  educational: setPermutationsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(setPermutationsDefinition);
