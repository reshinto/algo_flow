import { describe, it, expect } from "vitest";
import { generateExpressionTreeEvaluationSteps } from "./step-generator";

describe("generateExpressionTreeEvaluationSteps", () => {
  const defaultInput = { expression: "3 4 + 2 * 7 /" };

  it("produces steps for default input", () => {
    const steps = generateExpressionTreeEvaluationSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with initialize step", () => {
    const steps = generateExpressionTreeEvaluationSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with complete step", () => {
    const steps = generateExpressionTreeEvaluationSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states throughout", () => {
    const steps = generateExpressionTreeEvaluationSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("produces build-node steps for each token", () => {
    const steps = generateExpressionTreeEvaluationSteps(defaultInput);
    const buildSteps = steps.filter((step) => step.type === "build-node");
    // 5 operands (3,4,2,7) + 3 operators (+,*,/) = 7 tokens
    expect(buildSteps.length).toBe(7);
  });

  it("final complete step has result 2", () => {
    const steps = generateExpressionTreeEvaluationSteps(defaultInput);
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(2);
  });

  it("has incrementing step indices", () => {
    const steps = generateExpressionTreeEvaluationSteps(defaultInput);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
