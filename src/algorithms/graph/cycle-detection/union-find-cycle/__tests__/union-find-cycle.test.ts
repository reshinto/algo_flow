import { describe, it, expect } from "vitest";

import { unionFindCycle } from "../sources/union-find-cycle.ts?fn";

type EdgeInput = { source: string; target: string };

describe("unionFindCycle", () => {
  it("detects a triangle cycle A—B—C—A", () => {
    const edges: EdgeInput[] = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "C", target: "A" },
    ];
    expect(unionFindCycle(edges, ["A", "B", "C"])).toBe(true);
  });

  it("returns false for a tree with no cycle", () => {
    const edges: EdgeInput[] = [
      { source: "A", target: "B" },
      { source: "A", target: "C" },
      { source: "B", target: "D" },
    ];
    expect(unionFindCycle(edges, ["A", "B", "C", "D"])).toBe(false);
  });

  it("returns false for an empty edge list", () => {
    expect(unionFindCycle([], ["A", "B", "C"])).toBe(false);
  });

  it("returns false for a single node with no edges", () => {
    expect(unionFindCycle([], ["A"])).toBe(false);
  });

  it("detects a cycle in the default 5-node graph A—B—C—D—A", () => {
    const edges: EdgeInput[] = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "C", target: "D" },
      { source: "D", target: "A" },
      { source: "D", target: "E" },
    ];
    expect(unionFindCycle(edges, ["A", "B", "C", "D", "E"])).toBe(true);
  });

  it("returns false for a linear undirected chain", () => {
    const edges: EdgeInput[] = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "C", target: "D" },
    ];
    expect(unionFindCycle(edges, ["A", "B", "C", "D"])).toBe(false);
  });

  it("detects a cycle when the cycle-forming edge is the last one processed", () => {
    // Edges processed in order: A—B, B—C, C—D, D—E, then E—A closes the cycle
    const edges: EdgeInput[] = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "C", target: "D" },
      { source: "D", target: "E" },
      { source: "E", target: "A" },
    ];
    expect(unionFindCycle(edges, ["A", "B", "C", "D", "E"])).toBe(true);
  });

  it("correctly handles a star graph (no cycle)", () => {
    const edges: EdgeInput[] = [
      { source: "A", target: "B" },
      { source: "A", target: "C" },
      { source: "A", target: "D" },
      { source: "A", target: "E" },
    ];
    expect(unionFindCycle(edges, ["A", "B", "C", "D", "E"])).toBe(false);
  });

  it("detects a multi-component graph where only one component has a cycle", () => {
    const edges: EdgeInput[] = [
      { source: "A", target: "B" }, // acyclic component
      { source: "C", target: "D" }, // start of cyclic component
      { source: "D", target: "E" },
      { source: "E", target: "C" }, // closes cycle C—D—E—C
    ];
    expect(unionFindCycle(edges, ["A", "B", "C", "D", "E"])).toBe(true);
  });
});
