import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { happyNumber } from "./sources/happy-number.ts?fn";
import { generateHappyNumberSteps, type HappyNumberInput } from "./step-generator";
import { happyNumberEducational } from "./educational";

import typescriptSource from "./sources/happy-number.ts?raw";
import pythonSource from "./sources/happy-number.py?raw";
import javaSource from "./sources/HappyNumber.java?raw";
import rustSource from "./sources/happy-number.rs?raw";
import cppSource from "./sources/HappyNumber.cpp?raw";
import goSource from "./sources/happy-number.go?raw";

function executeHappyNumber(input: HappyNumberInput): boolean {
  return happyNumber(input.number);
}

const happyNumberDefinition: AlgorithmDefinition<HappyNumberInput> = {
  meta: {
    id: ALGORITHM_ID.HAPPY_NUMBER!,
    name: "Happy Number",
    category: CATEGORY.HASH_MAPS!,
    technique: "tracking",
    description:
      "Determine if a number is happy by repeatedly summing digit squares, using a hash set to detect cycles",
    timeComplexity: {
      best: "O(log n)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { number: 19 },
  },
  execute: executeHappyNumber,
  generateSteps: generateHappyNumberSteps,
  educational: happyNumberEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(happyNumberDefinition);
