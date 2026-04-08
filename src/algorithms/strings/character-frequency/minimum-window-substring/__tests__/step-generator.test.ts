/** Step generation tests for Minimum Window Substring — verifies step types and visual state. */

import { describe, it, expect } from "vitest";
import { generateMinimumWindowSubstringSteps } from "../step-generator";

describe("generateMinimumWindowSubstringSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "ADOBECODEBANC", pattern: "ABC" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "ADOBECODEBANC", pattern: "ABC" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "ADOBECODEBANC", pattern: "ABC" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-frequency visual states throughout", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "ADOBECODEBANC", pattern: "ABC" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-frequency");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "ADOBECODEBANC", pattern: "ABC" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits expand-window steps for each character in text", () => {
    const textInput = "ADOBECODEBANC";
    const steps = generateMinimumWindowSubstringSteps({ text: textInput, pattern: "ABC" });
    const expandSteps = steps.filter((step) => step.type === "expand-window");
    expect(expandSteps.length).toBe(textInput.length);
  });

  it("emits at least one add-to-result step when a valid window exists", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "ADOBECODEBANC", pattern: "ABC" });
    const resultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(resultSteps.length).toBeGreaterThan(0);
  });

  it("emits shrink-window steps when all characters are satisfied", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "ADOBECODEBANC", pattern: "ABC" });
    const shrinkSteps = steps.filter((step) => step.type === "shrink-window");
    expect(shrinkSteps.length).toBeGreaterThan(0);
  });

  it("emits window-match steps when a required character is satisfied", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "ADOBECODEBANC", pattern: "ABC" });
    const matchSteps = steps.filter((step) => step.type === "window-match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("early exits with only initialize and complete steps for empty pattern", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "abc", pattern: "" });
    expect(steps).toHaveLength(2);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[1]?.type).toBe("complete");
  });

  it("early exits with only initialize and complete when text is shorter than pattern", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "ab", pattern: "abc" });
    expect(steps).toHaveLength(2);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[1]?.type).toBe("complete");
  });

  it("produces string-frequency kind for no-match inputs", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "aaaa", pattern: "z" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-frequency");
    }
  });

  it("emits no add-to-result steps when no valid window exists", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "aaaa", pattern: "z" });
    const resultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(resultSteps).toHaveLength(0);
  });

  it("returns steps for single character text matching single character pattern", () => {
    const steps = generateMinimumWindowSubstringSteps({ text: "a", pattern: "a" });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
