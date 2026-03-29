/** Step generator for Daily Temperatures — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DAILY_TEMPERATURES!);

interface DailyTemperaturesInput {
  temperatures: number[];
}

export function generateDailyTemperaturesSteps(input: DailyTemperaturesInput): ExecutionStep[] {
  const { temperatures } = input;
  const arrayLength = temperatures.length;
  const waitDays = new Array(arrayLength).fill(0) as number[];

  const tracker = new ArrayTracker([...temperatures], LINE_MAP);

  tracker.initialize({
    temperatures: [...temperatures],
    arrayLength,
    waitDays: [...waitDays],
    stackContents: [],
  });

  if (arrayLength === 0) {
    tracker.complete({ waitDays: [] });
    return tracker.getSteps();
  }

  const pendingStack: number[] = [];

  for (let dayIndex = 0; dayIndex < arrayLength; dayIndex++) {
    const todayTemp = temperatures[dayIndex]!;

    tracker.visit(
      dayIndex,
      {
        dayIndex,
        todayTemp,
        stackContents: [...pendingStack],
        waitDays: [...waitDays],
      },
      `Day ${dayIndex}: temperature=${todayTemp} — resolving pending days waiting for a warmer temperature`,
    );

    while (pendingStack.length > 0) {
      const stackTop = pendingStack[pendingStack.length - 1]!;
      const stackTopTemp = temperatures[stackTop]!;

      if (stackTopTemp < todayTemp) {
        const poppedIndex = pendingStack.pop()!;
        const daysToWait = dayIndex - poppedIndex;
        waitDays[poppedIndex] = daysToWait;

        tracker.markElement(
          poppedIndex,
          "found",
          {
            dayIndex,
            todayTemp,
            poppedIndex,
            stackTopTemp,
            daysToWait,
            stackContents: [...pendingStack],
            waitDays: [...waitDays],
          },
          `Day ${poppedIndex} (${stackTopTemp}°) resolved — waited ${daysToWait} day(s) for ${todayTemp}°`,
        );
      } else {
        break;
      }
    }

    pendingStack.push(dayIndex);
  }

  // Any remaining indices have no warmer day — waitDays stays 0
  for (const remainingIndex of pendingStack) {
    tracker.markElement(
      remainingIndex,
      "eliminated",
      {
        remainingIndex,
        temperature: temperatures[remainingIndex]!,
        waitDays: [...waitDays],
        stackContents: [],
      },
      `Day ${remainingIndex} (${temperatures[remainingIndex]!}°) has no warmer day ahead — wait is 0`,
    );
  }

  tracker.complete({ waitDays: [...waitDays] });

  return tracker.getSteps();
}
