/** Step generator for House Robber (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HOUSE_ROBBER_TAB_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HOUSE_ROBBER_TABULATION!);

interface HouseRobberInput {
  houses: number[];
}

export function generateHouseRobberTabulationSteps(input: HouseRobberInput): ExecutionStep[] {
  const { houses } = input;
  const tableSize = houses.length;
  const tracker = new DPTracker(tableSize, HOUSE_ROBBER_TAB_LINE_MAP, (index) => `H(${index})`);

  tracker.initialize({ tableSize, houses });

  if (houses.length === 0) {
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  const firstHouseValue = houses[0]!;
  tracker.fillTable(0, firstHouseValue, {
    houseIndex: 0,
    value: firstHouseValue,
    description: "Base case: H(0) = houses[0]",
  });

  if (houses.length === 1) {
    tracker.complete({ result: firstHouseValue });
    return tracker.getSteps();
  }

  const secondBaseValue = Math.max(firstHouseValue, houses[1]!);
  tracker.fillTable(1, secondBaseValue, {
    houseIndex: 1,
    value: secondBaseValue,
    description: "Base case: H(1) = max(houses[0], houses[1])",
  });

  const dpValues: number[] = [firstHouseValue, secondBaseValue];

  for (let houseIndex = 2; houseIndex < houses.length; houseIndex++) {
    const prevOne = houseIndex - 1;
    const prevTwo = houseIndex - 2;

    tracker.readCache(prevOne, { houseIndex, readingIndex: prevOne });
    tracker.readCache(prevTwo, { houseIndex, readingIndex: prevTwo });

    const currentHouseValue = houses[houseIndex]!;
    const computedValue = Math.max(dpValues[prevOne]!, dpValues[prevTwo]! + currentHouseValue);
    dpValues.push(computedValue);

    tracker.computeCell(
      houseIndex,
      computedValue,
      {
        houseIndex,
        formula: `H(${houseIndex}) = max(H(${prevOne}), H(${prevTwo}) + houses[${houseIndex}])`,
        value: computedValue,
        houseValue: currentHouseValue,
      },
      `Compute H(${houseIndex}) = max(${dpValues[prevOne]!}, ${dpValues[prevTwo]!} + ${currentHouseValue}) = ${computedValue}`,
    );
  }

  const finalResult = dpValues[houses.length - 1]!;
  tracker.complete({ result: finalResult });

  return tracker.getSteps();
}
