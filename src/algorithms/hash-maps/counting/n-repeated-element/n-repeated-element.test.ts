import { describe, it, expect } from "vitest";

function nRepeatedElement(numbers: number[]): number {
  const frequencyMap = new Map<number, number>();
  const targetCount = numbers.length / 2;
  for (const currentNum of numbers) {
    const updatedCount = (frequencyMap.get(currentNum) ?? 0) + 1;
    frequencyMap.set(currentNum, updatedCount);
    if (updatedCount === targetCount) return currentNum;
  }
  return -1;
}

describe("nRepeatedElement", () => {
  it("returns 3 for [1, 2, 3, 3]", () => {
    expect(nRepeatedElement([1, 2, 3, 3])).toBe(3);
  });

  it("returns 2 for [2, 1, 2, 5, 3, 2]", () => {
    expect(nRepeatedElement([2, 1, 2, 5, 3, 2])).toBe(2);
  });

  it("returns 5 for [5, 1, 5, 2, 5, 3, 5, 4]", () => {
    expect(nRepeatedElement([5, 1, 5, 2, 5, 3, 5, 4])).toBe(5);
  });

  it("returns the repeated element for a two-element array", () => {
    expect(nRepeatedElement([1, 1])).toBe(1);
  });

  it("returns 9 for [9, 9, 1, 2]", () => {
    expect(nRepeatedElement([9, 9, 1, 2])).toBe(9);
  });

  it("handles element at the end", () => {
    expect(nRepeatedElement([1, 2, 3, 4, 5, 3, 3, 3])).toBe(3);
  });

  it("returns the repeated element for all same values", () => {
    expect(nRepeatedElement([7, 7, 7, 7])).toBe(7);
  });

  it("works with negative numbers", () => {
    expect(nRepeatedElement([-1, -1, 2, 3])).toBe(-1);
  });
});
