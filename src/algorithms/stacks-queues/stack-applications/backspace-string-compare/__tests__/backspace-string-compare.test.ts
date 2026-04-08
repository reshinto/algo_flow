import { describe, it, expect } from "vitest";
import { backspaceStringCompare } from "../sources/backspace-string-compare.ts?fn";

describe("backspaceStringCompare", () => {
  it("returns true when both strings resolve to the same characters", () => {
    expect(backspaceStringCompare("ab#c", "ad#c")).toBe(true);
  });

  it("returns true when both strings are fully erased by backspaces", () => {
    expect(backspaceStringCompare("ab##", "c#d#")).toBe(true);
  });

  it("returns false when processed strings differ", () => {
    expect(backspaceStringCompare("a#c", "b")).toBe(false);
  });

  it("returns true when both strings are empty", () => {
    expect(backspaceStringCompare("", "")).toBe(true);
  });

  it("returns true when both strings are identical with no backspaces", () => {
    expect(backspaceStringCompare("a", "a")).toBe(true);
  });

  it("returns false when strings have different lengths after processing", () => {
    expect(backspaceStringCompare("abc", "a")).toBe(false);
  });

  it("handles a backspace on an already-empty stack gracefully", () => {
    expect(backspaceStringCompare("#a", "a")).toBe(true);
  });

  it("returns true when multiple backspaces reduce both strings to the same result", () => {
    expect(backspaceStringCompare("nzp#o#g", "b#nzp#o#g")).toBe(true);
  });
});
