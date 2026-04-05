import { describe, it, expect } from "vitest";
import { generateOnlineStockSpanSteps } from "./step-generator";

describe("generateOnlineStockSpanSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateOnlineStockSpanSteps({ prices: [100, 80, 60, 70, 60, 75, 85] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateOnlineStockSpanSteps({ prices: [100, 80, 60, 70, 60, 75, 85] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateOnlineStockSpanSteps({ prices: [100, 80, 60, 70, 60, 75, 85] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateOnlineStockSpanSteps({ prices: [100, 80, 60, 70, 60, 75, 85] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateOnlineStockSpanSteps({ prices: [100, 80, 60, 70, 60, 75, 85] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits a visit step for each price", () => {
    const prices = [100, 80, 60, 70, 60, 75, 85];
    const steps = generateOnlineStockSpanSteps({ prices });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(prices.length);
  });

  it("emits a push step for each price", () => {
    const prices = [100, 80, 60, 70, 60, 75, 85];
    const steps = generateOnlineStockSpanSteps({ prices });
    const pushSteps = steps.filter((step) => step.type === "push");
    expect(pushSteps.length).toBe(prices.length);
  });

  it("emits maintain-monotonic steps when prices are popped", () => {
    // [10, 5, 8] — price 8 pops price 5
    const steps = generateOnlineStockSpanSteps({ prices: [10, 5, 8] });
    const monotonicSteps = steps.filter((step) => step.type === "maintain-monotonic");
    expect(monotonicSteps.length).toBeGreaterThan(0);
  });

  it("emits no maintain-monotonic steps for strictly decreasing input", () => {
    const steps = generateOnlineStockSpanSteps({ prices: [100, 90, 80, 70] });
    const monotonicSteps = steps.filter((step) => step.type === "maintain-monotonic");
    expect(monotonicSteps.length).toBe(0);
  });

  it("handles a single price", () => {
    const steps = generateOnlineStockSpanSteps({ prices: [42] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("variables contain priceIdx and currentPrice on visit steps", () => {
    const steps = generateOnlineStockSpanSteps({ prices: [100, 80] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps[0]?.variables).toMatchObject({ priceIdx: 0, currentPrice: 100 });
    expect(visitSteps[1]?.variables).toMatchObject({ priceIdx: 1, currentPrice: 80 });
  });
});
