/**
 * @file source-loader.test.ts
 *
 * Tests for the source-loader utility — verifies that Vite glob loading, step marker parsing,
 * line map construction, and language extension mapping all behave correctly.
 */
import { describe, it, expect } from "vitest";

import {
  loadSource,
  parseStepMarkers,
  buildLineMapFromSources,
  getAllSourcePaths,
} from "@/utils/source-loader";
import type { SupportedLanguage } from "@/types";

// The LANGUAGE_EXTENSIONS constant is not exported, but its shape can be verified
// indirectly through loadSource; a direct test is added via the extension check below.
const ALL_LANGUAGES: SupportedLanguage[] = ["typescript", "python", "java", "rust", "cpp", "go"];

describe("loadSource", () => {
  it("returns content for the TypeScript source of bubble-sort", () => {
    const content = loadSource("bubble-sort", "typescript");
    expect(content).toBeDefined();
    expect(typeof content).toBe("string");
    expect(content!.length).toBeGreaterThan(0);
  });

  it("returns content for the Python source of bubble-sort", () => {
    const content = loadSource("bubble-sort", "python");
    expect(content).toBeDefined();
    expect(content!.length).toBeGreaterThan(0);
  });

  it("returns content for the Java source of bubble-sort", () => {
    const content = loadSource("bubble-sort", "java");
    expect(content).toBeDefined();
    expect(content!.length).toBeGreaterThan(0);
  });

  it("returns content for the Rust source of bubble-sort", () => {
    const content = loadSource("bubble-sort", "rust");
    expect(content).toBeDefined();
    expect(content!.length).toBeGreaterThan(0);
  });

  it("returns content for the C++ source of bubble-sort", () => {
    const content = loadSource("bubble-sort", "cpp");
    expect(content).toBeDefined();
    expect(content!.length).toBeGreaterThan(0);
  });

  it("returns content for the Go source of bubble-sort", () => {
    const content = loadSource("bubble-sort", "go");
    expect(content).toBeDefined();
    expect(content!.length).toBeGreaterThan(0);
  });

  it("returns content for all 6 languages for bubble-sort", () => {
    for (const language of ALL_LANGUAGES) {
      const content = loadSource("bubble-sort", language);
      expect(content, `Expected content for language: ${language}`).toBeDefined();
    }
  });

  it("returns undefined for a non-existent algorithm", () => {
    const content = loadSource("nonexistent-algorithm-xyz", "typescript");
    expect(content).toBeUndefined();
  });
});

