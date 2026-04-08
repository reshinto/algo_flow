import { describe, it, expect } from "vitest";
import { interleaveFirstHalfQueue } from "../sources/interleave-first-half-queue.ts?fn";

describe("interleaveFirstHalfQueue", () => {
  it("interleaves [1,2,3,4,5,6] into [1,4,2,5,3,6]", () => {
    expect(interleaveFirstHalfQueue([1, 2, 3, 4, 5, 6])).toEqual([1, 4, 2, 5, 3, 6]);
  });

  it("interleaves a 4-element queue correctly", () => {
    expect(interleaveFirstHalfQueue([1, 2, 3, 4])).toEqual([1, 3, 2, 4]);
  });

  it("interleaves a 2-element queue correctly", () => {
    expect(interleaveFirstHalfQueue([1, 2])).toEqual([1, 2]);
  });

  it("handles a single-element queue", () => {
    expect(interleaveFirstHalfQueue([42])).toEqual([42]);
  });

  it("handles an empty queue", () => {
    expect(interleaveFirstHalfQueue([])).toEqual([]);
  });

  it("interleaves an odd-length queue — last element appended at end", () => {
    // halfSize=2; phase1: stack=[1,2],queue=[3,4,5]; phase2: queue=[3,4,5,2,1];
    // phase3 rotate 2: queue=[5,2,1,3,4]; phase4: stack=[5,2],queue=[1,3,4];
    // phase5: pop2+shift1=[2,1], pop5+shift3=[2,1,5,3]; remainder shift4=[2,1,5,3,4]
    expect(interleaveFirstHalfQueue([1, 2, 3, 4, 5])).toEqual([2, 1, 5, 3, 4]);
  });

  it("interleaves an 8-element queue correctly", () => {
    expect(interleaveFirstHalfQueue([1, 2, 3, 4, 5, 6, 7, 8])).toEqual([1, 5, 2, 6, 3, 7, 4, 8]);
  });

  it("produces the correct output length for even-length input", () => {
    const result = interleaveFirstHalfQueue([10, 20, 30, 40]) as number[];
    expect(result.length).toBe(4);
  });

  it("produces the correct output length for odd-length input", () => {
    const result = interleaveFirstHalfQueue([10, 20, 30, 40, 50]) as number[];
    expect(result.length).toBe(5);
  });

  it("alternates between first-half and second-half elements for even input", () => {
    const inputValues = [1, 2, 3, 4, 5, 6];
    const result = interleaveFirstHalfQueue(inputValues) as number[];
    const halfSize = inputValues.length / 2;
    const firstHalf = inputValues.slice(0, halfSize);
    const secondHalf = inputValues.slice(halfSize);
    for (let pairIdx = 0; pairIdx < halfSize; pairIdx++) {
      expect(result[pairIdx * 2]).toBe(firstHalf[pairIdx]);
      expect(result[pairIdx * 2 + 1]).toBe(secondHalf[pairIdx]);
    }
  });
});
