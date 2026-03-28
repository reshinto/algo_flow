/** Storybook stories for the PanelLayout component. */
import type { Meta, StoryObj } from "@storybook/react";
import PanelLayout from "./PanelLayout";

/** Placeholder panel used to visualize layout slots without real content. */
function PlaceholderPanel({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 14,
        fontWeight: 600,
        backgroundColor: color,
      }}
    >
      {label}
    </div>
  );
}

const meta: Meta<typeof PanelLayout> = {
  title: "Layout/PanelLayout",
  component: PanelLayout,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PanelLayout>;

export const Default: Story = {
  args: {
    codePanel: <PlaceholderPanel label="Code Panel" color="#1a365d" />,
    visualizationPanel: <PlaceholderPanel label="Visualization Panel" color="#1a3a2a" />,
    explanationPanel: <PlaceholderPanel label="Explanation Panel" color="#3a1a3a" />,
  },
};
