import { describe, it, expect } from "vitest";
import { decodeString } from "../sources/decode-string.ts?fn";

describe("decodeString", () => {
  it("decodes a simple single-level repetition", () => {
    expect(decodeString("3[a]")).toBe("aaa");
  });

  it("decodes nested brackets with inner repetition", () => {
    expect(decodeString("3[a2[c]]")).toBe("accaccacc");
  });

  it("decodes multiple top-level groups with trailing letters", () => {
    expect(decodeString("2[abc]3[cd]ef")).toBe("abcabccdcdcdef");
  });

  it("returns a plain string unchanged when no encoding is present", () => {
    expect(decodeString("abc")).toBe("abc");
  });

  it("handles a single character repeated many times", () => {
    expect(decodeString("5[z]")).toBe("zzzzz");
  });

  it("handles deeply nested brackets", () => {
    expect(decodeString("2[2[a]]")).toBe("aaaa");
  });

  it("returns an empty string for empty input", () => {
    expect(decodeString("")).toBe("");
  });

  it("handles multi-digit repeat counts", () => {
    expect(decodeString("10[a]")).toBe("aaaaaaaaaa");
  });

  it("handles letters before and after bracket groups", () => {
    expect(decodeString("a2[b]c")).toBe("abbc");
  });
});
