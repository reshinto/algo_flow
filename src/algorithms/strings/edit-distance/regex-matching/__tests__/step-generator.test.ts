/** Step generation tests for Regular Expression Matching. */

import { describe, it, expect } from "vitest";
import { generateRegexMatchingSteps } from "../step-generator";

describe("generateRegexMatchingSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateRegexMatchingSteps({ text: "aab", pattern: "c*a*b" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRegexMatchingSteps({ text: "aab", pattern: "c*a*b" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRegexMatchingSteps({ text: "aab", pattern: "c*a*b" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-distance visual states throughout", () => {
    const steps = generateRegexMatchingSteps({ text: "aab", pattern: "c*a*b" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-distance");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRegexMatchingSteps({ text: "aab", pattern: "c*a*b" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits fill-table steps for base cases", () => {
    const steps = generateRegexMatchingSteps({ text: "aab", pattern: "c*a*b" });
    const fillTableSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillTableSteps.length).toBeGreaterThan(0);
  });

  it("emits compute-distance steps for interior cells", () => {
    const steps = generateRegexMatchingSteps({ text: "aab", pattern: "c*a*b" });
    const computeSteps = steps.filter((step) => step.type === "compute-distance");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("emits a trace-edit-path step", () => {
    const steps = generateRegexMatchingSteps({ text: "aab", pattern: "c*a*b" });
    const traceSteps = steps.filter((step) => step.type === "trace-edit-path");
    expect(traceSteps.length).toBeGreaterThan(0);
  });

  it("emits a found step with result 1 for a matching input", () => {
    const steps = generateRegexMatchingSteps({ text: "aab", pattern: "c*a*b" });
    const foundStep = steps.find((step) => step.type === "found");
    expect(foundStep).toBeDefined();
    expect(foundStep?.visualState.kind).toBe("string-distance");
    if (foundStep?.visualState.kind === "string-distance") {
      expect(foundStep.visualState.result).toBe(1);
    }
  });

  it('returns result 0 for non-matching "aa" against "a"', () => {
    const steps = generateRegexMatchingSteps({ text: "aa", pattern: "a" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(0);
    }
  });

  it('returns result 1 for matching "ab" against ".*"', () => {
    const steps = generateRegexMatchingSteps({ text: "ab", pattern: ".*" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(1);
    }
  });

  it("returns result 1 for empty text against empty pattern", () => {
    const steps = generateRegexMatchingSteps({ text: "", pattern: "" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(1);
    }
  });

  it("emits compare steps when processing interior cells", () => {
    const steps = generateRegexMatchingSteps({ text: "ab", pattern: "a." });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("matrix dimensions match text and pattern lengths", () => {
    const text = "aab";
    const pattern = "c*a*b";
    const steps = generateRegexMatchingSteps({ text, pattern });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "string-distance") {
      expect(firstStep.visualState.matrix.length).toBe(text.length + 1);
      expect(firstStep.visualState.matrix[0]?.length).toBe(pattern.length + 1);
    }
  });
});
