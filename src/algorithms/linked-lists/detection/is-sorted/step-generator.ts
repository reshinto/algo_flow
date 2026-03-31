/** Step generator for Check if Sorted — produces ExecutionStep[] using LinkedListTracker. */

import type { ExecutionStep, LinkedListNode } from "@/types";
import { LinkedListTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const IS_SORTED_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.IS_SORTED!);

export interface IsSortedInput {
  values: number[];
}

export function generateIsSortedSteps(input: IsSortedInput): ExecutionStep[] {
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
  const tracker = new LinkedListTracker(nodes, headId, IS_SORTED_LINE_MAP);

  // nextMap tracks original next pointers for algorithm logic
  const nextMap = new Map<string, string | null>(nodes.map((node) => [node.id, node.nextId]));

  tracker.setPointer("current", headId);
  tracker.initialize("Initialize: current = head", { current: headId, isSorted: true });

  let currentId: string | null = headId;

  while (currentId !== null) {
    const nextId = nextMap.get(currentId) ?? null;
    if (nextId !== null) {
      tracker.compare(currentId, nextId, `Compare node ${currentId} with ${nextId}`, {
        current: currentId,
        next: nextId,
      });

      // Find values from nodes array
      const currentNode = nodes.find((node) => node.id === currentId);
      const nextNode = nodes.find((node) => node.id === nextId);

      if (currentNode && nextNode && currentNode.value > nextNode.value) {
        tracker.complete(headId, "List is NOT sorted — found out-of-order pair", {
          isSorted: false,
        });
        return tracker.getSteps();
      }
    }

    tracker.setPointer("current", nextId);
    currentId = nextId;
  }

  tracker.complete(headId, "List is sorted — all pairs are in order", { isSorted: true });

  return tracker.getSteps();
}
