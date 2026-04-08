import { describe, it, expect } from "vitest";

function missingNumber(numbers: number[]): number {
  const numberSet = new Set(numbers);
  for (let checkValue = 0; checkValue <= numbers.length; checkValue++) {
    if (!numberSet.has(checkValue)) return checkValue;
  }
  return -1;
}

describe("missingNumber", () => {
  it("returns 2 for [3, 0, 1]", () => {
    expect(missingNumber([3, 0, 1])).toBe(2);
  });
  it("returns 2 for [0, 1]", () => {
    expect(missingNumber([0, 1])).toBe(2);
  });
  it("returns 8 for [9, 6, 4, 2, 3, 5, 7, 0, 1]", () => {
    expect(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])).toBe(8);
  });
  it("returns 0 for [1]", () => {
    expect(missingNumber([1])).toBe(0);
  });
  it("returns 1 for [0]", () => {
    expect(missingNumber([0])).toBe(1);
  });
  it("returns 0 for empty array", () => {
    expect(missingNumber([])).toBe(0);
  });
  it("returns 3 for [0, 1, 2]", () => {
    expect(missingNumber([0, 1, 2])).toBe(3);
  });
  it("returns 5 for [0, 1, 2, 3, 4, 6]", () => {
    expect(missingNumber([0, 1, 2, 3, 4, 6])).toBe(5);
  });
});
