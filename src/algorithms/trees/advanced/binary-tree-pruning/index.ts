import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { binaryTreePruning } from "./sources/binary-tree-pruning.ts?fn";
import { generateBinaryTreePruningSteps } from "./step-generator";
import type { BinaryTreePruningInput } from "./step-generator";
import { binaryTreePruningEducational } from "./educational";

import typescriptSource from "./sources/binary-tree-pruning.ts?raw";
import pythonSource from "./sources/binary-tree-pruning.py?raw";
import javaSource from "./sources/BinaryTreePruning.java?raw";
import rustSource from "./sources/binary-tree-pruning.rs?raw";
import cppSource from "./sources/BinaryTreePruning.cpp?raw";
import goSource from "./sources/binary-tree-pruning.go?raw";

/** Tree with some zero-only subtrees that will be pruned */
const defaultNodes: TreeNode[] = [
  {
    id: "n1",
    value: 1,
    parentId: null,
    leftChildId: "n0a",
    rightChildId: "n1b",
    state: "default",
    position: { x: 200, y: 40 },
  },
  {
    id: "n0a",
    value: 0,
    parentId: "n1",
    leftChildId: "n0c",
    rightChildId: "n0d",
    state: "default",
    position: { x: 100, y: 120 },
  },
  {
    id: "n1b",
    value: 1,
    parentId: "n1",
    leftChildId: "n0e",
    rightChildId: "n1f",
    state: "default",
    position: { x: 300, y: 120 },
  },
  {
    id: "n0c",
    value: 0,
    parentId: "n0a",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 200 },
  },
  {
    id: "n0d",
    value: 0,
    parentId: "n0a",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 200 },
  },
  {
    id: "n0e",
    value: 0,
    parentId: "n1b",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 200 },
  },
  {
    id: "n1f",
    value: 1,
    parentId: "n1b",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 200 },
  },
];

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function executeBinaryTreePruning(input: BinaryTreePruningInput): number[] {
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
  const pruned = binaryTreePruning(root) as BinaryNode | null;
  const result: number[] = [];
  function inorder(bNode: BinaryNode | null): void {
    if (!bNode) return;
    inorder(bNode.left);
    result.push(bNode.value);
    inorder(bNode.right);
  }
  inorder(pruned);
  return result;
}

const binaryTreePruningDefinition: AlgorithmDefinition<BinaryTreePruningInput> = {
  meta: {
    id: ALGORITHM_ID.BINARY_TREE_PRUNING!,
    name: "Binary Tree Pruning",
    category: CATEGORY.TREES!,
    technique: "advanced",
    description:
      "Remove all subtrees that contain no 1s using post-order traversal — leaves with value 0 collapse upward",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n1" },
  },
  execute: executeBinaryTreePruning,
  generateSteps: generateBinaryTreePruningSteps,
  educational: binaryTreePruningEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(binaryTreePruningDefinition);
