/** Step generator for Linked List Length — produces ExecutionStep[] using LinkedListTracker. */

import type { ExecutionStep, LinkedListNode } from "@/types";
import { LinkedListTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LINKED_LIST_LENGTH!);

export interface LinkedListLengthInput {
  values: number[];
}

export function generateLinkedListLengthSteps(input: LinkedListLengthInput): ExecutionStep[] {
  const { values } = input;

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

  // nextMap tracks original next pointers for algorithm logic
  const nextMap = new Map<string, string | null>(nodes.map((node) => [node.id, node.nextId]));

  tracker.setPointer("current", headId);
  tracker.initialize("Initialize: current = head, count = 0", {
    current: headId,
    count: 0,
  });

  let currentId: string | null = headId;
  let count = 0;

  while (currentId !== null) {
    count++;
    tracker.visit(currentId, `Visit node ${currentId}, count = ${count}`, {
      current: currentId,
      count,
    });
    currentId = nextMap.get(currentId) ?? null;
    tracker.setPointer("current", currentId);
  }

  tracker.complete(headId, `Length is ${count}`, { count });

  return tracker.getSteps();
}
