/** Correctness tests for the stringToInteger function. */

import { describe, it, expect } from "vitest";
import { stringToInteger } from "./sources/string-to-integer.ts?fn";

const INT32_MIN = -(2 ** 31);
const INT32_MAX = 2 ** 31 - 1;

describe("stringToInteger", () => {
  it("parses a plain positive integer", () => {
    expect(stringToInteger("42")).toBe(42);
  });

  it("parses a negative integer with leading whitespace", () => {
    expect(stringToInteger("   -42")).toBe(-42);
  });

  it("stops at non-digit characters after valid digits", () => {
    expect(stringToInteger("4193 with words")).toBe(4193);
  });

  it("returns 0 when the string starts with a non-digit non-sign character", () => {
    expect(stringToInteger("words and 987")).toBe(0);
  });

  it("returns 0 for an empty string", () => {
    expect(stringToInteger("")).toBe(0);
  });

  it("returns 0 for a string containing only whitespace", () => {
    expect(stringToInteger("   ")).toBe(0);
  });

  it("parses a positive integer with an explicit plus sign", () => {
    expect(stringToInteger("+100")).toBe(100);
  });

  it("parses the number zero", () => {
    expect(stringToInteger("0")).toBe(0);
  });

  it("clamps a value exceeding INT32_MAX to INT32_MAX", () => {
    expect(stringToInteger("2147483648")).toBe(INT32_MAX);
  });

  it("clamps a value below INT32_MIN to INT32_MIN", () => {
    expect(stringToInteger("-2147483649")).toBe(INT32_MIN);
  });

  it("clamps an extremely large number to INT32_MAX", () => {
    expect(stringToInteger("99999999999999999")).toBe(INT32_MAX);
  });

  it("clamps an extremely large negative number to INT32_MIN", () => {
    expect(stringToInteger("-99999999999999999")).toBe(INT32_MIN);
  });

  it("handles leading whitespace before a positive number", () => {
    expect(stringToInteger("  123")).toBe(123);
  });

  it("stops reading at the first non-digit after sign", () => {
    expect(stringToInteger("-abc")).toBe(0);
  });

  it("parses INT32_MAX exactly", () => {
    expect(stringToInteger("2147483647")).toBe(INT32_MAX);
  });

  it("parses INT32_MIN exactly", () => {
    expect(stringToInteger("-2147483648")).toBe(INT32_MIN);
  });
});
