import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { serializeTree } from "./sources/serialize-deserialize-tree.ts?fn";
import { generateSerializeDeserializeTreeSteps } from "./step-generator";
import type { SerializeDeserializeTreeInput } from "./step-generator";
import { serializeDeserializeTreeEducational } from "./educational";

import typescriptSource from "./sources/serialize-deserialize-tree.ts?raw";
import pythonSource from "./sources/serialize-deserialize-tree.py?raw";
import javaSource from "./sources/SerializeDeserializeTree.java?raw";
import rustSource from "./sources/serialize-deserialize-tree.rs?raw";
import cppSource from "./sources/SerializeDeserializeTree.cpp?raw";
import goSource from "./sources/serialize-deserialize-tree.go?raw";

/** Build a balanced 7-node BST for default input */
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

/** Convert our TreeNode[] + rootId into the linked node structure expected by the pure function */
function executeSerializeDeserializeTree(input: SerializeDeserializeTreeInput): string {
  interface PureNode {
    value: number;
    left: PureNode | null;
    right: PureNode | null;
  }

  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));

  function toPureNode(id: string | null): PureNode | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return {
      value: node.value,
      left: toPureNode(node.leftChildId),
      right: toPureNode(node.rightChildId),
    };
  }

  const root = toPureNode(input.rootId);
  return serializeTree(root) as string;
}

const serializeDeserializeTreeDefinition: AlgorithmDefinition<SerializeDeserializeTreeInput> = {
  meta: {
    id: ALGORITHM_ID.SERIALIZE_DESERIALIZE_TREE!,
    name: "Serialize & Deserialize Binary Tree",
    category: CATEGORY.TREES!,
    technique: "construction",
    description:
      "Converts a binary tree to a level-order string representation and reconstructs the identical tree from that string",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      nodes: defaultNodes,
      rootId: "n4",
    },
  },
  execute: executeSerializeDeserializeTree,
  generateSteps: generateSerializeDeserializeTreeSteps,
  educational: serializeDeserializeTreeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(serializeDeserializeTreeDefinition);
