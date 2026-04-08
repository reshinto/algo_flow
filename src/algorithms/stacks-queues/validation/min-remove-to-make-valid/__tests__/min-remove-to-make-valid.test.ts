import { describe, it, expect } from "vitest";
import { minRemoveToMakeValid } from "../sources/min-remove-to-make-valid.ts?fn";

describe("minRemoveToMakeValid", () => {
  it("returns an already-balanced string unchanged", () => {
    expect(minRemoveToMakeValid("(ab)")).toBe("(ab)");
  });

  it("removes an unmatched opening bracket", () => {
    expect(minRemoveToMakeValid("a(b(c)d")).toBe("ab(c)d");
  });

  it("removes an unmatched closing bracket", () => {
    expect(minRemoveToMakeValid("a)b")).toBe("ab");
  });

  it("removes multiple unmatched closing brackets", () => {
    expect(minRemoveToMakeValid("))ab")).toBe("ab");
  });

  it("removes multiple unmatched opening brackets", () => {
    expect(minRemoveToMakeValid("ab((")).toBe("ab");
  });

  it("handles a mix of unmatched opening and closing brackets", () => {
    // "lee(t(c)o)de)" — the trailing ')' at index 12 is unmatched and must be removed
    expect(minRemoveToMakeValid("lee(t(c)o)de)")).toBe("lee(t(c)o)de");
  });

  it("returns an empty string for a string of only unmatched brackets", () => {
    expect(minRemoveToMakeValid(")))")).toBe("");
  });

  it("handles an empty string", () => {
    expect(minRemoveToMakeValid("")).toBe("");
  });

  it("returns a string with no parentheses unchanged", () => {
    expect(minRemoveToMakeValid("abcdef")).toBe("abcdef");
  });

  it("handles deeply nested valid parentheses", () => {
    expect(minRemoveToMakeValid("((()))")).toBe("((()))");
  });

  it("removes both unmatched open and close from the same string", () => {
    // ")a(b(c)d(" — leading ')' and the two outermost '(' are unmatched; result is "ab(c)d"
    expect(minRemoveToMakeValid(")a(b(c)d(")).toBe("ab(c)d");
  });
});
