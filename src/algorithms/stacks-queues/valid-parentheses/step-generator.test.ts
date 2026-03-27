import { describe, it, expect } from "vitest";
import { generateValidParenthesesSteps } from "./step-generator";

describe("generateValidParenthesesSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateValidParenthesesSteps({ inputString: "({[]})" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateValidParenthesesSteps({ inputString: "({[]})" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateValidParenthesesSteps({ inputString: "({[]})" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateValidParenthesesSteps({ inputString: "({[]})" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateValidParenthesesSteps({ inputString: "({[]})" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits push steps for each opening bracket", () => {
    const steps = generateValidParenthesesSteps({ inputString: "({[]})" });
    const pushSteps = steps.filter((step) => step.type === "push");
    expect(pushSteps.length).toBe(3);
  });

  it("emits match steps for each valid closing bracket", () => {
    const steps = generateValidParenthesesSteps({ inputString: "({[]})" });
    const matchSteps = steps.filter((step) => step.type === "match");
    expect(matchSteps.length).toBe(3);
  });

  it("emits a mismatch step and terminates early on invalid input", () => {
    const steps = generateValidParenthesesSteps({ inputString: "(]" });
    const mismatchSteps = steps.filter((step) => step.type === "mismatch");
    expect(mismatchSteps.length).toBe(1);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles an empty string", () => {
    const steps = generateValidParenthesesSteps({ inputString: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
