import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { buildFromPreorderInorderIterative } from "./sources/build-from-preorder-inorder-iterative.ts?fn";
import { generateBuildFromPreorderInorderIterativeSteps } from "./step-generator";
import type { BuildFromPreorderInorderIterativeInput } from "./step-generator";
import { buildFromPreorderInorderIterativeEducational } from "./educational";

import typescriptSource from "./sources/build-from-preorder-inorder-iterative.ts?raw";
import pythonSource from "./sources/build-from-preorder-inorder-iterative.py?raw";
import javaSource from "./sources/BuildFromPreorderInorderIterative.java?raw";
import rustSource from "./sources/build-from-preorder-inorder-iterative.rs?raw";
import cppSource from "./sources/BuildFromPreorderInorderIterative.cpp?raw";
import goSource from "./sources/build-from-preorder-inorder-iterative.go?raw";

function executeBuildFromPreorderInorderIterative(
  input: BuildFromPreorderInorderIterativeInput,
): number | null {
  const result = buildFromPreorderInorderIterative(input.preorder, input.inorder) as {
    value: number;
  } | null;
  return result ? result.value : null;
}

const buildFromPreorderInorderIterativeDefinition: AlgorithmDefinition<BuildFromPreorderInorderIterativeInput> =
  {
    meta: {
      id: ALGORITHM_ID.BUILD_FROM_PREORDER_INORDER_ITERATIVE!,
      name: "Build Tree: Preorder + Inorder (Iterative)",
      category: CATEGORY.TREES!,
      technique: "construction",
      description:
        "Reconstructs a binary tree from preorder and inorder traversals using an explicit stack instead of recursion",
      timeComplexity: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
      },
      spaceComplexity: "O(n)",
      supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
      defaultInput: {
        preorder: [4, 2, 1, 3, 6, 5, 7],
        inorder: [1, 2, 3, 4, 5, 6, 7],
      },
    },
    execute: executeBuildFromPreorderInorderIterative,
    generateSteps: generateBuildFromPreorderInorderIterativeSteps,
    educational: buildFromPreorderInorderIterativeEducational,
    sources: {
      typescript: typescriptSource,
      python: pythonSource,
      java: javaSource,
      rust: rustSource,
      cpp: cppSource,
      go: goSource,
    },
  };

registry.register(buildFromPreorderInorderIterativeDefinition);
