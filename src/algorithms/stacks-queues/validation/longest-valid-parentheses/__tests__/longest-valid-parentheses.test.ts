import { describe, it, expect } from "vitest";
import { longestValidParentheses } from "../sources/longest-valid-parentheses.ts?fn";

describe("longestValidParentheses", () => {
  it("returns 2 for '(()'", () => {
    expect(longestValidParentheses("(()")).toBe(2);
  });

  it("returns 4 for ')()())'", () => {
    expect(longestValidParentheses(")()())")).toBe(4);
  });

  it("returns 0 for empty string", () => {
    expect(longestValidParentheses("")).toBe(0);
  });

  it("returns 6 for '(()())'", () => {
    expect(longestValidParentheses("(()())")).toBe(6);
  });

  it("returns 4 for '()()'", () => {
    expect(longestValidParentheses("()()")).toBe(4);
  });

  it("returns 0 for '((('", () => {
    expect(longestValidParentheses("(((")).toBe(0);
  });
});
