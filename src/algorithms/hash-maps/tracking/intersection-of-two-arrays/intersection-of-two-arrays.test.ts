import { describe, it, expect } from "vitest";

function intersectionOfTwoArrays(numbersA: number[], numbersB: number[]): number[] {
  const setA = new Set(numbersA);
  const result: number[] = [];
  for (const currentNum of numbersB) {
    if (setA.has(currentNum)) {
      result.push(currentNum);
      setA.delete(currentNum);
    }
  }
  return result;
}

describe("intersectionOfTwoArrays", () => {
  it("returns [2] for [1,2,2,1] and [2,2]", () => {
    expect(intersectionOfTwoArrays([1, 2, 2, 1], [2, 2])).toEqual([2]);
  });
  it("returns [4,9] or [9,4] for [4,9,5] and [9,4,9,8,4]", () => {
    expect(intersectionOfTwoArrays([4, 9, 5], [9, 4, 9, 8, 4]).sort()).toEqual([4, 9]);
  });
  it("returns empty for no overlap", () => {
    expect(intersectionOfTwoArrays([1, 2], [3, 4])).toEqual([]);
  });
  it("returns empty for empty arrays", () => {
    expect(intersectionOfTwoArrays([], [])).toEqual([]);
  });
  it("returns empty when first is empty", () => {
    expect(intersectionOfTwoArrays([], [1, 2])).toEqual([]);
  });
  it("returns empty when second is empty", () => {
    expect(intersectionOfTwoArrays([1, 2], [])).toEqual([]);
  });
  it("handles identical arrays", () => {
    expect(intersectionOfTwoArrays([1, 2, 3], [1, 2, 3]).sort()).toEqual([1, 2, 3]);
  });
  it("returns single element intersection", () => {
    expect(intersectionOfTwoArrays([5], [5])).toEqual([5]);
  });
});
