/** Correctness tests for the reverseWords function. */

import { describe, it, expect } from "vitest";
import { reverseWords } from "../sources/reverse-words.ts?fn";

describe("reverseWords", () => {
  it('reverses "the sky is blue" to "blue is sky the"', () => {
    expect(reverseWords("the sky is blue")).toBe("blue is sky the");
  });

  it('trims and reverses "  hello world  " to "world hello"', () => {
    expect(reverseWords("  hello world  ")).toBe("world hello");
  });

  it("collapses multiple spaces between words", () => {
    expect(reverseWords("a   good   example")).toBe("example good a");
  });

  it("returns a single word unchanged", () => {
    expect(reverseWords("hello")).toBe("hello");
  });

  it("handles a single word surrounded by spaces", () => {
    expect(reverseWords("   spaces   ")).toBe("spaces");
  });

  it("reverses two words", () => {
    expect(reverseWords("foo bar")).toBe("bar foo");
  });

  it("reverses three words", () => {
    expect(reverseWords("one two three")).toBe("three two one");
  });

  it("reverses a longer sentence", () => {
    expect(reverseWords("let us practice")).toBe("practice us let");
  });

  it("handles leading spaces only", () => {
    expect(reverseWords("   word")).toBe("word");
  });

  it("handles trailing spaces only", () => {
    expect(reverseWords("word   ")).toBe("word");
  });
});
