import { describe, it, expect } from "vitest";
import { minimumJumps } from "./sources/minimum-jumps.ts?fn";

describe("minimumJumps", () => {
  it("returns 2 for [2, 3, 1, 1, 4]", () => {
    expect(minimumJumps([2, 3, 1, 1, 4])).toBe(2);
  });

  it("returns 3 for [1, 1, 1, 1]", () => {
    expect(minimumJumps([1, 1, 1, 1])).toBe(3);
  });

  it("returns 1 for [2, 1]", () => {
    expect(minimumJumps([2, 1])).toBe(1);
  });

  it("returns 0 for a single-element array [0]", () => {
    expect(minimumJumps([0])).toBe(0);
  });

  it("returns -1 when the last index is unreachable", () => {
    expect(minimumJumps([1, 0, 1])).toBe(-1);
  });

  it("returns 0 for an empty array", () => {
    expect(minimumJumps([])).toBe(0);
  });

  it("returns 1 when a single jump covers the whole array", () => {
    expect(minimumJumps([5, 1, 1, 1, 1])).toBe(1);
  });
});
