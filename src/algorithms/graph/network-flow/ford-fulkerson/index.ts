/* Ford-Fulkerson algorithm registration */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { fordFulkerson } from "./sources/ford-fulkerson.ts?fn";

import { generateFordFulkersonSteps } from "./step-generator";
import type { FordFulkersonInput } from "./step-generator";
import { fordFulkersonEducational } from "./educational";

import typescriptSource from "./sources/ford-fulkerson.ts?raw";
import pythonSource from "./sources/ford-fulkerson.py?raw";
import javaSource from "./sources/FordFulkerson.java?raw";
import rustSource from "./sources/ford-fulkerson.rs?raw";
import cppSource from "./sources/FordFulkerson.cpp?raw";
import goSource from "./sources/ford-fulkerson.go?raw";

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

const defaultAdjacencyList: FordFulkersonInput["adjacencyList"] = {
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

const defaultInput: FordFulkersonInput = {
  adjacencyList: defaultAdjacencyList,
  sourceNodeId: "S",
  sinkNodeId: "T",
  nodes: defaultNodes,
  edges: defaultEdges,
};

const fordFulkersonDefinition: AlgorithmDefinition<FordFulkersonInput> = {
  meta: {
    id: ALGORITHM_ID.FORD_FULKERSON!,
    name: "Ford-Fulkerson",
    category: CATEGORY.GRAPH!,
    technique: "network-flow",
    description:
      "A max-flow algorithm that finds augmenting paths via DFS in a residual graph and pushes flow until no path remains",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V·E²)",
      worst: "O(V·E²)",
    },
    spaceComplexity: "O(V+E)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: FordFulkersonInput) =>
    fordFulkerson(input.adjacencyList, input.sourceNodeId, input.sinkNodeId),
  generateSteps: generateFordFulkersonSteps,
  educational: fordFulkersonEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(fordFulkersonDefinition);
