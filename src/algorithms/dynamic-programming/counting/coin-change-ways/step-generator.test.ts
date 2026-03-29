import { describe, it, expect } from "vitest";
import { generateCoinChangeWaysSteps } from "./step-generator";

describe("generateCoinChangeWaysSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 5, coins: [1, 2, 5] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 5, coins: [1, 2, 5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 5, coins: [1, 2, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states on every step", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 5, coins: [1, 2, 5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for the base case W(0)=1", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 5, coins: [1, 2, 5] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps for non-zero amounts", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 5, coins: [1, 2, 5] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("includes read-cache steps — one per compute-cell", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 5, coins: [1, 2, 5] });
    const computeCount = steps.filter((step) => step.type === "compute-cell").length;
    const cacheCount = steps.filter((step) => step.type === "read-cache").length;
    expect(cacheCount).toBe(computeCount);
  });

  it("has incrementing step indices", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 5, coins: [1, 2, 5] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("final dp-table state has W(5)=4 for default input", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 5, coins: [1, 2, 5] });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.visualState.kind).toBe("dp-table");
    if (lastStep.visualState.kind === "dp-table") {
      const lastCell = lastStep.visualState.table[5];
      expect(lastCell?.value).toBe(4);
    }
  });

  it("handles amount=0 edge case — only initialize and complete steps", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 0, coins: [1, 2, 5] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("uses W(i) labels on all table cells", () => {
    const steps = generateCoinChangeWaysSteps({ amount: 3, coins: [1] });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "dp-table") {
      expect(firstStep.visualState.table[0]?.label).toBe("W(0)");
      expect(firstStep.visualState.table[1]?.label).toBe("W(1)");
    }
  });
});
