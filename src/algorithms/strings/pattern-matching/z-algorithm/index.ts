import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { zAlgorithm } from "./sources/z-algorithm.ts?fn";
import { generateZAlgorithmSteps } from "./step-generator";
import type { ZAlgorithmInput } from "./step-generator";
import { zAlgorithmEducational } from "./educational";

import typescriptSource from "./sources/z-algorithm.ts?raw";
import pythonSource from "./sources/z-algorithm.py?raw";
import javaSource from "./sources/ZAlgorithm.java?raw";
import rustSource from "./sources/z-algorithm.rs?raw";
import cppSource from "./sources/ZAlgorithm.cpp?raw";
import goSource from "./sources/z-algorithm.go?raw";

function executeZAlgorithm(input: ZAlgorithmInput): number {
  return zAlgorithm(input.text, input.pattern) as number;
}

const zAlgorithmDefinition: AlgorithmDefinition<ZAlgorithmInput> = {
  meta: {
    id: ALGORITHM_ID.Z_ALGORITHM!,
    name: "Z-Algorithm",
    category: CATEGORY.STRINGS!,
    technique: "pattern-matching",
    description:
      "Find the first occurrence of a pattern in text in O(n + m) using a Z-array that encodes prefix match lengths over the concatenated string",
    timeComplexity: {
      best: "O(m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(n + m)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "AABXAABXCAABXAABXAY", pattern: "AABXAAB" },
  },
  execute: executeZAlgorithm,
  generateSteps: generateZAlgorithmSteps,
  educational: zAlgorithmEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(zAlgorithmDefinition);
