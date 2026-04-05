import { describe, it, expect } from "vitest";
import { generateLongestValidParenthesesSteps } from "./step-generator";

describe("generateLongestValidParenthesesSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: "(()())" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: "(()())" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: "(()())" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: "(()())" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: "(()())" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits push steps for each opening bracket", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: "(()())" });
    const pushSteps = steps.filter((step) => step.type === "push");
    // 3 opening brackets + 1 initial sentinel base push = 4 push steps
    expect(pushSteps.length).toBeGreaterThanOrEqual(3);
  });

  it("emits match steps when closing bracket extends a valid run", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: "(()())" });
    const matchSteps = steps.filter((step) => step.type === "match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("emits a mismatch step when closing bracket empties the stack", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: ")()())" });
    const mismatchSteps = steps.filter((step) => step.type === "mismatch");
    expect(mismatchSteps.length).toBeGreaterThan(0);
  });

  it("handles an empty string", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles all opening brackets with no match steps", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: "(((" });
    const matchSteps = steps.filter((step) => step.type === "match");
    expect(matchSteps.length).toBe(0);
  });

  it("the complete step variables contain maxLength", () => {
    const steps = generateLongestValidParenthesesSteps({ inputString: "(()())" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("maxLength", 6);
  });
});
