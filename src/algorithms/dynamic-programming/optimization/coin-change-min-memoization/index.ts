import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { coinChangeMinMemoization } from "./sources/coin-change-min-memoization.ts?fn";
import { generateCoinChangeMinMemoizationSteps } from "./step-generator";
import { coinChangeMinMemoizationEducational } from "./educational";

import typescriptSource from "./sources/coin-change-min-memoization.ts?raw";
import pythonSource from "./sources/coin-change-min-memoization.py?raw";
import javaSource from "./sources/CoinChangeMinMemoization.java?raw";

interface CoinChangeInput {
  amount: number;
  coins: number[];
}

const coinChangeMinMemoizationDefinition: AlgorithmDefinition<CoinChangeInput> = {
  meta: {
    id: ALGORITHM_ID.COIN_CHANGE_MIN_MEMOIZATION!,
    name: "Coin Change — Minimum (Memoization)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "optimization",
    description:
      "A top-down dynamic programming approach that uses recursion with a cache to find the minimum number of coins needed to make up a target amount",
    timeComplexity: {
      best: "O(amount × coins)",
      average: "O(amount × coins)",
      worst: "O(amount × coins)",
    },
    spaceComplexity: "O(amount)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { amount: 11, coins: [1, 5, 10, 25] },
  },
  execute: (input: CoinChangeInput) => coinChangeMinMemoization(input.amount, input.coins),
  generateSteps: generateCoinChangeMinMemoizationSteps,
  educational: coinChangeMinMemoizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(coinChangeMinMemoizationDefinition);
