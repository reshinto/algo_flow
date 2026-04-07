import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { invertBinaryTreeIterative } from "./sources/invert-binary-tree-iterative.ts?fn";
import { generateInvertBinaryTreeIterativeSteps } from "./step-generator";
import type { InvertBinaryTreeIterativeInput } from "./step-generator";
import { invertBinaryTreeIterativeEducational } from "./educational";

import typescriptSource from "./sources/invert-binary-tree-iterative.ts?raw";
import pythonSource from "./sources/invert-binary-tree-iterative.py?raw";
import javaSource from "./sources/InvertBinaryTreeIterative.java?raw";
import rustSource from "./sources/invert-binary-tree-iterative.rs?raw";
import cppSource from "./sources/InvertBinaryTreeIterative.cpp?raw";
import goSource from "./sources/invert-binary-tree-iterative.go?raw";

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

function executeInvertBinaryTreeIterative(input: InvertBinaryTreeIterativeInput): number[] {
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
  const inverted = invertBinaryTreeIterative(root) as BinaryNode | null;
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

const invertBinaryTreeIterativeDefinition: AlgorithmDefinition<InvertBinaryTreeIterativeInput> = {
  meta: {
    id: ALGORITHM_ID.INVERT_BINARY_TREE_ITERATIVE!,
    name: "Invert Binary Tree (Iterative)",
    category: CATEGORY.TREES!,
    technique: "manipulation",
    description:
      "Iteratively mirrors a binary tree using a BFS queue, swapping left and right children level by level without recursion",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(w)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeInvertBinaryTreeIterative,
  generateSteps: generateInvertBinaryTreeIterativeSteps,
  educational: invertBinaryTreeIterativeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(invertBinaryTreeIterativeDefinition);
