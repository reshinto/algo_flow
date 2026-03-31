import { describe, it, expect } from "vitest";
import { meetingRoomsII } from "./sources/meeting-rooms-ii.ts?fn";

describe("meetingRoomsII", () => {
  it("returns 2 for the classic example [[0,30],[5,10],[15,20]]", () => {
    const result = meetingRoomsII([
      [0, 30],
      [5, 10],
      [15, 20],
    ]);
    expect(result).toBe(2);
  });

  it("returns 3 for the default input with 4 overlapping meetings", () => {
    const result = meetingRoomsII([
      [0, 30],
      [5, 10],
      [15, 20],
      [2, 7],
    ]);
    expect(result).toBe(3);
  });

  it("returns 1 when all meetings are sequential and non-overlapping", () => {
    const result = meetingRoomsII([
      [0, 5],
      [5, 10],
      [10, 15],
    ]);
    expect(result).toBe(1);
  });

  it("returns the total count when all meetings overlap completely", () => {
    const result = meetingRoomsII([
      [0, 100],
      [1, 99],
      [2, 98],
    ]);
    expect(result).toBe(3);
  });

  it("returns 0 for an empty intervals array", () => {
    const result = meetingRoomsII([]);
    expect(result).toBe(0);
  });

  it("returns 1 for a single meeting", () => {
    const result = meetingRoomsII([[0, 30]]);
    expect(result).toBe(1);
  });

  it("handles meetings provided in reverse order — result is the same", () => {
    const result = meetingRoomsII([
      [15, 20],
      [5, 10],
      [0, 30],
    ]);
    expect(result).toBe(2);
  });

  it("correctly reuses a room when end time equals next start time", () => {
    const result = meetingRoomsII([
      [0, 10],
      [10, 20],
      [10, 30],
    ]);
    expect(result).toBe(2);
  });

  it("does not mutate the original intervals array", () => {
    const original: [number, number][] = [
      [0, 30],
      [5, 10],
      [15, 20],
    ];
    const copy = original.map((interval) => [...interval]);
    meetingRoomsII(original);
    expect(original).toEqual(copy);
  });

  it("handles two non-overlapping meetings on identical times", () => {
    const result = meetingRoomsII([
      [0, 5],
      [0, 5],
    ]);
    expect(result).toBe(2);
  });
});
