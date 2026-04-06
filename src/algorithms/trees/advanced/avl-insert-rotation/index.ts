import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { avlInsertRotation } from "./sources/avl-insert-rotation.ts?fn";
import { generateAvlInsertRotationSteps } from "./step-generator";
import type { AvlInsertRotationInput } from "./step-generator";
import { avlInsertRotationEducational } from "./educational";

import typescriptSource from "./sources/avl-insert-rotation.ts?raw";
import pythonSource from "./sources/avl-insert-rotation.py?raw";
import javaSource from "./sources/AVLInsertRotation.java?raw";

function executeAvlInsertRotation(input: AvlInsertRotationInput): number[] {
  return avlInsertRotation(input.values) as number[];
}

const avlInsertRotationDefinition: AlgorithmDefinition<AvlInsertRotationInput> = {
  meta: {
    id: ALGORITHM_ID.AVL_INSERT_ROTATION!,
    name: "AVL Insert & Rotation",
    category: CATEGORY.TREES!,
    technique: "advanced",
    description:
      "Insert values into a self-balancing AVL tree, demonstrating LL/RR/LR/RL rotations that maintain O(log n) height",
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { values: [10, 20, 30, 25, 28, 27] },
  },
  execute: executeAvlInsertRotation,
  generateSteps: generateAvlInsertRotationSteps,
  educational: avlInsertRotationEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(avlInsertRotationDefinition);
