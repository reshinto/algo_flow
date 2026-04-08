import { describe, it, expect } from "vitest";
import { generateContiguousArraySteps } from "../step-generator";

describe("generateContiguousArraySteps", () => {
  it("produces steps", () => {
    expect(generateContiguousArraySteps({ numbers: [0, 1, 0, 1, 1, 0] }).length).toBeGreaterThan(0);
  });
  it("starts with initialize", () => {
    expect(generateContiguousArraySteps({ numbers: [0, 1, 0, 1, 1, 0] })[0]?.type).toBe(
      "initialize",
    );
  });
  it("ends with complete", () => {
    const steps = generateContiguousArraySteps({ numbers: [0, 1, 0, 1, 1, 0] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
  it("has hash-map visual states", () => {
    for (const step of generateContiguousArraySteps({ numbers: [0, 1, 0, 1, 1, 0] })) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });
  it("has incrementing indices", () => {
    const steps = generateContiguousArraySteps({ numbers: [0, 1, 0, 1, 1, 0] });
    for (let idx = 0; idx < steps.length; idx++) {
      expect(steps[idx]?.index).toBe(idx);
    }
  });
  it("emits check-prefix steps", () => {
    const steps = generateContiguousArraySteps({ numbers: [0, 1, 0, 1, 1, 0] });
    expect(steps.filter((s) => s.type === "check-prefix").length).toBe(6);
  });
  it("emits prefix-found steps", () => {
    expect(
      generateContiguousArraySteps({ numbers: [0, 1, 0, 1, 1, 0] }).filter(
        (s) => s.type === "prefix-found",
      ).length,
    ).toBeGreaterThan(0);
  });
  it("sets result to 6", () => {
    const steps = generateContiguousArraySteps({ numbers: [0, 1, 0, 1, 1, 0] });
    const last = steps[steps.length - 1]!;
    if (last.visualState.kind === "hash-map") {
      expect(last.visualState.result).toBe(6);
    }
  });
});
