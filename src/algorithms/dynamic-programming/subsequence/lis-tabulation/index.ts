import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { lisLength } from "./sources/lis-tabulation.ts?fn";
import { generateLISTabulationSteps } from "./step-generator";
import { lisTabulationEducational } from "./educational";

import typescriptSource from "./sources/lis-tabulation.ts?raw";
import pythonSource from "./sources/lis-tabulation.py?raw";
import javaSource from "./sources/LisTabulation.java?raw";

interface LISInput {
  sequence: number[];
}

const lisTabulationDefinition: AlgorithmDefinition<LISInput> = {
  meta: {
    id: ALGORITHM_ID.LIS_TABULATION!,
    name: "Longest Increasing Subsequence (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "subsequence",
    description:
      "A bottom-up dynamic programming approach that computes the length of the longest strictly increasing subsequence using an O(n²) scan-back recurrence",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { sequence: [10, 9, 2, 5, 3, 7, 101, 18] },
  },
  execute: (input: LISInput) => lisLength(input.sequence),
  generateSteps: generateLISTabulationSteps,
  educational: lisTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(lisTabulationDefinition);
