/* Bellman-Ford algorithm registration — assembles the definition (meta, execute, steps,
   educational, sources) and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bellmanFord } from "./sources/bellman-ford.ts?fn";

import { generateBellmanFordSteps } from "./step-generator";
import type { BellmanFordInput } from "./step-generator";
import { bellmanFordEducational } from "./educational";

import typescriptSource from "./sources/bellman-ford.ts?raw";
import pythonSource from "./sources/bellman-ford.py?raw";
import javaSource from "./sources/BellmanFord.java?raw";

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
  { id: "A", label: "A", state: "default", position: circlePosition(0, 5) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 5) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 5) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 5) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 5) },
];

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", weight: 6, state: "default" },
  { source: "A", target: "C", weight: 7, state: "default" },
  { source: "B", target: "C", weight: 8, state: "default" },
  { source: "B", target: "D", weight: 5, state: "default" },
  { source: "B", target: "E", weight: -4, state: "default" },
  { source: "C", target: "D", weight: -3, state: "default" },
  { source: "C", target: "E", weight: 9, state: "default" },
  { source: "D", target: "B", weight: -2, state: "default" },
  { source: "E", target: "D", weight: 7, state: "default" },
];

const defaultNodeIds = ["A", "B", "C", "D", "E"];

const defaultInput: BellmanFordInput = {
  adjacencyList: {
    A: [
      ["B", 6],
      ["C", 7],
    ],
    B: [
      ["C", 8],
      ["D", 5],
      ["E", -4],
    ],
    C: [
      ["D", -3],
      ["E", 9],
    ],
    D: [["B", -2]],
    E: [["D", 7]],
  },
  startNodeId: "A",
  nodeIds: defaultNodeIds,
  nodes: defaultNodes,
  edges: defaultEdges,
};

const bellmanFordDefinition: AlgorithmDefinition<BellmanFordInput> = {
  meta: {
    id: ALGORITHM_ID.BELLMAN_FORD!,
    name: "Bellman-Ford",
    category: CATEGORY.GRAPH!,
    technique: "shortest-path",
    description:
      "Finds shortest paths from a source node using edge relaxation, handling negative weights and detecting negative-weight cycles",
    timeComplexity: {
      best: "O(VE)",
      average: "O(VE)",
      worst: "O(VE)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: BellmanFordInput) =>
    bellmanFord(input.adjacencyList, input.startNodeId, input.nodeIds),
  generateSteps: generateBellmanFordSteps,
  educational: bellmanFordEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(bellmanFordDefinition);
