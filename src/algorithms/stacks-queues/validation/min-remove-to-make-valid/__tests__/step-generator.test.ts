import { describe, it, expect } from "vitest";
import { generateMinRemoveToMakeValidSteps } from "../step-generator";

describe("generateMinRemoveToMakeValidSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "a(b(c)d" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "a(b(c)d" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "a(b(c)d" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "a(b(c)d" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "a(b(c)d" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits push steps for each opening bracket", () => {
    // "(a(b)" has two '(' → two push steps
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "(a(b)" });
    const pushSteps = steps.filter((step) => step.type === "push");
    expect(pushSteps.length).toBe(2);
  });

  it("emits match steps for each matched closing bracket", () => {
    // "(a(b)" has one valid match (the inner pair)
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "(a(b)" });
    const matchSteps = steps.filter((step) => step.type === "match");
    expect(matchSteps.length).toBe(1);
  });

  it("emits mismatch steps for unmatched closing brackets", () => {
    // ")ab" has one unmatched ')'
    const steps = generateMinRemoveToMakeValidSteps({ inputString: ")ab" });
    const mismatchSteps = steps.filter((step) => step.type === "mismatch");
    expect(mismatchSteps.length).toBe(1);
  });

  it("emits mismatch steps for unmatched opening brackets after full scan", () => {
    // "ab((" has two unmatched '(' remaining after the scan
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "ab((" });
    const mismatchSteps = steps.filter((step) => step.type === "mismatch");
    expect(mismatchSteps.length).toBe(2);
  });

  it("handles an empty string", () => {
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces no push or mismatch steps for a string without parentheses", () => {
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "abc" });
    const pushSteps = steps.filter((step) => step.type === "push");
    const mismatchSteps = steps.filter((step) => step.type === "mismatch");
    expect(pushSteps.length).toBe(0);
    expect(mismatchSteps.length).toBe(0);
  });

  it("stores the result string in the complete step variables", () => {
    const steps = generateMinRemoveToMakeValidSteps({ inputString: "a(b(c)d" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables).toHaveProperty("resultString");
  });
});
