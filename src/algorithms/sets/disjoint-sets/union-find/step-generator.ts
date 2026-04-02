/** Step generator for Union-Find — produces ExecutionStep[] using DisjointSetTracker. */

import type { ExecutionStep } from "@/types";
import { DisjointSetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const UNION_FIND_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.UNION_FIND!);

export interface UnionFindInput {
  elementCount: number;
  operations: [number, number][];
}

const DEFAULT_INPUT: UnionFindInput = {
  elementCount: 8,
  operations: [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [0, 2],
    [4, 6],
    [0, 4],
  ],
};

export { DEFAULT_INPUT as UNION_FIND_DEFAULT_INPUT };

export function generateUnionFindSteps(input: UnionFindInput): ExecutionStep[] {
  const { elementCount, operations } = input;

  const tracker = new DisjointSetTracker(elementCount, UNION_FIND_LINE_MAP);

  tracker.initialize({ elementCount, operations });

  const parent: number[] = Array.from({ length: elementCount }, (_, idx) => idx);
  const rank: number[] = Array.from({ length: elementCount }, () => 0);

  /**
   * Path-compressing find that records tracker steps.
   * Traverses to the root iteratively, then compresses all nodes in the path.
   */
  function findWithTracking(element: number): number {
    const path: number[] = [];
    let current = element;
    while (parent[current]! !== current) {
      path.push(current);
      current = parent[current]!;
    }
    path.push(current); // include root

    tracker.findRoot(element, path, { element, root: current, pathLength: path.length });

    // Path compression: point each node on the path directly to the root
    for (const pathElement of path) {
      if (pathElement !== current) {
        parent[pathElement] = current;
        tracker.pathCompress(pathElement, current, { pathElement, root: current });
      }
    }

    return current;
  }

  /**
   * Path-compressing find without tracker calls.
   * Used to build component snapshots after union without emitting extra steps.
   */
  function findWithoutTracking(element: number): number {
    let current = element;
    while (parent[current]! !== current) {
      parent[current] = parent[parent[current]!]!; // path halving
      current = parent[current]!;
    }
    return current;
  }

  function buildComponents(): number[][] {
    const componentMap = new Map<number, number[]>();
    for (let elemIdx = 0; elemIdx < elementCount; elemIdx++) {
      const root = findWithoutTracking(elemIdx);
      if (!componentMap.has(root)) componentMap.set(root, []);
      componentMap.get(root)!.push(elemIdx);
    }
    return Array.from(componentMap.values());
  }

  for (const [elemA, elemB] of operations) {
    const rootA = findWithTracking(elemA);
    const rootB = findWithTracking(elemB);

    if (rootA !== rootB) {
      // Apply union by rank
      const rankOfA = rank[rootA] ?? 0;
      const rankOfB = rank[rootB] ?? 0;
      if (rankOfA >= rankOfB) {
        parent[rootB] = rootA;
        if (rankOfA === rankOfB) {
          rank[rootA] = rankOfA + 1;
        }
      } else {
        parent[rootA] = rootB;
      }

      tracker.unionSets(rootA, rootB, { rootA, rootB });

      const components = buildComponents();
      tracker.updateComponents(components, { componentCount: components.length });
    }
  }

  // Build final components for the complete step
  const finalComponents = buildComponents();
  tracker.complete({ finalComponents, componentCount: finalComponents.length });

  return tracker.getSteps();
}
