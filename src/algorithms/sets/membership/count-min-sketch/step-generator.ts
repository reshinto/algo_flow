/** Step generator for Count-Min Sketch — produces ExecutionStep[] using SetMembershipTracker. */

import type { ExecutionStep } from "@/types";
import { SetMembershipTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const COUNT_MIN_SKETCH_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.COUNT_MIN_SKETCH!);

export interface CountMinSketchInput {
  elements: number[];
  queries: number[];
  width: number;
  depth: number;
}

function computeSketchHash(value: number, hashIdx: number, width: number): number {
  return Math.abs((value * (hashIdx * 1327 + 31) + hashIdx * 7919) % width);
}

export function generateCountMinSketchSteps(input: CountMinSketchInput): ExecutionStep[] {
  const { elements, queries, width, depth } = input;

  const tracker = new SetMembershipTracker(
    elements.length,
    width,
    depth,
    COUNT_MIN_SKETCH_LINE_MAP,
  );
  tracker.initializeSketchGrid(depth, width);

  // Local grid mirror for passing current state in variables
  const localGrid: number[][] = Array.from({ length: depth }, () =>
    Array.from({ length: width }, () => 0),
  );

  tracker.initialize({
    elements,
    queries,
    width,
    depth,
    sketchGrid: localGrid.map((row) => [...row]),
  });

  // Insert phase
  for (const element of elements) {
    const positions: number[] = [];
    for (let hashIdx = 0; hashIdx < depth; hashIdx++) {
      positions.push(computeSketchHash(element, hashIdx, width));
    }

    tracker.hashElement(element, positions, {
      element,
      positions,
      phase: "insert",
      sketchGrid: localGrid.map((row) => [...row]),
    });

    for (let hashIdx = 0; hashIdx < depth; hashIdx++) {
      const col = positions[hashIdx]!;
      localGrid[hashIdx]![col] = (localGrid[hashIdx]![col] ?? 0) + 1;

      tracker.incrementCounter(hashIdx, col, {
        element,
        hashIdx,
        col,
        newCount: localGrid[hashIdx]![col],
        sketchGrid: localGrid.map((row) => [...row]),
      });
    }
  }

  // Query phase
  const queryResults: { value: number; estimatedCount: number }[] = [];

  for (const query of queries) {
    const queryPositions: number[] = [];
    for (let hashIdx = 0; hashIdx < depth; hashIdx++) {
      queryPositions.push(computeSketchHash(query, hashIdx, width));
    }

    tracker.queryMembership(query, {
      query,
      queryPositions,
      sketchGrid: localGrid.map((row) => [...row]),
    });

    let minCount = Infinity;
    for (let hashIdx = 0; hashIdx < depth; hashIdx++) {
      const col = queryPositions[hashIdx]!;
      const rowCount = localGrid[hashIdx]![col] ?? 0;
      if (rowCount < minCount) {
        minCount = rowCount;
      }
    }

    const estimatedCount = minCount === Infinity ? 0 : minCount;
    const found = estimatedCount > 0;

    if (found) {
      queryResults.push({ value: query, estimatedCount });
    }

    tracker.queryResult(query, found, false, {
      query,
      estimatedCount,
      found,
      queryResults: [...queryResults],
      sketchGrid: localGrid.map((row) => [...row]),
    });
  }

  tracker.complete({
    queryResults,
    totalElements: elements.length,
    width,
    depth,
    sketchGrid: localGrid.map((row) => [...row]),
  });

  return tracker.getSteps();
}
