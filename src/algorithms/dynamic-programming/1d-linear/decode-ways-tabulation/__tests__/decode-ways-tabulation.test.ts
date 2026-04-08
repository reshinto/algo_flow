import { describe, it, expect } from "vitest";
import { decodeWaysTabulation } from "../sources/decode-ways-tabulation.ts?fn";

describe("decodeWaysTabulation", () => {
  it("returns 6 for '12321'", () => {
    expect(decodeWaysTabulation("12321")).toBe(6);
  });

  it("returns 3 for '226'", () => {
    expect(decodeWaysTabulation("226")).toBe(3);
  });

  it("returns 0 for '0' (no valid decoding starting with zero)", () => {
    expect(decodeWaysTabulation("0")).toBe(0);
  });

  it("returns 1 for '10' (only one decoding: J)", () => {
    expect(decodeWaysTabulation("10")).toBe(1);
  });

  it("returns 2 for '12' (A+B or L)", () => {
    expect(decodeWaysTabulation("12")).toBe(2);
  });

  it("returns 0 for an empty string", () => {
    expect(decodeWaysTabulation("")).toBe(0);
  });

  it("returns 1 for a single non-zero digit", () => {
    expect(decodeWaysTabulation("7")).toBe(1);
  });

  it("returns 0 for '00' (both digits are zero)", () => {
    expect(decodeWaysTabulation("00")).toBe(0);
  });

  it("returns 1 for '27' (only 2+7=B+G; 27 > 26 so no two-digit path)", () => {
    expect(decodeWaysTabulation("27")).toBe(1);
  });
});
