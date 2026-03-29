/** Step generator for Reverse Linked List — produces ExecutionStep[] using LinkedListTracker. */

import type { ExecutionStep, LinkedListNode } from "@/types";
import { LinkedListTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.REVERSE_LINKED_LIST!);

export interface ReverseLinkedListInput {
  values: number[];
}

export function generateReverseLinkedListSteps(input: ReverseLinkedListInput): ExecutionStep[] {
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

  // nextMap tracks original next pointers for algorithm logic (tracker manages visual state)
  const nextMap = new Map<string, string | null>(nodes.map((node) => [node.id, node.nextId]));

  tracker.setPointer("prev", null);
  tracker.setPointer("current", headId);
  tracker.initialize({ prev: null, current: headId });

  let prevId: string | null = null;
  let currentId: string | null = headId;

  while (currentId !== null) {
    const nextId = nextMap.get(currentId) ?? null;

    tracker.setPointer("next", nextId);
    tracker.traverseNext(currentId, { current: currentId, next: nextId, prev: prevId });

    tracker.reversePointer(currentId, prevId, { current: currentId, prev: prevId });

    prevId = currentId;
    currentId = nextId;

    tracker.setPointer("prev", prevId);
    tracker.setPointer("current", currentId);
  }

  tracker.complete(prevId, { newHead: prevId });

  return tracker.getSteps();
}
