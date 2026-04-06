import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { expressionTreeEvaluation } from "./sources/expression-tree-evaluation.ts?fn";
import { generateExpressionTreeEvaluationSteps } from "./step-generator";
import type { ExpressionTreeEvaluationInput } from "./step-generator";
import { expressionTreeEvaluationEducational } from "./educational";

import typescriptSource from "./sources/expression-tree-evaluation.ts?raw";
import pythonSource from "./sources/expression-tree-evaluation.py?raw";
import javaSource from "./sources/ExpressionTreeEvaluation.java?raw";

function executeExpressionTreeEvaluation(input: ExpressionTreeEvaluationInput): number {
  return expressionTreeEvaluation(input.expression) as number;
}

const expressionTreeEvaluationDefinition: AlgorithmDefinition<ExpressionTreeEvaluationInput> = {
  meta: {
    id: ALGORITHM_ID.EXPRESSION_TREE_EVALUATION!,
    name: "Expression Tree Evaluation",
    category: CATEGORY.TREES!,
    technique: "advanced",
    description:
      "Build an expression tree from a postfix expression then evaluate bottom-up — leaves are operands, internal nodes are operators",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { expression: "3 4 + 2 * 7 /" },
  },
  execute: executeExpressionTreeEvaluation,
  generateSteps: generateExpressionTreeEvaluationSteps,
  educational: expressionTreeEvaluationEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(expressionTreeEvaluationDefinition);
