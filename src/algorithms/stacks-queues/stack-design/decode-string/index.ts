import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { decodeString } from "./sources/decode-string.ts?fn";
import { generateDecodeStringSteps } from "./step-generator";
import type { DecodeStringInput } from "./step-generator";
import { decodeStringEducational } from "./educational";

import typescriptSource from "./sources/decode-string.ts?raw";
import pythonSource from "./sources/decode-string.py?raw";
import javaSource from "./sources/DecodeString.java?raw";

function executeDecodeString(input: DecodeStringInput): string {
  return decodeString(input.inputString) as string;
}

const decodeStringDefinition: AlgorithmDefinition<DecodeStringInput> = {
  meta: {
    id: ALGORITHM_ID.DECODE_STRING!,
    name: "Decode String",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "stack-design",
    description:
      "Use a stack to decode run-length encoded strings like '3[a2[c]]' → 'accaccacc', handling arbitrary nesting depth",
    timeComplexity: {
      best: "O(n)",
      average: "O(n*k)",
      worst: "O(n*k)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { inputString: "3[a2[c]]" },
  },
  execute: executeDecodeString,
  generateSteps: generateDecodeStringSteps,
  educational: decodeStringEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(decodeStringDefinition);
