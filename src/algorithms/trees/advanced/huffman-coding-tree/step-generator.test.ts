import { describe, it, expect } from "vitest";
import { generateHuffmanCodingTreeSteps } from "./step-generator";

describe("generateHuffmanCodingTreeSteps", () => {
  const defaultInput = {
    frequencies: [
      { char: "a", freq: 5 },
      { char: "b", freq: 9 },
      { char: "c", freq: 12 },
      { char: "d", freq: 13 },
      { char: "e", freq: 16 },
      { char: "f", freq: 45 },
    ],
  };

  it("produces steps for default input", () => {
    const steps = generateHuffmanCodingTreeSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with initialize step", () => {
    const steps = generateHuffmanCodingTreeSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with complete step", () => {
    const steps = generateHuffmanCodingTreeSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states", () => {
    const steps = generateHuffmanCodingTreeSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("produces build-node steps during tree construction", () => {
    const steps = generateHuffmanCodingTreeSteps(defaultInput);
    const buildSteps = steps.filter((step) => step.type === "build-node");
    expect(buildSteps.length).toBeGreaterThan(0);
  });

  it("produces encode-char steps for each character", () => {
    const steps = generateHuffmanCodingTreeSteps(defaultInput);
    const encodeSteps = steps.filter((step) => step.type === "encode-char");
    expect(encodeSteps.length).toBe(defaultInput.frequencies.length);
  });

  it("has incrementing step indices", () => {
    const steps = generateHuffmanCodingTreeSteps(defaultInput);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
