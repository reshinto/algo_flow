import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { maximumDepthIterative } from "./sources/maximum-depth-iterative.ts?fn";
import { generateMaximumDepthIterativeSteps } from "./step-generator";
import type { MaximumDepthIterativeInput } from "./step-generator";
import { maximumDepthIterativeEducational } from "./educational";

import typescriptSource from "./sources/maximum-depth-iterative.ts?raw";
import pythonSource from "./sources/maximum-depth-iterative.py?raw";
import javaSource from "./sources/MaximumDepthIterative.java?raw";
import rustSource from "./sources/maximum-depth-iterative.rs?raw";
import cppSource from "./sources/MaximumDepthIterative.cpp?raw";
import goSource from "./sources/maximum-depth-iterative.go?raw";

/** Balanced 7-node BST: root=4, left subtree [2,1,3], right subtree [6,5,7] */
const defaultNodes: TreeNode[] = [
  {
    id: "n4",
    value: 4,
    parentId: null,
    leftChildId: "n2",
    rightChildId: "n6",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "n2",
    value: 2,
    parentId: "n4",
    leftChildId: "n1",
    rightChildId: "n3",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "n6",
    value: 6,
    parentId: "n4",
    leftChildId: "n5",
    rightChildId: "n7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "n1",
    value: 1,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "n3",
    value: 3,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "n5",
    value: 5,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "n7",
    value: 7,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 260 },
  },
];

function executeMaximumDepthIterative(input: MaximumDepthIterativeInput): number {
  interface BSTNode {
    value: number;
    left: BSTNode | null;
    right: BSTNode | null;
  }
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toBSTNode(id: string | null): BSTNode | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return {
      value: node.value,
      left: toBSTNode(node.leftChildId),
      right: toBSTNode(node.rightChildId),
    };
  }
  return maximumDepthIterative(toBSTNode(input.rootId)) as number;
}

const maximumDepthIterativeDefinition: AlgorithmDefinition<MaximumDepthIterativeInput> = {
  meta: {
    id: ALGORITHM_ID.MAXIMUM_DEPTH_ITERATIVE!,
    name: "Maximum Depth (Iterative)",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Computes maximum depth using BFS level-by-level counting — each completed level increments depth",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(w)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeMaximumDepthIterative,
  generateSteps: generateMaximumDepthIterativeSteps,
  educational: maximumDepthIterativeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(maximumDepthIterativeDefinition);
