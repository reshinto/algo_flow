import { describe, it, expect } from "vitest";
import { segmentTreeRangeSum } from "../sources/segment-tree-range-sum.ts?fn";

describe("segmentTreeRangeSum", () => {
  it("queries range sum for default input", () => {
    const result = segmentTreeRangeSum(
      [1, 3, 5, 7, 9, 11],
      [
        [1, 3],
        [0, 5],
      ],
    ) as number[];
    expect(result[0]).toBe(15); // 3+5+7
    expect(result[1]).toBe(36); // 1+3+5+7+9+11
  });

  it("handles single element query", () => {
    const result = segmentTreeRangeSum([4, 2, 6], [[1, 1]]) as number[];
    expect(result[0]).toBe(2);
  });

  it("handles full range query", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = segmentTreeRangeSum(arr, [[0, 4]]) as number[];
    expect(result[0]).toBe(15);
  });

  it("handles multiple queries on same array", () => {
    const result = segmentTreeRangeSum(
      [10, 20, 30, 40, 50],
      [
        [0, 1],
        [2, 4],
        [1, 3],
      ],
    ) as number[];
    expect(result[0]).toBe(30);
    expect(result[1]).toBe(120);
    expect(result[2]).toBe(90);
  });
});
