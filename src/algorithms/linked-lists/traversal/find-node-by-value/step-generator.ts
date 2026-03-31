/** Step generator for Find Node by Value — produces ExecutionStep[] using LinkedListTracker. */

import type { ExecutionStep, LinkedListNode } from "@/types";
import { LinkedListTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIND_NODE_BY_VALUE!);

export interface FindNodeByValueInput {
  values: number[];
  target: number;
}

export function generateFindNodeByValueSteps(input: FindNodeByValueInput): ExecutionStep[] {
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

  // nextMap tracks original next pointers for algorithm logic
  const nextMap = new Map<string, string | null>(nodes.map((node) => [node.id, node.nextId]));

  tracker.setPointer("current", headId);
  tracker.initialize(`Initialize: current = head, target = ${target}`, {
    current: headId,
    target,
  });

  let currentId: string | null = headId;

  while (currentId !== null) {
    const currentNode = nodes.find((node) => node.id === currentId);
    const currentValue = currentNode?.value ?? 0;

    tracker.setPointer("current", currentId);
    tracker.visit(currentId, `Compare: current.value (${currentValue}) == target (${target})?`, {
      currentValue,
      target,
      currentId,
    });

    if (currentValue === target) {
      tracker.found(currentId, `Found target ${target} at node ${currentId}`, {
        found: currentId,
        target,
      });
      return tracker.getSteps();
    }

    currentId = nextMap.get(currentId) ?? null;
  }

  tracker.complete(headId, `Target ${target} not found in list`, {
    target,
    found: null,
  });

  return tracker.getSteps();
}
