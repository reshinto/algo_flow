/**
 * Dutch National Flag (3-Way Partition) registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { dutchNationalFlag } from "./sources/dutch-national-flag.ts?fn";
import { generateDutchNationalFlagSteps } from "./step-generator";
import { dutchNationalFlagEducational } from "./educational";

import typescriptSource from "./sources/dutch-national-flag.ts?raw";
import pythonSource from "./sources/dutch-national-flag.py?raw";
import javaSource from "./sources/DutchNationalFlag.java?raw";

interface DutchNationalFlagInput {
  inputArray: number[];
}

const dutchNationalFlagDefinition: AlgorithmDefinition<DutchNationalFlagInput> = {
  meta: {
    id: ALGORITHM_ID.DUTCH_NATIONAL_FLAG!,
    name: "Dutch National Flag (3-Way Partition)",
    category: CATEGORY.ARRAYS!,
    description:
      "An O(n) single-pass algorithm that sorts an array of 0s, 1s, and 2s using three pointers to maintain sorted regions simultaneously",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [2, 0, 1, 2, 1, 0, 0, 2, 1],
    },
  },
  execute: (input: DutchNationalFlagInput) => dutchNationalFlag(input.inputArray),
  generateSteps: generateDutchNationalFlagSteps,
  educational: dutchNationalFlagEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(dutchNationalFlagDefinition);
