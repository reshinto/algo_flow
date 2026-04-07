import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { buildFromPostorderInorderIterative } from "./sources/build-from-postorder-inorder-iterative.ts?fn";
import { generateBuildFromPostorderInorderIterativeSteps } from "./step-generator";
import type { BuildFromPostorderInorderIterativeInput } from "./step-generator";
import { buildFromPostorderInorderIterativeEducational } from "./educational";

import typescriptSource from "./sources/build-from-postorder-inorder-iterative.ts?raw";
import pythonSource from "./sources/build-from-postorder-inorder-iterative.py?raw";
import javaSource from "./sources/BuildFromPostorderInorderIterative.java?raw";
import rustSource from "./sources/build-from-postorder-inorder-iterative.rs?raw";
import cppSource from "./sources/BuildFromPostorderInorderIterative.cpp?raw";
import goSource from "./sources/build-from-postorder-inorder-iterative.go?raw";

function executeBuildFromPostorderInorderIterative(
  input: BuildFromPostorderInorderIterativeInput,
): number | null {
  const result = buildFromPostorderInorderIterative(input.postorder, input.inorder) as {
    value: number;
  } | null;
  return result ? result.value : null;
}

const buildFromPostorderInorderIterativeDefinition: AlgorithmDefinition<BuildFromPostorderInorderIterativeInput> =
  {
    meta: {
      id: ALGORITHM_ID.BUILD_FROM_POSTORDER_INORDER_ITERATIVE!,
      name: "Build Tree: Postorder + Inorder (Iterative)",
      category: CATEGORY.TREES!,
      technique: "construction",
      description:
        "Reconstructs a binary tree from postorder and inorder traversals using an explicit stack, processing both sequences right-to-left",
      timeComplexity: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
      },
      spaceComplexity: "O(n)",
      supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
      defaultInput: {
        postorder: [1, 3, 2, 5, 7, 6, 4],
        inorder: [1, 2, 3, 4, 5, 6, 7],
      },
    },
    execute: executeBuildFromPostorderInorderIterative,
    generateSteps: generateBuildFromPostorderInorderIterativeSteps,
    educational: buildFromPostorderInorderIterativeEducational,
    sources: {
      typescript: typescriptSource,
      python: pythonSource,
      java: javaSource,
      rust: rustSource,
      cpp: cppSource,
      go: goSource,
    },
  };

registry.register(buildFromPostorderInorderIterativeDefinition);
