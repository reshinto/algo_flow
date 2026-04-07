import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { setComplement } from "./sources/set-complement.ts?fn";
import { generateSetComplementSteps } from "./step-generator";
import type { SetComplementInput } from "./step-generator";
import { setComplementEducational } from "./educational";

import typescriptSource from "./sources/set-complement.ts?raw";
import pythonSource from "./sources/set-complement.py?raw";
import javaSource from "./sources/SetComplement.java?raw";
import rustSource from "./sources/set-complement.rs?raw";
import cppSource from "./sources/SetComplement.cpp?raw";
import goSource from "./sources/set-complement.go?raw";

function executeSetComplement(input: SetComplementInput): number[] {
  return setComplement(input.arrayA, input.universalSet) as number[];
}

const setComplementDefinition: AlgorithmDefinition<SetComplementInput> = {
  meta: {
    id: ALGORITHM_ID.SET_COMPLEMENT!,
    name: "Set Complement",
    category: CATEGORY.SETS!,
    technique: "operations",
    description:
      "Find elements in a universal set U that are NOT in set A in O(n + u) by building a hash set from A and checking each element of U for membership",
    timeComplexity: {
      best: "O(n + u)",
      average: "O(n + u)",
      worst: "O(n + u)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { arrayA: [2, 4, 6], universalSet: [1, 2, 3, 4, 5, 6, 7, 8] },
  },
  execute: executeSetComplement,
  generateSteps: generateSetComplementSteps,
  educational: setComplementEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(setComplementDefinition);
