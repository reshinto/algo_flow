import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { invertBinaryTree } from "./sources/invert-binary-tree.ts?fn";
import { generateInvertBinaryTreeSteps } from "./step-generator";
import type { InvertBinaryTreeInput } from "./step-generator";
import { invertBinaryTreeEducational } from "./educational";

import typescriptSource from "./sources/invert-binary-tree.ts?raw";
import pythonSource from "./sources/invert-binary-tree.py?raw";
import javaSource from "./sources/InvertBinaryTree.java?raw";
import rustSource from "./sources/invert-binary-tree.rs?raw";
import cppSource from "./sources/InvertBinaryTree.cpp?raw";
import goSource from "./sources/invert-binary-tree.go?raw";

/** Standard 7-node balanced BST: root=4, left subtree [2,1,3], right subtree [6,5,7] */
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

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function executeInvertBinaryTree(input: InvertBinaryTreeInput): number[] {
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toBinaryNode(id: string | null): BinaryNode | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return {
      value: node.value,
      left: toBinaryNode(node.leftChildId),
      right: toBinaryNode(node.rightChildId),
    };
  }
  const root = toBinaryNode(input.rootId);
  const inverted = invertBinaryTree(root) as BinaryNode | null;
  // Collect values in level-order for result
  const result: number[] = [];
  const queue: (BinaryNode | null)[] = [inverted];
  while (queue.length > 0) {
    const current = queue.shift();
    if (current != null) {
      result.push(current.value);
      queue.push(current.left, current.right);
    }
  }
  return result;
}

const invertBinaryTreeDefinition: AlgorithmDefinition<InvertBinaryTreeInput> = {
  meta: {
    id: ALGORITHM_ID.INVERT_BINARY_TREE!,
    name: "Invert Binary Tree",
    category: CATEGORY.TREES!,
    technique: "manipulation",
    description:
      "Recursively mirrors a binary tree by swapping left and right children at every node, producing a reflected version of the original tree",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeInvertBinaryTree,
  generateSteps: generateInvertBinaryTreeSteps,
  educational: invertBinaryTreeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(invertBinaryTreeDefinition);
