/** Step generator for Floyd's Cycle Detection — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FLOYD_CYCLE_DETECTION!);

interface FloydCycleDetectionInput {
  inputArray: number[];
}

export function generateFloydCycleDetectionSteps(input: FloydCycleDetectionInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    phase: "initialize",
  });

  if (inputArray.length === 0) {
    tracker.complete({ hasCycle: false, cycleStart: -1 });
    return tracker.getSteps();
  }

  let tortoise = 0;
  let hare = 0;

  tracker.visit(
    0,
    { tortoise, hare, phase: "phase1-start" },
    `Phase 1: both pointers start at index 0 — tortoise moves 1 step, hare moves 2 steps`,
  );

  // Phase 1: detect meeting point
  let phaseOneSteps = 0;
  const maxPhaseOneSteps = inputArray.length * 2 + 2; // safety bound

  do {
    const prevTortoise = tortoise;
    const prevHare = hare;

    tortoise = inputArray[tortoise]!;
    hare = inputArray[inputArray[hare]!]!;
    phaseOneSteps++;

    tracker.compareTwo(
      tortoise,
      hare,
      {
        tortoise,
        hare,
        prevTortoise,
        prevHare,
        phase: "phase1",
        step: phaseOneSteps,
      },
      `Phase 1 step ${phaseOneSteps}: tortoise=${tortoise}, hare=${hare}${tortoise === hare ? " — MEETING POINT found!" : ""}`,
    );

    if (phaseOneSteps > maxPhaseOneSteps) break; // prevent infinite loop on invalid input
  } while (tortoise !== hare);

  const meetingPoint = tortoise;

  tracker.markElement(
    meetingPoint,
    "found",
    { meetingPoint, tortoise, hare, phase: "phase1-complete" },
    `Meeting point at value ${meetingPoint} — starting Phase 2 to find cycle entrance`,
  );

  // Phase 2: find cycle entrance
  tortoise = 0;

  tracker.visit(
    tortoise,
    { tortoise, hare, meetingPoint, phase: "phase2-start" },
    `Phase 2: reset tortoise to index 0, hare stays at meeting point ${hare}`,
  );

  let phaseTwoSteps = 0;

  while (tortoise !== hare) {
    const prevTortoise = tortoise;
    const prevHare = hare;

    tortoise = inputArray[tortoise]!;
    hare = inputArray[hare]!;
    phaseTwoSteps++;

    tracker.compareTwo(
      tortoise,
      hare,
      {
        tortoise,
        hare,
        prevTortoise,
        prevHare,
        phase: "phase2",
        step: phaseTwoSteps,
        meetingPoint,
      },
      `Phase 2 step ${phaseTwoSteps}: tortoise=${tortoise}, hare=${hare}${tortoise === hare ? " — CYCLE ENTRANCE found!" : ""}`,
    );

    if (phaseTwoSteps > inputArray.length + 2) break; // safety bound
  }

  const cycleStart = tortoise;

  tracker.complete({
    hasCycle: true,
    cycleStart,
    meetingPoint,
  });

  return tracker.getSteps();
}
