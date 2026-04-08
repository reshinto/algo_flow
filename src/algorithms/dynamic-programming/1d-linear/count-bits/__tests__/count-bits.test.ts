import { describe, it, expect } from "vitest";
import { countBits } from "../sources/count-bits.ts?fn";

describe("countBits", () => {
  it("returns [0] for targetNumber 0", () => {
    expect(countBits(0)).toEqual([0]);
  });

  it("returns [0,1,1] for targetNumber 2", () => {
    expect(countBits(2)).toEqual([0, 1, 1]);
  });

  it("returns [0,1,1,2,1,2] for targetNumber 5", () => {
    expect(countBits(5)).toEqual([0, 1, 1, 2, 1, 2]);
  });

  it("returns array where last element is 4 for targetNumber 15", () => {
    const result = countBits(15);
    expect(result[result.length - 1]).toBe(4);
  });

  it("returns array of length targetNumber + 1", () => {
    const targetNumber = 10;
    expect(countBits(targetNumber)).toHaveLength(targetNumber + 1);
  });

  it("first element is always 0 (zero has no set bits)", () => {
    expect(countBits(8)[0]).toBe(0);
  });

  it("powers of two always have exactly 1 set bit", () => {
    const result = countBits(16);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(1);
    expect(result[4]).toBe(1);
    expect(result[8]).toBe(1);
    expect(result[16]).toBe(1);
  });

  it("values one below powers of two have maximum set bits", () => {
    const result = countBits(16);
    // 7 = 0111 => 3 bits, 15 = 1111 => 4 bits
    expect(result[7]).toBe(3);
    expect(result[15]).toBe(4);
  });
});
