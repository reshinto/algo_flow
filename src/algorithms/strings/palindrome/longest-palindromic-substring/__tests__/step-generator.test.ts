/** Step generation tests for generateLongestPalindromicSubstringSteps. */

import { describe, it, expect } from "vitest";
import { generateLongestPalindromicSubstringSteps } from "../step-generator";

describe("generateLongestPalindromicSubstringSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "babad" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "babad" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "babad" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-palindrome visual states throughout", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "babad" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-palindrome");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "babad" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits expand-center steps during traversal", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "babad" });
    const expandSteps = steps.filter((step) => step.type === "expand-center");
    expect(expandSteps.length).toBeGreaterThan(0);
  });

  it("emits compare steps during expansion", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "babad" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("emits char-match steps when characters are equal", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "abba" });
    const matchSteps = steps.filter((step) => step.type === "char-match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("emits char-mismatch steps when characters differ", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "cbbd" });
    const mismatchSteps = steps.filter((step) => step.type === "char-mismatch");
    expect(mismatchSteps.length).toBeGreaterThan(0);
  });

  it("emits a check-palindrome step to record a new longest", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "babad" });
    const updateSteps = steps.filter((step) => step.type === "check-palindrome");
    expect(updateSteps.length).toBeGreaterThan(0);
  });

  it("records a longestLength of 3 in the final state for 'babad'", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "babad" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string-palindrome");
    if (completeStep.visualState.kind === "string-palindrome") {
      expect(completeStep.visualState.longestLength).toBe(3);
    }
  });

  it("records a longestLength of 2 in the final state for 'cbbd'", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "cbbd" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string-palindrome");
    if (completeStep.visualState.kind === "string-palindrome") {
      expect(completeStep.visualState.longestLength).toBe(2);
    }
  });

  it("handles a single character without expand-center expansions beyond initial", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "a" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBe(0);
  });

  it("handles an empty string with just initialize and complete steps", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });

  it("marks isPalindrome true in final visual state", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "racecar" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string-palindrome") {
      expect(completeStep.visualState.isPalindrome).toBe(true);
    }
  });

  it("records longestLength of 7 for 'racecar'", () => {
    const steps = generateLongestPalindromicSubstringSteps({ text: "racecar" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string-palindrome") {
      expect(completeStep.visualState.longestLength).toBe(7);
    }
  });
});
