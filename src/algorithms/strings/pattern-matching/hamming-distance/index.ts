import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { hammingDistance } from "./sources/hamming-distance.ts?fn";
import { generateHammingDistanceSteps } from "./step-generator";
import type { HammingDistanceInput } from "./step-generator";
import { hammingDistanceEducational } from "./educational";

import typescriptSource from "./sources/hamming-distance.ts?raw";
import pythonSource from "./sources/hamming-distance.py?raw";
import javaSource from "./sources/HammingDistance.java?raw";

function executeHammingDistance(input: HammingDistanceInput): number {
  return hammingDistance(input.text, input.pattern) as number;
}

const hammingDistanceDefinition: AlgorithmDefinition<HammingDistanceInput> = {
  meta: {
    id: ALGORITHM_ID.HAMMING_DISTANCE!,
    name: "Hamming Distance",
    category: CATEGORY.STRINGS!,
    technique: "pattern-matching",
    description:
      "Count the number of positions where two equal-length strings differ in O(n) by scanning each character pair once",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "karolin", pattern: "kathrin" },
  },
  execute: executeHammingDistance,
  generateSteps: generateHammingDistanceSteps,
  educational: hammingDistanceEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(hammingDistanceDefinition);
