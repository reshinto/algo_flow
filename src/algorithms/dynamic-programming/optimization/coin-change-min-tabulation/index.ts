import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { coinChangeMinTabulation } from "./sources/coin-change-min-tabulation.ts?fn";
import { generateCoinChangeMinTabulationSteps } from "./step-generator";
import { coinChangeMinTabulationEducational } from "./educational";

import typescriptSource from "./sources/coin-change-min-tabulation.ts?raw";
import pythonSource from "./sources/coin-change-min-tabulation.py?raw";
import javaSource from "./sources/CoinChangeMinTabulation.java?raw";

interface CoinChangeInput {
  amount: number;
  coins: number[];
}

const coinChangeMinTabulationDefinition: AlgorithmDefinition<CoinChangeInput> = {
  meta: {
    id: ALGORITHM_ID.COIN_CHANGE_MIN_TABULATION!,
    name: "Coin Change — Minimum (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "optimization",
    description:
      "A bottom-up dynamic programming approach that finds the minimum number of coins needed to make a target amount, using a DP table built iteratively from amount 0 upward",
    timeComplexity: {
      best: "O(amount × coins)",
      average: "O(amount × coins)",
      worst: "O(amount × coins)",
    },
    spaceComplexity: "O(amount)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { amount: 11, coins: [1, 5, 10, 25] },
  },
  execute: (input: CoinChangeInput) => coinChangeMinTabulation(input.amount, input.coins),
  generateSteps: generateCoinChangeMinTabulationSteps,
  educational: coinChangeMinTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(coinChangeMinTabulationDefinition);
