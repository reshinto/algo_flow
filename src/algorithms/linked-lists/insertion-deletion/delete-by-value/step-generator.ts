/** Step generator for Delete by Value — produces ExecutionStep[] using LinkedListTracker. */

import type { ExecutionStep, LinkedListNode } from "@/types";
import { LinkedListTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DELETE_BY_VALUE!);

export interface DeleteByValueInput {
  values: number[];
  target: number;
}

export function generateDeleteByValueSteps(input: DeleteByValueInput): ExecutionStep[] {
  const { values, target } = input;

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

  tracker.initialize("Initialize: current = head, target = " + target, {
    target,
    current: headId,
  });

  if (headId === null) {
    tracker.complete(null, "List is empty, nothing to delete", { target });
    return tracker.getSteps();
  }

  const headNode = nodes[0];
  if (headNode?.value === target) {
    const nextHeadId = nextMap.get(headId) ?? null;
    tracker.compare(headId, headId, "Head value equals target: " + target, {
      target,
      deletingHead: true,
    });
    tracker.deleteNode(headId, null, "Delete head node", {
      deleted: target,
      newHead: nextHeadId,
    });
    tracker.complete(nextHeadId, "Deletion complete — new head set", {
      newHead: nextHeadId,
    });
    return tracker.getSteps();
  }

  let currentId: string | null = headId;
  let previousId: string | null = null;
  let found = false;

  while (currentId !== null && !found) {
    const currentNode = nodes.find((n) => n.id === currentId);
    const targetValue = currentNode?.value;

    tracker.visit(currentId, `Traverse: current = ${currentId}, value = ${targetValue}`, {
      current: currentId,
      previous: previousId,
      target,
    });

    if (targetValue === target) {
      tracker.compare(currentId, currentId, `Found target value ${target} at ${currentId}`, {
        target,
        found: currentId,
      });

      const nextNodeId = nextMap.get(currentId) ?? null;
      tracker.deleteNode(currentId, previousId, `Delete node with value ${target}`, {
        deleted: currentId,
        nextNode: nextNodeId,
      });
      found = true;
    } else {
      previousId = currentId;
      currentId = nextMap.get(currentId) ?? null;
    }
  }

  if (!found) {
    tracker.complete(headId, `Target value ${target} not found in list`, {
      target,
      found: false,
    });
  } else {
    tracker.complete(headId, "Deletion complete — first matching node removed", {
      target,
    });
  }

  return tracker.getSteps();
}
