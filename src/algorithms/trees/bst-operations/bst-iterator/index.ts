import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bstIterator } from "./sources/bst-iterator.ts?fn";
import { generateBstIteratorSteps } from "./step-generator";
import type { BstIteratorInput } from "./step-generator";
import { bstIteratorEducational } from "./educational";

import typescriptSource from "./sources/bst-iterator.ts?raw";
import pythonSource from "./sources/bst-iterator.py?raw";
import javaSource from "./sources/BSTIterator.java?raw";
import rustSource from "./sources/bst-iterator.rs?raw";
import cppSource from "./sources/BSTIterator.cpp?raw";
import goSource from "./sources/bst-iterator.go?raw";

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

function executeBstIterator(input: BstIteratorInput): number[] {
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toBST(id: string | null): BSTNodeShape | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return { value: node.value, left: toBST(node.leftChildId), right: toBST(node.rightChildId) };
  }
  const root = toBST(input.rootId);
  return bstIterator(root) as number[];
}

const bstIteratorDefinition: AlgorithmDefinition<BstIteratorInput> = {
  meta: {
    id: ALGORITHM_ID.BST_ITERATOR!,
    name: "BST Iterator",
    category: CATEGORY.TREES!,
    technique: "bst-operations",
    description:
      "Stack-based BST iterator that yields values in sorted order via hasNext/next interface",
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(h)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeBstIterator,
  generateSteps: generateBstIteratorSteps,
  educational: bstIteratorEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bstIteratorDefinition);
