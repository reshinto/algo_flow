/* Hungarian Bipartite Matching registration — assembles the definition (meta, execute, steps,
   educational, sources) and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { hungarianMatching } from "./sources/hungarian-bipartite.ts?fn";

type AdjacencyList = Record<string, string[]>;
import { generateHungarianBipartiteSteps } from "./step-generator";
import type { HungarianBipartiteInput } from "./step-generator";
import { hungarianBipartiteEducational } from "./educational";

import typescriptSource from "./sources/hungarian-bipartite.ts?raw";
import pythonSource from "./sources/hungarian-bipartite.py?raw";
import javaSource from "./sources/HungarianBipartite.java?raw";
import rustSource from "./sources/hungarian-bipartite.rs?raw";
import cppSource from "./sources/HungarianBipartite.cpp?raw";
import goSource from "./sources/hungarian-bipartite.go?raw";

const defaultNodes: GraphNode[] = [
  { id: "L1", label: "L1", state: "default", position: { x: 100, y: 100 } },
  { id: "L2", label: "L2", state: "default", position: { x: 100, y: 200 } },
  { id: "L3", label: "L3", state: "default", position: { x: 100, y: 300 } },
  { id: "R1", label: "R1", state: "default", position: { x: 300, y: 100 } },
  { id: "R2", label: "R2", state: "default", position: { x: 300, y: 200 } },
  { id: "R3", label: "R3", state: "default", position: { x: 300, y: 300 } },
];

const defaultEdges: GraphEdge[] = [
  { source: "L1", target: "R1", state: "default" },
  { source: "R1", target: "L1", state: "default" },
  { source: "L1", target: "R2", state: "default" },
  { source: "R2", target: "L1", state: "default" },
  { source: "L2", target: "R2", state: "default" },
  { source: "R2", target: "L2", state: "default" },
  { source: "L2", target: "R3", state: "default" },
  { source: "R3", target: "L2", state: "default" },
  { source: "L3", target: "R1", state: "default" },
  { source: "R1", target: "L3", state: "default" },
  { source: "L3", target: "R3", state: "default" },
  { source: "R3", target: "L3", state: "default" },
];

const defaultAdjacencyList: AdjacencyList = {
  L1: ["R1", "R2"],
  L2: ["R2", "R3"],
  L3: ["R1", "R3"],
  R1: ["L1", "L3"],
  R2: ["L1", "L2"],
  R3: ["L2", "L3"],
};

const defaultLeftNodes = ["L1", "L2", "L3"];
const defaultRightNodes = ["R1", "R2", "R3"];

const defaultInput: HungarianBipartiteInput = {
  adjacencyList: defaultAdjacencyList,
  leftNodes: defaultLeftNodes,
  rightNodes: defaultRightNodes,
  nodes: defaultNodes,
  edges: defaultEdges,
};

const hungarianBipartiteDefinition: AlgorithmDefinition<HungarianBipartiteInput> = {
  meta: {
    id: ALGORITHM_ID.HUNGARIAN_BIPARTITE!,
    name: "Hungarian Bipartite Matching",
    category: CATEGORY.GRAPH!,
    technique: "matching",
    description:
      "Finds maximum matching in a bipartite graph using augmenting paths via DFS (Kuhn's Algorithm)",
    timeComplexity: {
      best: "O(E)",
      average: "O(V×E)",
      worst: "O(V×E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: HungarianBipartiteInput) =>
    hungarianMatching(input.adjacencyList, input.leftNodes, input.rightNodes),
  generateSteps: generateHungarianBipartiteSteps,
  educational: hungarianBipartiteEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(hungarianBipartiteDefinition);
