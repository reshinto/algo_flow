import { describe, it, expect } from "vitest";
import { validParentheses } from "../sources/valid-parentheses.ts?fn";

describe("validParentheses", () => {
  it("accepts a fully balanced string with all bracket types", () => {
    expect(validParentheses("({[]})")).toBe(true);
  });

  it("accepts simple matching parentheses", () => {
    expect(validParentheses("()")).toBe(true);
  });

  it("accepts nested same-type brackets", () => {
    expect(validParentheses("((()))")).toBe(true);
  });

  it("accepts multiple sequential pairs", () => {
    expect(validParentheses("()[]{}")).toBe(true);
  });

  it("rejects mismatched brackets", () => {
    expect(validParentheses("(]")).toBe(false);
  });

  it("rejects incorrectly ordered brackets", () => {
    expect(validParentheses("([)]")).toBe(false);
  });

  it("rejects an unclosed opening bracket", () => {
    expect(validParentheses("(")).toBe(false);
  });

  it("rejects a lone closing bracket", () => {
    expect(validParentheses(")")).toBe(false);
  });

  it("accepts an empty string", () => {
    expect(validParentheses("")).toBe(true);
  });

  it("rejects a string with unclosed brackets at the end", () => {
    expect(validParentheses("({[]})(")).toBe(false);
  });
});
