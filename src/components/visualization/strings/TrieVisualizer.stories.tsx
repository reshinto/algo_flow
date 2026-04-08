/** Storybook stories for the TrieVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { TrieVisualState } from "@/types";
import TrieVisualizer from "./TrieVisualizer";

const meta: Meta<typeof TrieVisualizer> = {
  title: "Visualization/TrieVisualizer",
  component: TrieVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TrieVisualizer>;

// Simple trie with words: "cat", "car", "card"
const trieNodes = [
  { id: 0, char: "", isEnd: false, state: "default" as const },
  { id: 1, char: "c", isEnd: false, state: "default" as const },
  { id: 2, char: "a", isEnd: false, state: "default" as const },
  { id: 3, char: "t", isEnd: true, state: "default" as const },
  { id: 4, char: "r", isEnd: true, state: "default" as const },
  { id: 5, char: "d", isEnd: true, state: "default" as const },
];

const trieEdges = [
  { from: 0, to: 1, char: "c", state: "default" as const },
  { from: 1, to: 2, char: "a", state: "default" as const },
  { from: 2, to: 3, char: "t", state: "default" as const },
  { from: 2, to: 4, char: "r", state: "default" as const },
  { from: 4, to: 5, char: "d", state: "default" as const },
];

function makeSearchWord(
  word: string,
  state: "default" | "current" | "matching" | "matched" | "mismatched" = "default",
) {
  return word.split("").map((value) => ({ value, state }));
}

export const Default: Story = {
  args: {
    visualState: {
      kind: "string-trie",
      nodes: trieNodes,
      edges: trieEdges,
      currentPath: [],
      searchWord: makeSearchWord("car"),
      highlightedNodes: [],
      matchResult: null,
      suggestions: [],
    } satisfies TrieVisualState,
  },
};

export const Searching: Story = {
  args: {
    visualState: {
      kind: "string-trie",
      nodes: trieNodes.map((node) => ({
        ...node,
        state: [0, 1, 2].includes(node.id) ? "path" : "default",
      })),
      edges: trieEdges.map((edge) => ({
        ...edge,
        state:
          (edge.from === 0 && edge.to === 1) || (edge.from === 1 && edge.to === 2)
            ? "traversed"
            : "default",
      })),
      currentPath: [0, 1, 2],
      searchWord: makeSearchWord("car").map((char, charIndex) => ({
        ...char,
        state: charIndex <= 1 ? "matched" : charIndex === 2 ? "current" : "default",
      })),
      highlightedNodes: [2],
      matchResult: null,
      suggestions: [],
    } satisfies TrieVisualState,
  },
};

export const WordFound: Story = {
  args: {
    visualState: {
      kind: "string-trie",
      nodes: trieNodes.map((node) => ({
        ...node,
        state: [0, 1, 2, 4].includes(node.id) ? "matched" : "default",
      })),
      edges: trieEdges.map((edge) => ({
        ...edge,
        state:
          (edge.from === 0 && edge.to === 1) ||
          (edge.from === 1 && edge.to === 2) ||
          (edge.from === 2 && edge.to === 4)
            ? "highlighted"
            : "default",
      })),
      currentPath: [0, 1, 2, 4],
      searchWord: makeSearchWord("car", "matched"),
      highlightedNodes: [4],
      matchResult: true,
      suggestions: [],
    } satisfies TrieVisualState,
  },
};

export const WordNotFound: Story = {
  args: {
    visualState: {
      kind: "string-trie",
      nodes: trieNodes.map((node) => ({
        ...node,
        state: [0, 1].includes(node.id) ? "path" : "default",
      })),
      edges: trieEdges.map((edge) => ({
        ...edge,
        state: edge.from === 0 && edge.to === 1 ? "traversed" : "default",
      })),
      currentPath: [0, 1],
      searchWord: makeSearchWord("cow").map((char, charIndex) => ({
        ...char,
        state: charIndex === 0 ? "matched" : charIndex === 1 ? "mismatched" : "default",
      })),
      highlightedNodes: [],
      matchResult: false,
      suggestions: [],
    } satisfies TrieVisualState,
  },
};
