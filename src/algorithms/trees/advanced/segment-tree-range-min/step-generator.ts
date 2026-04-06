/** Step generator for Segment Tree Range Min — builds tree then queries range minimums. */

import type { ExecutionStep, TreeNode } from "@/types";
import { AdvancedTreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SEG_MIN_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SEGMENT_TREE_RANGE_MIN!);

export interface SegmentTreeRangeMinInput {
  array: number[];
  queries: [number, number][];
}

function buildMinSegTreeNodes(array: number[]): TreeNode[] {
  const arrayLength = array.length;
  const treeNodes: TreeNode[] = [];
  const segValues: number[] = new Array(4 * arrayLength).fill(Infinity);

  function buildInner(nodeIndex: number, low: number, high: number): void {
    if (low === high) {
      segValues[nodeIndex] = array[low] ?? Infinity;
      return;
    }
    const mid = Math.floor((low + high) / 2);
    buildInner(nodeIndex * 2, low, mid);
    buildInner(nodeIndex * 2 + 1, mid + 1, high);
    segValues[nodeIndex] = Math.min(
      segValues[nodeIndex * 2] ?? Infinity,
      segValues[nodeIndex * 2 + 1] ?? Infinity,
    );
  }

  buildInner(1, 0, arrayLength - 1);

  const posMap = new Map<number, { x: number; y: number }>();

  function collectNodes(
    nodeIndex: number,
    low: number,
    high: number,
    minX: number,
    maxX: number,
  ): void {
    const midX = (minX + maxX) / 2;
    posMap.set(nodeIndex, { x: midX, y: Math.floor(Math.log2(nodeIndex)) * 70 + 40 });

    const parentIndex = Math.floor(nodeIndex / 2);
    treeNodes.push({
      id: `min${nodeIndex}`,
      value: segValues[nodeIndex] === Infinity ? 0 : (segValues[nodeIndex] ?? 0),
      parentId: nodeIndex === 1 ? null : `min${parentIndex}`,
      leftChildId: low < high ? `min${nodeIndex * 2}` : null,
      rightChildId: low < high ? `min${nodeIndex * 2 + 1}` : null,
      state: "default",
      position: posMap.get(nodeIndex) ?? { x: midX, y: 40 },
    });

    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      collectNodes(nodeIndex * 2, low, mid, minX, midX);
      collectNodes(nodeIndex * 2 + 1, mid + 1, high, midX, maxX);
    }
  }

  collectNodes(1, 0, arrayLength - 1, 20, 480);
  return treeNodes;
}

export function generateSegmentTreeRangeMinSteps(input: SegmentTreeRangeMinInput): ExecutionStep[] {
  const { array, queries } = input;
  const arrayLength = array.length;
  const segValues: number[] = new Array(4 * arrayLength).fill(Infinity);

  const tracker = new AdvancedTreeTracker([], "min1", SEG_MIN_LINE_MAP);
  tracker.initialize("Segment Tree Range Min", { array, queries });

  function syncTracker(): void {
    const treeNodes = buildMinSegTreeNodes(array);
    for (const treeNode of treeNodes) {
      const idx = parseInt(treeNode.id.replace("min", ""), 10);
      const val = segValues[idx];
      treeNode.value = val === Infinity || val === undefined ? 0 : val;
    }
    tracker.updateNodes(treeNodes, "min1");
  }

  function buildRecursive(nodeIndex: number, low: number, high: number): void {
    if (low === high) {
      segValues[nodeIndex] = array[low] ?? Infinity;
      syncTracker();
      tracker.buildNode(`min${nodeIndex}`, segValues[nodeIndex] ?? 0, {
        nodeIndex,
        range: [low, high],
        value: segValues[nodeIndex],
      });
      return;
    }
    const mid = Math.floor((low + high) / 2);
    buildRecursive(nodeIndex * 2, low, mid);
    buildRecursive(nodeIndex * 2 + 1, mid + 1, high);
    segValues[nodeIndex] = Math.min(
      segValues[nodeIndex * 2] ?? Infinity,
      segValues[nodeIndex * 2 + 1] ?? Infinity,
    );
    syncTracker();
    tracker.updateSegment(`min${nodeIndex}`, segValues[nodeIndex] ?? 0, {
      nodeIndex,
      range: [low, high],
      leftMin: segValues[nodeIndex * 2],
      rightMin: segValues[nodeIndex * 2 + 1],
    });
  }

  buildRecursive(1, 0, arrayLength - 1);

  for (const [queryLow, queryHigh] of queries) {
    const traverseMin = (nodeIndex: number, low: number, high: number): number => {
      tracker.queryRange(`min${nodeIndex}`, queryLow, queryHigh, {
        nodeIndex,
        range: [low, high],
        queryBounds: [queryLow, queryHigh],
      });
      if (queryLow > high || queryHigh < low) return Infinity;
      if (queryLow <= low && high <= queryHigh) return segValues[nodeIndex] ?? Infinity;
      const mid = Math.floor((low + high) / 2);
      const leftMin = traverseMin(nodeIndex * 2, low, mid);
      const rightMin = traverseMin(nodeIndex * 2 + 1, mid + 1, high);
      return Math.min(leftMin, rightMin);
    };

    const result = traverseMin(1, 0, arrayLength - 1);
    tracker.complete({ queryRange: [queryLow, queryHigh], result });
  }

  return tracker.getSteps();
}
