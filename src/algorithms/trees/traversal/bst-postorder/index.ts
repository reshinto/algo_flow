import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bstPostorder } from "./sources/bst-postorder.ts?fn";
import { generateBstPostorderSteps } from "./step-generator";
import type { BstPostorderInput } from "./step-generator";
import { bstPostorderEducational } from "./educational";

import typescriptSource from "./sources/bst-postorder.ts?raw";
import pythonSource from "./sources/bst-postorder.py?raw";
import javaSource from "./sources/BSTPostorder.java?raw";
import rustSource from "./sources/bst-postorder.rs?raw";
import cppSource from "./sources/BSTPostorder.cpp?raw";
import goSource from "./sources/bst-postorder.go?raw";

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

/** Execute BST post-order using the ?fn source — visits children before root */
function executeBstPostorder(input: BstPostorderInput): number[] {
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
  return bstPostorder(root) as number[];
}

const bstPostorderDefinition: AlgorithmDefinition<BstPostorderInput> = {
  meta: {
    id: ALGORITHM_ID.BST_POSTORDER!,
    name: "BST Post-Order Traversal",
    category: CATEGORY.TREES!,
    technique: "traversal",
    description:
      "A recursive tree traversal that visits nodes in LRN order: left subtree → right subtree → root",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      nodes: defaultNodes,
      rootId: "n4",
    },
  },
  execute: executeBstPostorder,
  generateSteps: generateBstPostorderSteps,
  educational: bstPostorderEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bstPostorderDefinition);
