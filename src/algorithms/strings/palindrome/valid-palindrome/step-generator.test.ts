/** Step generation tests for generateValidPalindromeSteps. */

import { describe, it, expect } from "vitest";
import { generateValidPalindromeSteps } from "./step-generator";

describe("generateValidPalindromeSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateValidPalindromeSteps({ text: "A man, a plan, a canal: Panama" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateValidPalindromeSteps({ text: "A man, a plan, a canal: Panama" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateValidPalindromeSteps({ text: "A man, a plan, a canal: Panama" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-palindrome visual states throughout", () => {
    const steps = generateValidPalindromeSteps({ text: "A man, a plan, a canal: Panama" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-palindrome");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateValidPalindromeSteps({ text: "A man, a plan, a canal: Panama" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits skip-char steps when the input contains non-alphanumeric characters", () => {
    const steps = generateValidPalindromeSteps({ text: "A man, a plan, a canal: Panama" });
    const skipSteps = steps.filter((step) => step.type === "skip-char");
    expect(skipSteps.length).toBeGreaterThan(0);
  });

  it("emits compare steps during pointer traversal", () => {
    const steps = generateValidPalindromeSteps({ text: "A man, a plan, a canal: Panama" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("emits char-match steps for a valid palindrome", () => {
    const steps = generateValidPalindromeSteps({ text: "A man, a plan, a canal: Panama" });
    const matchSteps = steps.filter((step) => step.type === "char-match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("emits a char-mismatch step for a non-palindrome", () => {
    const steps = generateValidPalindromeSteps({ text: "race a car" });
    const mismatchSteps = steps.filter((step) => step.type === "char-mismatch");
    expect(mismatchSteps.length).toBeGreaterThan(0);
  });

  it("marks isPalindrome true in final visual state for a valid palindrome", () => {
    const steps = generateValidPalindromeSteps({ text: "A man, a plan, a canal: Panama" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string-palindrome");
    if (completeStep.visualState.kind === "string-palindrome") {
      expect(completeStep.visualState.isPalindrome).toBe(true);
    }
  });

  it("marks isPalindrome false in final visual state for a non-palindrome", () => {
    const steps = generateValidPalindromeSteps({ text: "race a car" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string-palindrome");
    if (completeStep.visualState.kind === "string-palindrome") {
      expect(completeStep.visualState.isPalindrome).toBe(false);
    }
  });

  it("returns true for a string of only spaces — no compare steps", () => {
    const steps = generateValidPalindromeSteps({ text: " " });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBe(0);
  });

  it("does not emit skip-char steps for an already-clean alphanumeric string", () => {
    const steps = generateValidPalindromeSteps({ text: "racecar" });
    const skipSteps = steps.filter((step) => step.type === "skip-char");
    expect(skipSteps.length).toBe(0);
  });
});
