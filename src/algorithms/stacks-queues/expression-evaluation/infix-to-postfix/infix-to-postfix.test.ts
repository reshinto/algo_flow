import { describe, it, expect } from "vitest";
import { infixToPostfix } from "./sources/infix-to-postfix.ts?fn";

describe("infixToPostfix", () => {
  it("converts a+b*(c-d) to a b c d - * +", () => {
    expect(infixToPostfix("a+b*(c-d)")).toBe("a b c d - * +");
  });

  it("converts a+b to a b +", () => {
    expect(infixToPostfix("a+b")).toBe("a b +");
  });

  it("converts (a+b)*c to a b + c *", () => {
    expect(infixToPostfix("(a+b)*c")).toBe("a b + c *");
  });

  it("converts a+b+c to a b + c +", () => {
    expect(infixToPostfix("a+b+c")).toBe("a b + c +");
  });

  it("converts a single operand to itself", () => {
    expect(infixToPostfix("a")).toBe("a");
  });

  it("converts a*b+c to a b * c +", () => {
    expect(infixToPostfix("a*b+c")).toBe("a b * c +");
  });

  it("converts a+b*c to a b c * + (multiplication binds tighter)", () => {
    expect(infixToPostfix("a+b*c")).toBe("a b c * +");
  });

  it("handles nested parentheses: (a+b)*(c+d) to a b + c d + *", () => {
    expect(infixToPostfix("(a+b)*(c+d)")).toBe("a b + c d + *");
  });

  it("handles right-deep nesting: a+(b+(c+d)) to a b c d + + +", () => {
    expect(infixToPostfix("a+(b+(c+d))")).toBe("a b c d + + +");
  });

  it("handles all four operators with correct precedence", () => {
    expect(infixToPostfix("a+b*c-d/e")).toBe("a b c * + d e / -");
  });
});
