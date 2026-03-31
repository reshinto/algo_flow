/** Step generator for Insert at Position — produces ExecutionStep[] using LinkedListTracker. */

import type { ExecutionStep, LinkedListNode } from "@/types";
import { LinkedListTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.INSERT_AT_POSITION!);

export interface InsertAtPositionInput {
  values: number[];
  insertValue: number;
  position: number;
}

export function generateInsertAtPositionSteps(input: InsertAtPositionInput): ExecutionStep[] {
  const { values, insertValue, position } = input;

  const nodeSpacingX = 70;
  const startX = 50;
  const nodeY = 120;

  const nodes: LinkedListNode[] = values.map((value, idx) => ({
    id: `node-${idx}`,
    value,
    nextId: idx < values.length - 1 ? `node-${idx + 1}` : null,
    state: "default",
    position: { x: startX + idx * nodeSpacingX, y: nodeY },
  }));

  const headId = nodes.length > 0 ? "node-0" : null;
  const tracker = new LinkedListTracker(nodes, headId, LL_LINE_MAP);

  const nextMap = new Map<string, string | null>(nodes.map((node) => [node.id, node.nextId]));

  tracker.setPointer("current", headId);
  tracker.initialize("Initialize: create new node, current = head", {
    newNode: insertValue,
    position,
    current: headId,
  });

  if (position === 0) {
    const newNode: LinkedListNode = {
      id: "node-new",
      value: insertValue,
      nextId: headId,
      state: "inserted",
      position: { x: startX - nodeSpacingX, y: nodeY },
    };
    tracker.insertNode(newNode, null, "Insert new node at head", {
      newNode: insertValue,
      newHead: "node-new",
    });
    tracker.complete("node-new", "Insertion complete at position 0", {
      newHead: "node-new",
    });
    return tracker.getSteps();
  }

  let currentId: string | null = headId;
  let currentPosition = 0;

  while (currentId !== null && currentPosition < position - 1) {
    tracker.visit(
      currentId,
      `Traverse to find predecessor: current = current.next (pos ${currentPosition})`,
      { current: currentId, currentPosition },
    );
    const nextId = nextMap.get(currentId) ?? null;
    currentId = nextId;
    currentPosition++;
  }

  if (currentId !== null) {
    const nextNodeId = nextMap.get(currentId) ?? null;
    const insertPositionX = startX + values.length * nodeSpacingX;
    const newNode: LinkedListNode = {
      id: "node-new",
      value: insertValue,
      nextId: nextNodeId,
      state: "inserted",
      position: { x: insertPositionX, y: nodeY },
    };

    tracker.insertNode(
      newNode,
      currentId,
      `Insert new node with value ${insertValue} after node at position ${currentPosition}`,
      { newNode: insertValue, predecessor: currentId, position: currentPosition },
    );
  }

  tracker.complete(headId, `Insertion complete at position ${position}`, { position });

  return tracker.getSteps();
}
