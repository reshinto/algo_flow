import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { verticalOrderTraversal } from "./sources/vertical-order-traversal.ts?fn";
import { generateVerticalOrderTraversalSteps } from "./step-generator";
import type { VerticalOrderTraversalInput } from "./step-generator";
import { verticalOrderTraversalEducational } from "./educational";

import typescriptSource from "./sources/vertical-order-traversal.ts?raw";
import pythonSource from "./sources/vertical-order-traversal.py?raw";
import javaSource from "./sources/VerticalOrderTraversal.java?raw";
import rustSource from "./sources/vertical-order-traversal.rs?raw";
import cppSource from "./sources/VerticalOrderTraversal.cpp?raw";
import goSource from "./sources/vertical-order-traversal.go?raw";

/** Build a balanced 7-node BST: [4,2,6,1,3,5,7] */
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

/** Execute vertical order traversal using the ?fn source */
function executeVerticalOrderTraversal(input: VerticalOrderTraversalInput): number[][] {
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
  const root = toBSTNode(input.rootId);
  return verticalOrderTraversal(root) as number[][];
}

const verticalOrderTraversalDefinition: AlgorithmDefinition<VerticalOrderTraversalInput> = {
  meta: {
    id: ALGORITHM_ID.VERTICAL_ORDER_TRAVERSAL!,
    name: "Vertical-Order Traversal",
    category: CATEGORY.TREES!,
    technique: "traversal",
    description:
      "BFS traversal grouping nodes by vertical column index — left decrements, right increments column",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      nodes: defaultNodes,
      rootId: "n4",
    },
  },
  execute: executeVerticalOrderTraversal,
  generateSteps: generateVerticalOrderTraversalSteps,
  educational: verticalOrderTraversalEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(verticalOrderTraversalDefinition);
