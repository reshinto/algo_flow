import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { nAryTreeTraversal } from "./sources/n-ary-tree-traversal.ts?fn";
import { generateNAryTreeTraversalSteps } from "./step-generator";
import type { NAryTreeTraversalInput } from "./step-generator";
import { nAryTreeTraversalEducational } from "./educational";

import typescriptSource from "./sources/n-ary-tree-traversal.ts?raw";
import pythonSource from "./sources/n-ary-tree-traversal.py?raw";
import javaSource from "./sources/NAryTreeTraversal.java?raw";
import rustSource from "./sources/n-ary-tree-traversal.rs?raw";
import cppSource from "./sources/NAryTreeTraversal.cpp?raw";
import goSource from "./sources/n-ary-tree-traversal.go?raw";

/** A 3-ary tree: root has 3 children, each has 2 children (9 nodes total) */
const defaultNodes: TreeNode[] = [
  {
    id: "r",
    value: 1,
    parentId: null,
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["c1", "c2", "c3"],
    state: "default",
    position: { x: 240, y: 40 },
  },
  {
    id: "c1",
    value: 3,
    parentId: "r",
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["g1", "g2"],
    state: "default",
    position: { x: 100, y: 120 },
  },
  {
    id: "c2",
    value: 2,
    parentId: "r",
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["g3", "g4"],
    state: "default",
    position: { x: 240, y: 120 },
  },
  {
    id: "c3",
    value: 4,
    parentId: "r",
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["g5", "g6"],
    state: "default",
    position: { x: 380, y: 120 },
  },
  {
    id: "g1",
    value: 5,
    parentId: "c1",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 50, y: 200 },
  },
  {
    id: "g2",
    value: 6,
    parentId: "c1",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 130, y: 200 },
  },
  {
    id: "g3",
    value: 7,
    parentId: "c2",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 200, y: 200 },
  },
  {
    id: "g4",
    value: 8,
    parentId: "c2",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 280, y: 200 },
  },
  {
    id: "g5",
    value: 9,
    parentId: "c3",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 340, y: 200 },
  },
  {
    id: "g6",
    value: 10,
    parentId: "c3",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 420, y: 200 },
  },
];

interface NAryNode {
  value: number;
  children: NAryNode[];
}

function executeNAryTreeTraversal(input: NAryTreeTraversalInput): number[] {
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toNAryNode(id: string | null): NAryNode | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return {
      value: node.value,
      children: (node.childrenIds ?? [])
        .map((childId) => toNAryNode(childId))
        .filter((child): child is NAryNode => child !== null),
    };
  }
  const root = toNAryNode(input.rootId);
  return nAryTreeTraversal(root) as number[];
}

const nAryTreeTraversalDefinition: AlgorithmDefinition<NAryTreeTraversalInput> = {
  meta: {
    id: ALGORITHM_ID.N_ARY_TREE_TRAVERSAL!,
    name: "N-ary Tree Traversal",
    category: CATEGORY.TREES!,
    technique: "advanced",
    description:
      "Preorder traversal of an N-ary tree where each node can have any number of children — visits root before all children",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "r" },
  },
  execute: executeNAryTreeTraversal,
  generateSteps: generateNAryTreeTraversalSteps,
  educational: nAryTreeTraversalEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(nAryTreeTraversalDefinition);
