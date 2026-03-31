import { describe, it, expect } from "vitest";
import { kClosestPoints } from "./sources/k-closest-points.ts?fn";

function distanceSquared(point: [number, number]): number {
  return point[0] * point[0] + point[1] * point[1];
}

describe("kClosestPoints", () => {
  it("returns k=3 closest points from the default input", () => {
    const points: [number, number][] = [
      [3, 3],
      [5, -1],
      [-2, 4],
      [1, 1],
      [0, 2],
      [-1, -1],
      [4, 0],
    ];
    const result = kClosestPoints(points, 3) as [number, number][];
    expect(result).toHaveLength(3);
    // All result points must have distance² ≤ the 3rd smallest
    const allDists = points.map(distanceSquared).sort((distA, distB) => distA - distB);
    const thirdSmallest = allDists[2]!;
    for (const point of result) {
      expect(distanceSquared(point)).toBeLessThanOrEqual(thirdSmallest);
    }
  });

  it("returns exactly k points", () => {
    const points: [number, number][] = [
      [1, 0],
      [0, 1],
      [2, 2],
      [3, 3],
      [0, 5],
    ];
    const result = kClosestPoints(points, 2) as [number, number][];
    expect(result).toHaveLength(2);
  });

  it("returns the single closest point when k=1", () => {
    const points: [number, number][] = [
      [10, 10],
      [1, 0],
      [5, 5],
    ];
    const result = kClosestPoints(points, 1) as [number, number][];
    expect(result).toHaveLength(1);
    expect(distanceSquared(result[0]!)).toBe(1); // [1,0] has dist²=1
  });

  it("returns all points when k equals total number of points", () => {
    const points: [number, number][] = [
      [1, 2],
      [3, 4],
      [0, 1],
    ];
    const result = kClosestPoints(points, 3) as [number, number][];
    expect(result).toHaveLength(3);
  });

  it("handles points with negative coordinates", () => {
    const points: [number, number][] = [
      [-3, -4],
      [-1, -1],
      [0, -2],
    ];
    const result = kClosestPoints(points, 1) as [number, number][];
    expect(result).toHaveLength(1);
    expect(distanceSquared(result[0]!)).toBe(2); // [-1,-1] has dist²=2
  });

  it("handles point at origin", () => {
    const points: [number, number][] = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
    const result = kClosestPoints(points, 1) as [number, number][];
    expect(distanceSquared(result[0]!)).toBe(0); // [0,0] is at origin
  });

  it("does not mutate the original points array", () => {
    const points: [number, number][] = [
      [3, 3],
      [1, 1],
      [5, 5],
    ];
    const original = points.map((pt) => [...pt]);
    kClosestPoints(points, 2);
    for (let pointIdx = 0; pointIdx < points.length; pointIdx++) {
      expect(points[pointIdx]).toEqual(original[pointIdx]);
    }
  });
});
