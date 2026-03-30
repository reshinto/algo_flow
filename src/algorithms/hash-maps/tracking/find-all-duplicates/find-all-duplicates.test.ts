import { describe, it, expect } from "vitest";

function findAllDuplicates(numbers: number[]): number[] {
  const seenSet = new Set<number>();
  const duplicates: number[] = [];
  for (const currentNum of numbers) {
    if (seenSet.has(currentNum)) duplicates.push(currentNum);
    else seenSet.add(currentNum);
  }
  return duplicates;
}

describe("findAllDuplicates", () => {
  it("returns [2, 3] for [4, 3, 2, 7, 8, 2, 3, 1]", () => {
    expect(findAllDuplicates([4, 3, 2, 7, 8, 2, 3, 1])).toEqual([2, 3]);
  });
  it("returns [1] for [1, 1, 2]", () => {
    expect(findAllDuplicates([1, 1, 2])).toEqual([1]);
  });
  it("returns empty for no duplicates", () => {
    expect(findAllDuplicates([1, 2, 3])).toEqual([]);
  });
  it("returns empty for empty array", () => {
    expect(findAllDuplicates([])).toEqual([]);
  });
  it("returns [5] for [5, 5]", () => {
    expect(findAllDuplicates([5, 5])).toEqual([5]);
  });
  it("returns [1, 2] for [1, 2, 1, 2]", () => {
    expect(findAllDuplicates([1, 2, 1, 2])).toEqual([1, 2]);
  });
  it("returns empty for single element", () => {
    expect(findAllDuplicates([7])).toEqual([]);
  });
  it("handles all same elements", () => {
    expect(findAllDuplicates([3, 3, 3])).toEqual([3, 3]);
  });
});
