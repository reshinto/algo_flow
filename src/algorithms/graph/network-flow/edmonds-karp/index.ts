/* Edmonds-Karp algorithm registration */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { edmondsKarp } from "./sources/edmonds-karp.ts?fn";

import { generateEdmondsKarpSteps } from "./step-generator";
import type { EdmondsKarpInput } from "./step-generator";
import { edmondsKarpEducational } from "./educational";

import typescriptSource from "./sources/edmonds-karp.ts?raw";
import pythonSource from "./sources/edmonds-karp.py?raw";
import javaSource from "./sources/EdmondsKarp.java?raw";

const CIRCLE_RADIUS = 150;
const CENTER_X = 220;
const CENTER_Y = 200;

function flowNetworkPosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(CENTER_X + CIRCLE_RADIUS * Math.cos(angle)),
    y: Math.round(CENTER_Y + CIRCLE_RADIUS * Math.sin(angle)),
  };
}

const defaultNodes: GraphNode[] = [
  { id: "S", label: "S", state: "source", position: flowNetworkPosition(0, 6) },
  { id: "A", label: "A", state: "default", position: flowNetworkPosition(1, 6) },
  { id: "B", label: "B", state: "default", position: flowNetworkPosition(2, 6) },
  { id: "C", label: "C", state: "default", position: flowNetworkPosition(3, 6) },
  { id: "D", label: "D", state: "default", position: flowNetworkPosition(4, 6) },
  { id: "T", label: "T", state: "sink", position: flowNetworkPosition(5, 6) },
];

const defaultEdges: GraphEdge[] = [
  { source: "S", target: "A", state: "default", capacity: 10, flow: 0 },
  { source: "S", target: "B", state: "default", capacity: 8, flow: 0 },
  { source: "A", target: "B", state: "default", capacity: 5, flow: 0 },
  { source: "A", target: "C", state: "default", capacity: 7, flow: 0 },
  { source: "B", target: "D", state: "default", capacity: 10, flow: 0 },
  { source: "C", target: "D", state: "default", capacity: 3, flow: 0 },
  { source: "C", target: "T", state: "default", capacity: 8, flow: 0 },
  { source: "D", target: "T", state: "default", capacity: 10, flow: 0 },
];

const defaultAdjacencyList: EdmondsKarpInput["adjacencyList"] = {
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

const defaultInput: EdmondsKarpInput = {
  adjacencyList: defaultAdjacencyList,
  sourceNodeId: "S",
  sinkNodeId: "T",
  nodes: defaultNodes,
  edges: defaultEdges,
};

const edmondsKarpDefinition: AlgorithmDefinition<EdmondsKarpInput> = {
  meta: {
    id: ALGORITHM_ID.EDMONDS_KARP!,
    name: "Edmonds-Karp",
    category: CATEGORY.GRAPH!,
    technique: "network-flow",
    description:
      "A max-flow algorithm using BFS to find shortest augmenting paths, guaranteeing polynomial O(VE²) runtime",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(VE²)",
      worst: "O(VE²)",
    },
    spaceComplexity: "O(V+E)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: EdmondsKarpInput) =>
    edmondsKarp(input.adjacencyList, input.sourceNodeId, input.sinkNodeId),
  generateSteps: generateEdmondsKarpSteps,
  educational: edmondsKarpEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(edmondsKarpDefinition);
