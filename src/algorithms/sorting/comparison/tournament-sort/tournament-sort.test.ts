import { describe, it, expect } from "vitest";
import { tournamentSort } from "./sources/tournament-sort.ts?fn";

describe("tournamentSort", () => {
  it("sorts an unsorted array", () => {
    expect(tournamentSort([4, 2, 7, 1, 5, 3, 6])).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("handles an already sorted array", () => {
    expect(tournamentSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(tournamentSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(tournamentSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(tournamentSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(tournamentSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(tournamentSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = tournamentSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });

  it("sorts a larger array correctly", () => {
    const input = [64, 34, 25, 12, 22, 11, 90, 55, 47, 8];
    expect(tournamentSort(input)).toEqual([8, 11, 12, 22, 25, 34, 47, 55, 64, 90]);
  });
});
