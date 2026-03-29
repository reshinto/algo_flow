/**
 * Best Time to Buy and Sell Stock (Single Transaction) registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bestTimeBuySell } from "./sources/best-time-buy-sell.ts?fn";
import { generateBestTimeBuySellSteps } from "./step-generator";
import { bestTimeBuySellEducational } from "./educational";

import typescriptSource from "./sources/best-time-buy-sell.ts?raw";
import pythonSource from "./sources/best-time-buy-sell.py?raw";
import javaSource from "./sources/BestTimeBuySell.java?raw";

interface BestTimeBuySellInput {
  prices: number[];
}

const bestTimeBuySellDefinition: AlgorithmDefinition<BestTimeBuySellInput> = {
  meta: {
    id: ALGORITHM_ID.BEST_TIME_BUY_SELL!,
    name: "Best Time to Buy/Sell Stock",
    category: CATEGORY.ARRAYS!,
    technique: "kadane-subarray",
    description:
      "An efficient O(n) algorithm for finding the maximum profit from a single buy-sell stock transaction by tracking the minimum price seen so far",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      prices: [7, 1, 5, 3, 6, 4],
    },
  },
  execute: (input: BestTimeBuySellInput) => bestTimeBuySell(input.prices),
  generateSteps: generateBestTimeBuySellSteps,
  educational: bestTimeBuySellEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(bestTimeBuySellDefinition);
