/** Step generator for Online Stock Span — produces ExecutionStep[] using NumericStackTracker. */

import type { ExecutionStep } from "@/types";
import { NumericStackTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const OSS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ONLINE_STOCK_SPAN!);

export interface OnlineStockSpanInput {
  prices: number[];
}

export function generateOnlineStockSpanSteps(input: OnlineStockSpanInput): ExecutionStep[] {
  const { prices } = input;
  const tracker = new NumericStackTracker(prices, OSS_LINE_MAP);
  tracker.setMonotonicOrder("decreasing");

  // Logical stack drives pop decisions; tracker's internal stack drives visual animation.
  // Each iteration: maintainMonotonic pops (synced), pushIndex pushes (synced),
  // then popAndResolve immediately resolves the current span into the result array.
  const logicalStack: [number, number][] = [];

  tracker.initialize({ prices });

  for (let priceIdx = 0; priceIdx < prices.length; priceIdx++) {
    const currentPrice = prices[priceIdx]!;
    let spanCount = 1;

    tracker.processElement(priceIdx, { priceIdx, currentPrice, spanCount });

    // Maintain monotonic decreasing order — pop entries with price <= currentPrice
    while (logicalStack.length > 0 && logicalStack[logicalStack.length - 1]![0] <= currentPrice) {
      const [stackTopPrice, stackTopSpan] = logicalStack[logicalStack.length - 1]!;
      spanCount += stackTopSpan;
      logicalStack.pop();

      tracker.maintainMonotonic(
        { priceIdx, currentPrice, spanCount, stackTopPrice, stackTopSpan },
        `Pop price ${stackTopPrice} (span ${stackTopSpan}) — it is ≤ ${currentPrice}, accumulate span`,
      );
    }

    // Push current price and accumulated span onto logical and tracker stacks
    logicalStack.push([currentPrice, spanCount]);
    tracker.pushIndex(
      priceIdx,
      { priceIdx, currentPrice, spanCount },
      `Push price ${currentPrice} with accumulated span ${spanCount}`,
    );

    // Resolve: record the computed span in the result array and show the resolution step
    tracker.popAndResolve(
      spanCount,
      { priceIdx, currentPrice, spanCount, resolvedIndex: priceIdx },
      `Span for day ${priceIdx} (price ${currentPrice}) = ${spanCount}`,
    );
  }

  tracker.complete({ resultLength: prices.length }, "All prices processed — spans resolved");

  return tracker.getSteps();
}
