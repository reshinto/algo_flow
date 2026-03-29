import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { coinChangeWays } from "./sources/coin-change-ways.ts?fn";
import { generateCoinChangeWaysSteps } from "./step-generator";
import { coinChangeWaysEducational } from "./educational";

import typescriptSource from "./sources/coin-change-ways.ts?raw";
import pythonSource from "./sources/coin-change-ways.py?raw";
import javaSource from "./sources/CoinChangeWays.java?raw";

export interface CoinChangeWaysInput {
  amount: number;
  coins: number[];
}

const coinChangeWaysDefinition: AlgorithmDefinition<CoinChangeWaysInput> = {
  meta: {
    id: ALGORITHM_ID.COIN_CHANGE_WAYS!,
    name: "Coin Change — Count Ways (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "counting",
    description:
      "A bottom-up dynamic programming approach that counts the number of distinct coin combinations that sum to a target amount",
    timeComplexity: {
      best: "O(amount × |coins|)",
      average: "O(amount × |coins|)",
      worst: "O(amount × |coins|)",
    },
    spaceComplexity: "O(amount)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { amount: 5, coins: [1, 2, 5] },
  },
  execute: (input: CoinChangeWaysInput) => coinChangeWays(input.amount, input.coins),
  generateSteps: generateCoinChangeWaysSteps,
  educational: coinChangeWaysEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(coinChangeWaysDefinition);
