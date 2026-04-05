import { describe, it, expect } from "vitest";
import { simplifyPath } from "./sources/simplify-path.ts?fn";

describe("simplifyPath", () => {
  it("simplifies a path with dot and double-dot components", () => {
    expect(simplifyPath("/a/./b/../../c/")).toBe("/c");
  });

  it("removes trailing slash from a simple directory", () => {
    expect(simplifyPath("/home/")).toBe("/home");
  });

  it("returns root for a path that navigates above root", () => {
    expect(simplifyPath("/../")).toBe("/");
  });

  it("collapses consecutive slashes between directories", () => {
    expect(simplifyPath("/home//foo/")).toBe("/home/foo");
  });

  it("returns root for a lone slash", () => {
    expect(simplifyPath("/")).toBe("/");
  });

  it("handles a deeply nested path without any dot components", () => {
    expect(simplifyPath("/a/b/c/d")).toBe("/a/b/c/d");
  });

  it("handles multiple consecutive double-dot components", () => {
    expect(simplifyPath("/a/b/../../c/d/../e")).toBe("/c/e");
  });

  it("treats double-dot at root as a no-op", () => {
    expect(simplifyPath("/..")).toBe("/");
  });

  it("handles a path with only dot components", () => {
    expect(simplifyPath("/./././.")).toBe("/");
  });
});
