import { describe, it, expect } from "vitest";
import { segmentTreeRangeMin } from "./sources/segment-tree-range-min.ts?fn";

describe("segmentTreeRangeMin", () => {
  it("queries range min for default input", () => {
    const result = segmentTreeRangeMin(
      [2, 5, 1, 4, 9, 3],
      [
        [0, 2],
        [3, 5],
      ],
    ) as number[];
    expect(result[0]).toBe(1); // min of [2,5,1]
    expect(result[1]).toBe(3); // min of [4,9,3]
  });

  it("handles single element query", () => {
    const result = segmentTreeRangeMin([4, 2, 6], [[1, 1]]) as number[];
    expect(result[0]).toBe(2);
  });

  it("handles full range query", () => {
    const arr = [3, 1, 4, 1, 5, 9];
    const result = segmentTreeRangeMin(arr, [[0, 5]]) as number[];
    expect(result[0]).toBe(1);
  });

  it("handles multiple queries on same array", () => {
    const result = segmentTreeRangeMin(
      [10, 3, 8, 1, 7],
      [
        [0, 2],
        [1, 4],
        [3, 4],
      ],
    ) as number[];
    expect(result[0]).toBe(3);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(1);
  });
});
