import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { infixToPostfix } from "./sources/infix-to-postfix.ts?fn";
import { generateInfixToPostfixSteps } from "./step-generator";
import type { InfixToPostfixInput } from "./step-generator";
import { infixToPostfixEducational } from "./educational";

import typescriptSource from "./sources/infix-to-postfix.ts?raw";
import pythonSource from "./sources/infix-to-postfix.py?raw";
import javaSource from "./sources/InfixToPostfix.java?raw";
import rustSource from "./sources/infix-to-postfix.rs?raw";
import cppSource from "./sources/InfixToPostfix.cpp?raw";
import goSource from "./sources/infix-to-postfix.go?raw";

function executeInfixToPostfix(input: InfixToPostfixInput): string {
  return infixToPostfix(input.expression) as string;
}

const infixToPostfixDefinition: AlgorithmDefinition<InfixToPostfixInput> = {
  meta: {
    id: ALGORITHM_ID.INFIX_TO_POSTFIX!,
    name: "Infix to Postfix",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "expression-evaluation",
    description:
      "Dijkstra's Shunting-Yard algorithm — convert infix expression to postfix (RPN) using an operator stack with precedence-based popping",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { expression: "a+b*(c-d)" },
  },
  execute: executeInfixToPostfix,
  generateSteps: generateInfixToPostfixSteps,
  educational: infixToPostfixEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(infixToPostfixDefinition);
