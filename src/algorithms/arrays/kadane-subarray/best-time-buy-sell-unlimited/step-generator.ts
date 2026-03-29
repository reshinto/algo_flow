/** Step generator for Best Time Buy/Sell (Unlimited) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BEST_TIME_BUY_SELL_UNLIMITED!);

interface BestTimeBuySellUnlimitedInput {
  prices: number[];
}

export function generateBestTimeBuySellUnlimitedSteps(
  input: BestTimeBuySellUnlimitedInput,
): ExecutionStep[] {
  const { prices } = input;

  const tracker = new ArrayTracker([...prices], LINE_MAP);

  if (prices.length <= 1) {
    tracker.initialize({ prices: [...prices], arrayLength: prices.length });
    tracker.complete({ totalProfit: 0, transactions: [] });
    return tracker.getSteps();
  }

  let totalProfit = 0;
  const transactions: number[][] = [];
  let buyDay = -1;

  tracker.initialize({
    prices: [...prices],
    arrayLength: prices.length,
    totalProfit,
    buyDay,
  });

  for (let dayIndex = 1; dayIndex < prices.length; dayIndex++) {
    const previousPrice = prices[dayIndex - 1]!;
    const currentPrice = prices[dayIndex]!;
    const isRising = currentPrice > previousPrice;

    tracker.compareTwo(
      dayIndex - 1,
      dayIndex,
      {
        dayIndex,
        previousPrice,
        currentPrice,
        isRising,
        buyDay,
        totalProfit,
        action: isRising
          ? buyDay === -1
            ? "open-buy"
            : "hold"
          : buyDay !== -1
            ? "close-sell"
            : "skip",
      },
      `Day ${dayIndex}: ${currentPrice} ${isRising ? ">" : "<="} ${previousPrice} (${isRising ? "rising" : "falling/flat"})`,
    );

    if (isRising) {
      if (buyDay === -1) {
        buyDay = dayIndex - 1;
        tracker.markElement(
          buyDay,
          "current",
          { buyDay, buyPrice: prices[buyDay], totalProfit },
          `Buy at day ${buyDay} (price=${prices[buyDay]!})`,
          "visit",
        );
      }
    } else {
      if (buyDay !== -1) {
        const profit = previousPrice - prices[buyDay]!;
        totalProfit += profit;
        transactions.push([buyDay, dayIndex - 1]);
        tracker.markElement(
          dayIndex - 1,
          "found",
          { buyDay, sellDay: dayIndex - 1, profit, totalProfit, transactions: [...transactions] },
          `Sell at day ${dayIndex - 1} (price=${previousPrice}): profit=${profit}, total=${totalProfit}`,
          "visit",
        );
        buyDay = -1;
      }
    }
  }

  /* Close any remaining open position at the last price */
  if (buyDay !== -1) {
    const lastDayIndex = prices.length - 1;
    const profit = prices[lastDayIndex]! - prices[buyDay]!;
    totalProfit += profit;
    transactions.push([buyDay, lastDayIndex]);
    tracker.markElement(
      lastDayIndex,
      "found",
      { buyDay, sellDay: lastDayIndex, profit, totalProfit, transactions: [...transactions] },
      `Close position: sell at day ${lastDayIndex} (price=${prices[lastDayIndex]!}): profit=${profit}, total=${totalProfit}`,
      "visit",
    );
  }

  tracker.complete({ totalProfit, transactions });

  return tracker.getSteps();
}
