/**
 * Storybook stories for the MobileLayout component.
 *
 * MobileLayout reads activePanel / setActivePanel from the Zustand store
 * but receives the three panel elements as props. Stories render with
 * placeholder panels. The active tab is controlled by the store's
 * activePanel state (defaults to "visualization").
 */
import type { Meta, StoryObj } from "@storybook/react";
import { useAppStore } from "@/store";
import MobileLayout from "./MobileLayout";

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

const panelProps = {
  codePanel: <PlaceholderPanel label="Code Panel" color="#1a365d" />,
  visualizationPanel: <PlaceholderPanel label="Visualization Panel" color="#1a3a2a" />,
  explanationPanel: <PlaceholderPanel label="Explanation Panel" color="#3a1a3a" />,
};

const meta: Meta<typeof MobileLayout> = {
  title: "Layout/MobileLayout",
  component: MobileLayout,
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
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
type Story = StoryObj<typeof MobileLayout>;

/** Default state — visualization tab is active (store default). */
export const VisualizationTab: Story = {
  args: panelProps,
};

/** Code tab active — sets the store's activePanel before rendering. */
export const CodeTab: Story = {
  args: panelProps,
  decorators: [
    (Story) => {
      useAppStore.getState().setActivePanel("code");
      return <Story />;
    },
  ],
};

/** Explanation tab active — sets the store's activePanel before rendering. */
export const ExplanationTab: Story = {
  args: panelProps,
  decorators: [
    (Story) => {
      useAppStore.getState().setActivePanel("explanation");
      return <Story />;
    },
  ],
};
