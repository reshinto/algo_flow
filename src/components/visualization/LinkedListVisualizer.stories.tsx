/** Storybook stories for the LinkedListVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { LinkedListVisualState, LinkedListNode } from "@/types";
import LinkedListVisualizer from "./LinkedListVisualizer";

const meta: Meta<typeof LinkedListVisualizer> = {
  title: "Visualization/LinkedListVisualizer",
  component: LinkedListVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LinkedListVisualizer>;

const defaultNodes: LinkedListNode[] = [
  { id: "n0", value: 4, nextId: "n1", state: "default", position: { x: 60, y: 110 } },
  { id: "n1", value: 2, nextId: "n2", state: "default", position: { x: 140, y: 110 } },
  { id: "n2", value: 1, nextId: "n3", state: "default", position: { x: 220, y: 110 } },
  { id: "n3", value: 3, nextId: "n4", state: "default", position: { x: 300, y: 110 } },
  { id: "n4", value: 5, nextId: null, state: "default", position: { x: 380, y: 110 } },
];

export const Default: Story = {
  args: {
    visualState: {
      kind: "linked-list",
      nodes: defaultNodes,
      headId: "n0",
      pointers: {},
    } satisfies LinkedListVisualState,
  },
};

export const MidTraversal: Story = {
  args: {
    visualState: {
      kind: "linked-list",
      nodes: defaultNodes.map((node) => ({
        ...node,
        state:
          node.id === "n2"
            ? "current"
            : node.id === "n0" || node.id === "n1"
              ? "processed"
              : "default",
      })),
      headId: "n0",
      pointers: { prev: "n1", current: "n2" },
    } satisfies LinkedListVisualState,
  },
};

export const Swapping: Story = {
  args: {
    visualState: {
      kind: "linked-list",
      nodes: defaultNodes.map((node) => ({
        ...node,
        state: node.id === "n1" || node.id === "n2" ? "swapping" : "default",
      })),
      headId: "n0",
      pointers: { prev: "n0", current: "n1", next: "n2" },
    } satisfies LinkedListVisualState,
  },
};

export const FullyProcessed: Story = {
  args: {
    visualState: {
      kind: "linked-list",
      nodes: [
        { id: "n0", value: 1, nextId: "n1", state: "processed", position: { x: 60, y: 110 } },
        { id: "n1", value: 2, nextId: "n2", state: "processed", position: { x: 140, y: 110 } },
        { id: "n2", value: 3, nextId: "n3", state: "processed", position: { x: 220, y: 110 } },
        { id: "n3", value: 4, nextId: "n4", state: "processed", position: { x: 300, y: 110 } },
        { id: "n4", value: 5, nextId: null, state: "processed", position: { x: 380, y: 110 } },
      ],
      headId: "n0",
      pointers: {},
    } satisfies LinkedListVisualState,
  },
};
