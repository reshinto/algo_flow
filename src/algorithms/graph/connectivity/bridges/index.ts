/* Bridges (Cut Edges) algorithm registration — assembles the definition and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { findBridges } from "./sources/bridges.ts?fn";

type AdjacencyList = Record<string, string[]>;
import { generateBridgesSteps } from "./step-generator";
import type { BridgesInput } from "./step-generator";
import { bridgesEducational } from "./educational";

import typescriptSource from "./sources/bridges.ts?raw";
import pythonSource from "./sources/bridges.py?raw";
import javaSource from "./sources/Bridges.java?raw";
import rustSource from "./sources/bridges.rs?raw";
import cppSource from "./sources/Bridges.cpp?raw";
import goSource from "./sources/bridges.go?raw";

/** Positions 7 nodes in a layout that makes the two bridges visually obvious */
function bridgePosition(index: number): { x: number; y: number } {
  const positions = [
    { x: 80, y: 120 },
    { x: 180, y: 60 },
    { x: 180, y: 180 },
    { x: 290, y: 120 },
    { x: 390, y: 60 },
    { x: 390, y: 180 },
    { x: 490, y: 120 },
  ];
  return positions[index] ?? { x: 0, y: 0 };
}

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: bridgePosition(0) },
  { id: "B", label: "B", state: "default", position: bridgePosition(1) },
  { id: "C", label: "C", state: "default", position: bridgePosition(2) },
  { id: "D", label: "D", state: "default", position: bridgePosition(3) },
  { id: "E", label: "E", state: "default", position: bridgePosition(4) },
  { id: "F", label: "F", state: "default", position: bridgePosition(5) },
  { id: "G", label: "G", state: "default", position: bridgePosition(6) },
];

/**
 * Undirected graph with 2 bridges: C—D and D—E.
 * Clusters: {A,B,C} (triangle), bridge C—D, node D, bridge D—E, {E,F,G} (triangle).
 * Both directions of each edge included for the undirected visualizer.
 */
const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "C", target: "A", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "D", target: "C", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
  { source: "E", target: "F", state: "default" },
  { source: "F", target: "E", state: "default" },
  { source: "F", target: "G", state: "default" },
  { source: "G", target: "F", state: "default" },
  { source: "E", target: "G", state: "default" },
  { source: "G", target: "E", state: "default" },
];

const defaultAdjacencyList: AdjacencyList = {
  A: ["B", "C"],
  B: ["A", "C"],
  C: ["B", "A", "D"],
  D: ["C", "E"],
  E: ["D", "F", "G"],
  F: ["E", "G"],
  G: ["F", "E"],
};

const defaultInput: BridgesInput = {
  adjacencyList: defaultAdjacencyList,
  nodeIds: ["A", "B", "C", "D", "E", "F", "G"],
  nodes: defaultNodes,
  edges: defaultEdges,
};

const bridgesDefinition: AlgorithmDefinition<BridgesInput> = {
  meta: {
    id: ALGORITHM_ID.BRIDGES!,
    name: "Bridges (Cut Edges)",
    category: CATEGORY.GRAPH!,
    technique: "connectivity",
    description:
      "Finds all bridge edges in an undirected graph — edges whose removal would disconnect the graph — using a single DFS pass with low-link values",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: BridgesInput) => findBridges(input.adjacencyList, input.nodeIds),
  generateSteps: generateBridgesSteps,
  educational: bridgesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bridgesDefinition);
