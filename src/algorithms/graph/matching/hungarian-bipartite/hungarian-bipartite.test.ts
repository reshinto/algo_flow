import { describe, it, expect } from "vitest";

import { hungarianMatching } from "./sources/hungarian-bipartite.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("hungarianMatching", () => {
  it("finds a perfect matching for a fully-matchable bipartite graph", () => {
    const adjacencyList: AdjacencyList = {
      L1: ["R1", "R2"],
      L2: ["R2", "R3"],
      L3: ["R1", "R3"],
      R1: ["L1", "L3"],
      R2: ["L1", "L2"],
      R3: ["L2", "L3"],
    };
    const result = hungarianMatching(adjacencyList, ["L1", "L2", "L3"], ["R1", "R2", "R3"]);
    expect(Object.keys(result)).toHaveLength(3);
    // Every left node must be matched
    expect(result["L1"]).toBeDefined();
    expect(result["L2"]).toBeDefined();
    expect(result["L3"]).toBeDefined();
    // No two left nodes share the same right node
    const rightValues = Object.values(result);
    expect(new Set(rightValues).size).toBe(rightValues.length);
  });

  it("returns a partial matching when not all left nodes can be matched", () => {
    // Both L1 and L2 only connect to R1 — only one can be matched
    const adjacencyList: AdjacencyList = {
      L1: ["R1"],
      L2: ["R1"],
      R1: ["L1", "L2"],
    };
    const result = hungarianMatching(adjacencyList, ["L1", "L2"], ["R1"]);
    expect(Object.keys(result)).toHaveLength(1);
    const matchedLeft = Object.keys(result)[0]!;
    expect(result[matchedLeft]).toBe("R1");
  });

  it("returns empty matching for a graph with no edges", () => {
    const adjacencyList: AdjacencyList = {
      L1: [],
      L2: [],
      R1: [],
      R2: [],
    };
    const result = hungarianMatching(adjacencyList, ["L1", "L2"], ["R1", "R2"]);
    expect(Object.keys(result)).toHaveLength(0);
  });

  it("matches a single left-right pair correctly", () => {
    const adjacencyList: AdjacencyList = {
      L1: ["R1"],
      R1: ["L1"],
    };
    const result = hungarianMatching(adjacencyList, ["L1"], ["R1"]);
    expect(result["L1"]).toBe("R1");
    expect(Object.keys(result)).toHaveLength(1);
  });

  it("finds augmenting path to re-route an existing match", () => {
    // L1 matches R1 first, then L2 needs R1 and must re-route L1 to R2
    const adjacencyList: AdjacencyList = {
      L1: ["R1", "R2"],
      L2: ["R1"],
      R1: ["L1", "L2"],
      R2: ["L1"],
    };
    const result = hungarianMatching(adjacencyList, ["L1", "L2"], ["R1", "R2"]);
    // Both should be matched (L2 gets R1, L1 re-routes to R2)
    expect(Object.keys(result)).toHaveLength(2);
    const rightValues = Object.values(result);
    expect(new Set(rightValues).size).toBe(2);
  });

  it("handles a one-to-one bipartite graph with guaranteed perfect matching", () => {
    const adjacencyList: AdjacencyList = {
      L1: ["R1"],
      L2: ["R2"],
      L3: ["R3"],
      R1: ["L1"],
      R2: ["L2"],
      R3: ["L3"],
    };
    const result = hungarianMatching(adjacencyList, ["L1", "L2", "L3"], ["R1", "R2", "R3"]);
    expect(result["L1"]).toBe("R1");
    expect(result["L2"]).toBe("R2");
    expect(result["L3"]).toBe("R3");
  });

  it("returns empty matching for an empty graph with no nodes", () => {
    const result = hungarianMatching({}, [], []);
    expect(Object.keys(result)).toHaveLength(0);
  });
});
