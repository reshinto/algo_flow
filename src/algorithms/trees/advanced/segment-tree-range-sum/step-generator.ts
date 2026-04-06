/** Step generator for Segment Tree Range Sum — builds tree then queries ranges. */

import type { ExecutionStep, TreeNode } from "@/types";
import { AdvancedTreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SEG_SUM_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SEGMENT_TREE_RANGE_SUM!);

export interface SegmentTreeRangeSumInput {
  array: number[];
  queries: [number, number][];
}

function buildSegTreeNodes(array: number[]): TreeNode[] {
  const arrayLength = array.length;
  const treeNodes: TreeNode[] = [];
  const segValues: number[] = new Array(4 * arrayLength).fill(0);
  const posMap = new Map<number, { x: number; y: number }>();

  function assignPos(nodeIndex: number, depth: number, minX: number, maxX: number): void {
    const midX = (minX + maxX) / 2;
    posMap.set(nodeIndex, { x: midX, y: depth * 70 + 40 });
    if (nodeIndex * 2 < 4 * arrayLength) {
      assignPos(nodeIndex * 2, depth + 1, minX, midX);
      assignPos(nodeIndex * 2 + 1, depth + 1, midX, maxX);
    }
  }

  function buildInner(nodeIndex: number, low: number, high: number): void {
    if (low === high) {
      segValues[nodeIndex] = array[low] ?? 0;
      return;
    }
    const mid = Math.floor((low + high) / 2);
    buildInner(nodeIndex * 2, low, mid);
    buildInner(nodeIndex * 2 + 1, mid + 1, high);
    segValues[nodeIndex] = (segValues[nodeIndex * 2] ?? 0) + (segValues[nodeIndex * 2 + 1] ?? 0);
  }

  buildInner(1, 0, arrayLength - 1);

  function collectNodes(nodeIndex: number, low: number, high: number): void {
    const maxIndex = Math.ceil(Math.log2(arrayLength)) + 2;
    if (nodeIndex > Math.pow(2, maxIndex) || segValues[nodeIndex] === undefined) return;

    const parentIndex = Math.floor(nodeIndex / 2);
    treeNodes.push({
      id: `seg${nodeIndex}`,
      value: segValues[nodeIndex] ?? 0,
      parentId: nodeIndex === 1 ? null : `seg${parentIndex}`,
      leftChildId: low < high ? `seg${nodeIndex * 2}` : null,
      rightChildId: low < high ? `seg${nodeIndex * 2 + 1}` : null,
      state: "default",
      position: posMap.get(nodeIndex) ?? { x: 200, y: 40 },
    });

    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      collectNodes(nodeIndex * 2, low, mid);
      collectNodes(nodeIndex * 2 + 1, mid + 1, high);
    }
  }

  assignPos(1, 0, 20, 480);
  collectNodes(1, 0, arrayLength - 1);
  return treeNodes;
}

export function generateSegmentTreeRangeSumSteps(input: SegmentTreeRangeSumInput): ExecutionStep[] {
  const { array, queries } = input;
  const arrayLength = array.length;

  const segValues: number[] = new Array(4 * arrayLength).fill(0);
  const initialNodes: TreeNode[] = [];

  const tracker = new AdvancedTreeTracker(initialNodes, "seg1", SEG_SUM_LINE_MAP);
  tracker.initialize("Segment Tree Range Sum", { array, queries });

  function updateTrackerTree(): void {
    const treeNodes = buildSegTreeNodes(array);
    // Sync current seg values into nodes
    for (const treeNode of treeNodes) {
      const idx = parseInt(treeNode.id.replace("seg", ""), 10);
      treeNode.value = segValues[idx] ?? 0;
    }
    tracker.updateNodes(treeNodes, "seg1");
  }

  function buildRecursive(nodeIndex: number, low: number, high: number): void {
    if (low === high) {
      segValues[nodeIndex] = array[low] ?? 0;
      updateTrackerTree();
      tracker.buildNode(`seg${nodeIndex}`, segValues[nodeIndex] ?? 0, {
        nodeIndex,
        range: [low, high],
        value: segValues[nodeIndex],
      });
      return;
    }
    const mid = Math.floor((low + high) / 2);
    buildRecursive(nodeIndex * 2, low, mid);
    buildRecursive(nodeIndex * 2 + 1, mid + 1, high);
    segValues[nodeIndex] = (segValues[nodeIndex * 2] ?? 0) + (segValues[nodeIndex * 2 + 1] ?? 0);
    updateTrackerTree();
    tracker.updateSegment(`seg${nodeIndex}`, segValues[nodeIndex] ?? 0, {
      nodeIndex,
      range: [low, high],
      leftSum: segValues[nodeIndex * 2],
      rightSum: segValues[nodeIndex * 2 + 1],
    });
  }

  buildRecursive(1, 0, arrayLength - 1);

  for (const [queryLow, queryHigh] of queries) {
    const traverseQuery = (nodeIndex: number, low: number, high: number): number => {
      tracker.queryRange(`seg${nodeIndex}`, queryLow, queryHigh, {
        nodeIndex,
        range: [low, high],
        queryBounds: [queryLow, queryHigh],
      });
      if (queryLow > high || queryHigh < low) return 0;
      if (queryLow <= low && high <= queryHigh) return segValues[nodeIndex] ?? 0;
      const mid = Math.floor((low + high) / 2);
      const leftResult = traverseQuery(nodeIndex * 2, low, mid);
      const rightResult = traverseQuery(nodeIndex * 2 + 1, mid + 1, high);
      return leftResult + rightResult;
    };

    const result = traverseQuery(1, 0, arrayLength - 1);
    tracker.complete({ queryRange: [queryLow, queryHigh], result });
  }

  return tracker.getSteps();
}
