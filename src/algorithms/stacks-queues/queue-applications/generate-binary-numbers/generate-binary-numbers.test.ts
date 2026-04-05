import { describe, it, expect } from "vitest";
import { generateBinaryNumbers } from "./sources/generate-binary-numbers.ts?fn";

describe("generateBinaryNumbers", () => {
  it("produces ['1','10','11','100','101'] for count = 5", () => {
    expect(generateBinaryNumbers(5)).toEqual(["1", "10", "11", "100", "101"]);
  });

  it("produces ['1'] for count = 1", () => {
    expect(generateBinaryNumbers(1)).toEqual(["1"]);
  });

  it("produces the correct first 3 binary numbers", () => {
    expect(generateBinaryNumbers(3)).toEqual(["1", "10", "11"]);
  });

  it("produces the correct first 10 binary numbers", () => {
    expect(generateBinaryNumbers(10)).toEqual([
      "1",
      "10",
      "11",
      "100",
      "101",
      "110",
      "111",
      "1000",
      "1001",
      "1010",
    ]);
  });

  it("returns an empty array for count = 0", () => {
    expect(generateBinaryNumbers(0)).toEqual([]);
  });

  it("produces results in ascending numeric order", () => {
    const binaryStrings = generateBinaryNumbers(7) as string[];
    for (let resultIdx = 0; resultIdx < binaryStrings.length; resultIdx++) {
      expect(parseInt(binaryStrings[resultIdx]!, 2)).toBe(resultIdx + 1);
    }
  });

  it("produces the correct number of results", () => {
    const binaryStrings = generateBinaryNumbers(15) as string[];
    expect(binaryStrings.length).toBe(15);
  });

  it("each result is a valid binary string (only 0s and 1s)", () => {
    const binaryStrings = generateBinaryNumbers(8) as string[];
    for (const binaryStr of binaryStrings) {
      expect(binaryStr).toMatch(/^[01]+$/);
    }
  });

  it("the last entry for count = 4 is '100'", () => {
    const binaryStrings = generateBinaryNumbers(4) as string[];
    expect(binaryStrings[binaryStrings.length - 1]).toBe("100");
  });
});
