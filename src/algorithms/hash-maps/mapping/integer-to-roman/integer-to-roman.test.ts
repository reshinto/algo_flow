import { describe, it, expect } from "vitest";

function integerToRoman(value: number): string {
  const valuePairs: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let remaining = value;
  let result = "";
  for (const [numericValue, symbol] of valuePairs) {
    while (remaining >= numericValue) {
      remaining -= numericValue;
      result += symbol;
    }
  }
  return result;
}

describe("integerToRoman", () => {
  it("converts 1994 to MCMXCIV", () => {
    expect(integerToRoman(1994)).toBe("MCMXCIV");
  });

  it("converts 3 to III", () => {
    expect(integerToRoman(3)).toBe("III");
  });

  it("converts 58 to LVIII", () => {
    expect(integerToRoman(58)).toBe("LVIII");
  });

  it("converts 1 to I", () => {
    expect(integerToRoman(1)).toBe("I");
  });

  it("converts 3999 to MMMCMXCIX", () => {
    expect(integerToRoman(3999)).toBe("MMMCMXCIX");
  });

  it("converts 9 to IX", () => {
    expect(integerToRoman(9)).toBe("IX");
  });

  it("converts 40 to XL", () => {
    expect(integerToRoman(40)).toBe("XL");
  });

  it("converts 1000 to M", () => {
    expect(integerToRoman(1000)).toBe("M");
  });
});
