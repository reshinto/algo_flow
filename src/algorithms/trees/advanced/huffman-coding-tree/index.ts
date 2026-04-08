import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { huffmanCodingTree } from "./sources/huffman-coding-tree.ts?fn";
import { generateHuffmanCodingTreeSteps } from "./step-generator";
import type { HuffmanCodingTreeInput } from "./step-generator";
import { huffmanCodingTreeEducational } from "./educational";

import typescriptSource from "./sources/huffman-coding-tree.ts?raw";
import pythonSource from "./sources/huffman-coding-tree.py?raw";
import javaSource from "./sources/HuffmanCodingTree.java?raw";
import rustSource from "./sources/huffman-coding-tree.rs?raw";
import cppSource from "./sources/HuffmanCodingTree.cpp?raw";
import goSource from "./sources/huffman-coding-tree.go?raw";

function executeHuffmanCodingTree(input: HuffmanCodingTreeInput): Record<string, string> {
  return huffmanCodingTree(input.frequencies) as Record<string, string>;
}

const huffmanCodingTreeDefinition: AlgorithmDefinition<HuffmanCodingTreeInput> = {
  meta: {
    id: ALGORITHM_ID.HUFFMAN_CODING_TREE!,
    name: "Huffman Coding Tree",
    category: CATEGORY.TREES!,
    technique: "advanced",
    description:
      "Build a Huffman tree from character frequencies to produce optimal variable-length prefix-free binary encodings",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      frequencies: [
        { char: "a", freq: 5 },
        { char: "b", freq: 9 },
        { char: "c", freq: 12 },
        { char: "d", freq: 13 },
        { char: "e", freq: 16 },
        { char: "f", freq: 45 },
      ],
    },
  },
  execute: executeHuffmanCodingTree,
  generateSteps: generateHuffmanCodingTreeSteps,
  educational: huffmanCodingTreeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(huffmanCodingTreeDefinition);
