import { describe, it, expect } from "vitest";
import { evaluateReversePolish } from "../sources/evaluate-reverse-polish.ts?fn";

describe("evaluateReversePolish", () => {
  it("evaluates a simple addition followed by multiplication", () => {
    expect(evaluateReversePolish(["2", "1", "+", "3", "*"])).toBe(9);
  });

  it("evaluates division then addition", () => {
    expect(evaluateReversePolish(["4", "13", "5", "/", "+"])).toBe(6);
  });

  it("evaluates the complex LeetCode example", () => {
    expect(
      evaluateReversePolish(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]),
    ).toBe(22);
  });

  it("evaluates a single operand", () => {
    expect(evaluateReversePolish(["42"])).toBe(42);
  });

  it("evaluates simple addition", () => {
    expect(evaluateReversePolish(["3", "4", "+"])).toBe(7);
  });

  it("evaluates subtraction", () => {
    expect(evaluateReversePolish(["10", "3", "-"])).toBe(7);
  });

  it("evaluates multiplication", () => {
    expect(evaluateReversePolish(["5", "6", "*"])).toBe(30);
  });

  it("truncates division toward zero for positive operands", () => {
    expect(evaluateReversePolish(["7", "2", "/"])).toBe(3);
  });

  it("truncates division toward zero for negative result", () => {
    expect(evaluateReversePolish(["7", "-3", "/"])).toBe(-2);
  });

  it("handles negative operands in arithmetic", () => {
    expect(evaluateReversePolish(["-3", "4", "*"])).toBe(-12);
  });

  it("evaluates a chained expression with multiple operators", () => {
    // (2 + 3) * (4 - 1) = 5 * 3 = 15
    expect(evaluateReversePolish(["2", "3", "+", "4", "1", "-", "*"])).toBe(15);
  });
});
