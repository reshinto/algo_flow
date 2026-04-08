import { describe, it, expect } from "vitest";

function numberOfGoodPairs(numbers: number[]): number {
  const frequencyMap = new Map<number, number>();
  let totalPairs = 0;
  for (const currentNum of numbers) {
    totalPairs += frequencyMap.get(currentNum) ?? 0;
    frequencyMap.set(currentNum, (frequencyMap.get(currentNum) ?? 0) + 1);
  }
  return totalPairs;
}

describe("numberOfGoodPairs", () => {
  it("returns 4 for [1, 2, 3, 1, 1, 3]", () => {
    expect(numberOfGoodPairs([1, 2, 3, 1, 1, 3])).toBe(4);
  });

  it("returns 6 for [1, 1, 1, 1]", () => {
    expect(numberOfGoodPairs([1, 1, 1, 1])).toBe(6);
  });

  it("returns 0 for [1, 2, 3]", () => {
    expect(numberOfGoodPairs([1, 2, 3])).toBe(0);
  });

  it("returns 1 for [1, 1]", () => {
    expect(numberOfGoodPairs([1, 1])).toBe(1);
  });

  it("returns 0 for single element", () => {
    expect(numberOfGoodPairs([5])).toBe(0);
  });

  it("returns 0 for empty array", () => {
    expect(numberOfGoodPairs([])).toBe(0);
  });

  it("returns 3 for [2, 2, 2]", () => {
    expect(numberOfGoodPairs([2, 2, 2])).toBe(3);
  });

  it("handles negative numbers", () => {
    expect(numberOfGoodPairs([-1, -1, 2])).toBe(1);
  });
});
