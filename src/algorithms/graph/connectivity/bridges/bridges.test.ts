import { describe, it, expect } from "vitest";

import { findBridges } from "./sources/bridges.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("findBridges", () => {
  it("finds two bridges in the default 7-node graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["B", "A", "D"],
      D: ["C", "E"],
      E: ["D", "F", "G"],
      F: ["E", "G"],
      G: ["F", "E"],
    };
    const result = findBridges(adjacencyList, ["A", "B", "C", "D", "E", "F", "G"]);
    expect(result).toHaveLength(2);
    const bridgeSets = result.map(
      ([source, target]: [string, string]) => new Set([source, target]),
    );
    expect(bridgeSets).toContainEqual(new Set(["C", "D"]));
    expect(bridgeSets).toContainEqual(new Set(["D", "E"]));
  });

  it("returns no bridges for a cycle graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["A", "B"],
    };
    const result = findBridges(adjacencyList, ["A", "B", "C"]);
    expect(result).toHaveLength(0);
  });

  it("finds the single bridge in a simple two-node graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A"],
    };
    const result = findBridges(adjacencyList, ["A", "B"]);
    expect(result).toHaveLength(1);
    expect(new Set(result[0])).toEqual(new Set(["A", "B"]));
  });

  it("finds all edges as bridges in a path graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A", "C"],
      C: ["B", "D"],
      D: ["C"],
    };
    const result = findBridges(adjacencyList, ["A", "B", "C", "D"]);
    expect(result).toHaveLength(3);
  });

  it("returns empty for a fully connected graph with no bridges", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C", "D"],
      B: ["A", "C", "D"],
      C: ["A", "B", "D"],
      D: ["A", "B", "C"],
    };
    const result = findBridges(adjacencyList, ["A", "B", "C", "D"]);
    expect(result).toHaveLength(0);
  });

  it("handles a disconnected graph with bridges in each component", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A"],
      C: ["D"],
      D: ["C"],
    };
    const result = findBridges(adjacencyList, ["A", "B", "C", "D"]);
    expect(result).toHaveLength(2);
    const bridgeSets = result.map(
      ([source, target]: [string, string]) => new Set([source, target]),
    );
    expect(bridgeSets).toContainEqual(new Set(["A", "B"]));
    expect(bridgeSets).toContainEqual(new Set(["C", "D"]));
  });

  it("returns no bridges for a single isolated node", () => {
    const adjacencyList: AdjacencyList = { A: [] };
    const result = findBridges(adjacencyList, ["A"]);
    expect(result).toHaveLength(0);
  });
});
