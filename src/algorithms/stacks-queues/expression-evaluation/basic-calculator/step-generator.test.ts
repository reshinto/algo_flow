import { describe, it, expect } from "vitest";
import { generateBasicCalculatorSteps } from "./step-generator";

describe("generateBasicCalculatorSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateBasicCalculatorSteps({ expression: "1 + (2 - 3)" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBasicCalculatorSteps({ expression: "1 + (2 - 3)" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBasicCalculatorSteps({ expression: "1 + (2 - 3)" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateBasicCalculatorSteps({ expression: "1 + (2 - 3)" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateBasicCalculatorSteps({ expression: "1 + (2 - 3)" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits a visit step for each token", () => {
    // "1 + (2 - 3)" tokenizes to ["1", "+", "(", "2", "-", "3", ")"] = 7 tokens
    const steps = generateBasicCalculatorSteps({ expression: "1 + (2 - 3)" });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(7);
  });

  it("emits a push step for each open parenthesis", () => {
    const steps = generateBasicCalculatorSteps({ expression: "1 + (2 - 3)" });
    const pushSteps = steps.filter((step) => step.type === "push");
    // One push for "(" and one for each operand number: "1", "2" = 3 pushes
    expect(pushSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("emits an evaluate step for the closing parenthesis", () => {
    const steps = generateBasicCalculatorSteps({ expression: "1 + (2 - 3)" });
    const evaluateSteps = steps.filter((step) => step.type === "evaluate");
    expect(evaluateSteps.length).toBe(1);
  });

  it("the complete step description contains the final result", () => {
    const steps = generateBasicCalculatorSteps({ expression: "1 + 1" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.description).toContain("2");
  });

  it("handles a flat expression with no parentheses", () => {
    const steps = generateBasicCalculatorSteps({ expression: "2 + 3" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps[steps.length - 1]?.description).toContain("5");
  });

  it("handles a complex nested expression", () => {
    const steps = generateBasicCalculatorSteps({ expression: "(1+(4+5+2)-3)+(6+8)" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps[steps.length - 1]?.description).toContain("23");
  });
});
