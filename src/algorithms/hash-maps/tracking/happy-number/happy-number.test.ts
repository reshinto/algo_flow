import { describe, it, expect } from "vitest";
import { happyNumber } from "./sources/happy-number.ts?fn";

describe("happyNumber", () => {
  it("identifies 19 as happy (default example)", () => {
    expect(happyNumber(19)).toBe(true);
  });

  it("identifies 1 as happy", () => {
    expect(happyNumber(1)).toBe(true);
  });

  it("identifies 7 as happy", () => {
    expect(happyNumber(7)).toBe(true);
  });

  it("identifies 4 as not happy", () => {
    expect(happyNumber(4)).toBe(false);
  });

  it("identifies 2 as not happy", () => {
    expect(happyNumber(2)).toBe(false);
  });

  it("identifies 100 as happy", () => {
    expect(happyNumber(100)).toBe(true);
  });

  it("identifies 116 as not happy", () => {
    expect(happyNumber(116)).toBe(false);
  });

  it("identifies 89 as not happy", () => {
    expect(happyNumber(89)).toBe(false);
  });
});
