/** Step generation tests for Suffix Array Construction. */

import { describe, it, expect } from "vitest";
import { generateSuffixArrayConstructionSteps } from "../step-generator";

describe("generateSuffixArrayConstructionSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "banana" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "banana" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "banana" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-distance visual states throughout", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "banana" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-distance");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "banana" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits fill-table steps for suffix index initialization", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "banana" });
    const fillTableSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillTableSteps.length).toBeGreaterThan(0);
  });

  it("emits compare steps during suffix sorting", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "banana" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("emits a trace-edit-path step for the sorted order", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "banana" });
    const traceSteps = steps.filter((step) => step.type === "trace-edit-path");
    expect(traceSteps.length).toBeGreaterThan(0);
  });

  it("emits a found step with the suffix count as result", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "banana" });
    const foundStep = steps.find((step) => step.type === "found");
    expect(foundStep).toBeDefined();
    expect(foundStep?.visualState.kind).toBe("string-distance");
    if (foundStep?.visualState.kind === "string-distance") {
      expect(foundStep.visualState.result).toBe(6);
    }
  });

  it("handles empty string with minimal steps", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "" });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles single character string", () => {
    const steps = generateSuffixArrayConstructionSteps({ text: "a" });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("matrix dimensions match text length for square matrix", () => {
    const text = "abc";
    const steps = generateSuffixArrayConstructionSteps({ text });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "string-distance") {
      expect(firstStep.visualState.matrix.length).toBe(text.length + 1);
      expect(firstStep.visualState.matrix[0]?.length).toBe(text.length + 1);
    }
  });

  it("produces more fill-table steps for longer input", () => {
    const shortSteps = generateSuffixArrayConstructionSteps({ text: "ab" });
    const longSteps = generateSuffixArrayConstructionSteps({ text: "banana" });
    const shortFillCount = shortSteps.filter((step) => step.type === "fill-table").length;
    const longFillCount = longSteps.filter((step) => step.type === "fill-table").length;
    expect(longFillCount).toBeGreaterThan(shortFillCount);
  });
});
