/** Step generator for Best Time to Buy and Sell Stock — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BEST_TIME_BUY_SELL!);

interface BestTimeBuySellInput {
  prices: number[];
}

export function generateBestTimeBuySellSteps(input: BestTimeBuySellInput): ExecutionStep[] {
  const { prices } = input;

  const tracker = new ArrayTracker([...prices], LINE_MAP);

  if (prices.length === 0) {
    tracker.initialize({ arrayLength: 0 });
    tracker.complete({ maxProfit: 0, buyDay: -1, sellDay: -1 });
    return tracker.getSteps();
  }

  if (prices.length === 1) {
    tracker.initialize({
      prices: [...prices],
      arrayLength: prices.length,
      minPrice: prices[0],
      maxProfit: 0,
    });
    tracker.complete({ maxProfit: 0, buyDay: -1, sellDay: -1 });
    return tracker.getSteps();
  }

  let minPrice = prices[0]!;
  let maxProfit = 0;
  let buyDay = 0;
  let sellDay = 0;
  let currentBuyDay = 0;

  tracker.initialize({
    prices: [...prices],
    arrayLength: prices.length,
    minPrice,
    maxProfit,
    buyDay,
    sellDay,
  });

  /* Mark the first element as the initial minimum price candidate */
  tracker.markElement(
    0,
    "current",
    {
      currentPrice: prices[0],
      minPrice,
      potentialProfit: 0,
      maxProfit,
      buyDay,
      sellDay,
    },
    `Start: price on day 0 is ${prices[0]}, initial min price = ${minPrice}`,
    "visit",
  );

  for (let dayIndex = 1; dayIndex < prices.length; dayIndex++) {
    const currentPrice = prices[dayIndex]!;
    const potentialProfit = currentPrice - minPrice;

    tracker.compareTwo(
      currentBuyDay,
      dayIndex,
      {
        currentPrice,
        minPrice,
        potentialProfit,
        maxProfit,
        buyDay,
        sellDay,
        newMinFound: currentPrice < minPrice,
        newMaxFound: potentialProfit > maxProfit,
      },
      `Day ${dayIndex}: price=${currentPrice}, minPrice=${minPrice}, profit=${potentialProfit}`,
    );

    if (currentPrice < minPrice) {
      minPrice = currentPrice;
      currentBuyDay = dayIndex;

      tracker.markElement(
        dayIndex,
        "current",
        {
          currentPrice,
          minPrice,
          potentialProfit: 0,
          maxProfit,
          buyDay,
          sellDay,
        },
        `New min price ${minPrice} found on day ${dayIndex}`,
        "visit",
      );
    }

    if (potentialProfit > maxProfit) {
      maxProfit = potentialProfit;
      buyDay = currentBuyDay;
      sellDay = dayIndex;

      tracker.markElement(
        dayIndex,
        "found",
        {
          currentPrice,
          minPrice,
          potentialProfit,
          maxProfit,
          buyDay,
          sellDay,
        },
        `New max profit ${maxProfit}: buy day ${buyDay}, sell day ${sellDay}`,
        "visit",
      );
    }
  }

  tracker.complete({
    maxProfit,
    buyDay: maxProfit > 0 ? buyDay : -1,
    sellDay: maxProfit > 0 ? sellDay : -1,
  });

  return tracker.getSteps();
}
