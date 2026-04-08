import { describe, it, expect } from "vitest";
import { reverseString } from "../sources/reverse-string.ts?fn";

describe("reverseString", () => {
  it("reverses a standard word", () => {
    expect(reverseString("hello")).toBe("olleh");
  });

  it("returns a single character unchanged", () => {
    expect(reverseString("a")).toBe("a");
  });

  it("returns an empty string unchanged", () => {
    expect(reverseString("")).toBe("");
  });

  it("reverses a two-character string", () => {
    expect(reverseString("ab")).toBe("ba");
  });

  it("reverses a palindrome to itself", () => {
    expect(reverseString("racecar")).toBe("racecar");
  });

  it("reverses a string with spaces", () => {
    expect(reverseString("hello world")).toBe("dlrow olleh");
  });

  it("reverses a string of repeated characters", () => {
    expect(reverseString("aaaa")).toBe("aaaa");
  });

  it("reverses a longer sentence", () => {
    expect(reverseString("algorithm")).toBe("mhtirogla");
  });
});
