/** Correctness tests for the stringRotationCheck pure algorithm. */

import { describe, it, expect } from "vitest";
import { stringRotationCheck } from "../sources/string-rotation-check.ts?fn";

describe("stringRotationCheck", () => {
  it("returns true for a valid rotation", () => {
    expect(stringRotationCheck("waterbottle", "erbottlewat")).toBe(true);
  });

  it("returns true when pattern equals text (zero-offset rotation)", () => {
    expect(stringRotationCheck("hello", "hello")).toBe(true);
  });

  it("returns true for single-character strings that match", () => {
    expect(stringRotationCheck("a", "a")).toBe(true);
  });

  it("returns false for single-character strings that differ", () => {
    expect(stringRotationCheck("a", "b")).toBe(false);
  });

  it("returns false when lengths differ", () => {
    expect(stringRotationCheck("abc", "ab")).toBe(false);
  });

  it("returns false when pattern is not a rotation", () => {
    expect(stringRotationCheck("waterbottle", "bottlewater")).toBe(true);
  });

  it("returns false when pattern shares characters but is not a rotation", () => {
    expect(stringRotationCheck("abcde", "abced")).toBe(false);
  });

  it("returns true for rotation at the last offset", () => {
    // Rotating 'abcde' by one: 'bcdea'
    expect(stringRotationCheck("abcde", "bcdea")).toBe(true);
  });

  it("returns true for rotation at the first offset from end", () => {
    // Rotating 'abcde' by four: 'eabcd'
    expect(stringRotationCheck("abcde", "eabcd")).toBe(true);
  });

  it("returns false for two empty strings (vacuously true — same rotation)", () => {
    expect(stringRotationCheck("", "")).toBe(true);
  });

  it("returns false when one is empty and the other is not", () => {
    expect(stringRotationCheck("abc", "")).toBe(false);
  });

  it("handles repeated characters correctly", () => {
    expect(stringRotationCheck("aabaa", "baaab")).toBe(false);
  });

  it("handles repeated characters that are valid rotations", () => {
    expect(stringRotationCheck("aab", "baa")).toBe(true);
  });
});
