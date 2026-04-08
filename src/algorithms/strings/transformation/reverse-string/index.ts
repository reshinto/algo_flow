import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { reverseString } from "./sources/reverse-string.ts?fn";
import { generateReverseStringSteps } from "./step-generator";
import type { ReverseStringInput } from "./step-generator";
import { reverseStringEducational } from "./educational";

import typescriptSource from "./sources/reverse-string.ts?raw";
import pythonSource from "./sources/reverse-string.py?raw";
import javaSource from "./sources/ReverseString.java?raw";
import rustSource from "./sources/reverse-string.rs?raw";
import cppSource from "./sources/ReverseString.cpp?raw";
import goSource from "./sources/reverse-string.go?raw";

function executeReverseString(input: ReverseStringInput): string {
  return reverseString(input.text) as string;
}

const reverseStringDefinition: AlgorithmDefinition<ReverseStringInput> = {
  meta: {
    id: ALGORITHM_ID.REVERSE_STRING!,
    name: "Reverse String",
    category: CATEGORY.STRINGS!,
    technique: "transformation",
    description:
      "Reverse a string in-place using a two-pointer swap, moving from both ends toward the center in O(n) time",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "hello" },
  },
  execute: executeReverseString,
  generateSteps: generateReverseStringSteps,
  educational: reverseStringEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(reverseStringDefinition);
