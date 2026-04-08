import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { generateBinaryNumbers } from "./sources/generate-binary-numbers.ts?fn";
import { generateBinaryNumbersSteps } from "./step-generator";
import type { GenerateBinaryNumbersInput } from "./step-generator";
import { generateBinaryNumbersEducational } from "./educational";

import typescriptSource from "./sources/generate-binary-numbers.ts?raw";
import pythonSource from "./sources/generate-binary-numbers.py?raw";
import javaSource from "./sources/GenerateBinaryNumbers.java?raw";
import rustSource from "./sources/generate-binary-numbers.rs?raw";
import cppSource from "./sources/GenerateBinaryNumbers.cpp?raw";
import goSource from "./sources/generate-binary-numbers.go?raw";

function executeGenerateBinaryNumbers(input: GenerateBinaryNumbersInput): string[] {
  return generateBinaryNumbers(input.count) as string[];
}

const generateBinaryNumbersDefinition: AlgorithmDefinition<GenerateBinaryNumbersInput> = {
  meta: {
    id: ALGORITHM_ID.GENERATE_BINARY_NUMBERS!,
    name: "Generate Binary Numbers",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-applications",
    description:
      "Generate binary representations of 1 through N using a BFS-style queue — enqueue '1', then repeatedly dequeue and enqueue with '0' and '1' appended",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { count: 10 },
  },
  execute: executeGenerateBinaryNumbers,
  generateSteps: generateBinaryNumbersSteps,
  educational: generateBinaryNumbersEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(generateBinaryNumbersDefinition);
