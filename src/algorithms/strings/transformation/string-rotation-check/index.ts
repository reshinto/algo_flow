/** Registration entry for the String Rotation Check algorithm. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { stringRotationCheck } from "./sources/string-rotation-check.ts?fn";
import { generateStringRotationCheckSteps } from "./step-generator";
import type { StringRotationCheckInput } from "./step-generator";
import { stringRotationCheckEducational } from "./educational";

import typescriptSource from "./sources/string-rotation-check.ts?raw";
import pythonSource from "./sources/string-rotation-check.py?raw";
import javaSource from "./sources/StringRotationCheck.java?raw";
import rustSource from "./sources/string-rotation-check.rs?raw";
import cppSource from "./sources/StringRotationCheck.cpp?raw";
import goSource from "./sources/string-rotation-check.go?raw";

function executeStringRotationCheck(input: StringRotationCheckInput): boolean {
  return stringRotationCheck(input.text, input.pattern) as boolean;
}

const stringRotationCheckDefinition: AlgorithmDefinition<StringRotationCheckInput> = {
  meta: {
    id: ALGORITHM_ID.STRING_ROTATION_CHECK!,
    name: "String Rotation Check",
    category: CATEGORY.STRINGS!,
    technique: "transformation",
    description:
      "Check if one string is a rotation of another by searching for it as a substring of the doubled string in O(n) time",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "waterbottle", pattern: "erbottlewat" },
  },
  execute: executeStringRotationCheck,
  generateSteps: generateStringRotationCheckSteps,
  educational: stringRotationCheckEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(stringRotationCheckDefinition);
