import { describe, it, expect } from "vitest";
import { islandCount } from "./sources/island-count.ts?fn";

describe("islandCount", () => {
  it("counts 2 islands in the standard test grid", () => {
    const grid = [
      [1, 1, 0, 0],
      [1, 0, 0, 1],
      [0, 0, 1, 1],
      [0, 0, 0, 0],
    ];
    // Top-left cluster (0,0),(0,1),(1,0) = island 1
    // Right cluster (1,3),(2,2),(2,3) = island 2
    expect(islandCount(grid)).toBe(2);
  });

  it("returns 0 when there are no islands", () => {
    const grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(islandCount(grid)).toBe(0);
  });

  it("counts 1 island when the entire grid is land", () => {
    const grid = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    expect(islandCount(grid)).toBe(1);
  });

  it("handles a 1x1 grid with a single island", () => {
    expect(islandCount([[1]])).toBe(1);
  });

  it("handles a 1x1 grid with no island", () => {
    expect(islandCount([[0]])).toBe(0);
  });

  it("does not count diagonally adjacent cells as connected", () => {
    const grid = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ];
    expect(islandCount(grid)).toBe(5);
  });

  it("counts an L-shaped island as one island", () => {
    const grid = [
      [1, 0],
      [1, 0],
      [1, 1],
    ];
    expect(islandCount(grid)).toBe(1);
  });

  it("handles a single-row grid", () => {
    expect(islandCount([[1, 0, 1, 1, 0, 1]])).toBe(3);
  });

  it("handles a single-column grid", () => {
    expect(islandCount([[1], [0], [1], [1], [0]])).toBe(2);
  });

  it("counts the default input grid correctly (3 islands)", () => {
    const grid = [
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1],
    ];
    expect(islandCount(grid)).toBe(3);
  });
});
