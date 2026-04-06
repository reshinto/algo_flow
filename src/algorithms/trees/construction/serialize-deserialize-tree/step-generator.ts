/** Step generator for Serialize/Deserialize Binary Tree — produces ExecutionStep[] using TreeConstructionTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeConstructionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SERIALIZE_DESERIALIZE_TREE!);

export interface SerializeDeserializeTreeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateSerializeDeserializeTreeSteps(
  input: SerializeDeserializeTreeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  // Phase 1: Serialize via BFS
  const serializeTracker = new TreeConstructionTracker([...nodes], rootId, LINE_MAP);
  serializeTracker.initialize({ rootId, phase: "serialize" });

  const serializedParts: string[] = [];
  const bfsQueue: (string | null)[] = [rootId];

  while (bfsQueue.length > 0) {
    const nodeId = bfsQueue.shift();
    if (nodeId === null || nodeId === undefined) {
      serializedParts.push("null");
      continue;
    }

    const node = nodeMap.get(nodeId);
    if (!node) {
      serializedParts.push("null");
      continue;
    }

    serializeTracker.selectElement(node.value, { nodeId, value: node.value, phase: "serialize" });
    serializedParts.push(String(node.value));
    serializeTracker.markBuilt(nodeId, { nodeId, serialized: serializedParts.join(",") });

    bfsQueue.push(node.leftChildId ?? null);
    bfsQueue.push(node.rightChildId ?? null);
  }

  const serializedString = serializedParts.join(",");
  serializeTracker.complete({ serializedString, totalNodes: nodes.length });

  const serializeSteps = serializeTracker.getSteps();

  // Phase 2: Deserialize from the serialized string
  const deserializeTracker = new TreeConstructionTracker([], "", LINE_MAP);
  deserializeTracker.initialize({ serializedString, phase: "deserialize" });

  const parts = serializedString.split(",");
  const firstPart = parts[0];

  if (!firstPart || firstPart === "null") {
    deserializeTracker.complete({ totalNodes: 0 });
    const earlySteps = [...serializeSteps, ...deserializeTracker.getSteps()];
    return earlySteps.map((step, combinedIndex) => ({ ...step, index: combinedIndex }));
  }

  let nodeCounter = 0;
  const makeNodeId = (): string => {
    nodeCounter++;
    return `rebuilt-${String(nodeCounter)}`;
  };

  deserializeTracker.selectElement(Number(firstPart), { value: Number(firstPart), partIndex: 0 });

  const rootNodeId = makeNodeId();
  deserializeTracker.buildNode(rootNodeId, Number(firstPart), {
    nodeId: rootNodeId,
    value: Number(firstPart),
  });

  const deserializeQueue: { nodeId: string; depth: number }[] = [{ nodeId: rootNodeId, depth: 0 }];
  let partIndex = 1;

  while (deserializeQueue.length > 0 && partIndex < parts.length) {
    const current = deserializeQueue.shift();
    if (!current) break;

    const leftValue = parts[partIndex];
    partIndex++;

    if (leftValue !== undefined && leftValue !== "null") {
      deserializeTracker.selectElement(Number(leftValue), {
        value: Number(leftValue),
        partIndex: partIndex - 1,
      });
      const leftNodeId = makeNodeId();
      const leftDepth = current.depth + 1;
      deserializeTracker.buildNode(leftNodeId, Number(leftValue), {
        nodeId: leftNodeId,
        value: Number(leftValue),
        depth: leftDepth,
      });
      deserializeTracker.connectChild(current.nodeId, leftNodeId, "left", {
        parentId: current.nodeId,
        childId: leftNodeId,
        side: "left",
      });
      deserializeTracker.markBuilt(leftNodeId, { nodeId: leftNodeId, value: Number(leftValue) });
      deserializeQueue.push({ nodeId: leftNodeId, depth: leftDepth });
    }

    if (partIndex >= parts.length) break;

    const rightValue = parts[partIndex];
    partIndex++;

    if (rightValue !== undefined && rightValue !== "null") {
      deserializeTracker.selectElement(Number(rightValue), {
        value: Number(rightValue),
        partIndex: partIndex - 1,
      });
      const rightNodeId = makeNodeId();
      const rightDepth = current.depth + 1;
      deserializeTracker.buildNode(rightNodeId, Number(rightValue), {
        nodeId: rightNodeId,
        value: Number(rightValue),
        depth: rightDepth,
      });
      deserializeTracker.connectChild(current.nodeId, rightNodeId, "right", {
        parentId: current.nodeId,
        childId: rightNodeId,
        side: "right",
      });
      deserializeTracker.markBuilt(rightNodeId, { nodeId: rightNodeId, value: Number(rightValue) });
      deserializeQueue.push({ nodeId: rightNodeId, depth: rightDepth });
    }
  }

  deserializeTracker.markBuilt(rootNodeId, {
    nodeId: rootNodeId,
    value: Number(firstPart),
    rebuilt: true,
  });
  deserializeTracker.complete({ totalNodes: nodeCounter, serializedString });

  const allSteps = [...serializeSteps, ...deserializeTracker.getSteps()];
  // Renumber step indices so they are monotonically incrementing across both phases
  return allSteps.map((step, combinedIndex) => ({ ...step, index: combinedIndex }));
}