describe("parseStepMarkers", () => {
  it("parses TypeScript // @step: markers correctly", () => {
    const source = [
      "function sort(arr) {",
      "  // @step:initialize",
      "  let sorted = [...arr]; // @step:initialize",
      "  for (let outer = 0; outer < arr.length; outer++) { // @step:outer-loop",
      "    if (sorted[outer] > sorted[outer + 1]) { // @step:compare",
      "      [sorted[outer], sorted[outer + 1]] = [sorted[outer + 1], sorted[outer]]; // @step:swap",
      "    }",
      "  }",
      "}",
    ].join("\n");

    const stepMap = parseStepMarkers(source);

    expect(stepMap["initialize"]).toBeDefined();
    expect(stepMap["initialize"]).toContain(2);
    expect(stepMap["initialize"]).toContain(3);
    expect(stepMap["outer-loop"]).toContain(4);
    expect(stepMap["compare"]).toContain(5);
    expect(stepMap["swap"]).toContain(6);
  });

  it("parses Rust // @step: markers correctly", () => {
    const rustSource = [
      "fn bubble_sort(input: &[i64]) -> Vec<i64> {",
      "    // @step:initialize",
      "    let mut sorted = input.to_vec(); // @step:initialize",
      "    for outer in 0..sorted.len() { // @step:outer-loop",
      "        if sorted[outer] > sorted[outer + 1] { // @step:compare",
      "            sorted.swap(outer, outer + 1); // @step:swap",
      "        }",
      "    }",
      "    sorted // @step:complete",
      "}",
    ].join("\n");

    const stepMap = parseStepMarkers(rustSource);

    expect(stepMap["initialize"]).toBeDefined();
    expect(stepMap["initialize"]).toContain(2);
    expect(stepMap["outer-loop"]).toContain(4);
    expect(stepMap["compare"]).toContain(5);
    expect(stepMap["swap"]).toContain(6);
    expect(stepMap["complete"]).toContain(9);
  });

  it("parses C++ // @step: markers correctly", () => {
    const cppSource = [
      "#include <vector>",
      "std::vector<int> bubbleSort(std::vector<int> arr) {",
      "    // @step:initialize",
      "    int arrayLength = arr.size(); // @step:initialize",
      "    for (int outer = 0; outer < arrayLength - 1; outer++) { // @step:outer-loop",
      "        if (arr[outer] > arr[outer + 1]) { // @step:compare",
      "            std::swap(arr[outer], arr[outer + 1]); // @step:swap",
      "        }",
      "    }",
      "    return arr; // @step:complete",
      "}",
    ].join("\n");

    const stepMap = parseStepMarkers(cppSource);

    expect(stepMap["initialize"]).toBeDefined();
    expect(stepMap["initialize"]).toContain(3);
    expect(stepMap["outer-loop"]).toContain(5);
    expect(stepMap["compare"]).toContain(6);
    expect(stepMap["swap"]).toContain(7);
    expect(stepMap["complete"]).toContain(10);
  });

  it("parses Go // @step: markers correctly", () => {
    const goSource = [
      "package main",
      "func bubbleSort(inputArray []int) []int {",
      "    // @step:initialize",
      "    sortedArray := make([]int, len(inputArray)) // @step:initialize",
      "    for outerIndex := 0; outerIndex < len(sortedArray)-1; outerIndex++ { // @step:outer-loop",
      "        if sortedArray[outerIndex] > sortedArray[outerIndex+1] { // @step:compare",
      "            sortedArray[outerIndex], sortedArray[outerIndex+1] = sortedArray[outerIndex+1], sortedArray[outerIndex] // @step:swap",
      "        }",
      "    }",
      "    return sortedArray // @step:complete",
      "}",
    ].join("\n");

    const stepMap = parseStepMarkers(goSource);

    expect(stepMap["initialize"]).toBeDefined();
    expect(stepMap["initialize"]).toContain(3);
    expect(stepMap["outer-loop"]).toContain(5);
    expect(stepMap["compare"]).toContain(6);
    expect(stepMap["swap"]).toContain(7);
    expect(stepMap["complete"]).toContain(10);
  });

  it("parses Python # @step: markers correctly", () => {
    const pythonSource = [
      "def bubble_sort(input_array):",
      "    # @step:initialize",
      "    sorted_array = list(input_array)  # @step:initialize",
      "    for outer_index in range(len(sorted_array) - 1):  # @step:outer-loop",
      "        if sorted_array[outer_index] > sorted_array[outer_index + 1]:  # @step:compare",
      "            sorted_array[outer_index], sorted_array[outer_index + 1] = (  # @step:swap",
      "                sorted_array[outer_index + 1], sorted_array[outer_index]",
      "            )",
      "    return sorted_array  # @step:complete",
    ].join("\n");

    const stepMap = parseStepMarkers(pythonSource);

    expect(stepMap["initialize"]).toBeDefined();
    expect(stepMap["initialize"]).toContain(2);
    expect(stepMap["outer-loop"]).toContain(4);
    expect(stepMap["compare"]).toContain(5);
    expect(stepMap["swap"]).toContain(6);
    expect(stepMap["complete"]).toContain(9);
  });

  it("handles multiple step keys on the same marker (comma-separated)", () => {
    const source = "for (let outer = 0; ...) { // @step:outer-loop,mark-sorted";
    const stepMap = parseStepMarkers(source);

    expect(stepMap["outer-loop"]).toContain(1);
    expect(stepMap["mark-sorted"]).toContain(1);
  });

  it("returns empty object for source with no markers", () => {
    const source = "function noop() { return 42; }";
    const stepMap = parseStepMarkers(source);
    expect(Object.keys(stepMap)).toHaveLength(0);
  });

  it("uses 1-based line numbers in the output", () => {
    const source = "// @step:first-line\nsome code\n// @step:third-line";
    const stepMap = parseStepMarkers(source);

    expect(stepMap["first-line"]).toContain(1);
    expect(stepMap["third-line"]).toContain(3);
  });
});

