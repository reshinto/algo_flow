/** Step generator for All Root to Leaf Paths (Iterative) — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ALL_ROOT_TO_LEAF_PATHS_ITERATIVE!);

export interface AllRootToLeafPathsIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateAllRootToLeafPathsIterativeSteps(
  input: AllRootToLeafPathsIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  const rootNode = nodeMap.get(rootId);
  if (!rootNode) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const stack: Array<[string, string]> = [[rootId, String(rootNode.value)]];
  const paths: string[] = [];

  while (stack.length > 0) {
    const entry = stack.pop()!;
    const [nodeId, pathSoFar] = entry;
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value, pathSoFar });

    if (!node.leftChildId && !node.rightChildId) {
      paths.push(pathSoFar);
      tracker.markValid(nodeId, { currentNode: nodeId, completedPath: pathSoFar });
    }

    if (node.rightChildId) {
      const rightNode = nodeMap.get(node.rightChildId);
      if (rightNode) stack.push([node.rightChildId, `${pathSoFar}->${rightNode.value}`]);
    }
    if (node.leftChildId) {
      const leftNode = nodeMap.get(node.leftChildId);
      if (leftNode) stack.push([node.leftChildId, `${pathSoFar}->${leftNode.value}`]);
    }
  }

  tracker.recordResult(paths.length, { result: paths, count: paths.length });
  tracker.complete({ result: paths, count: paths.length });

  return tracker.getSteps();
}
