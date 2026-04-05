/** Step generator for Basic Calculator — produces ExecutionStep[] using ExpressionTracker. */

import type { ExecutionStep } from "@/types";
import { ExpressionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BC_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BASIC_CALCULATOR!);

export interface BasicCalculatorInput {
  expression: string;
}

function tokenizeExpression(expression: string): string[] {
  return expression.match(/\d+|[+\-()]/g) ?? [];
}

export function generateBasicCalculatorSteps(input: BasicCalculatorInput): ExecutionStep[] {
  const { expression } = input;
  const tokens = tokenizeExpression(expression);
  const tracker = new ExpressionTracker(tokens, BC_LINE_MAP);

  const signStack: number[] = [];
  let runningTotal = 0;
  let currentSign = 1;

  tracker.initialize({ expression, runningTotal, currentSign, stackDepth: 0 });

  for (let tokenIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
    const currentToken = tokens[tokenIdx]!;

    tracker.processToken(tokenIdx, {
      tokenIdx,
      currentToken,
      runningTotal,
      currentSign,
      stackDepth: signStack.length / 2,
    });

    if (/^\d+$/.test(currentToken)) {
      const numericValue = parseInt(currentToken, 10);
      runningTotal += currentSign * numericValue;
      tracker.pushOperand(currentToken, tokenIdx, {
        tokenIdx,
        currentToken,
        numericValue,
        runningTotal,
        currentSign,
      });
    } else if (currentToken === "+") {
      currentSign = 1;
    } else if (currentToken === "-") {
      currentSign = -1;
    } else if (currentToken === "(") {
      signStack.push(runningTotal);
      signStack.push(currentSign);
      const savedTotal = runningTotal;
      const savedSign = currentSign;
      runningTotal = 0;
      currentSign = 1;
      tracker.pushOperator("(", tokenIdx, {
        tokenIdx,
        currentToken,
        savedTotal,
        savedSign,
        runningTotal,
        currentSign,
        stackDepth: signStack.length / 2,
      });
    } else if (currentToken === ")") {
      const poppedSign = signStack.pop()!;
      const prevTotal = signStack.pop()!;
      const subResult = runningTotal;
      runningTotal = prevTotal + poppedSign * subResult;
      tracker.popAndEvaluate(
        ")",
        String(poppedSign === 1 ? "+" : "-"),
        String(subResult),
        String(runningTotal),
        {
          tokenIdx,
          currentToken,
          poppedSign,
          prevTotal,
          subResult,
          runningTotal,
          stackDepth: signStack.length / 2,
        },
      );
    }
  }

  tracker.complete(String(runningTotal), { result: runningTotal });

  return tracker.getSteps();
}
