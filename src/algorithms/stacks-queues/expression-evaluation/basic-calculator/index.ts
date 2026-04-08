import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { basicCalculator } from "./sources/basic-calculator.ts?fn";
import { generateBasicCalculatorSteps } from "./step-generator";
import type { BasicCalculatorInput } from "./step-generator";
import { basicCalculatorEducational } from "./educational";

import typescriptSource from "./sources/basic-calculator.ts?raw";
import pythonSource from "./sources/basic-calculator.py?raw";
import javaSource from "./sources/BasicCalculator.java?raw";
import rustSource from "./sources/basic-calculator.rs?raw";
import cppSource from "./sources/BasicCalculator.cpp?raw";
import goSource from "./sources/basic-calculator.go?raw";

function executeBasicCalculator(input: BasicCalculatorInput): number {
  return basicCalculator(input.expression) as number;
}

const basicCalculatorDefinition: AlgorithmDefinition<BasicCalculatorInput> = {
  meta: {
    id: ALGORITHM_ID.BASIC_CALCULATOR!,
    name: "Basic Calculator",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "expression-evaluation",
    description:
      "Evaluate a simple expression string with +, -, (, ) using a stack to propagate signs across nested parentheses",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { expression: "1 + (2 - 3)" },
  },
  execute: executeBasicCalculator,
  generateSteps: generateBasicCalculatorSteps,
  educational: basicCalculatorEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(basicCalculatorDefinition);
