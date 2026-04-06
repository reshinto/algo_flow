import { describe, it, expect } from "vitest";
import { expressionTreeEvaluation } from "./sources/expression-tree-evaluation.ts?fn";

describe("expressionTreeEvaluation", () => {
  it("evaluates default expression: 3 4 + 2 * 7 / = 2", () => {
    expect(expressionTreeEvaluation("3 4 + 2 * 7 /")).toBe(2);
  });

  it("evaluates simple addition", () => {
    expect(expressionTreeEvaluation("3 4 +")).toBe(7);
  });

  it("evaluates simple multiplication", () => {
    expect(expressionTreeEvaluation("5 6 *")).toBe(30);
  });

  it("evaluates subtraction", () => {
    expect(expressionTreeEvaluation("10 4 -")).toBe(6);
  });

  it("evaluates integer division (truncated)", () => {
    expect(expressionTreeEvaluation("7 2 /")).toBe(3);
  });

  it("evaluates nested expression: 2 3 * 4 5 * +", () => {
    // (2*3) + (4*5) = 6 + 20 = 26
    expect(expressionTreeEvaluation("2 3 * 4 5 * +")).toBe(26);
  });

  it("handles single number", () => {
    expect(expressionTreeEvaluation("42")).toBe(42);
  });
});
