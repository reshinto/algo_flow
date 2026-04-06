/** Step generator for Build Tree from Preorder + Inorder — produces ExecutionStep[] using TreeConstructionTracker. */

import type { ExecutionStep } from "@/types";
import { TreeConstructionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BUILD_FROM_PREORDER_INORDER!);

export interface BuildFromPreorderInorderInput {
  preorder: number[];
  inorder: number[];
}

export function generateBuildFromPreorderInorderSteps(
  input: BuildFromPreorderInorderInput,
): ExecutionStep[] {
  const { preorder, inorder } = input;

  // Pre-compute inorder index map for O(1) lookup
  const inorderIndexMap = new Map<number, number>();
  inorder.forEach((value, idx) => inorderIndexMap.set(value, idx));

  const tracker = new TreeConstructionTracker([], "", LINE_MAP);

  tracker.initialize({ preorder: [...preorder], inorder: [...inorder] });

  let nodeCounter = 0;

  function buildTree(
    preStart: number,
    preEnd: number,
    inStart: number,
    inEnd: number,
    depth: number,
    parentId: string | null,
    side: "left" | "right" | null,
  ): string | null {
    if (preStart > preEnd || inStart > inEnd) return null;

    const rootValue = preorder[preStart];
    if (rootValue === undefined) return null;

    tracker.selectElement(rootValue, {
      rootValue,
      preStart,
      preEnd,
      inStart,
      inEnd,
    });

    nodeCounter++;
    const nodeId = `node-${String(nodeCounter)}`;

    tracker.buildNode(nodeId, rootValue, { nodeId, value: rootValue, depth });

    const inorderRootIndex = inorderIndexMap.get(rootValue) ?? -1;
    const leftSize = inorderRootIndex - inStart;

    tracker.partitionArray(inStart, inEnd, inorderRootIndex, {
      inorderRootIndex,
      leftSize,
      rightSize: inEnd - inorderRootIndex,
    });

    const leftChildId = buildTree(
      preStart + 1,
      preStart + leftSize,
      inStart,
      inorderRootIndex - 1,
      depth + 1,
      nodeId,
      "left",
    );
    const rightChildId = buildTree(
      preStart + leftSize + 1,
      preEnd,
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

  buildTree(0, preorder.length - 1, 0, inorder.length - 1, 0, null, null);

  tracker.complete({ totalNodes: nodeCounter });

  return tracker.getSteps();
}