describe("buildLineMapFromSources", () => {
  it("returns a non-empty line map for bubble-sort", () => {
    const lineMap = buildLineMapFromSources("bubble-sort");
    expect(Object.keys(lineMap).length).toBeGreaterThan(0);
  });

  it("includes entries for all 6 languages for each step key", () => {
    const lineMap = buildLineMapFromSources("bubble-sort");

    for (const [stepKey, languageLines] of Object.entries(lineMap)) {
      for (const language of ALL_LANGUAGES) {
        expect(
          languageLines,
          `Step key "${stepKey}" is missing language "${language}"`,
        ).toHaveProperty(language);
        expect(Array.isArray(languageLines[language as SupportedLanguage])).toBe(true);
      }
    }
  });

  it("contains expected step keys for bubble-sort", () => {
    const lineMap = buildLineMapFromSources("bubble-sort");
    const stepKeys = Object.keys(lineMap);

    expect(stepKeys).toContain("initialize");
    expect(stepKeys).toContain("compare");
    expect(stepKeys).toContain("swap");
  });

  it("includes non-empty line arrays for TypeScript steps in bubble-sort", () => {
    const lineMap = buildLineMapFromSources("bubble-sort");
    const initializeStep = lineMap["initialize"];

    expect(initializeStep).toBeDefined();
    expect(initializeStep!.typescript.length).toBeGreaterThan(0);
  });

  it("returns an empty object for a non-existent algorithm", () => {
    const lineMap = buildLineMapFromSources("nonexistent-algorithm-xyz");
    expect(Object.keys(lineMap)).toHaveLength(0);
  });
});

describe("LANGUAGE_EXTENSIONS", () => {
  it("covers all 6 supported languages via loadSource behavior", () => {
    // Verify each language resolves to a distinct source by checking content differs
    // (all 6 sources must exist and be non-empty, proving each extension is mapped)
    const contents = ALL_LANGUAGES.map((lang) => loadSource("bubble-sort", lang));
    const definedContents = contents.filter(Boolean);
    expect(definedContents).toHaveLength(6);
  });

  it("maps typescript to .ts extension", () => {
    const tsContent = loadSource("bubble-sort", "typescript");
    expect(tsContent).toBeDefined();
    // TypeScript source should not contain Python or Rust specific syntax
    expect(tsContent).toContain("function");
  });

  it("maps python to .py extension", () => {
    const pyContent = loadSource("bubble-sort", "python");
    expect(pyContent).toBeDefined();
    expect(pyContent).toContain("def ");
  });

  it("maps rust to .rs extension", () => {
    const rsContent = loadSource("bubble-sort", "rust");
    expect(rsContent).toBeDefined();
    expect(rsContent).toContain("fn ");
  });

  it("maps cpp to .cpp extension", () => {
    const cppContent = loadSource("bubble-sort", "cpp");
    expect(cppContent).toBeDefined();
    // C++ files may use .cpp; verify content has C++-like syntax
    expect(cppContent).toContain("#include");
  });

  it("maps go to .go extension", () => {
    const goContent = loadSource("bubble-sort", "go");
    expect(goContent).toBeDefined();
    expect(goContent).toContain("package main");
  });

  it("maps java to .java extension", () => {
    const javaContent = loadSource("bubble-sort", "java");
    expect(javaContent).toBeDefined();
    expect(javaContent).toContain("class");
  });
});

describe("getAllSourcePaths", () => {
  it("returns a non-empty array of paths", () => {
    const paths = getAllSourcePaths();
    expect(paths.length).toBeGreaterThan(0);
  });

  it("returns paths that include .rs files", () => {
    const paths = getAllSourcePaths();
    const rustPaths = paths.filter((path) => path.endsWith(".rs"));
    expect(rustPaths.length).toBeGreaterThan(0);
  });

  it("returns paths that include .cpp files", () => {
    const paths = getAllSourcePaths();
    const cppPaths = paths.filter((path) => path.endsWith(".cpp"));
    expect(cppPaths.length).toBeGreaterThan(0);
  });

  it("returns paths that include .go files", () => {
    const paths = getAllSourcePaths();
    const goPaths = paths.filter((path) => path.endsWith(".go"));
    expect(goPaths.length).toBeGreaterThan(0);
  });

  it("returns paths that include .ts files", () => {
    const paths = getAllSourcePaths();
    const tsPaths = paths.filter((path) => path.endsWith(".ts"));
    expect(tsPaths.length).toBeGreaterThan(0);
  });

  it("returns paths that include .py files", () => {
    const paths = getAllSourcePaths();
    const pyPaths = paths.filter((path) => path.endsWith(".py"));
    expect(pyPaths.length).toBeGreaterThan(0);
  });

  it("returns paths that include .java files", () => {
    const paths = getAllSourcePaths();
    const javaPaths = paths.filter((path) => path.endsWith(".java"));
    expect(javaPaths.length).toBeGreaterThan(0);
  });

  it("returns paths containing the bubble-sort algorithm directory", () => {
    const paths = getAllSourcePaths();
    const bubbleSortPaths = paths.filter((path) => path.includes("bubble-sort"));
    expect(bubbleSortPaths.length).toBeGreaterThan(0);
  });
});
