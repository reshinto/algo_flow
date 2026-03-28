import { describe, it, expect } from "vitest";
import { prefixSum } from "./sources/prefix-sum.ts?fn";

describe("prefixSum", () => {
  it("builds correct prefix array and answers a single query", () => {
    const result = prefixSum([1, 2, 3, 4, 5], [[1, 3]]);
    /* prefix = [1, 3, 6, 10, 15] — query [1,3] = 2+3+4 = 9 */
    expect(result.prefixArray).toEqual([1, 3, 6, 10, 15]);
    expect(result.queryResults).toEqual([9]);
  });

  it("answers multiple queries correctly", () => {
    const result = prefixSum(
      [2, 4, 1, 3, 5, 2],
      [
        [1, 3],
        [0, 4],
        [2, 5],
      ],
    );
    /* [1,3] = 4+1+3 = 8, [0,4] = 2+4+1+3+5 = 15, [2,5] = 1+3+5+2 = 11 */
    expect(result.queryResults).toEqual([8, 15, 11]);
  });

  it("handles a full range query spanning the entire array", () => {
    const inputArray = [3, 1, 4, 1, 5, 9, 2];
    const result = prefixSum(inputArray, [[0, 6]]);
    const expectedTotal = inputArray.reduce((acc, val) => acc + val, 0);
    expect(result.queryResults[0]).toBe(expectedTotal);
  });

  it("handles a single element range query", () => {
    const result = prefixSum([10, 20, 30, 40], [[2, 2]]);
    /* sum of just index 2 = 30 */
    expect(result.queryResults[0]).toBe(30);
  });

  it("handles an empty input array", () => {
    const result = prefixSum([], []);
    expect(result.prefixArray).toEqual([]);
    expect(result.queryResults).toEqual([]);
  });

  it("handles negative numbers in the input array", () => {
    const result = prefixSum([-2, 5, -1, 3], [[0, 3]]);
    /* -2 + 5 + -1 + 3 = 5 */
    expect(result.queryResults[0]).toBe(5);
  });

  it("handles the default algorithm input correctly", () => {
    const result = prefixSum(
      [2, 4, 1, 3, 5, 2],
      [
        [1, 3],
        [0, 4],
        [2, 5],
      ],
    );
    expect(result.queryResults).toEqual([8, 15, 11]);
    expect(result.prefixArray).toEqual([2, 6, 7, 10, 15, 17]);
  });

  it("handles query starting at index 0", () => {
    const result = prefixSum([5, 3, 2, 8], [[0, 2]]);
    /* 5+3+2 = 10 */
    expect(result.queryResults[0]).toBe(10);
  });

  it("handles all zeros in the array", () => {
    const result = prefixSum([0, 0, 0, 0], [[0, 3]]);
    expect(result.queryResults[0]).toBe(0);
    expect(result.prefixArray).toEqual([0, 0, 0, 0]);
  });
});
