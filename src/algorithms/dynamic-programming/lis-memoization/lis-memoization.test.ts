import { describe, it, expect } from "vitest";
import { lisMemoization } from "./sources/lis-memoization.ts?fn";

describe("lisMemoization", () => {
  it("returns 0 for an empty sequence", () => {
    expect(lisMemoization([])).toBe(0);
  });

  it("returns 1 for a single-element sequence", () => {
    expect(lisMemoization([42])).toBe(1);
  });

  it("returns 1 for a fully decreasing sequence", () => {
    expect(lisMemoization([5, 4, 3, 2, 1])).toBe(1);
  });

  it("returns the length for a fully increasing sequence", () => {
    expect(lisMemoization([1, 2, 3, 4, 5])).toBe(5);
  });

  it("computes the default input [10, 9, 2, 5, 3, 7, 101, 18] = 4", () => {
    expect(lisMemoization([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
  });

  it("computes [3, 10, 2, 1, 20] = 3", () => {
    expect(lisMemoization([3, 10, 2, 1, 20])).toBe(3);
  });

  it("computes [3, 2] = 1", () => {
    expect(lisMemoization([3, 2])).toBe(1);
  });

  it("computes [50, 3, 10, 7, 40, 80] = 4", () => {
    expect(lisMemoization([50, 3, 10, 7, 40, 80])).toBe(4);
  });

  it("handles all equal elements", () => {
    expect(lisMemoization([7, 7, 7, 7])).toBe(1);
  });

  it("computes [1, 3, 6, 7, 9, 4, 10, 5, 6] = 6", () => {
    expect(lisMemoization([1, 3, 6, 7, 9, 4, 10, 5, 6])).toBe(6);
  });
});
