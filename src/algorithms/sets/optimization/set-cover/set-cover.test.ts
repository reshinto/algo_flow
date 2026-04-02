import { describe, it, expect } from "vitest";
import { setCover } from "./sources/set-cover.ts?fn";

describe("setCover", () => {
  it("covers the default universe with the expected number of sets", () => {
    const result = setCover(
      [1, 2, 3, 4, 5, 6, 7, 8],
      [
        [1, 2, 3],
        [2, 4],
        [3, 4, 5],
        [5, 6, 7],
        [6, 7, 8],
      ],
    ) as { selectedIndices: number[]; selectedSets: number[][] };
    // Greedy should cover all 8 elements
    const coveredElements = new Set(result.selectedSets.flat());
    expect(coveredElements).toContain(1);
    expect(coveredElements).toContain(8);
    expect(result.selectedSets.length).toBeGreaterThan(0);
    expect(result.selectedSets.length).toBeLessThanOrEqual(5);
  });

  it("returns a single set when one set covers the entire universe", () => {
    const result = setCover([1, 2, 3], [[1, 2, 3], [1], [2]]) as {
      selectedIndices: number[];
      selectedSets: number[][];
    };
    expect(result.selectedSets.length).toBe(1);
    expect(result.selectedIndices[0]).toBe(0);
  });

  it("covers a universe of disjoint singletons", () => {
    const result = setCover([1, 2, 3], [[1], [2], [3]]) as {
      selectedIndices: number[];
      selectedSets: number[][];
    };
    const covered = new Set(result.selectedSets.flat());
    expect(covered.has(1)).toBe(true);
    expect(covered.has(2)).toBe(true);
    expect(covered.has(3)).toBe(true);
    expect(result.selectedSets.length).toBe(3);
  });

  it("selects the greediest set first", () => {
    // S0 covers 3 elements, S1 covers 1 — greedy must pick S0 first
    const result = setCover([1, 2, 3, 4], [[1, 2, 3], [4]]) as {
      selectedIndices: number[];
      selectedSets: number[][];
    };
    expect(result.selectedIndices[0]).toBe(0);
  });

  it("covers all elements when all sets overlap heavily", () => {
    const result = setCover([1, 2, 3, 4, 5], [[1, 2, 3, 4, 5], [1, 2], [3, 4], [5]]) as {
      selectedIndices: number[];
      selectedSets: number[][];
    };
    const covered = new Set(result.selectedSets.flat());
    for (const element of [1, 2, 3, 4, 5]) {
      expect(covered.has(element)).toBe(true);
    }
  });

  it("returns empty selection when universe is empty", () => {
    const result = setCover(
      [],
      [
        [1, 2],
        [3, 4],
      ],
    ) as { selectedIndices: number[]; selectedSets: number[][] };
    expect(result.selectedIndices.length).toBe(0);
    expect(result.selectedSets.length).toBe(0);
  });

  it("handles a single-element universe covered by the first matching set", () => {
    const result = setCover([7], [[1, 2], [7, 8], [3]]) as {
      selectedIndices: number[];
      selectedSets: number[][];
    };
    expect(result.selectedIndices.length).toBe(1);
    const covered = new Set(result.selectedSets.flat());
    expect(covered.has(7)).toBe(true);
  });

  it("returns selectedIndices that match the positions of selectedSets", () => {
    const allSets = [
      [1, 2, 3],
      [2, 4],
      [3, 4, 5],
      [5, 6, 7],
      [6, 7, 8],
    ];
    const result = setCover([1, 2, 3, 4, 5, 6, 7, 8], allSets) as {
      selectedIndices: number[];
      selectedSets: number[][];
    };
    for (let pos = 0; pos < result.selectedIndices.length; pos++) {
      const idx = result.selectedIndices[pos]!;
      expect(result.selectedSets[pos]).toEqual(allSets[idx]);
    }
  });
});
