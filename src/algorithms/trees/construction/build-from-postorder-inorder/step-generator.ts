/** Step generator for Build Tree from Postorder + Inorder — produces ExecutionStep[] using TreeConstructionTracker. */

import type { ExecutionStep } from "@/types";
import { TreeConstructionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BUILD_FROM_POSTORDER_INORDER!);

export interface BuildFromPostorderInorderInput {
  postorder: number[];
  inorder: number[];
}

/** Compute visual position for a node at the given depth and horizontal index. */
function computePosition(
  depth: number,
  nodeIndex: number,
  totalAtDepth: number,
): { x: number; y: number } {
  const treeWidth = 400;
  const levelHeight = 100;
  const segmentWidth = treeWidth / Math.max(totalAtDepth, 1);
  return {
    x: segmentWidth * nodeIndex + segmentWidth / 2,
    y: depth * levelHeight + 60,
  };
}

export function generateBuildFromPostorderInorderSteps(
  input: BuildFromPostorderInorderInput,
): ExecutionStep[] {
  const { postorder, inorder } = input;

  const inorderIndexMap = new Map<number, number>();
  inorder.forEach((value, idx) => inorderIndexMap.set(value, idx));

  const depthTotals = new Map<number, number>();
  const depthCounters = new Map<number, number>();

  function countNodesAtDepth(
    postorderSlice: number[],
    inorderSlice: number[],
    depth: number,
  ): void {
    if (postorderSlice.length === 0) return;
    const rootValue = postorderSlice[postorderSlice.length - 1];
    if (rootValue === undefined) return;
    depthTotals.set(depth, (depthTotals.get(depth) ?? 0) + 1);

    // Find the root's position within the current inorder slice (not the global index)
    const localRootIndex = inorderSlice.indexOf(rootValue);
    if (localRootIndex === -1) return;
    const leftSize = localRootIndex;
    countNodesAtDepth(
      postorderSlice.slice(0, leftSize),
      inorderSlice.slice(0, localRootIndex),
      depth + 1,
    );
    countNodesAtDepth(
      postorderSlice.slice(leftSize, postorderSlice.length - 1),
      inorderSlice.slice(localRootIndex + 1),
      depth + 1,
    );
  }

  countNodesAtDepth(postorder, inorder, 0);

  const tracker = new TreeConstructionTracker([], "", LINE_MAP);
  tracker.initialize({ postorder: [...postorder], inorder: [...inorder] });

  let nodeCounter = 0;

  function buildTree(
    postStart: number,
    postEnd: number,
    inStart: number,
    inEnd: number,
    depth: number,
    parentId: string | null,
    side: "left" | "right" | null,
  ): string | null {
    if (postStart > postEnd || inStart > inEnd) return null;

    const rootValue = postorder[postEnd];
    if (rootValue === undefined) return null;

    tracker.selectElement(rootValue, { rootValue, postStart, postEnd, inStart, inEnd });

    nodeCounter++;
    const nodeId = `node-${String(nodeCounter)}`;

    const depthCount = depthTotals.get(depth) ?? 1;
    const depthOffset = depthCounters.get(depth) ?? 0;
    depthCounters.set(depth, depthOffset + 1);
    const position = computePosition(depth, depthOffset, depthCount);
    void position;

    tracker.buildNode(nodeId, rootValue, { nodeId, value: rootValue, depth });

    const inorderRootIndex = inorderIndexMap.get(rootValue) ?? -1;
    const leftSize = inorderRootIndex - inStart;

    tracker.partitionArray(inStart, inEnd, inorderRootIndex, {
      inorderRootIndex,
      leftSize,
      rightSize: inEnd - inorderRootIndex,
    });

    const leftChildId = buildTree(
      postStart,
      postStart + leftSize - 1,
      inStart,
      inorderRootIndex - 1,
      depth + 1,
      nodeId,
      "left",
    );
    const rightChildId = buildTree(
      postStart + leftSize,
      postEnd - 1,
      inorderRootIndex + 1,
      inEnd,
      depth + 1,
      nodeId,
      "right",
    );

    if (parentId && side) {
      tracker.connectChild(parentId, nodeId, side, { parentId, childId: nodeId, side });
    }

    tracker.markBuilt(nodeId, { nodeId, value: rootValue, leftChildId, rightChildId });

    return nodeId;
  }

  buildTree(0, postorder.length - 1, 0, inorder.length - 1, 0, null, null);

  tracker.complete({ totalNodes: nodeCounter });

  return tracker.getSteps();
}
