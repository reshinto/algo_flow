import { describe, it, expect } from "vitest";
import { romanToInteger } from "./sources/roman-to-integer.ts?fn";

describe("romanToInteger", () => {
  it("converts the default example MCMXCIV to 1994", () => {
    expect(romanToInteger("MCMXCIV")).toBe(1994);
  });

  it("converts III to 3", () => {
    expect(romanToInteger("III")).toBe(3);
  });

  it("converts IV to 4 using the subtraction rule", () => {
    expect(romanToInteger("IV")).toBe(4);
  });

  it("converts IX to 9 using the subtraction rule", () => {
    expect(romanToInteger("IX")).toBe(9);
  });

  it("converts LVIII to 58", () => {
    expect(romanToInteger("LVIII")).toBe(58);
  });

  it("converts M to 1000", () => {
    expect(romanToInteger("M")).toBe(1000);
  });

  it("converts MMMDCCXLIX to 3749", () => {
    expect(romanToInteger("MMMDCCXLIX")).toBe(3749);
  });

  it("converts XL to 40 using the subtraction rule", () => {
    expect(romanToInteger("XL")).toBe(40);
  });

  it("converts CD to 400 using the subtraction rule", () => {
    expect(romanToInteger("CD")).toBe(400);
  });

  it("converts MMMCMXCIX to 3999 (largest standard value)", () => {
    expect(romanToInteger("MMMCMXCIX")).toBe(3999);
  });
});
