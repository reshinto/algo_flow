import { describe, it, expect } from "vitest";
import { differenceArray } from "./sources/difference-array.ts?fn";

describe("differenceArray", () => {
  it("applies a single range update correctly", () => {
    const result = differenceArray(5, [[1, 3, 3]]);
    expect(result).toEqual([0, 3, 3, 3, 0]);
  });

  it("applies multiple overlapping updates correctly", () => {
    const result = differenceArray(5, [
      [0, 4, 1],
      [1, 3, 2],
    ]);
    /* [0..4]+1, [1..3]+2 → [1, 3, 3, 3, 1] */
    expect(result).toEqual([1, 3, 3, 3, 1]);
  });

  it("applies an update spanning the entire range", () => {
    const result = differenceArray(4, [[0, 3, 5]]);
    expect(result).toEqual([5, 5, 5, 5]);
  });

  it("applies a single element update", () => {
    const result = differenceArray(4, [[2, 2, 7]]);
    expect(result).toEqual([0, 0, 7, 0]);
  });

  it("returns all zeros when there are no updates", () => {
    const result = differenceArray(5, []);
    expect(result).toEqual([0, 0, 0, 0, 0]);
  });

  it("handles negative delta correctly", () => {
    const result = differenceArray(5, [[1, 3, -4]]);
    expect(result).toEqual([0, -4, -4, -4, 0]);
  });

  it("handles the default input from the algorithm definition", () => {
    /* arrayLength=8, updates=[[1,4,3],[2,6,-1],[0,3,2]]
     * diff after updates:
     *   [1,4,3]: diff[1]+=3, diff[5]-=3
     *   [2,6,-1]: diff[2]-=1, diff[7]+=1
     *   [0,3,2]: diff[0]+=2, diff[4]-=2
     * diff = [2, 3, -1, 0, -2, -3, 0, 1, 0]
     * prefix: [2, 5, 4, 4, 2, -1, -1, 0]
     */
    const result = differenceArray(8, [
      [1, 4, 3],
      [2, 6, -1],
      [0, 3, 2],
    ]);
    expect(result).toEqual([2, 5, 4, 4, 2, -1, -1, 0]);
  });
});
