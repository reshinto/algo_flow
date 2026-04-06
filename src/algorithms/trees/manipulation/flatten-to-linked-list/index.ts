import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { flattenToLinkedList } from "./sources/flatten-to-linked-list.ts?fn";
import { generateFlattenToLinkedListSteps } from "./step-generator";
import type { FlattenToLinkedListInput } from "./step-generator";
import { flattenToLinkedListEducational } from "./educational";

import typescriptSource from "./sources/flatten-to-linked-list.ts?raw";
import pythonSource from "./sources/flatten-to-linked-list.py?raw";
import javaSource from "./sources/FlattenToLinkedList.java?raw";

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

function executeFlattenToLinkedList(input: FlattenToLinkedListInput): number[] {
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
  if (!root) return [];
  flattenToLinkedList(root);
  // Collect values by following right pointers
  const result: number[] = [];
  let current: BinaryNode | null = root;
  while (current) {
    result.push(current.value);
    current = current.right;
  }
  return result;
}

const flattenToLinkedListDefinition: AlgorithmDefinition<FlattenToLinkedListInput> = {
  meta: {
    id: ALGORITHM_ID.FLATTEN_TO_LINKED_LIST!,
    name: "Flatten to Linked List",
    category: CATEGORY.TREES!,
    technique: "manipulation",
    description:
      "Recursively flattens a binary tree into a right-skewed linked list in-place using preorder traversal order",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeFlattenToLinkedList,
  generateSteps: generateFlattenToLinkedListSteps,
  educational: flattenToLinkedListEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(flattenToLinkedListDefinition);
