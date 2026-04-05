import { describe, it, expect } from "vitest";
import { generateInfixToPostfixSteps } from "./step-generator";

describe("generateInfixToPostfixSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateInfixToPostfixSteps({ expression: "a+b*(c-d)" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateInfixToPostfixSteps({ expression: "a+b*(c-d)" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateInfixToPostfixSteps({ expression: "a+b*(c-d)" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateInfixToPostfixSteps({ expression: "a+b*(c-d)" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateInfixToPostfixSteps({ expression: "a+b*(c-d)" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits output steps for each operand in a+b", () => {
    const steps = generateInfixToPostfixSteps({ expression: "a+b" });
    const outputSteps = steps.filter((step) => step.type === "output");
    // Both operands and final operator pop produce output steps
    expect(outputSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("emits push steps for operators", () => {
    const steps = generateInfixToPostfixSteps({ expression: "a+b" });
    const pushSteps = steps.filter((step) => step.type === "push");
    expect(pushSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("the complete step variables contain the postfix result", () => {
    const steps = generateInfixToPostfixSteps({ expression: "a+b" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    expect(completeStep.variables).toHaveProperty("postfix");
    expect(completeStep.variables["postfix"]).toBe("a b +");
  });

  it("handles a single operand with no operators", () => {
    const steps = generateInfixToPostfixSteps({ expression: "a" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles parenthesized expressions", () => {
    const steps = generateInfixToPostfixSteps({ expression: "(a+b)*c" });
    expect(steps.length).toBeGreaterThan(0);
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["postfix"]).toBe("a b + c *");
  });

  it("produces correct postfix for a+b+c (left-associativity)", () => {
    const steps = generateInfixToPostfixSteps({ expression: "a+b+c" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["postfix"]).toBe("a b + c +");
  });
});
