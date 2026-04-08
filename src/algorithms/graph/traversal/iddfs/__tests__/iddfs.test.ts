import { describe, it, expect } from "vitest";

import { iterativeDeepeningDFS } from "../sources/iddfs.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("iterativeDeepeningDFS", () => {
  it("traverses a linear graph in depth-first order", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["D"],
      D: [],
    };
    expect(iterativeDeepeningDFS(adjacencyList, "A")).toEqual(["A", "B", "C", "D"]);
  });

  it("traverses a tree graph visiting children before siblings at each depth", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["D", "E"],
      C: ["F"],
      D: [],
      E: [],
      F: [],
    };
    const result: string[] = iterativeDeepeningDFS(adjacencyList, "A");
    expect(result).toHaveLength(6);
    expect(result[0]).toBe("A");
    expect(new Set(result)).toEqual(new Set(["A", "B", "C", "D", "E", "F"]));
  });

  it("handles a disconnected graph by visiting only reachable nodes", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: [],
      C: ["D"],
      D: [],
    };
    const result: string[] = iterativeDeepeningDFS(adjacencyList, "A");
    expect(result).toContain("A");
    expect(result).toContain("B");
    expect(result).not.toContain("C");
    expect(result).not.toContain("D");
  });

  it("handles a single node graph", () => {
    const adjacencyList: AdjacencyList = {
      A: [],
    };
    expect(iterativeDeepeningDFS(adjacencyList, "A")).toEqual(["A"]);
  });

  it("does not visit the same node twice in a cyclic graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["A"],
    };
    const result: string[] = iterativeDeepeningDFS(adjacencyList, "A");
    expect(result).toEqual(["A", "B", "C"]);
    expect(result).toHaveLength(3);
  });

  it("respects an explicit maxDepth and stops expanding beyond it", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["D"],
      C: ["E"],
      D: ["F"],
      E: [],
      F: [],
    };
    // With maxDepth=1 only A and its direct neighbors should be reachable
    const result: string[] = iterativeDeepeningDFS(adjacencyList, "A", 1);
    expect(result).toContain("A");
    expect(result).toContain("B");
    expect(result).toContain("C");
    expect(result).not.toContain("D");
    expect(result).not.toContain("F");
  });

  it("visits neighbors in the order they appear in the adjacency list", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: [],
      C: [],
    };
    const result: string[] = iterativeDeepeningDFS(adjacencyList, "A");
    // DFS visits B before C because neighbors are pushed in reverse and B comes last
    expect(result[0]).toBe("A");
    expect(new Set(result)).toEqual(new Set(["A", "B", "C"]));
  });

  it("traverses a fully connected graph visiting all nodes", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C", "D"],
      B: ["A", "C", "D"],
      C: ["A", "B", "D"],
      D: ["A", "B", "C"],
    };
    const result: string[] = iterativeDeepeningDFS(adjacencyList, "A");
    expect(result).toHaveLength(4);
    expect(result[0]).toBe("A");
    expect(new Set(result)).toEqual(new Set(["A", "B", "C", "D"]));
  });
});
