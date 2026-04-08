import { describe, it, expect } from "vitest";
import { generateBestTimeBuySellSteps } from "../step-generator";

describe("generateBestTimeBuySellSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [7, 1, 5, 3, 6, 4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [7, 1, 5, 3, 6, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [7, 1, 5, 3, 6, 4] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("all steps have array visual state", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [7, 1, 5, 3, 6, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [7, 1, 5, 3, 6, 4] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles empty array gracefully", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles single element gracefully", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [42] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("includes compare steps for each day after the first", () => {
    const priceArray = [7, 1, 5, 3];
    const steps = generateBestTimeBuySellSteps({ prices: priceArray });
    const compareSteps = steps.filter((step) => step.type === "compare");
    /* One compare step per day after day 0: priceArray.length - 1 = 3 */
    expect(compareSteps.length).toBe(3);
  });

  it("includes visit steps for each new min price or new max profit", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [7, 1, 5, 3, 6, 4] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    /* Day 0 init mark + day 1 new min + day 2 new max profit + day 4 new max profit = 4 */
    expect(visitSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("complete step variables contain expected keys", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [7, 1, 5, 3, 6, 4] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("maxProfit");
    expect(completeStep?.variables).toHaveProperty("buyDay");
    expect(completeStep?.variables).toHaveProperty("sellDay");
  });

  it("compare step variables contain expected keys", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [7, 1, 5] });
    const compareStep = steps.find((step) => step.type === "compare");
    expect(compareStep?.variables).toHaveProperty("currentPrice");
    expect(compareStep?.variables).toHaveProperty("minPrice");
    expect(compareStep?.variables).toHaveProperty("potentialProfit");
    expect(compareStep?.variables).toHaveProperty("maxProfit");
  });

  it("complete step reports correct profit for the default input", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [7, 1, 5, 3, 6, 4] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.maxProfit).toBe(5);
  });

  it("complete step reports zero profit when no transaction is possible", () => {
    const steps = generateBestTimeBuySellSteps({ prices: [5, 4, 3, 2, 1] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.maxProfit).toBe(0);
  });
});
