import { describe, it, expect } from "vitest";

function contiguousArray(numbers: number[]): number {
  const prefixSumMap = new Map<number, number>();
  prefixSumMap.set(0, -1);
  let runningSum = 0;
  let maxLength = 0;
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    runningSum += numbers[elementIndex] === 0 ? -1 : 1;
    const previousIndex = prefixSumMap.get(runningSum);
    if (previousIndex !== undefined) {
      maxLength = Math.max(maxLength, elementIndex - previousIndex);
    } else {
      prefixSumMap.set(runningSum, elementIndex);
    }
  }
  return maxLength;
}

describe("contiguousArray", () => {
  it("returns 6 for [0, 1, 0, 1, 1, 0]", () => {
    expect(contiguousArray([0, 1, 0, 1, 1, 0])).toBe(6);
  });
  it("returns 2 for [0, 1]", () => {
    expect(contiguousArray([0, 1])).toBe(2);
  });
  it("returns 2 for [0, 1, 0]", () => {
    expect(contiguousArray([0, 1, 0])).toBe(2);
  });
  it("returns 0 for [0, 0, 0]", () => {
    expect(contiguousArray([0, 0, 0])).toBe(0);
  });
  it("returns 0 for [1, 1, 1]", () => {
    expect(contiguousArray([1, 1, 1])).toBe(0);
  });
  it("returns 0 for empty array", () => {
    expect(contiguousArray([])).toBe(0);
  });
  it("returns 4 for [0, 0, 1, 1]", () => {
    expect(contiguousArray([0, 0, 1, 1])).toBe(4);
  });
  it("returns 4 for [1, 0, 1, 0, 1]", () => {
    expect(contiguousArray([1, 0, 1, 0, 1])).toBe(4);
  });
});
