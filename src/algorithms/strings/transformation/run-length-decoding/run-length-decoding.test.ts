// Correctness tests for the runLengthDecoding pure function.

import { describe, it, expect } from "vitest";
import { runLengthDecoding } from "./sources/run-length-decoding.ts?fn";

describe("runLengthDecoding", () => {
  it("decodes the default example input", () => {
    expect(runLengthDecoding("3a2b4c")).toBe("aaabbcccc");
  });

  it("decodes all single-count groups", () => {
    expect(runLengthDecoding("1a1b1c")).toBe("abc");
  });

  it("returns an empty string for empty input", () => {
    expect(runLengthDecoding("")).toBe("");
  });

  it("decodes a single group of one character", () => {
    expect(runLengthDecoding("1z")).toBe("z");
  });

  it("decodes a single group of many characters", () => {
    expect(runLengthDecoding("5x")).toBe("xxxxx");
  });

  it("decodes mixed-count groups correctly", () => {
    expect(runLengthDecoding("2a3b1c")).toBe("aabbbc");
  });

  it("decodes a string with a multi-digit count", () => {
    expect(runLengthDecoding("10a")).toBe("aaaaaaaaaa");
  });

  it("decodes two consecutive identical characters encoded separately", () => {
    expect(runLengthDecoding("2a2a")).toBe("aaaa");
  });

  it("decodes uppercase letters", () => {
    expect(runLengthDecoding("3A2B")).toBe("AAABB");
  });
});
