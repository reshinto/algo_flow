/** Step generator for All Root to Leaf Paths — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ALL_ROOT_TO_LEAF_PATHS!);

export interface AllRootToLeafPathsInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateAllRootToLeafPathsSteps(input: AllRootToLeafPathsInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  const paths: string[] = [];

  function dfs(nodeId: string | null, currentPath: string[], pathIds: string[]): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    currentPath.push(String(node.value));
    pathIds.push(nodeId);

    tracker.checkNode(nodeId, {
      currentNode: nodeId,
      value: node.value,
      pathSoFar: currentPath.join("->"),
    });
    tracker.trackPath(pathIds, { currentNode: nodeId, pathSoFar: currentPath.join("->") });

    if (!node.leftChildId && !node.rightChildId) {
      const pathStr = currentPath.join("->");
      paths.push(pathStr);
      tracker.markValid(nodeId, { currentNode: nodeId, completedPath: pathStr });
    }

    dfs(node.leftChildId, [...currentPath], [...pathIds]);
    dfs(node.rightChildId, [...currentPath], [...pathIds]);
  }

  dfs(rootId, [], []);
  tracker.recordResult(paths.length, { result: paths, count: paths.length });
  tracker.complete({ result: paths, count: paths.length });

  return tracker.getSteps();
}
