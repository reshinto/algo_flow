/** Step generator for Infix to Postfix (Shunting-Yard) — produces ExecutionStep[] using ExpressionTracker. */

import type { ExecutionStep } from "@/types";
import { ExpressionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ITP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.INFIX_TO_POSTFIX!);

export interface InfixToPostfixInput {
  expression: string;
}

const OPERATOR_PRECEDENCE: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2 };

function tokenize(expression: string): string[] {
  return expression.match(/[A-Za-z0-9]+|[+\-*/()]/g) ?? [];
}

export function generateInfixToPostfixSteps(input: InfixToPostfixInput): ExecutionStep[] {
  const { expression } = input;
  const tokens = tokenize(expression);
  const tracker = new ExpressionTracker(tokens, ITP_LINE_MAP);
  const operatorStack: string[] = [];

  tracker.initialize({ expression, tokens });

  for (let tokenIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
    const currentToken = tokens[tokenIdx]!;

    tracker.processToken(tokenIdx, {
      tokenIdx,
      currentToken,
      operatorStack: [...operatorStack],
    });

    if (/^[A-Za-z0-9]+$/.test(currentToken)) {
      // Operand — goes directly to output
      tracker.outputToken(currentToken, {
        tokenIdx,
        currentToken,
        action: "operand to output",
        operatorStack: [...operatorStack],
      });
    } else if (currentToken in OPERATOR_PRECEDENCE) {
      // Pop operators with higher or equal precedence to output
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "(" &&
        (OPERATOR_PRECEDENCE[operatorStack[operatorStack.length - 1]!] ?? 0) >=
          (OPERATOR_PRECEDENCE[currentToken] ?? 0)
      ) {
        const stackTop = operatorStack[operatorStack.length - 1]!;
        tracker.popToOutput(
          {
            tokenIdx,
            currentToken,
            poppedOperator: stackTop,
            reason: "higher or equal precedence",
            operatorStack: operatorStack.slice(0, -1),
          },
          `Pop '${stackTop}' to output — precedence >= '${currentToken}'`,
        );
        operatorStack.pop();
      }
      // Push current operator onto the stack
      operatorStack.push(currentToken);
      tracker.pushOperator(currentToken, tokenIdx, {
        tokenIdx,
        currentToken,
        operatorStack: [...operatorStack],
      });
    } else if (currentToken === "(") {
      operatorStack.push(currentToken);
      tracker.pushOperator(currentToken, tokenIdx, {
        tokenIdx,
        currentToken,
        operatorStack: [...operatorStack],
      });
    } else if (currentToken === ")") {
      // Pop operators to output until the matching '(' is found
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
        const stackTop = operatorStack[operatorStack.length - 1]!;
        tracker.popToOutput(
          {
            tokenIdx,
            currentToken,
            poppedOperator: stackTop,
            reason: "closing paren — drain until '('",
            operatorStack: operatorStack.slice(0, -1),
          },
          `Pop '${stackTop}' to output — inside parentheses`,
        );
        operatorStack.pop();
      }
      // Discard the '('
      tracker.popOperator(
        {
          tokenIdx,
          currentToken,
          operatorStack: operatorStack.slice(0, -1),
        },
        "Discard '(' from stack",
      );
      operatorStack.pop();
    }
  }

  // Drain remaining operators from the stack to output
  while (operatorStack.length > 0) {
    const stackTop = operatorStack[operatorStack.length - 1]!;
    tracker.popToOutput(
      {
        poppedOperator: stackTop,
        reason: "drain remaining operators",
        operatorStack: operatorStack.slice(0, -1),
      },
      `Pop '${stackTop}' to output — end of expression`,
    );
    operatorStack.pop();
  }

  // Compute the postfix result by replaying the pure shunting-yard logic
  const outputQueue: string[] = [];
  const replayStack: string[] = [];
  for (const token of tokens) {
    if (/^[A-Za-z0-9]+$/.test(token)) {
      outputQueue.push(token);
    } else if (token in OPERATOR_PRECEDENCE) {
      while (
        replayStack.length > 0 &&
        replayStack[replayStack.length - 1] !== "(" &&
        (OPERATOR_PRECEDENCE[replayStack[replayStack.length - 1]!] ?? 0) >=
          (OPERATOR_PRECEDENCE[token] ?? 0)
      ) {
        outputQueue.push(replayStack.pop()!);
      }
      replayStack.push(token);
    } else if (token === "(") {
      replayStack.push(token);
    } else if (token === ")") {
      while (replayStack.length > 0 && replayStack[replayStack.length - 1] !== "(") {
        outputQueue.push(replayStack.pop()!);
      }
      replayStack.pop();
    }
  }
  while (replayStack.length > 0) {
    outputQueue.push(replayStack.pop()!);
  }
  const finalPostfix = outputQueue.join(" ");

  tracker.complete(finalPostfix, { postfix: finalPostfix });

  return tracker.getSteps();
}
