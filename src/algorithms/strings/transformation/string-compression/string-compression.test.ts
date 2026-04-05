/** Correctness tests for the String Compression (Run-Length Encoding) algorithm. */

import { describe, it, expect } from "vitest";
import { stringCompression } from "./sources/string-compression.ts?fn";

describe("stringCompression", () => {
  it("compresses a string with repeated characters", () => {
    expect(stringCompression("aabcccccaaa")).toBe("a2b1c5a3");
  });

  it("returns the original when compressed form is not shorter", () => {
    expect(stringCompression("abc")).toBe("abc");
  });

  it("returns an empty string unchanged", () => {
    expect(stringCompression("")).toBe("");
  });

  it("returns a single character unchanged (compressed would be longer)", () => {
    expect(stringCompression("a")).toBe("a");
  });

  it("returns a two-character string unchanged when compression yields same length", () => {
    // "aa" → "a2": compressed length (2) equals original length (2), so original is returned
    expect(stringCompression("aa")).toBe("aa");
  });

  it("compresses a long run of one character", () => {
    expect(stringCompression("aaaaaaa")).toBe("a7");
  });

  it("compresses alternating segments correctly", () => {
    expect(stringCompression("aaabbbccc")).toBe("a3b3c3");
  });

  it("compresses a string where all characters differ (no run > 1)", () => {
    // "abcd" → "a1b1c1d1" (8 chars > 4 chars), so original is returned
    expect(stringCompression("abcd")).toBe("abcd");
  });

  it("handles a string with a single long run followed by a short run", () => {
    expect(stringCompression("aaaaab")).toBe("a5b1");
  });

  it("compresses a string of exactly two distinct run lengths", () => {
    expect(stringCompression("aaabbb")).toBe("a3b3");
  });

  it("compresses a string starting with a single-character run", () => {
    expect(stringCompression("abbbbb")).toBe("a1b5");
  });

  it("handles repeated digits correctly", () => {
    // "1111222" → "14" + "23" = "1423" (7 > 4 chars, so compressed is returned)
    expect(stringCompression("1111222")).toBe("1423");
  });
});
