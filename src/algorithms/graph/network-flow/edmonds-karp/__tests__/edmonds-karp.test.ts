import { describe, it, expect } from "vitest";

import { edmondsKarp } from "../sources/edmonds-karp.ts?fn";

type FlowEdge = { target: string; capacity: number };
type FlowGraph = Record<string, FlowEdge[]>;

describe("edmondsKarp", () => {
  it("computes max flow for a simple linear path", () => {
    const graph: FlowGraph = {
      S: [{ target: "T", capacity: 5 }],
      T: [],
    };
    expect(edmondsKarp(graph, "S", "T")).toBe(5);
  });

  it("computes max flow limited by bottleneck edge", () => {
    const graph: FlowGraph = {
      S: [{ target: "A", capacity: 10 }],
      A: [{ target: "T", capacity: 3 }],
      T: [],
    };
    expect(edmondsKarp(graph, "S", "T")).toBe(3);
  });

  it("computes max flow across two parallel paths", () => {
    const graph: FlowGraph = {
      S: [
        { target: "A", capacity: 5 },
        { target: "B", capacity: 5 },
      ],
      A: [{ target: "T", capacity: 5 }],
      B: [{ target: "T", capacity: 5 }],
      T: [],
    };
    expect(edmondsKarp(graph, "S", "T")).toBe(10);
  });

  it("computes max flow for the default 6-node network", () => {
    const graph: FlowGraph = {
      S: [
        { target: "A", capacity: 10 },
        { target: "B", capacity: 8 },
      ],
      A: [
        { target: "B", capacity: 5 },
        { target: "C", capacity: 7 },
      ],
      B: [{ target: "D", capacity: 10 }],
      C: [
        { target: "D", capacity: 3 },
        { target: "T", capacity: 8 },
      ],
      D: [{ target: "T", capacity: 10 }],
      T: [],
    };
    expect(edmondsKarp(graph, "S", "T")).toBe(17);
  });

  it("returns zero when no path from source to sink exists", () => {
    const graph: FlowGraph = {
      S: [{ target: "A", capacity: 10 }],
      A: [],
      T: [],
    };
    expect(edmondsKarp(graph, "S", "T")).toBe(0);
  });

  it("produces the same max flow as Ford-Fulkerson on the same graph", () => {
    const graph: FlowGraph = {
      S: [
        { target: "A", capacity: 4 },
        { target: "B", capacity: 2 },
      ],
      A: [
        { target: "B", capacity: 4 },
        { target: "T", capacity: 2 },
      ],
      B: [{ target: "T", capacity: 4 }],
      T: [],
    };
    expect(edmondsKarp(graph, "S", "T")).toBe(6);
  });

  it("handles a graph where source has no outgoing edges", () => {
    const graph: FlowGraph = {
      S: [],
      T: [],
    };
    expect(edmondsKarp(graph, "S", "T")).toBe(0);
  });

  it("handles a three-path diamond graph correctly", () => {
    const graph: FlowGraph = {
      S: [
        { target: "A", capacity: 10 },
        { target: "B", capacity: 10 },
      ],
      A: [{ target: "T", capacity: 10 }],
      B: [{ target: "T", capacity: 10 }],
      T: [],
    };
    expect(edmondsKarp(graph, "S", "T")).toBe(20);
  });
});
