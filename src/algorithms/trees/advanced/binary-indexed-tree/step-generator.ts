/** Step generator for Binary Indexed Tree (Fenwick Tree) — prefix sum queries. */

import type { ExecutionStep, TreeNode } from "@/types";
import { AdvancedTreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BIT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BINARY_INDEXED_TREE!);

export interface BinaryIndexedTreeInput {
  array: number[];
  queries: [number, number][];
}

/**
 * Represent the BIT array as a visual tree.
 * BIT index bitIdx is responsible for the range of length (bitIdx & -bitIdx).
 * For display: node bitIdx's parent is bitIdx + (bitIdx & -bitIdx).
 */
function buildBitTreeNodes(bitArray: number[], arrayLength: number): TreeNode[] {
  const treeNodes: TreeNode[] = [];

  // For layout, place nodes in a row with index as x position
  for (let bitIdx = 1; bitIdx <= arrayLength; bitIdx++) {
    const responsibleRange = bitIdx & -bitIdx;
    const parentBitIdx = bitIdx + responsibleRange;

    treeNodes.push({
      id: `bit${bitIdx}`,
      value: bitArray[bitIdx] ?? 0,
      parentId: parentBitIdx <= arrayLength ? `bit${parentBitIdx}` : null,
      leftChildId: null,
      rightChildId: null,
      state: "default",
      position: { x: (bitIdx - 1) * 55 + 30, y: (Math.floor(Math.log2(bitIdx)) + 1) * 70 },
    });
  }

  return treeNodes;
}

export function generateBinaryIndexedTreeSteps(input: BinaryIndexedTreeInput): ExecutionStep[] {
  const { array, queries } = input;
  const arrayLength = array.length;
  const bitArray: number[] = new Array(arrayLength + 1).fill(0);

  const tracker = new AdvancedTreeTracker([], "bit1", BIT_LINE_MAP);
  tracker.initialize("Binary Indexed Tree", { array, queries });

  function syncTracker(highlightedId?: string): void {
    const treeNodes = buildBitTreeNodes(bitArray, arrayLength);
    if (highlightedId) {
      const highlightedNode = treeNodes.find((node) => node.id === highlightedId);
      if (highlightedNode) highlightedNode.state = "current";
    }
    tracker.updateNodes(treeNodes, "bit1");
  }

  // Build BIT with update steps
  for (let pos = 0; pos < arrayLength; pos++) {
    const value = array[pos] ?? 0;
    let bitIdx = pos + 1;
    while (bitIdx <= arrayLength) {
      bitArray[bitIdx] = (bitArray[bitIdx] ?? 0) + value;
      syncTracker(`bit${bitIdx}`);
      tracker.updateSegment(`bit${bitIdx}`, bitArray[bitIdx] ?? 0, {
        originalIndex: pos,
        bitIndex: bitIdx,
        delta: value,
        bitValue: bitArray[bitIdx],
      });
      bitIdx += bitIdx & -bitIdx;
    }
  }

  // Process each range query
  for (const [queryLow, queryHigh] of queries) {
    // Compute prefix sum up to queryHigh+1
    let highSum = 0;
    let bitIdx = queryHigh + 1;
    while (bitIdx > 0) {
      highSum += bitArray[bitIdx] ?? 0;
      syncTracker(`bit${bitIdx}`);
      tracker.computePrefix(bitIdx, highSum, {
        bitIndex: bitIdx,
        partialSum: highSum,
        phase: "high",
      });
      bitIdx -= bitIdx & -bitIdx;
    }

    // Compute prefix sum up to queryLow
    let lowSum = 0;
    bitIdx = queryLow;
    while (bitIdx > 0) {
      lowSum += bitArray[bitIdx] ?? 0;
      syncTracker(`bit${bitIdx}`);
      tracker.computePrefix(bitIdx, lowSum, {
        bitIndex: bitIdx,
        partialSum: lowSum,
        phase: "low",
      });
      bitIdx -= bitIdx & -bitIdx;
    }

    const rangeResult = highSum - lowSum;
    tracker.queryRange("bit1", queryLow, queryHigh, {
      queryRange: [queryLow, queryHigh],
      highPrefixSum: highSum,
      lowPrefixSum: lowSum,
      result: rangeResult,
    });
    tracker.complete({ queryRange: [queryLow, queryHigh], result: rangeResult });
  }

  return tracker.getSteps();
}
