import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { buildFromLevelOrder } from "./sources/build-from-level-order.ts?fn";
import { generateBuildFromLevelOrderSteps } from "./step-generator";
import type { BuildFromLevelOrderInput } from "./step-generator";
import { buildFromLevelOrderEducational } from "./educational";

import typescriptSource from "./sources/build-from-level-order.ts?raw";
import pythonSource from "./sources/build-from-level-order.py?raw";
import javaSource from "./sources/BuildFromLevelOrder.java?raw";

function executeBuildFromLevelOrder(input: BuildFromLevelOrderInput): number | null {
  const result = buildFromLevelOrder(input.levelOrder) as { value: number } | null;
  return result ? result.value : null;
}

const buildFromLevelOrderDefinition: AlgorithmDefinition<BuildFromLevelOrderInput> = {
  meta: {
    id: ALGORITHM_ID.BUILD_FROM_LEVEL_ORDER!,
    name: "Build BST from Level-Order",
    category: CATEGORY.TREES!,
    technique: "construction",
    description:
      "Constructs a Binary Search Tree by inserting level-order values one by one using standard BST insertion",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      levelOrder: [4, 2, 6, 1, 3, 5, 7],
    },
  },
  execute: executeBuildFromLevelOrder,
  generateSteps: generateBuildFromLevelOrderSteps,
  educational: buildFromLevelOrderEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(buildFromLevelOrderDefinition);
