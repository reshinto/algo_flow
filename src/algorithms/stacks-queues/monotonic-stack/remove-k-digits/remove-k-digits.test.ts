import { describe, it, expect } from "vitest";
import { removeKDigits } from "./sources/remove-k-digits.ts?fn";

describe("removeKDigits", () => {
  it('removes 3 digits from "1432219" to produce "1219"', () => {
    expect(removeKDigits("1432219", 3)).toBe("1219");
  });

  it('removes 1 digit from "10200" to produce "200"', () => {
    expect(removeKDigits("10200", 1)).toBe("200");
  });

  it('removes all digits from "10" to produce "0"', () => {
    expect(removeKDigits("10", 2)).toBe("0");
  });

  it("returns the original number when no removals are requested", () => {
    expect(removeKDigits("12345", 0)).toBe("12345");
  });

  it('strips leading zeros after removal — "100" with k=1 gives "0"', () => {
    expect(removeKDigits("100", 1)).toBe("0");
  });

  it('handles a single-digit string with k=1 producing "0"', () => {
    expect(removeKDigits("9", 1)).toBe("0");
  });

  it('removes digits from a non-decreasing sequence by trimming from the end — "12345" with k=3', () => {
    expect(removeKDigits("12345", 3)).toBe("12");
  });

  it('handles a repeated-digit string — "1111111" with k=3', () => {
    expect(removeKDigits("1111111", 3)).toBe("1111");
  });

  it('removes digits from a decreasing sequence — "9876" with k=2 gives "76"', () => {
    expect(removeKDigits("9876", 2)).toBe("76");
  });

  it('handles k equal to string length, returning "0"', () => {
    expect(removeKDigits("12345", 5)).toBe("0");
  });
});
