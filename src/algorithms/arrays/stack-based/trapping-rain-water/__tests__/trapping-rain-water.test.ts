import { describe, it, expect } from "vitest";
import { trappingRainWater } from "../sources/trapping-rain-water.ts?fn";

describe("trappingRainWater", () => {
  it("computes water trapped for the classic example", () => {
    /* [0,1,0,2,1,0,1,3,2,1,2,1] → 6 total units */
    const result = trappingRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
    expect(result.totalWater).toBe(6);
  });

  it("returns zero for an empty array", () => {
    const result = trappingRainWater([]);
    expect(result.totalWater).toBe(0);
    expect(result.waterPerIndex).toEqual([]);
  });

  it("returns zero when no water can be trapped (increasing heights)", () => {
    const result = trappingRainWater([1, 2, 3, 4, 5]);
    expect(result.totalWater).toBe(0);
  });

  it("returns zero when no water can be trapped (decreasing heights)", () => {
    const result = trappingRainWater([5, 4, 3, 2, 1]);
    expect(result.totalWater).toBe(0);
  });

  it("handles a simple valley between two walls", () => {
    /* [3, 0, 3] → 3 units trapped */
    const result = trappingRainWater([3, 0, 3]);
    expect(result.totalWater).toBe(3);
    expect(result.waterPerIndex[1]).toBe(3);
  });

  it("handles asymmetric walls — bounded by shorter side", () => {
    /* [3, 0, 1] → 1 unit trapped (bounded by right wall height 1) */
    const result = trappingRainWater([3, 0, 1]);
    expect(result.totalWater).toBe(1);
  });

  it("handles all zeros", () => {
    const result = trappingRainWater([0, 0, 0]);
    expect(result.totalWater).toBe(0);
  });

  it("handles a single element", () => {
    const result = trappingRainWater([5]);
    expect(result.totalWater).toBe(0);
  });

  it("handles two elements", () => {
    const result = trappingRainWater([3, 5]);
    expect(result.totalWater).toBe(0);
  });

  it("computes correct per-index water for a known input", () => {
    /* [0,1,0,2] → index 2 gets 1 unit */
    const result = trappingRainWater([0, 1, 0, 2]);
    expect(result.waterPerIndex[2]).toBe(1);
    expect(result.totalWater).toBe(1);
  });

  it("handles multiple valleys", () => {
    /* [4,2,0,3,2,5] → 9 total */
    const result = trappingRainWater([4, 2, 0, 3, 2, 5]);
    expect(result.totalWater).toBe(9);
  });
});
