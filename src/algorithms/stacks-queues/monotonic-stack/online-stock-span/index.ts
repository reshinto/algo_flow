import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { onlineStockSpan } from "./sources/online-stock-span.ts?fn";
import { generateOnlineStockSpanSteps } from "./step-generator";
import type { OnlineStockSpanInput } from "./step-generator";
import { onlineStockSpanEducational } from "./educational";

import typescriptSource from "./sources/online-stock-span.ts?raw";
import pythonSource from "./sources/online-stock-span.py?raw";
import javaSource from "./sources/OnlineStockSpan.java?raw";
import rustSource from "./sources/online-stock-span.rs?raw";
import cppSource from "./sources/OnlineStockSpan.cpp?raw";
import goSource from "./sources/online-stock-span.go?raw";

function executeOnlineStockSpan(input: OnlineStockSpanInput): number[] {
  return onlineStockSpan(input.prices) as number[];
}

const onlineStockSpanDefinition: AlgorithmDefinition<OnlineStockSpanInput> = {
  meta: {
    id: ALGORITHM_ID.ONLINE_STOCK_SPAN!,
    name: "Online Stock Span",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "monotonic-stack",
    description:
      "For each day's stock price, count consecutive preceding days (including today) where the price was ≤ today's price using a monotonic decreasing stack of (price, span) pairs",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { prices: [100, 80, 60, 70, 60, 75, 85] },
  },
  execute: executeOnlineStockSpan,
  generateSteps: generateOnlineStockSpanSteps,
  educational: onlineStockSpanEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(onlineStockSpanDefinition);
