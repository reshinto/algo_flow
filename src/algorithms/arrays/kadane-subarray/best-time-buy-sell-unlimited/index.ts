/**
 * Best Time to Buy and Sell Stock (Unlimited Transactions) registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bestTimeBuySellUnlimited } from "./sources/best-time-buy-sell-unlimited.ts?fn";
import { generateBestTimeBuySellUnlimitedSteps } from "./step-generator";
import { bestTimeBuySellUnlimitedEducational } from "./educational";

import typescriptSource from "./sources/best-time-buy-sell-unlimited.ts?raw";
import pythonSource from "./sources/best-time-buy-sell-unlimited.py?raw";
import javaSource from "./sources/BestTimeBuySellUnlimited.java?raw";

interface BestTimeBuySellUnlimitedInput {
  prices: number[];
}

const bestTimeBuySellUnlimitedDefinition: AlgorithmDefinition<BestTimeBuySellUnlimitedInput> = {
  meta: {
    id: ALGORITHM_ID.BEST_TIME_BUY_SELL_UNLIMITED!,
    name: "Best Time Buy/Sell (Unlimited)",
    category: CATEGORY.ARRAYS!,
    technique: "kadane-subarray",
    description:
      "Maximizes stock trading profit with unlimited transactions using a greedy approach that captures every upward price slope",
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
  execute: (input: BestTimeBuySellUnlimitedInput) => bestTimeBuySellUnlimited(input.prices),
  generateSteps: generateBestTimeBuySellUnlimitedSteps,
  educational: bestTimeBuySellUnlimitedEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(bestTimeBuySellUnlimitedDefinition);
