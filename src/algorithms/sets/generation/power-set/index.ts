import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { powerSet } from "./sources/power-set.ts?fn";
import { generatePowerSetSteps } from "./step-generator";
import type { PowerSetInput } from "./step-generator";
import { powerSetEducational } from "./educational";

import typescriptSource from "./sources/power-set.ts?raw";
import pythonSource from "./sources/power-set.py?raw";
import javaSource from "./sources/PowerSet.java?raw";

function executePowerSet(input: PowerSetInput): number[][] {
  return powerSet(input.elements) as number[][];
}

const powerSetDefinition: AlgorithmDefinition<PowerSetInput> = {
  meta: {
    id: ALGORITHM_ID.POWER_SET!,
    name: "Power Set",
    category: CATEGORY.SETS!,
    technique: "generation",
    description:
      "Generate all 2^n subsets of a set using backtracking — for each element, choose to include or exclude it, recursing until all combinations are explored",
    timeComplexity: {
      best: "O(n × 2^n)",
      average: "O(n × 2^n)",
      worst: "O(n × 2^n)",
    },
    spaceComplexity: "O(n × 2^n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { elements: [1, 2, 3, 4] },
  },
  execute: executePowerSet,
  generateSteps: generatePowerSetSteps,
  educational: powerSetEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(powerSetDefinition);
