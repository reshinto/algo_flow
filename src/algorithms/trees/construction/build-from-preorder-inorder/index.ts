import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { buildFromPreorderInorder } from "./sources/build-from-preorder-inorder.ts?fn";
import { generateBuildFromPreorderInorderSteps } from "./step-generator";
import type { BuildFromPreorderInorderInput } from "./step-generator";
import { buildFromPreorderInorderEducational } from "./educational";

import typescriptSource from "./sources/build-from-preorder-inorder.ts?raw";
import pythonSource from "./sources/build-from-preorder-inorder.py?raw";
import javaSource from "./sources/BuildFromPreorderInorder.java?raw";

/** Execute the pure algorithm and return the serialized root value or null */
function executeBuildFromPreorderInorder(input: BuildFromPreorderInorderInput): number | null {
  const result = buildFromPreorderInorder(input.preorder, input.inorder) as {
    value: number;
    left: unknown;
    right: unknown;
  } | null;
  return result ? result.value : null;
}

const buildFromPreorderInorderDefinition: AlgorithmDefinition<BuildFromPreorderInorderInput> = {
  meta: {
    id: ALGORITHM_ID.BUILD_FROM_PREORDER_INORDER!,
    name: "Build Tree: Preorder + Inorder",
    category: CATEGORY.TREES!,
    technique: "construction",
    description:
      "Reconstructs a unique binary tree from its preorder and inorder traversal sequences using recursive divide-and-conquer",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      preorder: [4, 2, 1, 3, 6, 5, 7],
      inorder: [1, 2, 3, 4, 5, 6, 7],
    },
  },
  execute: executeBuildFromPreorderInorder,
  generateSteps: generateBuildFromPreorderInorderSteps,
  educational: buildFromPreorderInorderEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(buildFromPreorderInorderDefinition);
