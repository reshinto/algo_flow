import { describe, it, expect } from "vitest";
import { generateEvaluateReversePolishSteps } from "../step-generator";

describe("generateEvaluateReversePolishSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateEvaluateReversePolishSteps({ tokens: ["2", "1", "+", "3", "*"] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateEvaluateReversePolishSteps({ tokens: ["2", "1", "+", "3", "*"] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateEvaluateReversePolishSteps({ tokens: ["2", "1", "+", "3", "*"] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateEvaluateReversePolishSteps({ tokens: ["2", "1", "+", "3", "*"] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateEvaluateReversePolishSteps({ tokens: ["2", "1", "+", "3", "*"] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits visit steps for each token", () => {
    const tokens = ["2", "1", "+", "3", "*"];
    const steps = generateEvaluateReversePolishSteps({ tokens });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(tokens.length);
  });

  it("emits push steps for operands, operators, and results", () => {
    const steps = generateEvaluateReversePolishSteps({ tokens: ["2", "1", "+", "3", "*"] });
    // Operands: "2", "1", "3" → 3 pushes; operators: "+", "*" → 2 pushes; results → 2 pushes = 7
    const pushSteps = steps.filter((step) => step.type === "push");
    expect(pushSteps.length).toBe(7);
  });

  it("emits evaluate steps for each operator", () => {
    const steps = generateEvaluateReversePolishSteps({ tokens: ["2", "1", "+", "3", "*"] });
    const evaluateSteps = steps.filter((step) => step.type === "evaluate");
    expect(evaluateSteps.length).toBe(2);
  });

  it("the complete step description contains the final result", () => {
    const steps = generateEvaluateReversePolishSteps({ tokens: ["2", "1", "+", "3", "*"] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.description).toContain("9");
  });

  it("handles a single operand token", () => {
    const steps = generateEvaluateReversePolishSteps({ tokens: ["42"] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.description).toContain("42");
  });

  it("handles the complex LeetCode example", () => {
    const complexTokens = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];
    const steps = generateEvaluateReversePolishSteps({ tokens: complexTokens });
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.description).toContain("22");
  });
});
