import { describe, it, expect } from "vitest";
import { removeAllAdjacentDuplicates } from "../sources/remove-all-adjacent-duplicates.ts?fn";

describe("removeAllAdjacentDuplicates", () => {
  it("returns 'ca' for the default input 'abbaca'", () => {
    expect(removeAllAdjacentDuplicates("abbaca")).toBe("ca");
  });

  it("returns 'ay' for 'azxxzy' with cascading removals", () => {
    expect(removeAllAdjacentDuplicates("azxxzy")).toBe("ay");
  });

  it("returns an empty string for an empty input", () => {
    expect(removeAllAdjacentDuplicates("")).toBe("");
  });

  it("returns the original string when there are no adjacent duplicates", () => {
    expect(removeAllAdjacentDuplicates("abc")).toBe("abc");
  });

  it("returns an empty string when all characters are the same", () => {
    expect(removeAllAdjacentDuplicates("aaaaaa")).toBe("");
  });

  it("returns an empty string when all pairs cancel out completely", () => {
    expect(removeAllAdjacentDuplicates("aabb")).toBe("");
  });

  it("handles a single character without modification", () => {
    expect(removeAllAdjacentDuplicates("a")).toBe("a");
  });

  it("handles a string with a single adjacent duplicate pair", () => {
    expect(removeAllAdjacentDuplicates("abba")).toBe("");
  });
});
