import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { canJump } from "./sources/can-jump.ts?fn";
import { generateCanJumpSteps } from "./step-generator";
import { canJumpEducational } from "./educational";

import typescriptSource from "./sources/can-jump.ts?raw";
import pythonSource from "./sources/can-jump.py?raw";
import javaSource from "./sources/CanJump.java?raw";

export interface CanJumpInput {
  nums: number[];
}

const canJumpDefinition: AlgorithmDefinition<CanJumpInput> = {
  meta: {
    id: ALGORITHM_ID.CAN_JUMP!,
    name: "Can Jump (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "subsequence",
    description:
      "A bottom-up dynamic programming approach that determines whether the last index is reachable from index 0, given each element's maximum jump length",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { nums: [2, 3, 1, 1, 4] },
  },
  execute: (input: CanJumpInput) => canJump(input.nums),
  generateSteps: generateCanJumpSteps,
  educational: canJumpEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(canJumpDefinition);
