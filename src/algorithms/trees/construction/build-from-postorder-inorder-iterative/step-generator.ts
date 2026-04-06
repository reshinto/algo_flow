/** Step generator for Build Tree from Postorder + Inorder Iterative — produces ExecutionStep[] using TreeConstructionTracker. */

import type { ExecutionStep } from "@/types";
import { TreeConstructionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BUILD_FROM_POSTORDER_INORDER_ITERATIVE!);

export interface BuildFromPostorderInorderIterativeInput {
  postorder: number[];
  inorder: number[];
}

/** Compute visual position given depth and horizontal slot. */
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

export function generateBuildFromPostorderInorderIterativeSteps(
  input: BuildFromPostorderInorderIterativeInput,
): ExecutionStep[] {
  const { postorder, inorder } = input;

  const tracker = new TreeConstructionTracker([], "", LINE_MAP);
  tracker.initialize({ postorder: [...postorder], inorder: [...inorder] });

  if (postorder.length === 0) {
    tracker.complete({ totalNodes: 0 });
    return tracker.getSteps();
  }

  const lastValue = postorder[postorder.length - 1];
  if (lastValue === undefined) {
    tracker.complete({ totalNodes: 0 });
    return tracker.getSteps();
  }

  let nodeCounter = 0;
  const depthNodeCount: number[] = [1];
  const depthCurrentIdx: number[] = [0];

  // Pre-compute depth for each postorder value using the same iterative logic
  const valueToDepth = new Map<number, number>();
  {
    const tempStack: { value: number; depth: number }[] = [{ value: lastValue, depth: 0 }];
    let inorderIdx = inorder.length - 1;
    for (let postIdx = postorder.length - 2; postIdx >= 0; postIdx--) {
      const currentValue = postorder[postIdx];
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
          inorderIdx--;
        }
        newDepth = parentDepth + 1;
        tempStack.push({ value: currentValue, depth: newDepth });
      }
      valueToDepth.set(currentValue, newDepth);
      depthNodeCount[newDepth] = (depthNodeCount[newDepth] ?? 0) + 1;
    }
  }
  valueToDepth.set(lastValue, 0);

  function makeNodeId(value: number): string {
    nodeCounter++;
    const nodeId = `node-${String(nodeCounter)}`;
    const depth = valueToDepth.get(value) ?? 0;
    while (depthCurrentIdx.length <= depth) depthCurrentIdx.push(0);
    const nodeIndex = depthCurrentIdx[depth] ?? 0;
    depthCurrentIdx[depth] = nodeIndex + 1;
    const position = computePosition(depth, nodeIndex, depthNodeCount[depth] ?? 1);
    void position;
    return nodeId;
  }

  interface StackEntry {
    nodeId: string;
    value: number;
  }

  const rootNodeId = makeNodeId(lastValue);
  tracker.selectElement(lastValue, { value: lastValue, postorderPointer: postorder.length - 1 });
  tracker.buildNode(rootNodeId, lastValue, { nodeId: rootNodeId, value: lastValue });

  const stack: StackEntry[] = [{ nodeId: rootNodeId, value: lastValue }];
  let inorderPointer = inorder.length - 1;

  for (let postorderPointer = postorder.length - 2; postorderPointer >= 0; postorderPointer--) {
    const currentValue = postorder[postorderPointer];
    if (currentValue === undefined) break;

    tracker.selectElement(currentValue, { value: currentValue, postorderPointer });

    const stackTop = stack[stack.length - 1];
    if (!stackTop) break;

    const newNodeId = makeNodeId(currentValue);
    tracker.buildNode(newNodeId, currentValue, { nodeId: newNodeId, value: currentValue });

    if (stackTop.value !== inorder[inorderPointer]) {
      tracker.connectChild(stackTop.nodeId, newNodeId, "right", {
        parentId: stackTop.nodeId,
        childId: newNodeId,
        side: "right",
      });
      stack.push({ nodeId: newNodeId, value: currentValue });
    } else {
      let lastPopped: StackEntry | undefined;
      while (stack.length > 0 && stack[stack.length - 1]?.value === inorder[inorderPointer]) {
        lastPopped = stack.pop();
        tracker.partitionArray(inorderPointer, inorderPointer, inorderPointer, {
          inorderPointer,
          poppedValue: lastPopped?.value,
        });
        inorderPointer--;
      }
      if (lastPopped) {
        tracker.connectChild(lastPopped.nodeId, newNodeId, "left", {
          parentId: lastPopped.nodeId,
          childId: newNodeId,
          side: "left",
        });
      }
      stack.push({ nodeId: newNodeId, value: currentValue });
    }

    tracker.markBuilt(newNodeId, { nodeId: newNodeId, value: currentValue });
  }

  tracker.markBuilt(rootNodeId, { nodeId: rootNodeId, value: lastValue });
  tracker.complete({ totalNodes: nodeCounter });

  return tracker.getSteps();
}
