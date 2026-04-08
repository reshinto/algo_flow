import { describe, it, expect } from "vitest";
import { catalanNumber } from "../sources/catalan-numbers.ts?fn";

describe("catalanNumber", () => {
  it("returns 1 for C(0)", () => {
    expect(catalanNumber(0)).toBe(1);
  });

  it("returns 1 for C(1)", () => {
    expect(catalanNumber(1)).toBe(1);
  });

  it("returns 2 for C(2)", () => {
    expect(catalanNumber(2)).toBe(2);
  });

  it("returns 5 for C(3)", () => {
    expect(catalanNumber(3)).toBe(5);
  });

  it("returns 42 for C(5)", () => {
    expect(catalanNumber(5)).toBe(42);
  });

  it("returns 1430 for C(8)", () => {
    expect(catalanNumber(8)).toBe(1430);
  });
});
