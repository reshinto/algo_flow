/* Greedy Graph Coloring algorithm registration */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { greedyColoring } from "./sources/greedy-coloring.ts?fn";

import { generateGreedyColoringSteps } from "./step-generator";
import type { GreedyColoringInput } from "./step-generator";
import { greedyColoringEducational } from "./educational";

import typescriptSource from "./sources/greedy-coloring.ts?raw";
import pythonSource from "./sources/greedy-coloring.py?raw";
import javaSource from "./sources/GreedyColoring.java?raw";
import rustSource from "./sources/greedy-coloring.rs?raw";
import cppSource from "./sources/GreedyColoring.cpp?raw";
import goSource from "./sources/greedy-coloring.go?raw";

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

// 6-node graph requiring 3 colors: two triangles sharing an edge
const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 6) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 6) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 6) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 6) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 6) },
  { id: "F", label: "F", state: "default", position: circlePosition(5, 6) },
];

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
  { source: "E", target: "F", state: "default" },
  { source: "F", target: "E", state: "default" },
];

const defaultAdjacencyList: GreedyColoringInput["adjacencyList"] = {
  A: ["B", "C"],
  B: ["A", "C"],
  C: ["A", "B", "D"],
  D: ["C", "E", "F"],
  E: ["D", "F"],
  F: ["D", "E"],
};

const defaultInput: GreedyColoringInput = {
  adjacencyList: defaultAdjacencyList,
  nodeIds: ["A", "B", "C", "D", "E", "F"],
  nodes: defaultNodes,
  edges: defaultEdges,
};

const greedyColoringDefinition: AlgorithmDefinition<GreedyColoringInput> = {
  meta: {
    id: ALGORITHM_ID.GREEDY_COLORING!,
    name: "Greedy Graph Coloring",
    category: CATEGORY.GRAPH!,
    technique: "graph-coloring",
    description:
      "Assigns the smallest available color to each node in order, ensuring no two adjacent nodes share a color",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V²)",
      worst: "O(V²)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: GreedyColoringInput) => greedyColoring(input.adjacencyList, input.nodeIds),
  generateSteps: generateGreedyColoringSteps,
  educational: greedyColoringEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(greedyColoringDefinition);
