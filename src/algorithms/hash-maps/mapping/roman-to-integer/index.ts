import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { romanToInteger } from "./sources/roman-to-integer.ts?fn";
import { generateRomanToIntegerSteps } from "./step-generator";
import type { RomanToIntegerInput } from "./step-generator";
import { romanToIntegerEducational } from "./educational";

import typescriptSource from "./sources/roman-to-integer.ts?raw";
import pythonSource from "./sources/roman-to-integer.py?raw";
import javaSource from "./sources/RomanToInteger.java?raw";

function executeRomanToInteger(input: RomanToIntegerInput): number {
  return romanToInteger(input.text) as number;
}

const romanToIntegerDefinition: AlgorithmDefinition<RomanToIntegerInput> = {
  meta: {
    id: ALGORITHM_ID.ROMAN_TO_INTEGER!,
    name: "Roman to Integer",
    category: CATEGORY.HASH_MAPS!,
    technique: "mapping",
    description:
      "Convert a Roman numeral string to its integer value using a static 7-symbol lookup map and a single left-to-right pass with a subtraction rule",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "MCMXCIV" },
  },
  execute: executeRomanToInteger,
  generateSteps: generateRomanToIntegerSteps,
  educational: romanToIntegerEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(romanToIntegerDefinition);
