import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { fourSumII } from "./sources/four-sum-ii.ts?fn";
import { generateFourSumIISteps } from "./step-generator";
import type { FourSumIIInput } from "./step-generator";
import { fourSumIIEducational } from "./educational";

import typescriptSource from "./sources/four-sum-ii.ts?raw";
import pythonSource from "./sources/four-sum-ii.py?raw";
import javaSource from "./sources/FourSumII.java?raw";

function executeFourSumII(input: FourSumIIInput): number {
  return fourSumII(input.numsA, input.numsB, input.numsC, input.numsD) as number;
}

const fourSumIIDefinition: AlgorithmDefinition<FourSumIIInput> = {
  meta: {
    id: ALGORITHM_ID.FOUR_SUM_II!,
    name: "Four Sum II",
    category: CATEGORY.HASH_MAPS!,
    technique: "lookup",
    description:
      "Count zero-sum quadruples across four arrays in O(n²) using a two-phase hash map strategy",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n²)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      numsA: [1, 2],
      numsB: [-2, -1],
      numsC: [-1, 2],
      numsD: [0, 2],
    },
  },
  execute: executeFourSumII,
  generateSteps: generateFourSumIISteps,
  educational: fourSumIIEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(fourSumIIDefinition);
