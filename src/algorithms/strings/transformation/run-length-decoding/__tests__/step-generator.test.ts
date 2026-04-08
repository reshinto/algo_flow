// Step generation tests for generateRunLengthDecodingSteps.

import { describe, it, expect } from "vitest";
import { generateRunLengthDecodingSteps } from "../step-generator";

describe("generateRunLengthDecodingSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateRunLengthDecodingSteps({ text: "3a2b4c" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRunLengthDecodingSteps({ text: "3a2b4c" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRunLengthDecodingSteps({ text: "3a2b4c" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-transform visual states throughout", () => {
    const steps = generateRunLengthDecodingSteps({ text: "3a2b4c" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-transform");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRunLengthDecodingSteps({ text: "3a2b4c" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits read-char steps for each digit and each letter", () => {
    const steps = generateRunLengthDecodingSteps({ text: "3a2b4c" });
    const readSteps = steps.filter((step) => step.type === "read-char");
    // Each group emits: 1 read per digit char + 1 read for the letter
    // "3a" → 2 reads, "2b" → 2 reads, "4c" → 2 reads = 6 total
    expect(readSteps.length).toBe(6);
  });

  it("emits write-char steps for each decoded group", () => {
    const steps = generateRunLengthDecodingSteps({ text: "3a2b4c" });
    const writeSteps = steps.filter((step) => step.type === "write-char");
    // One appendOutput step per group = 3 groups
    expect(writeSteps.length).toBe(3);
  });

  it("produces no steps beyond initialize and complete for empty input", () => {
    const steps = generateRunLengthDecodingSteps({ text: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });

  it("emits visit steps for pointer advancement after each group", () => {
    const steps = generateRunLengthDecodingSteps({ text: "1a1b" });
    const visitSteps = steps.filter((step) => step.type === "visit");
    // One setAuxiliaryData (visit) + one advancePointers (visit) per group = 2 per group × 2 groups = 4
    expect(visitSteps.length).toBe(4);
  });

  it("the complete step variables include the decoded result", () => {
    const steps = generateRunLengthDecodingSteps({ text: "3a2b4c" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe("aaabbcccc");
  });

  it("decodes single-count groups in step variables correctly", () => {
    const steps = generateRunLengthDecodingSteps({ text: "1a1b1c" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe("abc");
  });
});
