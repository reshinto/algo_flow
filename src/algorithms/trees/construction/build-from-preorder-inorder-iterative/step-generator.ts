/** Step generator for Build Tree from Preorder + Inorder Iterative — produces ExecutionStep[] using TreeConstructionTracker. */

import type { ExecutionStep } from "@/types";
import { TreeConstructionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BUILD_FROM_PREORDER_INORDER_ITERATIVE!);

export interface BuildFromPreorderInorderIterativeInput {
  preorder: number[];
  inorder: number[];
}

/** Compute visual position for a node given depth and horizontal index. */
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

export function generateBuildFromPreorderInorderIterativeSteps(
  input: BuildFromPreorderInorderIterativeInput,
): ExecutionStep[] {
  const { preorder, inorder } = input;

  interface StackEntry {
    nodeId: string;
    value: number;
    depth: number;
  }

  const tracker = new TreeConstructionTracker([], "", LINE_MAP);
  tracker.initialize({ preorder: [...preorder], inorder: [...inorder] });

  if (preorder.length === 0) {
    tracker.complete({ totalNodes: 0 });
    return tracker.getSteps();
  }

  const firstValueRaw = preorder[0];
  if (firstValueRaw === undefined) {
    tracker.complete({ totalNodes: 0 });
    return tracker.getSteps();
  }
  const firstValue: number = firstValueRaw;

  let nodeCounter = 0;
  const depthNodeCount: number[] = [];

  // Pre-compute how many nodes land at each depth for positioning
  const nodeIdMap = new Map<number, string>(); // value -> nodeId
  const nodeDepthMap = new Map<string, number>(); // nodeId -> depth

  function assignDepths(): void {
    const tempStack: { value: number; depth: number }[] = [];
    tempStack.push({ value: firstValue, depth: 0 });
    let inorderIdx = 0;

    for (let preIdx = 1; preIdx < preorder.length; preIdx++) {
      const currentValue = preorder[preIdx];
      if (currentValue === undefined) break;

      const stackTop = tempStack[tempStack.length - 1];
      if (!stackTop) break;

      let parentDepth = stackTop.depth;
      let newDepth: number;

      if (stackTop.value !== inorder[inorderIdx]) {
        newDepth = parentDepth + 1;
        tempStack.push({ value: currentValue, depth: newDepth });
      } else {
        while (
          tempStack.length > 0 &&
          tempStack[tempStack.length - 1]?.value === inorder[inorderIdx]
        ) {
          const popped = tempStack.pop();
          if (popped) parentDepth = popped.depth;
          inorderIdx++;
        }
        newDepth = parentDepth + 1;
        tempStack.push({ value: currentValue, depth: newDepth });
      }

      depthNodeCount[newDepth] = (depthNodeCount[newDepth] ?? 0) + 1;
    }
  }

  assignDepths();
  depthNodeCount[0] = 1;

  const depthCurrentIdx: number[] = new Array(depthNodeCount.length).fill(0);

  function makeNodeId(value: number, depth: number): string {
    nodeCounter++;
    const nodeId = `node-${String(nodeCounter)}`;
    nodeIdMap.set(value, nodeId);
    nodeDepthMap.set(nodeId, depth);
    const nodeIndex = depthCurrentIdx[depth] ?? 0;
    depthCurrentIdx[depth] = nodeIndex + 1;
    const position = computePosition(depth, nodeIndex, depthNodeCount[depth] ?? 1);
    // The tracker buildNode will add the node, but we need to set position afterwards
    void position;
    return nodeId;
  }

  const rootNodeId = makeNodeId(firstValue, 0);
  tracker.selectElement(firstValue, { value: firstValue, preorderPointer: 0 });
  tracker.buildNode(rootNodeId, firstValue, { nodeId: rootNodeId, value: firstValue });

  const stack: StackEntry[] = [{ nodeId: rootNodeId, value: firstValue, depth: 0 }];
  let inorderPointer = 0;
  const parentMap = new Map<string, string>(); // childId -> parentId
  const sideMap = new Map<string, "left" | "right">(); // childId -> side

  for (let preorderPointer = 1; preorderPointer < preorder.length; preorderPointer++) {
    const currentValue = preorder[preorderPointer];
    if (currentValue === undefined) break;

    tracker.selectElement(currentValue, { value: currentValue, preorderPointer });

    const stackTop = stack[stack.length - 1];
    if (!stackTop) break;

    const newDepth = stackTop.depth + 1;
    const newNodeId = makeNodeId(currentValue, newDepth);
    tracker.buildNode(newNodeId, currentValue, { nodeId: newNodeId, value: currentValue });

    if (stackTop.value !== inorder[inorderPointer]) {
      // Left child
      parentMap.set(newNodeId, stackTop.nodeId);
      sideMap.set(newNodeId, "left");
      tracker.connectChild(stackTop.nodeId, newNodeId, "left", {
        parentId: stackTop.nodeId,
        childId: newNodeId,
        side: "left",
      });
      stack.push({ nodeId: newNodeId, value: currentValue, depth: newDepth });
    } else {
      // Pop stack to find right-child parent
      let lastPopped: StackEntry | undefined;
      while (stack.length > 0 && stack[stack.length - 1]?.value === inorder[inorderPointer]) {
        lastPopped = stack.pop();
        tracker.partitionArray(inorderPointer, inorderPointer, inorderPointer, {
          inorderPointer,
          poppedValue: lastPopped?.value,
        });
        inorderPointer++;
      }
      if (lastPopped) {
        parentMap.set(newNodeId, lastPopped.nodeId);
        sideMap.set(newNodeId, "right");
        tracker.connectChild(lastPopped.nodeId, newNodeId, "right", {
          parentId: lastPopped.nodeId,
          childId: newNodeId,
          side: "right",
        });
      }
      stack.push({ nodeId: newNodeId, value: currentValue, depth: newDepth });
    }

    tracker.markBuilt(newNodeId, { nodeId: newNodeId, value: currentValue });
  }

  tracker.markBuilt(rootNodeId, { nodeId: rootNodeId, value: firstValue });
  tracker.complete({ totalNodes: nodeCounter });

  return tracker.getSteps();
}
