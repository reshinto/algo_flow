import { describe, it, expect } from "vitest";
import { implementStackUsingQueues } from "./sources/implement-stack-using-queues.ts?fn";

describe("implementStackUsingQueues", () => {
  it("pops a sequence of values in LIFO order", () => {
    expect(implementStackUsingQueues([1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1]);
  });

  it("returns a two-element array in reverse insertion order", () => {
    expect(implementStackUsingQueues([10, 20])).toEqual([20, 10]);
  });

  it("returns a single-element array unchanged", () => {
    expect(implementStackUsingQueues([42])).toEqual([42]);
  });

  it("returns an empty array when given no values", () => {
    expect(implementStackUsingQueues([])).toEqual([]);
  });

  it("returns duplicate values in LIFO order", () => {
    expect(implementStackUsingQueues([7, 7, 7])).toEqual([7, 7, 7]);
  });

  it("returns values originally in descending order in ascending LIFO order", () => {
    expect(implementStackUsingQueues([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns values originally in ascending order in descending LIFO order", () => {
    expect(implementStackUsingQueues([1, 2, 3])).toEqual([3, 2, 1]);
  });

  it("handles negative values in LIFO order", () => {
    expect(implementStackUsingQueues([-3, -1, 0, 2])).toEqual([2, 0, -1, -3]);
  });

  it("returns a larger input in LIFO order", () => {
    const inputValues = [10, 20, 30, 40, 50];
    expect(implementStackUsingQueues(inputValues)).toEqual([50, 40, 30, 20, 10]);
  });
});
