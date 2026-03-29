/** Step generator for 0/1 Knapsack (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const KNAPSACK_01_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.KNAPSACK_01!);

export interface KnapsackInput {
  weights: number[];
  values: number[];
  capacity: number;
}

export function generateKnapsack01Steps(input: KnapsackInput): ExecutionStep[] {
  const { weights, values, capacity } = input;
  const tableSize = capacity + 1;
  const tracker = new DPTracker(tableSize, KNAPSACK_01_LINE_MAP, (index) => `V(${index})`);

  tracker.initialize({ weights, values, capacity, tableSize });

  // Internal dp array to track real values for read-cache lookups
  const dpTable: number[] = new Array(tableSize).fill(0);

  tracker.fillTable(0, 0, {
    description: "Base case: dp[0] = 0 (zero value achievable with capacity 0)",
    capacity: 0,
    value: 0,
  });

  for (let itemIndex = 0; itemIndex < weights.length; itemIndex++) {
    const itemWeight = weights[itemIndex] ?? 0;
    const itemValue = values[itemIndex] ?? 0;

    for (let capacityW = capacity; capacityW >= itemWeight; capacityW--) {
      const withoutItem = dpTable[capacityW] ?? 0;
      const withItem = (dpTable[capacityW - itemWeight] ?? 0) + itemValue;

      tracker.readCache(capacityW, {
        itemIndex,
        itemWeight,
        itemValue,
        capacityW,
        withoutItem,
        description: `Read dp[${capacityW}] = ${withoutItem} (value without item ${itemIndex})`,
      });

      tracker.readCache(capacityW - itemWeight, {
        itemIndex,
        itemWeight,
        itemValue,
        capacityW,
        subCapacity: capacityW - itemWeight,
        subValue: dpTable[capacityW - itemWeight] ?? 0,
        withItem,
        description: `Read dp[${capacityW - itemWeight}] = ${dpTable[capacityW - itemWeight] ?? 0} (value at remaining capacity, candidate = ${withItem})`,
      });

      const newValue = Math.max(withoutItem, withItem);
      dpTable[capacityW] = newValue;

      tracker.computeCell(
        capacityW,
        newValue,
        {
          itemIndex,
          itemWeight,
          itemValue,
          capacityW,
          withoutItem,
          withItem,
          newValue,
          formula: `dp[${capacityW}] = max(${withoutItem}, ${withItem}) = ${newValue}`,
        },
        `dp[${capacityW}] = max(${withoutItem}, ${withItem}) = ${newValue} after considering item ${itemIndex}`,
      );
    }
  }

  const result = dpTable[capacity] ?? 0;
  tracker.complete({ result, weights, values, capacity });

  return tracker.getSteps();
}
