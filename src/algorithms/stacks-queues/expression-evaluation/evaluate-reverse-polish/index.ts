import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { evaluateReversePolish } from "./sources/evaluate-reverse-polish.ts?fn";
import { generateEvaluateReversePolishSteps } from "./step-generator";
import type { EvaluateReversePolishInput } from "./step-generator";
import { evaluateReversePolishEducational } from "./educational";

import typescriptSource from "./sources/evaluate-reverse-polish.ts?raw";
import pythonSource from "./sources/evaluate-reverse-polish.py?raw";
import javaSource from "./sources/EvaluateReversePolish.java?raw";

function executeEvaluateReversePolish(input: EvaluateReversePolishInput): number {
  return evaluateReversePolish(input.tokens) as number;
}

const evaluateReversePolishDefinition: AlgorithmDefinition<EvaluateReversePolishInput> = {
  meta: {
    id: ALGORITHM_ID.EVALUATE_REVERSE_POLISH!,
    name: "Evaluate Reverse Polish",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "expression-evaluation",
    description:
      "Evaluate a postfix expression using an operand stack — push numbers, pop two and compute on each operator",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { tokens: ["2", "1", "+", "3", "*"] },
  },
  execute: executeEvaluateReversePolish,
  generateSteps: generateEvaluateReversePolishSteps,
  educational: evaluateReversePolishEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(evaluateReversePolishDefinition);
