/** Step generation tests for generatePalindromeCheckSteps. */

import { describe, it, expect } from "vitest";
import { generatePalindromeCheckSteps } from "../step-generator";

describe("generatePalindromeCheckSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generatePalindromeCheckSteps({ text: "racecar" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePalindromeCheckSteps({ text: "racecar" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePalindromeCheckSteps({ text: "racecar" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-palindrome visual states throughout", () => {
    const steps = generatePalindromeCheckSteps({ text: "racecar" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-palindrome");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generatePalindromeCheckSteps({ text: "racecar" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits compare steps during pointer traversal", () => {
    const steps = generatePalindromeCheckSteps({ text: "racecar" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("emits char-match steps for a palindrome", () => {
    const steps = generatePalindromeCheckSteps({ text: "abba" });
    const matchSteps = steps.filter((step) => step.type === "char-match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("emits a char-mismatch step for a non-palindrome", () => {
    const steps = generatePalindromeCheckSteps({ text: "hello" });
    const mismatchSteps = steps.filter((step) => step.type === "char-mismatch");
    expect(mismatchSteps.length).toBeGreaterThan(0);
  });

  it("marks isPalindrome true in final visual state for a palindrome", () => {
    const steps = generatePalindromeCheckSteps({ text: "racecar" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string-palindrome");
    if (completeStep.visualState.kind === "string-palindrome") {
      expect(completeStep.visualState.isPalindrome).toBe(true);
    }
  });

  it("marks isPalindrome false in final visual state for a non-palindrome", () => {
    const steps = generatePalindromeCheckSteps({ text: "hello" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string-palindrome");
    if (completeStep.visualState.kind === "string-palindrome") {
      expect(completeStep.visualState.isPalindrome).toBe(false);
    }
  });

  it("handles a single-character string without compare steps", () => {
    const steps = generatePalindromeCheckSteps({ text: "a" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBe(0);
  });

  it("handles an empty string without compare steps", () => {
    const steps = generatePalindromeCheckSteps({ text: "" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBe(0);
  });
});
