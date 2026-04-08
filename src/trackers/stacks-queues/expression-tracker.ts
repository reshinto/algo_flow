/**
 * Expression tracker — builds execution steps for expression parsing and
 * evaluation algorithms (evaluate RPN, basic calculator, infix-to-postfix).
 * Maintains token input, operator/operand stack, and output token stream.
 */
import type {
  StackElement,
  StackElementState,
  InputChar,
  InputCharState,
  OutputElement,
  OutputElementState,
  StackQueueVisualState,
} from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class ExpressionTracker extends BaseTracker {
  private stackElements: StackElement[] = [];
  private inputChars: InputChar[];
  private outputElements: OutputElement[] = [];
  private inputIndex: number = -1;
  private statusMessage: string | null = null;

  constructor(tokens: string[], lineMap: LineMap) {
    super(lineMap);
    this.inputChars = tokens.map((token) => ({
      value: token,
      state: "default" as InputCharState,
    }));
  }

  private snapshot(): StackQueueVisualState {
    return {
      kind: "stack-queue",
      stackElements: this.stackElements.map((element) => ({ ...element })),
      inputChars: this.inputChars.map((char) => ({ ...char })),
      inputIndex: this.inputIndex,
      statusMessage: this.statusMessage,
      outputElements: this.outputElements.map((element) => ({ ...element })),
    };
  }

  private setInputCharState(idx: number, state: InputCharState): void {
    const char = this.inputChars[idx];
    if (char) char.state = state;
  }

  private setStackTopState(state: StackElementState): void {
    const top = this.stackElements[this.stackElements.length - 1];
    if (top) top.state = state;
  }

  private setOutputTopState(state: OutputElementState): void {
    const top = this.outputElements[this.outputElements.length - 1];
    if (top) top.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize empty stack and prepare to process expression tokens",
      variables,
      visualState: this.snapshot(),
    });
  }

  processToken(idx: number, variables: Record<string, unknown>): void {
    this.inputIndex = idx;
    this.setInputCharState(idx, "current");
    const token = this.inputChars[idx];
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "visit",
      description: `Read token '${token?.value ?? ""}'`,
      variables,
      visualState: this.snapshot(),
    });
  }

  pushOperand(value: string, inputIdx: number, variables: Record<string, unknown>): void {
    this.stackElements.push({ value, state: "pushing" });
    this.setInputCharState(inputIdx, "processed");
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "push",
      description: `Push operand '${value}' onto the stack`,
      variables,
      visualState: this.snapshot(),
    });
    this.setStackTopState("default");
  }

  pushOperator(operator: string, inputIdx: number, variables: Record<string, unknown>): void {
    this.stackElements.push({ value: operator, state: "pushing" });
    this.setInputCharState(inputIdx, "processed");
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "push",
      description: `Push operator '${operator}' onto the stack`,
      variables,
      visualState: this.snapshot(),
    });
    this.setStackTopState("default");
  }

  popAndEvaluate(
    operator: string,
    operandA: string,
    operandB: string,
    result: string,
    variables: Record<string, unknown>,
  ): void {
    this.setStackTopState("popping");
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "evaluate",
      description: `Evaluate: ${operandA} ${operator} ${operandB} = ${result}`,
      variables,
      visualState: this.snapshot(),
    });
    // Pop operator and operands, push result
    this.stackElements.pop();
    this.stackElements.pop();
    this.stackElements.pop();
    this.stackElements.push({ value: result, state: "pushing" });
    this.pushStep({
      type: "push",
      description: `Push result '${result}' onto the stack`,
      variables,
      lineMapKey: "push-result",
      visualState: this.snapshot(),
    });
    this.setStackTopState("default");
  }

  popOperator(variables: Record<string, unknown>, description?: string): void {
    this.setStackTopState("popping");
    const popped = this.stackElements[this.stackElements.length - 1];
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "pop",
      description: description ?? `Pop operator '${popped?.value ?? ""}'`,
      variables,
      visualState: this.snapshot(),
    });
    this.stackElements.pop();
  }

  outputToken(token: string, variables: Record<string, unknown>, description?: string): void {
    this.outputElements.push({ value: token, state: "new" });
    this.pushStep({
      type: "output",
      description: description ?? `Output token '${token}'`,
      variables,
      visualState: this.snapshot(),
    });
    this.setOutputTopState("computed");
  }

  popToOutput(variables: Record<string, unknown>, description?: string): void {
    const popped = this.stackElements[this.stackElements.length - 1];
    this.setStackTopState("popping");
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    if (popped) {
      this.outputElements.push({ value: popped.value, state: "new" });
    }
    this.pushStep({
      type: "output",
      description: description ?? `Pop '${popped?.value ?? ""}' from stack to output`,
      variables,
      visualState: this.snapshot(),
    });
    this.stackElements.pop();
    this.setOutputTopState("computed");
  }

  complete(result: string, variables: Record<string, unknown>): void {
    this.statusMessage = `Result: ${result}`;
    this.inputIndex = -1;
    this.pushStep({
      type: "complete",
      description: `Expression evaluation complete — result: ${result}`,
      variables,
      visualState: this.snapshot(),
    });
  }
}
