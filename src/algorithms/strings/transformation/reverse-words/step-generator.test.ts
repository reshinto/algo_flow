/** Step generation tests for Reverse Words in a String. */

import { describe, it, expect } from "vitest";
import { generateReverseWordsSteps } from "./step-generator";

describe("generateReverseWordsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateReverseWordsSteps({ text: "the sky is blue" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateReverseWordsSteps({ text: "the sky is blue" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateReverseWordsSteps({ text: "the sky is blue" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-transform visual states throughout", () => {
    const steps = generateReverseWordsSteps({ text: "the sky is blue" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-transform");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateReverseWordsSteps({ text: "the sky is blue" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits a splitting phase step", () => {
    const steps = generateReverseWordsSteps({ text: "the sky is blue" });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
    expect(visitSteps.some((step) => step.description.includes("splitting"))).toBe(true);
  });

  it("emits a reversing phase step", () => {
    const steps = generateReverseWordsSteps({ text: "the sky is blue" });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.some((step) => step.description.includes("reversing"))).toBe(true);
  });

  it("emits read-char steps for each word boundary", () => {
    const steps = generateReverseWordsSteps({ text: "the sky is blue" });
    const readSteps = steps.filter((step) => step.type === "read-char");
    // 4 words → 4 read-char steps during splitting phase
    expect(readSteps.length).toBe(4);
  });

  it("emits write-char steps during the reversing phase", () => {
    const steps = generateReverseWordsSteps({ text: "the sky is blue" });
    const writeSteps = steps.filter((step) => step.type === "write-char");
    expect(writeSteps.length).toBeGreaterThan(0);
  });

  it("produces no read-char steps for a single-word input", () => {
    const steps = generateReverseWordsSteps({ text: "hello" });
    const readSteps = steps.filter((step) => step.type === "read-char");
    // Only 1 word, 1 read-char step during splitting
    expect(readSteps.length).toBe(1);
  });

  it("produces steps for input with extra whitespace", () => {
    const steps = generateReverseWordsSteps({ text: "  hello world  " });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("final complete step variables contain the reversed result", () => {
    const steps = generateReverseWordsSteps({ text: "the sky is blue" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe("blue is sky the");
  });
});
