import { describe, it, expect } from "vitest";
import { xorRangeQuery } from "../sources/xor-range-query.ts?fn";

describe("xorRangeQuery", () => {
  it("builds correct prefix XOR array and answers a single query", () => {
    const result = xorRangeQuery([3, 5, 2, 7, 1, 4], [[0, 2]]);
    /* 3^5^2 = 4, prefixXor = [3, 6, 4, 3, 2, 6] */
    expect(result.queryResults[0]).toBe(4);
  });

  it("answers multiple queries correctly for default input", () => {
    const result = xorRangeQuery(
      [3, 5, 2, 7, 1, 4],
      [
        [0, 2],
        [1, 4],
        [2, 5],
      ],
    );
    /* [0,2]=3^5^2=4, [1,4]=5^2^7^1=1, [2,5]=2^7^1^4=0 */
    expect(result.queryResults).toEqual([4, 1, 0]);
  });

  it("builds the correct prefix XOR array", () => {
    const result = xorRangeQuery([3, 5, 2, 7, 1, 4], [[0, 5]]);
    expect(result.prefixXor).toEqual([3, 6, 4, 3, 2, 6]);
  });

  it("handles a full range query spanning the entire array", () => {
    const inputArray = [1, 2, 3, 4];
    const result = xorRangeQuery(inputArray, [[0, 3]]);
    /* 1^2^3^4 = 4 */
    expect(result.queryResults[0]).toBe(4);
  });

  it("handles a single element query", () => {
    const result = xorRangeQuery([10, 20, 30, 40], [[2, 2]]);
    /* XOR of just index 2 = 30 */
    expect(result.queryResults[0]).toBe(30);
  });

  it("handles an empty input array", () => {
    const result = xorRangeQuery([], []);
    expect(result.prefixXor).toEqual([]);
    expect(result.queryResults).toEqual([]);
  });

  it("handles a query starting at index 0", () => {
    const result = xorRangeQuery([5, 3, 2, 8], [[0, 2]]);
    /* 5^3^2 = 4 */
    expect(result.queryResults[0]).toBe(4);
  });

  it("XOR of same range twice produces 0", () => {
    const result = xorRangeQuery([1, 2, 3, 4, 5, 6], [[1, 3]]);
    /* 2^3^4 = 5 */
    const rangeXor = result.queryResults[0]!;
    expect(rangeXor ^ rangeXor).toBe(0);
  });

  it("handles all zeros input", () => {
    const result = xorRangeQuery([0, 0, 0, 0], [[0, 3]]);
    expect(result.queryResults[0]).toBe(0);
    expect(result.prefixXor).toEqual([0, 0, 0, 0]);
  });
});
