import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minimumJumps } from "./sources/minimum-jumps.ts?fn";
import { generateMinimumJumpsSteps } from "./step-generator";
import { minimumJumpsEducational } from "./educational";

import typescriptSource from "./sources/minimum-jumps.ts?raw";
import pythonSource from "./sources/minimum-jumps.py?raw";
import javaSource from "./sources/MinimumJumps.java?raw";

interface MinimumJumpsInput {
  jumps: number[];
}

const minimumJumpsDefinition: AlgorithmDefinition<MinimumJumpsInput> = {
  meta: {
    id: ALGORITHM_ID.MINIMUM_JUMPS!,
    name: "Minimum Jumps (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    description:
      "A bottom-up dynamic programming approach that finds the minimum number of jumps needed to reach the last index, where each element defines the maximum jump length from that position",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { jumps: [2, 3, 1, 1, 4] },
  },
  execute: (input: MinimumJumpsInput) => minimumJumps(input.jumps),
  generateSteps: generateMinimumJumpsSteps,
  educational: minimumJumpsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(minimumJumpsDefinition);
