import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bstToGreaterTreeIterative } from "./sources/bst-to-greater-tree-iterative.ts?fn";
import { generateBstToGreaterTreeIterativeSteps } from "./step-generator";
import type { BstToGreaterTreeIterativeInput } from "./step-generator";
import { bstToGreaterTreeIterativeEducational } from "./educational";

import typescriptSource from "./sources/bst-to-greater-tree-iterative.ts?raw";
import pythonSource from "./sources/bst-to-greater-tree-iterative.py?raw";
import javaSource from "./sources/BSTToGreaterTreeIterative.java?raw";
import rustSource from "./sources/bst-to-greater-tree-iterative.rs?raw";
import cppSource from "./sources/BSTToGreaterTreeIterative.cpp?raw";
import goSource from "./sources/bst-to-greater-tree-iterative.go?raw";

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

interface BSTNodeShape {
  value: number;
  left: BSTNodeShape | null;
  right: BSTNodeShape | null;
}

function executeBstToGreaterTreeIterative(input: BstToGreaterTreeIterativeInput): number | null {
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toBST(id: string | null): BSTNodeShape | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return { value: node.value, left: toBST(node.leftChildId), right: toBST(node.rightChildId) };
  }
  const root = toBST(input.rootId);
  const result = bstToGreaterTreeIterative(root) as BSTNodeShape | null;
  return result ? result.value : null;
}

const bstToGreaterTreeIterativeDefinition: AlgorithmDefinition<BstToGreaterTreeIterativeInput> = {
  meta: {
    id: ALGORITHM_ID.BST_TO_GREATER_TREE_ITERATIVE!,
    name: "BST to Greater Tree (Iterative)",
    category: CATEGORY.TREES!,
    technique: "bst-operations",
    description:
      "Stack-based reverse in-order traversal accumulates running sum to build the greater tree",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeBstToGreaterTreeIterative,
  generateSteps: generateBstToGreaterTreeIterativeSteps,
  educational: bstToGreaterTreeIterativeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bstToGreaterTreeIterativeDefinition);
