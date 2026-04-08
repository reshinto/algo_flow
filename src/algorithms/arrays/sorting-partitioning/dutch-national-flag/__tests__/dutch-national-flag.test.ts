import { describe, it, expect } from "vitest";
import { dutchNationalFlag } from "../sources/dutch-national-flag.ts?fn";

describe("dutchNationalFlag", () => {
  it("sorts a mixed array of 0s, 1s, and 2s", () => {
    const result = dutchNationalFlag([2, 0, 1, 2, 1, 0]);
    expect(result).toEqual([0, 0, 1, 1, 2, 2]);
  });

  it("returns already sorted array unchanged", () => {
    const result = dutchNationalFlag([0, 0, 1, 1, 2, 2]);
    expect(result).toEqual([0, 0, 1, 1, 2, 2]);
  });

  it("sorts a reverse-sorted array", () => {
    const result = dutchNationalFlag([2, 2, 1, 1, 0, 0]);
    expect(result).toEqual([0, 0, 1, 1, 2, 2]);
  });

  it("handles an array of all zeros", () => {
    const result = dutchNationalFlag([0, 0, 0]);
    expect(result).toEqual([0, 0, 0]);
  });

  it("handles an array of all ones", () => {
    const result = dutchNationalFlag([1, 1, 1]);
    expect(result).toEqual([1, 1, 1]);
  });

  it("handles an array of all twos", () => {
    const result = dutchNationalFlag([2, 2, 2]);
    expect(result).toEqual([2, 2, 2]);
  });

  it("handles a single element 0", () => {
    const result = dutchNationalFlag([0]);
    expect(result).toEqual([0]);
  });

  it("handles a single element 1", () => {
    const result = dutchNationalFlag([1]);
    expect(result).toEqual([1]);
  });

  it("handles a single element 2", () => {
    const result = dutchNationalFlag([2]);
    expect(result).toEqual([2]);
  });

  it("handles an empty array", () => {
    const result = dutchNationalFlag([]);
    expect(result).toEqual([]);
  });

  it("sorts the default input correctly", () => {
    const result = dutchNationalFlag([2, 0, 1, 2, 1, 0, 0, 2, 1]);
    expect(result).toEqual([0, 0, 0, 1, 1, 1, 2, 2, 2]);
  });

  it("handles two-element arrays in all combinations", () => {
    expect(dutchNationalFlag([2, 0])).toEqual([0, 2]);
    expect(dutchNationalFlag([1, 0])).toEqual([0, 1]);
    expect(dutchNationalFlag([2, 1])).toEqual([1, 2]);
  });

  it("does not mutate the original array", () => {
    const original = [2, 0, 1];
    dutchNationalFlag(original);
    expect(original).toEqual([2, 0, 1]);
  });
});
