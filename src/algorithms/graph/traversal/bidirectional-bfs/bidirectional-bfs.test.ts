import { describe, it, expect } from "vitest";

import { bidirectionalBFS } from "./sources/bidirectional-bfs.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("bidirectionalBFS", () => {
  it("finds the shortest path in a simple linear graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["D"],
      D: [],
    };
    const result = bidirectionalBFS(adjacencyList, "A", "D");
    expect(result).toEqual(["A", "B", "C", "D"]);
  });

  it("finds a path in a branching graph from A to F", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["D"],
      C: ["E"],
      D: ["F"],
      E: ["F"],
      F: [],
    };
    const result = bidirectionalBFS(adjacencyList, "A", "F");
    expect(result).not.toBeNull();
    expect(result![0]).toBe("A");
    expect(result![result!.length - 1]).toBe("F");
  });

  it("returns null when no path exists between disconnected nodes", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: [],
      C: ["D"],
      D: [],
    };
    const result = bidirectionalBFS(adjacencyList, "A", "C");
    expect(result).toBeNull();
  });

  it("returns a single-element path when start and target are the same node", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: [],
    };
    const result = bidirectionalBFS(adjacencyList, "A", "A");
    expect(result).toEqual(["A"]);
  });

  it("finds the shortest path and not a longer one in a graph with multiple routes", () => {
    // Direct path A->B->E is length 3; longer path A->B->C->D->E is length 5
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C", "E"],
      C: ["D"],
      D: ["E"],
      E: [],
    };
    const result = bidirectionalBFS(adjacencyList, "A", "E");
    expect(result).not.toBeNull();
    // Shortest path has 3 nodes
    expect(result!.length).toBe(3);
    expect(result![0]).toBe("A");
    expect(result![result!.length - 1]).toBe("E");
  });

  it("handles adjacent start and target nodes", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: [],
    };
    const result = bidirectionalBFS(adjacencyList, "A", "B");
    expect(result).toEqual(["A", "B"]);
  });

  it("treats the graph as undirected even when edges are one-directional in the list", () => {
    // Only A->B is listed; the backward frontier from B should still reach A
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: [],
    };
    const result = bidirectionalBFS(adjacencyList, "B", "A");
    expect(result).not.toBeNull();
    expect(result).toHaveLength(2);
  });

  it("returns null for an isolated start node with no edges", () => {
    const adjacencyList: AdjacencyList = {
      A: [],
      B: ["C"],
      C: [],
    };
    const result = bidirectionalBFS(adjacencyList, "A", "C");
    expect(result).toBeNull();
  });
});
