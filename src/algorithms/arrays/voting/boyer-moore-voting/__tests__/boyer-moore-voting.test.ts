import { describe, it, expect } from "vitest";
import { boyerMooreVoting } from "../sources/boyer-moore-voting.ts?fn";

describe("boyerMooreVoting", () => {
  it("finds the majority element in a mixed array", () => {
    /* [2,2,1,1,1,2,2]: 2 appears 4 times out of 7 */
    const result = boyerMooreVoting([2, 2, 1, 1, 1, 2, 2]);
    expect(result.majorityElement).toBe(2);
  });

  it("handles an array where all elements are the same", () => {
    const result = boyerMooreVoting([5, 5, 5]);
    expect(result.majorityElement).toBe(5);
  });

  it("handles a single element array", () => {
    const result = boyerMooreVoting([42]);
    expect(result.majorityElement).toBe(42);
  });

  it("returns -1 for an empty array", () => {
    const result = boyerMooreVoting([]);
    expect(result.majorityElement).toBe(-1);
    expect(result.count).toBe(0);
  });

  it("finds a majority element at the start of the array", () => {
    /* [3,3,3,1,2]: 3 appears 3 times out of 5 */
    const result = boyerMooreVoting([3, 3, 3, 1, 2]);
    expect(result.majorityElement).toBe(3);
  });

  it("finds a majority element at the end of the array", () => {
    /* [1,2,7,7,7]: 7 appears 3 times out of 5 */
    const result = boyerMooreVoting([1, 2, 7, 7, 7]);
    expect(result.majorityElement).toBe(7);
  });

  it("finds a majority element interspersed throughout the array", () => {
    /* [1,9,1,9,1,9,1]: 1 appears 4 times out of 7 */
    const result = boyerMooreVoting([1, 9, 1, 9, 1, 9, 1]);
    expect(result.majorityElement).toBe(1);
  });

  it("handles a two-element array where both elements are the same", () => {
    const result = boyerMooreVoting([4, 4]);
    expect(result.majorityElement).toBe(4);
  });

  it("handles a large array with a clear majority", () => {
    /* 6 appearing 6 times out of 9 */
    const result = boyerMooreVoting([6, 6, 6, 1, 6, 2, 6, 3, 6]);
    expect(result.majorityElement).toBe(6);
  });

  it("handles the default input from the algorithm definition", () => {
    /* Default: [2,2,1,1,1,2,2] — 2 is majority */
    const result = boyerMooreVoting([2, 2, 1, 1, 1, 2, 2]);
    expect(result.majorityElement).toBe(2);
  });

  it("handles negative numbers as the majority element", () => {
    const result = boyerMooreVoting([-3, -3, 1, -3, 2]);
    expect(result.majorityElement).toBe(-3);
  });
});
