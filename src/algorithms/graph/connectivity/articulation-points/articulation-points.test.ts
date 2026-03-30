import { describe, it, expect } from "vitest";

import { findArticulationPoints } from "./sources/articulation-points.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("findArticulationPoints", () => {
  it("finds two articulation points in the default 7-node graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["A", "B", "D"],
      D: ["C", "E", "F"],
      E: ["D", "G"],
      F: ["D", "G"],
      G: ["E", "F"],
    };
    const result = findArticulationPoints(adjacencyList, ["A", "B", "C", "D", "E", "F", "G"]);
    expect(new Set(result)).toEqual(new Set(["C", "D"]));
  });

  it("returns no articulation points for a triangle", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["A", "B"],
    };
    const result = findArticulationPoints(adjacencyList, ["A", "B", "C"]);
    expect(result).toHaveLength(0);
  });

  it("finds the single articulation point in a path graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A", "C"],
      C: ["B"],
    };
    const result = findArticulationPoints(adjacencyList, ["A", "B", "C"]);
    expect(new Set(result)).toEqual(new Set(["B"]));
  });

  it("finds multiple articulation points in a longer path", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A", "C"],
      C: ["B", "D"],
      D: ["C"],
    };
    const result = findArticulationPoints(adjacencyList, ["A", "B", "C", "D"]);
    expect(new Set(result)).toEqual(new Set(["B", "C"]));
  });

  it("returns no articulation points for a single node", () => {
    const adjacencyList: AdjacencyList = { A: [] };
    const result = findArticulationPoints(adjacencyList, ["A"]);
    expect(result).toHaveLength(0);
  });

  it("returns no articulation points for a fully connected graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C", "D"],
      B: ["A", "C", "D"],
      C: ["A", "B", "D"],
      D: ["A", "B", "C"],
    };
    const result = findArticulationPoints(adjacencyList, ["A", "B", "C", "D"]);
    expect(result).toHaveLength(0);
  });

  it("finds the star center as an articulation point", () => {
    const adjacencyList: AdjacencyList = {
      Center: ["A", "B", "C"],
      A: ["Center"],
      B: ["Center"],
      C: ["Center"],
    };
    const result = findArticulationPoints(adjacencyList, ["Center", "A", "B", "C"]);
    expect(new Set(result)).toEqual(new Set(["Center"]));
  });

  it("handles disconnected graphs with no articulation points", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["A", "B"],
      D: ["E", "F"],
      E: ["D", "F"],
      F: ["D", "E"],
    };
    const result = findArticulationPoints(adjacencyList, ["A", "B", "C", "D", "E", "F"]);
    expect(result).toHaveLength(0);
  });
});
