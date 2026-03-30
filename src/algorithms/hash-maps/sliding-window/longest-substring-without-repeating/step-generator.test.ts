import { describe, it, expect } from "vitest";
import { generateLongestSubstringWithoutRepeatingSteps } from "./step-generator";

describe("generateLongestSubstringWithoutRepeatingSteps", () => {
  it("produces steps", () => {
    expect(
      generateLongestSubstringWithoutRepeatingSteps({ text: "abcabcbb" }).length,
    ).toBeGreaterThan(0);
  });
  it("starts with initialize", () => {
    expect(generateLongestSubstringWithoutRepeatingSteps({ text: "abcabcbb" })[0]?.type).toBe(
      "initialize",
    );
  });
  it("ends with complete", () => {
    const steps = generateLongestSubstringWithoutRepeatingSteps({ text: "abcabcbb" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
  it("has hash-map visual states", () => {
    for (const step of generateLongestSubstringWithoutRepeatingSteps({ text: "abcabcbb" })) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });
  it("has incrementing indices", () => {
    const steps = generateLongestSubstringWithoutRepeatingSteps({ text: "abcabcbb" });
    for (let idx = 0; idx < steps.length; idx++) {
      expect(steps[idx]?.index).toBe(idx);
    }
  });
  it("emits check-duplicate steps", () => {
    expect(
      generateLongestSubstringWithoutRepeatingSteps({ text: "abcabcbb" }).filter(
        (s) => s.type === "check-duplicate",
      ).length,
    ).toBe(8);
  });
  it("emits update-value steps", () => {
    expect(
      generateLongestSubstringWithoutRepeatingSteps({ text: "abcabcbb" }).filter(
        (s) => s.type === "update-value",
      ).length,
    ).toBeGreaterThan(0);
  });
  it("sets result to 3", () => {
    const steps = generateLongestSubstringWithoutRepeatingSteps({ text: "abcabcbb" });
    const last = steps[steps.length - 1]!;
    if (last.visualState.kind === "hash-map") {
      expect(last.visualState.result).toBe(3);
    }
  });
});
