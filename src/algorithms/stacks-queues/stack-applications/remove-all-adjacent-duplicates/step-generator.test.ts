import { describe, it, expect } from "vitest";
import { generateRemoveAllAdjacentDuplicatesSteps } from "./step-generator";

describe("generateRemoveAllAdjacentDuplicatesSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "abbaca" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "abbaca" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "abbaca" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "abbaca" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "abbaca" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits push steps for characters that do not match the stack top", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "abbaca" });
    const pushSteps = steps.filter((step) => step.type === "push");
    // a→push, b→push, b→match, a→match, c→push, a→push = 4 pushes
    expect(pushSteps.length).toBe(4);
  });

  it("emits match steps for duplicate pairs that are popped", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "abbaca" });
    const matchSteps = steps.filter((step) => step.type === "match");
    // b-b pair and a-a pair = 2 match steps
    expect(matchSteps.length).toBe(2);
  });

  it("records the correct result in the complete step variables", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "abbaca" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toMatchObject({ result: "ca" });
  });

  it("handles an empty string without errors", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("records an empty result for a fully collapsing string", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "aaaaaa" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toMatchObject({ result: "" });
  });

  it("handles a string with no adjacent duplicates", () => {
    const steps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "abc" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toMatchObject({ result: "abc" });
  });
});
