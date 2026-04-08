/** Correctness tests for the wildcardMatching pure function. */

import { describe, it, expect } from "vitest";
import { wildcardMatching } from "../sources/wildcard-matching.ts?fn";

describe("wildcardMatching", () => {
  it('matches "adceb" against "*a*b" returning true', () => {
    expect(wildcardMatching("adceb", "*a*b")).toBe(true);
  });

  it('does not match "aa" against "a" returning false', () => {
    expect(wildcardMatching("aa", "a")).toBe(false);
  });

  it('matches "aa" against "*" returning true', () => {
    expect(wildcardMatching("aa", "*")).toBe(true);
  });

  it("matches empty text against empty pattern returning true", () => {
    expect(wildcardMatching("", "")).toBe(true);
  });

  it('matches "abc" against "a?c" returning true', () => {
    expect(wildcardMatching("abc", "a?c")).toBe(true);
  });

  it('does not match "abc" against "a?b" returning false', () => {
    expect(wildcardMatching("abc", "a?b")).toBe(false);
  });

  it('matches any string against "*" returning true', () => {
    expect(wildcardMatching("anylongstring", "*")).toBe(true);
  });

  it('matches empty text against "***" returning true', () => {
    expect(wildcardMatching("", "***")).toBe(true);
  });

  it('does not match "cb" against "?a" returning false', () => {
    expect(wildcardMatching("cb", "?a")).toBe(false);
  });

  it('matches "adceb" against "*a*" returning true', () => {
    expect(wildcardMatching("adceb", "*a*")).toBe(true);
  });

  it('does not match empty text against "a" returning false', () => {
    expect(wildcardMatching("", "a")).toBe(false);
  });

  it('matches "abc" against "*bc" returning true', () => {
    expect(wildcardMatching("abc", "*bc")).toBe(true);
  });

  it('matches "abc" against "abc" exactly returning true', () => {
    expect(wildcardMatching("abc", "abc")).toBe(true);
  });

  it('does not match "abc" against "abcd" returning false', () => {
    expect(wildcardMatching("abc", "abcd")).toBe(false);
  });

  it('matches single char "a" against "?" returning true', () => {
    expect(wildcardMatching("a", "?")).toBe(true);
  });
});
