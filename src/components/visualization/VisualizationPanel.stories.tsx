/** Storybook stories for the VisualizationPanel component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState, ExecutionStep } from "@/types";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import VisualizationPanel from "./VisualizationPanel";

const meta: Meta<typeof VisualizationPanel> = {
  title: "Visualization/VisualizationPanel",
  component: VisualizationPanel,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VisualizationPanel>;

const mockArrayVisualState: ArrayVisualState = {
  kind: "array",
  elements: [64, 34, 25, 12, 22, 11, 90].map((value) => ({
    value,
    state: "default" as const,
  })),
  pointers: {},
};

const mockStep: ExecutionStep = {
  index: 0,
  type: "initialize",
  description: "Initialize array",
  highlightedLines: [
    { language: "typescript", lines: [1] },
    { language: "python", lines: [1] },
    { language: "java", lines: [1] },
  ],
  variables: {},
  visualState: mockArrayVisualState,
  metrics: {
    comparisons: 0,
    swaps: 0,
    visits: 0,
    cacheHits: 0,
    queueOperations: 0,
    elapsedSteps: 0,
  },
};

/** Decorator that seeds the Zustand store with minimal state for rendering. */
function StoreSeeder({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useAppStore.setState({
      steps: [mockStep],
      totalSteps: 1,
      currentStepIndex: 0,
    });
  }, []);

  return <>{children}</>;
}

export const NoAlgorithmSelected: Story = {};

export const WithArrayVisualization: Story = {
  decorators: [
    (Story) => (
      <StoreSeeder>
        <Story />
      </StoreSeeder>
    ),
  ],
};
