/**
 * Storybook stories for the Set Complement algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateSetComplementSteps } from "./step-generator";
import SetVisualizer from "@/components/visualization/sets/SetVisualizer";

const steps = generateSetComplementSteps({
  arrayA: [2, 4, 6],
  universalSet: [1, 2, 3, 4, 5, 6, 7, 8],
});

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Set Complement",
  component: SetVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SetVisualizer>;

/** Initial state — empty hash set, building phase */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Phase 1 mid — hash set partially built from array A */
export const BuildingHashSet: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.3)]!.visualState as SetVisualState,
  },
};

/** Phase 2 — scanning universal set, collecting complement elements */
export const ScanningUniversalSet: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as SetVisualState,
  },
};

/** Final state — complement result complete */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
