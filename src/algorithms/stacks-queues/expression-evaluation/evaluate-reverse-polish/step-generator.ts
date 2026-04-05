/** Step generator for Evaluate Reverse Polish Notation — produces ExecutionStep[] using ExpressionTracker. */

import type { ExecutionStep } from "@/types";
import { ExpressionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ERP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.EVALUATE_REVERSE_POLISH!);

export interface EvaluateReversePolishInput {
  tokens: string[];
}

const OPERATORS = new Set(["+", "-", "*", "/"]);

function computeResult(operandA: number, operator: string, operandB: number): number {
  if (operator === "+") return operandA + operandB;
  if (operator === "-") return operandA - operandB;
  if (operator === "*") return operandA * operandB;
  return Math.trunc(operandA / operandB);
}

export function generateEvaluateReversePolishSteps(
  input: EvaluateReversePolishInput,
): ExecutionStep[] {
  const { tokens } = input;
  const tracker = new ExpressionTracker(tokens, ERP_LINE_MAP);
  const operandStack: number[] = [];

  tracker.initialize({ tokens });

  for (let tokenIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
    const currentToken = tokens[tokenIdx]!;

    tracker.processToken(tokenIdx, { tokenIdx, currentToken, stack: [...operandStack] });

    if (OPERATORS.has(currentToken)) {
      const operandB = operandStack.pop()!;
      const operandA = operandStack.pop()!;
      const result = computeResult(operandA, currentToken, operandB);
      operandStack.push(result);

      // Push operator visually so popAndEvaluate can pop operator + two operands = 3 total
      tracker.pushOperator(currentToken, tokenIdx, {
        tokenIdx,
        currentToken,
        operandA,
        operandB,
        stack: [operandA, operandB, currentToken],
      });

      tracker.popAndEvaluate(currentToken, String(operandA), String(operandB), String(result), {
        tokenIdx,
        currentToken,
        operandA,
        operandB,
        result,
        stack: [...operandStack],
      });
    } else {
      const operandValue = parseInt(currentToken, 10);
      operandStack.push(operandValue);

      tracker.pushOperand(currentToken, tokenIdx, {
        tokenIdx,
        currentToken,
        operandValue,
        stack: [...operandStack],
      });
    }
  }

  const finalResult = operandStack[0] ?? 0;
  tracker.complete(String(finalResult), { result: finalResult });

  return tracker.getSteps();
}
