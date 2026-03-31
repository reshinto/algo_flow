/** Step generator for Remove Duplicates from Sorted List — produces ExecutionStep[] using LinkedListTracker. */

import type { ExecutionStep, LinkedListNode } from "@/types";
import { LinkedListTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.REMOVE_DUPLICATES_SORTED!);

export interface RemoveDuplicatesSortedInput {
  values: number[];
}

export function generateRemoveDuplicatesSortedSteps(
  input: RemoveDuplicatesSortedInput,
): ExecutionStep[] {
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

  const nextMap = new Map<string, string | null>(nodes.map((node) => [node.id, node.nextId]));

  tracker.setPointer("current", headId);
  tracker.initialize("Initialize: current = head", { current: headId });

  if (headId === null) {
    tracker.complete(null, "List is empty, no duplicates to remove", {});
    return tracker.getSteps();
  }

  let currentId: string | null = headId;
  const deletedNodeIds = new Set<string>();

  while (currentId !== null) {
    const currentNode = nodes.find((n) => n.id === currentId);
    const nextId: string | null = nextMap.get(currentId) ?? null;
    const nextNode = nextId ? nodes.find((n) => n.id === nextId) : null;

    if (nextNode && currentNode && nextId !== null && currentNode.value === nextNode.value) {
      tracker.compare(
        currentId,
        nextId,
        `Compare: current.value ${currentNode.value} == next.value ${nextNode.value}`,
        { current: currentId, next: nextId, isDuplicate: true },
      );

      const skipId: string | null = nextMap.get(nextId) ?? null;
      tracker.deleteNode(nextId, currentId, `Remove duplicate: skip node ${nextId}`, {
        deleted: nextId,
        newNext: skipId,
      });

      deletedNodeIds.add(nextId);
      nextMap.set(currentId, skipId);
    } else {
      if (nextNode && currentNode && nextId !== null) {
        tracker.compare(
          currentId,
          nextId,
          `Compare: current.value ${currentNode.value} != next.value ${nextNode.value}`,
          { current: currentId, next: nextId, isDuplicate: false },
        );
      }

      currentId = nextId;
      tracker.setPointer("current", currentId);

      if (currentId !== null) {
        tracker.visit(currentId, `Advance: current = current.next`, { current: currentId });
      }
    }
  }

  tracker.complete(headId, "All duplicates removed from sorted list", {
    removedCount: deletedNodeIds.size,
  });

  return tracker.getSteps();
}
