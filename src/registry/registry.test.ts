import { describe, it, expect, beforeEach } from "vitest";

import type { AlgorithmDefinition } from "@/types";

import { registry } from "./index";

function createMockDefinition(
  id: string,
  category: "sorting" | "searching" = "sorting",
): AlgorithmDefinition {
  return {
    meta: {
      id,
      name: `Mock ${id}`,
      category,
      description: `A mock ${id} algorithm`,
      timeComplexity: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
      spaceComplexity: "O(1)",
      supportedLanguages: ["typescript", "python", "java"],
      defaultInput: [5, 3, 1],
    },
    execute: () => [],
    generateSteps: () => [],
    educational: {
      overview: "Mock overview",
      howItWorks: "Mock how it works",
      timeAndSpaceComplexity: "Mock complexity",
      bestAndWorstCase: "Mock cases",
      realWorldUses: ["Mock use"],
      strengthsAndLimitations: { strengths: ["Fast"], limitations: ["Slow"] },
      whenToUseIt: "Mock when",
    },
    sources: { typescript: "// ts", python: "# py", java: "// java" },
  };
}

describe("AlgorithmRegistry", () => {
  beforeEach(() => {
    registry.clear();
  });

  it("registers and retrieves an algorithm by id", () => {
    const definition = createMockDefinition("bubble-sort");
    registry.register(definition);

    const retrieved = registry.get("bubble-sort");
    expect(retrieved).toBe(definition);
  });

  it("returns undefined for unregistered id", () => {
    expect(registry.get("nonexistent")).toBeUndefined();
  });

  it("throws on duplicate registration", () => {
    const definition = createMockDefinition("bubble-sort");
    registry.register(definition);

    expect(() => registry.register(definition)).toThrow(
      "Algorithm already registered: bubble-sort",
    );
  });

  it("returns all registered algorithms", () => {
    registry.register(createMockDefinition("algo-one"));
    registry.register(createMockDefinition("algo-two"));

    const allAlgorithms = registry.getAll();
    expect(allAlgorithms).toHaveLength(2);
  });

  it("filters algorithms by category", () => {
    registry.register(createMockDefinition("sort-one", "sorting"));
    registry.register(createMockDefinition("search-one", "searching"));
    registry.register(createMockDefinition("sort-two", "sorting"));

    const sortingAlgorithms = registry.getByCategory("sorting");
    expect(sortingAlgorithms).toHaveLength(2);

    const searchingAlgorithms = registry.getByCategory("searching");
    expect(searchingAlgorithms).toHaveLength(1);
  });

  it("returns all unique categories", () => {
    registry.register(createMockDefinition("sort-one", "sorting"));
    registry.register(createMockDefinition("search-one", "searching"));

    const categories = registry.getCategories();
    expect(categories).toContain("sorting");
    expect(categories).toContain("searching");
    expect(categories).toHaveLength(2);
  });

  it("clears all algorithms", () => {
    registry.register(createMockDefinition("algo-one"));
    registry.clear();

    expect(registry.getAll()).toHaveLength(0);
  });
});
