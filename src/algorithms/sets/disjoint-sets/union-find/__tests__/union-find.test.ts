import { describe, it, expect } from "vitest";
import { unionFind } from "../sources/union-find.ts?fn";

describe("unionFind", () => {
  it("returns components for default input", () => {
    const output = unionFind(8, [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
      [0, 2],
      [4, 6],
      [0, 4],
    ]) as { components: number[][] };
    expect(output.components).toBeDefined();
  });

  it("merges all 8 elements into one component after all unions", () => {
    const output = unionFind(8, [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
      [0, 2],
      [4, 6],
      [0, 4],
    ]) as { components: number[][] };
    expect(output.components.length).toBe(1);
    const singleComponent = output.components[0]!;
    expect(singleComponent.length).toBe(8);
  });

  it("starts with each element in its own component when no operations given", () => {
    const output = unionFind(4, []) as { components: number[][] };
    expect(output.components.length).toBe(4);
    for (const component of output.components) {
      expect(component.length).toBe(1);
    }
  });

  it("merges exactly the unioned elements", () => {
    const output = unionFind(4, [[0, 1]]) as { components: number[][] };
    expect(output.components.length).toBe(3);
    const mergedComponent = output.components.find((component) => component.length === 2);
    expect(mergedComponent).toBeDefined();
    expect(mergedComponent!.sort()).toEqual([0, 1]);
  });

  it("union of already-same-set elements leaves component count unchanged", () => {
    const output = unionFind(4, [
      [0, 1],
      [0, 1],
    ]) as { components: number[][] };
    expect(output.components.length).toBe(3);
  });

  it("all elements accounted for across all components", () => {
    const elementCount = 6;
    const output = unionFind(elementCount, [
      [0, 1],
      [2, 3],
    ]) as { components: number[][] };
    const allElements = output.components.flat().sort((leftNum, rightNum) => leftNum - rightNum);
    expect(allElements).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("handles single element", () => {
    const output = unionFind(1, []) as { components: number[][] };
    expect(output.components.length).toBe(1);
    expect(output.components[0]).toEqual([0]);
  });

  it("handles two elements with union", () => {
    const output = unionFind(2, [[0, 1]]) as { components: number[][] };
    expect(output.components.length).toBe(1);
    expect(output.components[0]!.sort()).toEqual([0, 1]);
  });

  it("handles two elements without union", () => {
    const output = unionFind(2, []) as { components: number[][] };
    expect(output.components.length).toBe(2);
  });

  it("produces correct component count for a chain of unions", () => {
    // union(0,1), union(1,2), union(2,3) → all in one component
    const output = unionFind(4, [
      [0, 1],
      [1, 2],
      [2, 3],
    ]) as { components: number[][] };
    expect(output.components.length).toBe(1);
    expect(output.components[0]!.length).toBe(4);
  });

  it("handles larger element count with no operations", () => {
    const output = unionFind(10, []) as { components: number[][] };
    expect(output.components.length).toBe(10);
  });

  it("union is commutative — union(a, b) same component count as union(b, a)", () => {
    const outputAB = unionFind(4, [[0, 1]]) as { components: number[][] };
    const outputBA = unionFind(4, [[1, 0]]) as { components: number[][] };
    expect(outputAB.components.length).toBe(outputBA.components.length);
  });
});
