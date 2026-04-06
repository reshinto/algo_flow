import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { buildFromPostorderInorder } from "./sources/build-from-postorder-inorder.ts?fn";
import { generateBuildFromPostorderInorderSteps } from "./step-generator";
import type { BuildFromPostorderInorderInput } from "./step-generator";
import { buildFromPostorderInorderEducational } from "./educational";

import typescriptSource from "./sources/build-from-postorder-inorder.ts?raw";
import pythonSource from "./sources/build-from-postorder-inorder.py?raw";
import javaSource from "./sources/BuildFromPostorderInorder.java?raw";

function executeBuildFromPostorderInorder(input: BuildFromPostorderInorderInput): number | null {
  const result = buildFromPostorderInorder(input.postorder, input.inorder) as {
    value: number;
  } | null;
  return result ? result.value : null;
}

const buildFromPostorderInorderDefinition: AlgorithmDefinition<BuildFromPostorderInorderInput> = {
  meta: {
    id: ALGORITHM_ID.BUILD_FROM_POSTORDER_INORDER!,
    name: "Build Tree: Postorder + Inorder",
    category: CATEGORY.TREES!,
    technique: "construction",
    description:
      "Reconstructs a unique binary tree from its postorder and inorder traversal sequences using recursive divide-and-conquer",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      postorder: [1, 3, 2, 5, 7, 6, 4],
      inorder: [1, 2, 3, 4, 5, 6, 7],
    },
  },
  execute: executeBuildFromPostorderInorder,
  generateSteps: generateBuildFromPostorderInorderSteps,
  educational: buildFromPostorderInorderEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(buildFromPostorderInorderDefinition);
