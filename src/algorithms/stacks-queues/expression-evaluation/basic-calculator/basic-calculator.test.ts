import { describe, it, expect } from "vitest";
import { basicCalculator } from "./sources/basic-calculator.ts?fn";

describe("basicCalculator", () => {
  it("evaluates a simple addition", () => {
    expect(basicCalculator("1 + 1")).toBe(2);
  });

  it("evaluates mixed addition and subtraction with leading/trailing spaces", () => {
    expect(basicCalculator(" 2-1 + 2 ")).toBe(3);
  });

  it("evaluates a complex nested expression", () => {
    expect(basicCalculator("(1+(4+5+2)-3)+(6+8)")).toBe(23);
  });

  it("evaluates the default input expression", () => {
    expect(basicCalculator("1 + (2 - 3)")).toBe(0);
  });

  it("evaluates a single positive number", () => {
    expect(basicCalculator("42")).toBe(42);
  });

  it("evaluates a simple subtraction", () => {
    expect(basicCalculator("10 - 3")).toBe(7);
  });

  it("evaluates deeply nested parentheses", () => {
    expect(basicCalculator("(((1 + 2)))")).toBe(3);
  });

  it("handles negative result from subtraction inside parentheses", () => {
    expect(basicCalculator("1 - (2 + 3)")).toBe(-4);
  });
});
