import { describe, it, expect } from "vitest";

import { dfsTopologicalSort } from "./sources/dfs-topological.ts?fn";

type AdjacencyList = Record<string, string[]>;

/** Verifies that every directed edge u→v has u before v in the ordering. */
function isValidTopologicalOrder(order: string[], adjacencyList: AdjacencyList): boolean {
  const positionMap: Record<string, number> = {};
  for (let posIndex = 0; posIndex < order.length; posIndex++) {
    positionMap[order[posIndex]!] = posIndex;
  }
  for (const [sourceNode, neighbors] of Object.entries(adjacencyList)) {
    for (const targetNode of neighbors) {
      const sourcePosition = positionMap[sourceNode];
      const targetPosition = positionMap[targetNode];
      if (sourcePosition === undefined || targetPosition === undefined) return false;
      if (sourcePosition >= targetPosition) return false;
    }
  }
  return true;
}

describe("dfsTopologicalSort", () => {
  it("produces a valid topological order for the default DAG", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["D"],
      C: ["D", "E"],
      D: ["F"],
      E: ["F"],
      F: [],
    };
    const nodeIds = ["A", "B", "C", "D", "E", "F"];
    const result = dfsTopologicalSort(adjacencyList, nodeIds);

    expect(result).toHaveLength(6);
    expect(isValidTopologicalOrder(result, adjacencyList)).toBe(true);
  });

  it("places the source node first in a linear chain", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["D"],
      D: [],
    };
    const nodeIds = ["A", "B", "C", "D"];
    const result = dfsTopologicalSort(adjacencyList, nodeIds);

    expect(result).toEqual(["A", "B", "C", "D"]);
    expect(isValidTopologicalOrder(result, adjacencyList)).toBe(true);
  });

  it("handles a single node with no edges", () => {
    const adjacencyList: AdjacencyList = { A: [] };
    const nodeIds = ["A"];
    const result = dfsTopologicalSort(adjacencyList, nodeIds);

    expect(result).toEqual(["A"]);
  });

  it("handles a diamond-shaped DAG correctly", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["D"],
      C: ["D"],
      D: [],
    };
    const nodeIds = ["A", "B", "C", "D"];
    const result = dfsTopologicalSort(adjacencyList, nodeIds);

    expect(result).toHaveLength(4);
    expect(isValidTopologicalOrder(result, adjacencyList)).toBe(true);
    expect(result[0]).toBe("A");
    expect(result[result.length - 1]).toBe("D");
  });

  it("returns all nodes for a fully independent node set", () => {
    const adjacencyList: AdjacencyList = { A: [], B: [], C: [], D: [] };
    const nodeIds = ["A", "B", "C", "D"];
    const result = dfsTopologicalSort(adjacencyList, nodeIds);

    expect(result).toHaveLength(4);
    expect(new Set(result)).toEqual(new Set(nodeIds));
  });

  it("handles a graph where multiple root nodes exist", () => {
    const adjacencyList: AdjacencyList = {
      A: ["C"],
      B: ["C"],
      C: [],
    };
    const nodeIds = ["A", "B", "C"];
    const result = dfsTopologicalSort(adjacencyList, nodeIds);

    expect(result).toHaveLength(3);
    expect(isValidTopologicalOrder(result, adjacencyList)).toBe(true);
    expect(result.indexOf("C")).toBeGreaterThan(result.indexOf("A"));
    expect(result.indexOf("C")).toBeGreaterThan(result.indexOf("B"));
  });

  it("does not revisit already-visited nodes in a shared-dependency graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["C"],
      B: ["C"],
      C: ["D"],
      D: [],
    };
    const nodeIds = ["A", "B", "C", "D"];
    const result = dfsTopologicalSort(adjacencyList, nodeIds);

    expect(result).toHaveLength(4);
    // C and D should each appear exactly once
    const resultArray = result as string[];
    expect(resultArray.filter((nodeId: string) => nodeId === "C")).toHaveLength(1);
    expect(resultArray.filter((nodeId: string) => nodeId === "D")).toHaveLength(1);
    expect(isValidTopologicalOrder(result, adjacencyList)).toBe(true);
  });
});
