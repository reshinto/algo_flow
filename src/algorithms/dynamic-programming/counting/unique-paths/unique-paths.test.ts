import { describe, it, expect } from "vitest";
import { uniquePaths } from "./sources/unique-paths.ts?fn";

describe("uniquePaths", () => {
  it("returns 28 for a 3×7 grid (default input)", () => {
    expect(uniquePaths(3, 7)).toBe(28);
  });

  it("returns 1 for a 1×1 grid (start equals end)", () => {
    expect(uniquePaths(1, 1)).toBe(1);
  });

  it("returns 3 for a 3×2 grid", () => {
    expect(uniquePaths(3, 2)).toBe(3);
  });

  it("returns 6 for a 3×3 grid", () => {
    expect(uniquePaths(3, 3)).toBe(6);
  });

  it("returns 1 for any single-row grid (only rightward moves)", () => {
    expect(uniquePaths(1, 5)).toBe(1);
  });

  it("returns 1 for any single-column grid (only downward moves)", () => {
    expect(uniquePaths(5, 1)).toBe(1);
  });

  it("returns 70 for a 5×5 grid", () => {
    expect(uniquePaths(5, 5)).toBe(70);
  });

  it("returns 924 for a 7×7 grid", () => {
    expect(uniquePaths(7, 7)).toBe(924);
  });
});
