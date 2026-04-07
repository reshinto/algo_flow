import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { treeToDoublyLinkedList } from "./sources/tree-to-doubly-linked-list.ts?fn";
import { generateTreeToDoublyLinkedListSteps } from "./step-generator";
import type { TreeToDoublyLinkedListInput } from "./step-generator";
import { treeToDoublyLinkedListEducational } from "./educational";

import typescriptSource from "./sources/tree-to-doubly-linked-list.ts?raw";
import pythonSource from "./sources/tree-to-doubly-linked-list.py?raw";
import javaSource from "./sources/TreeToDoublyLinkedList.java?raw";
import rustSource from "./sources/tree-to-doubly-linked-list.rs?raw";
import cppSource from "./sources/TreeToDoublyLinkedList.cpp?raw";
import goSource from "./sources/tree-to-doubly-linked-list.go?raw";

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

interface DLLNode {
  value: number;
  left: DLLNode | null;
  right: DLLNode | null;
}

function executeTreeToDoublyLinkedList(input: TreeToDoublyLinkedListInput): number[] {
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toDLLNode(id: string | null): DLLNode | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return {
      value: node.value,
      left: toDLLNode(node.leftChildId),
      right: toDLLNode(node.rightChildId),
    };
  }
  const root = toDLLNode(input.rootId);
  const head = treeToDoublyLinkedList(root) as DLLNode | null;
  const result: number[] = [];
  let current = head;
  while (current) {
    result.push(current.value);
    current = current.right;
    if (current === head) break; // stop at circular reference
  }
  return result;
}

const treeToDoublyLinkedListDefinition: AlgorithmDefinition<TreeToDoublyLinkedListInput> = {
  meta: {
    id: ALGORITHM_ID.TREE_TO_DOUBLY_LINKED_LIST!,
    name: "BST to Doubly Linked List",
    category: CATEGORY.TREES!,
    technique: "advanced",
    description:
      "Convert a BST into a sorted circular doubly linked list in-place by repurposing tree pointers during in-order traversal",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeTreeToDoublyLinkedList,
  generateSteps: generateTreeToDoublyLinkedListSteps,
  educational: treeToDoublyLinkedListEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(treeToDoublyLinkedListDefinition);
