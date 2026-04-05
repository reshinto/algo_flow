import { describe, it, expect } from "vitest";
import { generateFirstNonRepeatingCharStreamSteps } from "./step-generator";

const DEFAULT_INPUT = { inputString: "aabcbcd" };

describe("generateFirstNonRepeatingCharStreamSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits one visit step per character in the input", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(DEFAULT_INPUT.inputString.length);
  });

  it("emits one enqueue step per character in the input", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    expect(enqueueSteps.length).toBe(DEFAULT_INPUT.inputString.length);
  });

  it("emits one peek step per character in the input", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    const peekSteps = steps.filter((step) => step.type === "peek");
    expect(peekSteps.length).toBe(DEFAULT_INPUT.inputString.length);
  });

  it("emits dequeue steps when repeated characters are pruned from the front", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    // 'aabcbcd': second 'a' evicts 2 (both 'a's), second 'b' evicts 1, second 'c' evicts 3 (c,b,c) = 6 total
    expect(dequeueSteps.length).toBe(6);
  });

  it("emits a single complete step", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    const completeSteps = steps.filter((step) => step.type === "complete");
    expect(completeSteps.length).toBe(1);
  });

  it("tracks queue operations in metrics", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.metrics.queueOperations).toBeGreaterThan(0);
  });

  it("handles a single character input", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps({ inputString: "x" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(1);
  });

  it("handles an empty string with only initialize and complete steps", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps({ inputString: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(0);
  });

  it("includes results in the complete step variables", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps(DEFAULT_INPUT);
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("results");
    expect(completeStep?.variables).toHaveProperty("inputString");
  });

  it("emits no dequeue steps when all characters are distinct", () => {
    const steps = generateFirstNonRepeatingCharStreamSteps({ inputString: "abcd" });
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps.length).toBe(0);
  });
});
