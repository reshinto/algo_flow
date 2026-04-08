/* Kruskal's algorithm registration — assembles the definition and self-registers with the registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { kruskalsAlgorithm } from "./sources/kruskals.ts?fn";

import { generateKruskalsSteps } from "./step-generator";
import type { KruskalsInput } from "./step-generator";
import { kruskalsEducational } from "./educational";

import typescriptSource from "./sources/kruskals.ts?raw";
import pythonSource from "./sources/kruskals.py?raw";
import javaSource from "./sources/Kruskals.java?raw";
import rustSource from "./sources/kruskals.rs?raw";
import cppSource from "./sources/Kruskals.cpp?raw";
import goSource from "./sources/kruskals.go?raw";

const CIRCLE_RADIUS = 150;
const CENTER_X = 200;
const CENTER_Y = 200;

function circlePosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(CENTER_X + CIRCLE_RADIUS * Math.cos(angle)),
    y: Math.round(CENTER_Y + CIRCLE_RADIUS * Math.sin(angle)),
  };
}

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 6) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 6) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 6) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 6) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 6) },
  { id: "F", label: "F", state: "default", position: circlePosition(5, 6) },
];

/** Both directions required for undirected graph rendering */
const defaultGraphEdges: GraphEdge[] = [
  { source: "A", target: "B", weight: 4, state: "default" },
  { source: "B", target: "A", weight: 4, state: "default" },
  { source: "A", target: "C", weight: 2, state: "default" },
  { source: "C", target: "A", weight: 2, state: "default" },
  { source: "B", target: "C", weight: 1, state: "default" },
  { source: "C", target: "B", weight: 1, state: "default" },
  { source: "B", target: "D", weight: 5, state: "default" },
  { source: "D", target: "B", weight: 5, state: "default" },
  { source: "C", target: "D", weight: 8, state: "default" },
  { source: "D", target: "C", weight: 8, state: "default" },
  { source: "C", target: "E", weight: 10, state: "default" },
  { source: "E", target: "C", weight: 10, state: "default" },
  { source: "D", target: "E", weight: 2, state: "default" },
  { source: "E", target: "D", weight: 2, state: "default" },
  { source: "D", target: "F", weight: 6, state: "default" },
  { source: "F", target: "D", weight: 6, state: "default" },
  { source: "E", target: "F", weight: 3, state: "default" },
  { source: "F", target: "E", weight: 3, state: "default" },
];

/** Deduplicated edge list for algorithm input (one direction per undirected edge) */
const defaultEdges = [
  { source: "A", target: "B", weight: 4 },
  { source: "A", target: "C", weight: 2 },
  { source: "B", target: "C", weight: 1 },
  { source: "B", target: "D", weight: 5 },
  { source: "C", target: "D", weight: 8 },
  { source: "C", target: "E", weight: 10 },
  { source: "D", target: "E", weight: 2 },
  { source: "D", target: "F", weight: 6 },
  { source: "E", target: "F", weight: 3 },
];

const defaultNodeIds = ["A", "B", "C", "D", "E", "F"];

const defaultInput: KruskalsInput = {
  edges: defaultEdges,
  nodeIds: defaultNodeIds,
  nodes: defaultNodes,
  graphEdges: defaultGraphEdges,
};

const kruskalsDefinition: AlgorithmDefinition<KruskalsInput> = {
  meta: {
    id: ALGORITHM_ID.KRUSKALS!,
    name: "Kruskal's Algorithm",
    category: CATEGORY.GRAPH!,
    technique: "minimum-spanning-tree",
    description:
      "A greedy algorithm that builds a minimum spanning tree by sorting edges by weight and adding each edge that does not form a cycle using Union-Find",
    timeComplexity: {
      best: "O(E log E)",
      average: "O(E log E)",
      worst: "O(E log E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: KruskalsInput) => kruskalsAlgorithm(input.edges, input.nodeIds),
  generateSteps: generateKruskalsSteps,
  educational: kruskalsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(kruskalsDefinition);
