/** Step generator for Merge Two Sorted Lists — produces ExecutionStep[] using LinkedListTracker. */

import type { ExecutionStep, LinkedListNode } from "@/types";
import { LinkedListTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MERGE_TWO_SORTED_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MERGE_TWO_SORTED!);

export interface MergeTwoSortedInput {
  listA: number[];
  listB: number[];
}

export function generateMergeTwoSortedSteps(input: MergeTwoSortedInput): ExecutionStep[] {
  const { listA, listB } = input;

  const nodeSpacingX = 70;
  const startX = 50;
  const listAY = 80;
  const listBY = 180;

  // Build list A nodes
  const nodesA: LinkedListNode[] = listA.map((value, idx) => ({
    id: `nodeA-${idx}`,
    value,
    nextId: idx < listA.length - 1 ? `nodeA-${idx + 1}` : null,
    state: "default",
    position: { x: startX + idx * nodeSpacingX, y: listAY },
  }));

  // Build list B nodes
  const nodesB: LinkedListNode[] = listB.map((value, idx) => ({
    id: `nodeB-${idx}`,
    value,
    nextId: idx < listB.length - 1 ? `nodeB-${idx + 1}` : null,
    state: "default",
    position: { x: startX + idx * nodeSpacingX, y: listBY },
  }));

  const allNodes = [...nodesA, ...nodesB];
  const headIdA = nodesA.length > 0 ? "nodeA-0" : null;
  const headIdB = nodesB.length > 0 ? "nodeB-0" : null;

  const tracker = new LinkedListTracker(allNodes, headIdA, MERGE_TWO_SORTED_LINE_MAP);
  tracker.setSecondaryHead(headIdB);

  // nextMap tracks original next pointers
  const nextMap = new Map<string, string | null>(allNodes.map((node) => [node.id, node.nextId]));

  // Create dummy node for the merged result (will be at position to the right)
  const dummyId = "dummy";
  const dummy: LinkedListNode = {
    id: dummyId,
    value: -1,
    nextId: null,
    state: "default",
    position: { x: startX + Math.max(listA.length, listB.length) * nodeSpacingX + 50, y: 130 },
  };
  tracker.nodes = [...tracker.nodes, dummy];

  tracker.setPointer("currentA", headIdA);
  tracker.setPointer("currentB", headIdB);
  tracker.setPointer("tail", dummyId);

  tracker.initialize("Initialize: dummy node, currentA = headA, currentB = headB", {
    currentA: headIdA,
    currentB: headIdB,
    tail: dummyId,
  });

  let currentAId: string | null = headIdA;
  let currentBId: string | null = headIdB;
  let tailId: string | null = dummyId;

  while (currentAId !== null && currentBId !== null) {
    const currentANode = allNodes.find((n) => n.id === currentAId);
    const currentBNode = allNodes.find((n) => n.id === currentBId);

    if (!currentANode || !currentBNode) break;

    if (currentANode.value <= currentBNode.value) {
      tracker.compare(
        currentAId,
        currentBId,
        `Compare nodeA value ${currentANode.value} ≤ nodeB value ${currentBNode.value}`,
        { currentA: currentAId, currentB: currentBId, tail: tailId },
      );
      // Link tail to currentA
      if (tailId) {
        const tailNode = allNodes.find((n) => n.id === tailId);
        if (tailNode) tailNode.nextId = currentAId;
      }
      tracker.visit(currentAId, `Link tail to nodeA, advance currentA`, {
        currentA: currentAId,
        currentB: currentBId,
        tail: tailId,
      });
      tailId = currentAId;
      currentAId = nextMap.get(currentAId) ?? null;
    } else {
      tracker.compare(
        currentAId,
        currentBId,
        `Compare nodeA value ${currentANode.value} > nodeB value ${currentBNode.value}`,
        { currentA: currentAId, currentB: currentBId, tail: tailId },
      );
      // Link tail to currentB
      if (tailId) {
        const tailNode = allNodes.find((n) => n.id === tailId);
        if (tailNode) tailNode.nextId = currentBId;
      }
      tracker.visit(currentBId, `Link tail to nodeB, advance currentB`, {
        currentA: currentAId,
        currentB: currentBId,
        tail: tailId,
      });
      tailId = currentBId;
      currentBId = nextMap.get(currentBId) ?? null;
    }
    tracker.setPointer("currentA", currentAId);
    tracker.setPointer("currentB", currentBId);
    tracker.setPointer("tail", tailId);
  }

  // Attach remaining nodes
  const remainingHeadId = currentAId ?? currentBId;
  if (remainingHeadId !== null && tailId !== null) {
    const tailNode = allNodes.find((n) => n.id === tailId);
    if (tailNode) tailNode.nextId = remainingHeadId;
  }

  const resultHeadId = dummy.nextId ?? (dummyId === "dummy" ? null : dummyId);
  tracker.complete(resultHeadId, "Merge complete — return merged list", {
    result: resultHeadId,
  });

  return tracker.getSteps();
}
