import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { decodeWaysTabulation } from "./sources/decode-ways-tabulation.ts?fn";
import { generateDecodeWaysTabulationSteps } from "./step-generator";
import { decodeWaysTabulationEducational } from "./educational";

import typescriptSource from "./sources/decode-ways-tabulation.ts?raw";
import pythonSource from "./sources/decode-ways-tabulation.py?raw";
import javaSource from "./sources/DecodeWaysTabulation.java?raw";

interface DecodeWaysInput {
  digits: string;
}

const decodeWaysTabulationDefinition: AlgorithmDefinition<DecodeWaysInput> = {
  meta: {
    id: ALGORITHM_ID.DECODE_WAYS_TABULATION!,
    name: "Decode Ways (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A bottom-up dynamic programming approach to count the number of ways to decode a digit string into letters, where A=1, B=2, …, Z=26",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { digits: "12321" },
  },
  execute: (input: DecodeWaysInput) => decodeWaysTabulation(input.digits),
  generateSteps: generateDecodeWaysTabulationSteps,
  educational: decodeWaysTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(decodeWaysTabulationDefinition);
