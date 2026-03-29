import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { decodeWaysMemoization } from "./sources/decode-ways-memoization.ts?fn";
import { generateDecodeWaysMemoizationSteps } from "./step-generator";
import { decodeWaysMemoizationEducational } from "./educational";

import typescriptSource from "./sources/decode-ways-memoization.ts?raw";
import pythonSource from "./sources/decode-ways-memoization.py?raw";
import javaSource from "./sources/DecodeWaysMemoization.java?raw";

interface DecodeWaysInput {
  digits: string;
}

const decodeWaysMemoizationDefinition: AlgorithmDefinition<DecodeWaysInput> = {
  meta: {
    id: ALGORITHM_ID.DECODE_WAYS_MEMOIZATION!,
    name: "Decode Ways (Memoization)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    description:
      "A top-down dynamic programming approach that counts the number of ways to decode a digit string where each letter A–Z maps to '1'–'26'",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { digits: "12321" },
  },
  execute: (input: DecodeWaysInput) => decodeWaysMemoization(input.digits),
  generateSteps: generateDecodeWaysMemoizationSteps,
  educational: decodeWaysMemoizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(decodeWaysMemoizationDefinition);
