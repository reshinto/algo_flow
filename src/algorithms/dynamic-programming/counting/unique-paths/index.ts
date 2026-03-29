import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { uniquePaths } from "./sources/unique-paths.ts?fn";
import { generateUniquePathsSteps } from "./step-generator";
import { uniquePathsEducational } from "./educational";

import typescriptSource from "./sources/unique-paths.ts?raw";
import pythonSource from "./sources/unique-paths.py?raw";
import javaSource from "./sources/UniquePaths.java?raw";

export interface UniquePathsInput {
  rows: number;
  columns: number;
}

const uniquePathsDefinition: AlgorithmDefinition<UniquePathsInput> = {
  meta: {
    id: ALGORITHM_ID.UNIQUE_PATHS!,
    name: "Unique Paths (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "counting",
    description:
      "A bottom-up dynamic programming approach that counts distinct paths from the top-left to the bottom-right of a grid using a space-optimized 1-D rolling array",
    timeComplexity: {
      best: "O(rows × columns)",
      average: "O(rows × columns)",
      worst: "O(rows × columns)",
    },
    spaceComplexity: "O(columns)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { rows: 3, columns: 7 },
  },
  execute: (input: UniquePathsInput) => uniquePaths(input.rows, input.columns),
  generateSteps: generateUniquePathsSteps,
  educational: uniquePathsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(uniquePathsDefinition);
