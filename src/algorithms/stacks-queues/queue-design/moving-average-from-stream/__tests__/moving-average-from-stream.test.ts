import { describe, it, expect } from "vitest";
import { movingAverageFromStream } from "../sources/moving-average-from-stream.ts?fn";

describe("movingAverageFromStream", () => {
  it("returns correct averages for the default example ([1,10,3,5], k=3)", () => {
    const result = movingAverageFromStream([1, 10, 3, 5], 3) as number[];
    expect(result[0]).toBeCloseTo(1);
    expect(result[1]).toBeCloseTo(5.5);
    expect(result[2]).toBeCloseTo(4.666666, 4);
    expect(result[3]).toBeCloseTo(6);
  });

  it("returns each value as its own average when k=1", () => {
    const result = movingAverageFromStream([4, 7, 2], 1) as number[];
    expect(result).toEqual([4, 7, 2]);
  });

  it("returns a single value when the stream has one element", () => {
    const result = movingAverageFromStream([42], 3) as number[];
    expect(result).toEqual([42]);
  });

  it("returns the cumulative average when the stream is shorter than k", () => {
    const result = movingAverageFromStream([2, 4], 5) as number[];
    expect(result[0]).toBeCloseTo(2);
    expect(result[1]).toBeCloseTo(3);
  });

  it("handles a window size equal to stream length", () => {
    const result = movingAverageFromStream([1, 2, 3], 3) as number[];
    expect(result[0]).toBeCloseTo(1);
    expect(result[1]).toBeCloseTo(1.5);
    expect(result[2]).toBeCloseTo(2);
  });

  it("evicts correctly with window k=2", () => {
    const result = movingAverageFromStream([10, 20, 30, 40], 2) as number[];
    expect(result[0]).toBeCloseTo(10);
    expect(result[1]).toBeCloseTo(15);
    expect(result[2]).toBeCloseTo(25);
    expect(result[3]).toBeCloseTo(35);
  });

  it("produces the correct number of averages", () => {
    const values = [1, 2, 3, 4, 5];
    const result = movingAverageFromStream(values, 3) as number[];
    expect(result).toHaveLength(values.length);
  });

  it("handles all identical values", () => {
    const result = movingAverageFromStream([5, 5, 5, 5], 3) as number[];
    for (const average of result) {
      expect(average).toBeCloseTo(5);
    }
  });
});
