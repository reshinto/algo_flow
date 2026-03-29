import { describe, it, expect } from "vitest";

import { breadthFirstSearch } from "./sources/bfs.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("breadthFirstSearch", () => {
  it("traverses a linear graph in order", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["D"],
      D: [],
    };
    expect(breadthFirstSearch(adjacencyList, "A")).toEqual(["A", "B", "C", "D"]);
  });

  it("traverses a tree graph level by level", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["D", "E"],
      C: ["F"],
      D: [],
      E: [],
      F: [],
    };
    const result = breadthFirstSearch(adjacencyList, "A");
    expect(result).toEqual(["A", "B", "C", "D", "E", "F"]);
  });

  it("handles a disconnected graph by visiting only reachable nodes", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: [],
      C: ["D"],
      D: [],
    };
    const result = breadthFirstSearch(adjacencyList, "A");
    expect(result).toEqual(["A", "B"]);
    expect(result).not.toContain("C");
    expect(result).not.toContain("D");
  });

  it("handles a single node graph", () => {
    const adjacencyList: AdjacencyList = {
      A: [],
    };
    expect(breadthFirstSearch(adjacencyList, "A")).toEqual(["A"]);
  });

  it("does not visit the same node twice in a cyclic graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["A"],
    };
    const result = breadthFirstSearch(adjacencyList, "A");
    expect(result).toEqual(["A", "B", "C"]);
  });

  it("visits neighbors in the order they appear in the adjacency list", () => {
    const adjacencyList: AdjacencyList = {
      A: ["C", "B"],
      B: [],
      C: [],
    };
    const result = breadthFirstSearch(adjacencyList, "A");
    expect(result).toEqual(["A", "C", "B"]);
  });

  it("handles a node with no neighbors listed in the adjacency list", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
    };
    const result = breadthFirstSearch(adjacencyList, "A");
    expect(result).toEqual(["A", "B"]);
  });

  it("traverses a fully connected graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C", "D"],
      B: ["A", "C", "D"],
      C: ["A", "B", "D"],
      D: ["A", "B", "C"],
    };
    const result = breadthFirstSearch(adjacencyList, "A");
    expect(result).toHaveLength(4);
    expect(result[0]).toBe("A");
    expect(new Set(result)).toEqual(new Set(["A", "B", "C", "D"]));
  });
});
