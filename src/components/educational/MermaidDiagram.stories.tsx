/** Storybook stories for the MermaidDiagram component. */
import type { Meta, StoryObj } from "@storybook/react";
import MermaidDiagram from "./MermaidDiagram";

const meta: Meta<typeof MermaidDiagram> = {
  title: "Educational/MermaidDiagram",
  component: MermaidDiagram,
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MermaidDiagram>;

/** Simple top-down flowchart. */
export const SimpleFlowchart: Story = {
  args: {
    chart: `graph TD
    A[Start] --> B{Is it sorted?}
    B -- Yes --> C[Done]
    B -- No --> D[Swap elements]
    D --> A`,
  },
};

/** Left-to-right sequence diagram. */
export const SequenceDiagram: Story = {
  args: {
    chart: `sequenceDiagram
    participant A as Algorithm
    participant D as Data
    A->>D: Read element
    D-->>A: Return value
    A->>D: Compare and swap`,
  },
};

/** Invalid syntax to demonstrate error handling. */
export const InvalidSyntax: Story = {
  args: {
    chart: "this is not valid mermaid syntax }{}{",
  },
};
