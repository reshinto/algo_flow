import { describe, it, expect } from "vitest";

function majorityElement(numbers: number[]): number {
  const frequencyMap = new Map<number, number>();
  const threshold = Math.floor(numbers.length / 2);
  for (const currentNum of numbers) {
    const updatedCount = (frequencyMap.get(currentNum) ?? 0) + 1;
    frequencyMap.set(currentNum, updatedCount);
    if (updatedCount > threshold) return currentNum;
  }
  return -1;
}

describe("majorityElement", () => {
  it("returns 2 for [2, 2, 1, 1, 1, 2, 2]", () => {
    expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toBe(2);
  });

  it("returns 3 for [3, 2, 3]", () => {
    expect(majorityElement([3, 2, 3])).toBe(3);
  });

  it("returns the single element for a one-element array", () => {
    expect(majorityElement([1])).toBe(1);
  });

  it("returns 1 for [1, 1, 1, 1]", () => {
    expect(majorityElement([1, 1, 1, 1])).toBe(1);
  });

  it("returns 5 for [5, 5, 5, 1, 2]", () => {
    expect(majorityElement([5, 5, 5, 1, 2])).toBe(5);
  });

  it("returns 1 for [1, 2, 1, 1, 3]", () => {
    expect(majorityElement([1, 2, 1, 1, 3])).toBe(1);
  });

  it("returns the element for a two-element array with same values", () => {
    expect(majorityElement([7, 7])).toBe(7);
  });

  it("returns correct majority for large repeated prefix", () => {
    expect(majorityElement([9, 9, 9, 9, 1, 2, 3])).toBe(9);
  });
});
