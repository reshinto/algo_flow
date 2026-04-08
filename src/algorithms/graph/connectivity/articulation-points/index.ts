/* Articulation Points algorithm registration — assembles the definition and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { findArticulationPoints } from "./sources/articulation-points.ts?fn";

type AdjacencyList = Record<string, string[]>;
import { generateArticulationPointsSteps } from "./step-generator";
import type { ArticulationPointsInput } from "./step-generator";
import { articulationPointsEducational } from "./educational";

import typescriptSource from "./sources/articulation-points.ts?raw";
import pythonSource from "./sources/articulation-points.py?raw";
import javaSource from "./sources/ArticulationPoints.java?raw";
import rustSource from "./sources/articulation-points.rs?raw";
import cppSource from "./sources/ArticulationPoints.cpp?raw";
import goSource from "./sources/articulation-points.go?raw";

/** Positions 7 nodes so the two articulation points (C and D) are visually central */
function apPosition(index: number): { x: number; y: number } {
  const positions = [
    { x: 80, y: 80 },
    { x: 80, y: 200 },
    { x: 210, y: 140 },
    { x: 330, y: 140 },
    { x: 460, y: 80 },
    { x: 460, y: 200 },
    { x: 540, y: 140 },
  ];
  return positions[index] ?? { x: 0, y: 0 };
}

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: apPosition(0) },
  { id: "B", label: "B", state: "default", position: apPosition(1) },
  { id: "C", label: "C", state: "default", position: apPosition(2) },
  { id: "D", label: "D", state: "default", position: apPosition(3) },
  { id: "E", label: "E", state: "default", position: apPosition(4) },
  { id: "F", label: "F", state: "default", position: apPosition(5) },
  { id: "G", label: "G", state: "default", position: apPosition(6) },
];

/**
 * Undirected graph with 2 articulation points: C and D.
 * Structure: {A,B} — C — D — {E,F,G}
 * C connects the left cluster to D; D connects to the right cluster.
 * Both directions of each edge included for the undirected visualizer.
 */
const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "C", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "D", target: "C", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
  { source: "D", target: "F", state: "default" },
  { source: "F", target: "D", state: "default" },
  { source: "E", target: "G", state: "default" },
  { source: "G", target: "E", state: "default" },
  { source: "F", target: "G", state: "default" },
  { source: "G", target: "F", state: "default" },
];

const defaultAdjacencyList: AdjacencyList = {
  A: ["B", "C"],
  B: ["A", "C"],
  C: ["A", "B", "D"],
  D: ["C", "E", "F"],
  E: ["D", "G"],
  F: ["D", "G"],
  G: ["E", "F"],
};

const defaultInput: ArticulationPointsInput = {
  adjacencyList: defaultAdjacencyList,
  nodeIds: ["A", "B", "C", "D", "E", "F", "G"],
  nodes: defaultNodes,
  edges: defaultEdges,
};

const articulationPointsDefinition: AlgorithmDefinition<ArticulationPointsInput> = {
  meta: {
    id: ALGORITHM_ID.ARTICULATION_POINTS!,
    name: "Articulation Points",
    category: CATEGORY.GRAPH!,
    technique: "connectivity",
    description:
      "Finds all cut vertices in an undirected graph — nodes whose removal would disconnect the graph — using a single DFS pass with low-link values",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: ArticulationPointsInput) =>
    findArticulationPoints(input.adjacencyList, input.nodeIds),
  generateSteps: generateArticulationPointsSteps,
  educational: articulationPointsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(articulationPointsDefinition);
