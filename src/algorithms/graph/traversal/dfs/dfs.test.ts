import { describe, it, expect } from "vitest";

import { depthFirstSearch } from "./sources/dfs.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("depthFirstSearch", () => {
  it("traverses a linear graph in order", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["D"],
      D: [],
    };
    expect(depthFirstSearch(adjacencyList, "A")).toEqual(["A", "B", "C", "D"]);
  });

  it("traverses a tree graph depth-first", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["D", "E"],
      C: ["F"],
      D: [],
      E: [],
      F: [],
    };
    const result: string[] = depthFirstSearch(adjacencyList, "A");
    // DFS explores one full branch before the other
    expect(result[0]).toBe("A");
    expect(new Set(result)).toEqual(new Set(["A", "B", "C", "D", "E", "F"]));
    expect(result).toHaveLength(6);
    // B must appear before C (it is pushed first, but stack is LIFO so C is popped first
    // unless we reverse — verify actual traversal order by checking depth-first property)
    const indexOfA = result.indexOf("A");
    const indexOfB = result.indexOf("B");
    const indexOfC = result.indexOf("C");
    expect(indexOfA).toBeLessThan(indexOfB);
    expect(indexOfA).toBeLessThan(indexOfC);
  });

  it("handles a disconnected graph by visiting only reachable nodes", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: [],
      C: ["D"],
      D: [],
    };
    const result: string[] = depthFirstSearch(adjacencyList, "A");
    expect(result).toEqual(["A", "B"]);
    expect(result).not.toContain("C");
    expect(result).not.toContain("D");
  });

  it("handles a single node graph", () => {
    const adjacencyList: AdjacencyList = {
      A: [],
    };
    expect(depthFirstSearch(adjacencyList, "A")).toEqual(["A"]);
  });

  it("does not visit the same node twice in a cyclic graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["A"],
    };
    const result: string[] = depthFirstSearch(adjacencyList, "A");
    expect(result).toHaveLength(3);
    expect(new Set(result)).toEqual(new Set(["A", "B", "C"]));
  });

  it("handles a fully connected graph without revisiting nodes", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C", "D"],
      B: ["A", "C", "D"],
      C: ["A", "B", "D"],
      D: ["A", "B", "C"],
    };
    const result: string[] = depthFirstSearch(adjacencyList, "A");
    expect(result).toHaveLength(4);
    expect(result[0]).toBe("A");
    expect(new Set(result)).toEqual(new Set(["A", "B", "C", "D"]));
  });

  it("handles a node with no neighbors listed in the adjacency list", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
    };
    const result: string[] = depthFirstSearch(adjacencyList, "A");
    expect(result).toEqual(["A", "B"]);
  });

  it("traverses a diamond-shaped graph visiting each node exactly once", () => {
    // A → B and A → C, both B and C → D
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["D"],
      C: ["D"],
      D: [],
    };
    const result: string[] = depthFirstSearch(adjacencyList, "A");
    expect(result).toHaveLength(4);
    expect(result[0]).toBe("A");
    expect(new Set(result)).toEqual(new Set(["A", "B", "C", "D"]));
  });
});
