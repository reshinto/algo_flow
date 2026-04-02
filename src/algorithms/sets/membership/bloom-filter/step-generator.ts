/** Step generator for Bloom Filter — produces ExecutionStep[] using SetMembershipTracker. */

import type { ExecutionStep } from "@/types";
import { SetMembershipTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BLOOM_FILTER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BLOOM_FILTER!);

export interface BloomFilterInput {
  elements: number[];
  queries: number[];
  size: number;
  hashCount: number;
}

function computeHashPositions(value: number, hashCount: number, size: number): number[] {
  const positions: number[] = [];
  for (let hashIdx = 0; hashIdx < hashCount; hashIdx++) {
    const hash = Math.abs((value * (hashIdx + 1) * 31 + hashIdx * 17) % size);
    positions.push(hash);
  }
  return positions;
}

export function generateBloomFilterSteps(input: BloomFilterInput): ExecutionStep[] {
  const { elements, queries, size, hashCount } = input;

  const tracker = new SetMembershipTracker(elements.length, size, hashCount, BLOOM_FILTER_LINE_MAP);

  // Maintain a local bit array to track which bits are set
  const bitArray = new Array<number>(size).fill(0);
  // Track actually inserted elements to detect false positives during queries
  const insertedSet = new Set<number>(elements);

  tracker.initialize({ elements, queries, size, hashCount });

  // Insert phase: for each element, compute hash positions and set bits
  for (const element of elements) {
    const positions = computeHashPositions(element, hashCount, size);
    tracker.hashElement(element, positions, { element, positions, phase: "insert" });

    for (const position of positions) {
      bitArray[position] = 1;
      tracker.setBit(position, { element, position, bitArray: [...bitArray] });
    }
  }

  // Query phase: for each query, check if all hash positions are set
  for (const query of queries) {
    tracker.queryMembership(query, { query, phase: "query" });

    const positions = computeHashPositions(query, hashCount, size);
    let allBitsSet = true;

    for (const position of positions) {
      tracker.checkBit(position, { query, position, bitValue: bitArray[position] ?? 0 });
      if (bitArray[position] !== 1) {
        allBitsSet = false;
      }
    }

    const actuallyInserted = insertedSet.has(query);
    const isFalsePositive = allBitsSet && !actuallyInserted;
    tracker.queryResult(query, allBitsSet, isFalsePositive, {
      query,
      found: allBitsSet,
      isFalsePositive,
      verdict: allBitsSet ? "possibly in set" : "definitely not in set",
    });
  }

  tracker.complete({ insertedCount: elements.length, queryCount: queries.length });

  return tracker.getSteps();
}
