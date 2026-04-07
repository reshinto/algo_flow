/** Registry entry for String to Integer (atoi) — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { stringToInteger } from "./sources/string-to-integer.ts?fn";
import { generateStringToIntegerSteps } from "./step-generator";
import type { StringToIntegerInput } from "./step-generator";
import { stringToIntegerEducational } from "./educational";

import typescriptSource from "./sources/string-to-integer.ts?raw";
import pythonSource from "./sources/string-to-integer.py?raw";
import javaSource from "./sources/StringToInteger.java?raw";
import rustSource from "./sources/string-to-integer.rs?raw";
import cppSource from "./sources/StringToInteger.cpp?raw";
import goSource from "./sources/string-to-integer.go?raw";

function executeStringToInteger(input: StringToIntegerInput): number {
  return stringToInteger(input.text) as number;
}

const stringToIntegerDefinition: AlgorithmDefinition<StringToIntegerInput> = {
  meta: {
    id: ALGORITHM_ID.STRING_TO_INTEGER!,
    name: "String to Integer (atoi)",
    category: CATEGORY.STRINGS!,
    technique: "transformation",
    description:
      "Parse an integer from a string by skipping whitespace, reading an optional sign, consuming digits, and clamping to 32-bit range in O(n) time",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "   -42" },
  },
  execute: executeStringToInteger,
  generateSteps: generateStringToIntegerSteps,
  educational: stringToIntegerEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(stringToIntegerDefinition);
