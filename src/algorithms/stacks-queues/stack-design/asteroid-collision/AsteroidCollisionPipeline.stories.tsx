/**
 * Storybook stories for the Asteroid Collision algorithm pipeline.
 * Uses the real step generator with [5, 10, -5], rendering the
 * StackQueueVisualizer at key simulation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateAsteroidCollisionSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateAsteroidCollisionSteps({ asteroids: [5, 10, -5] });
const annihilationSteps = generateAsteroidCollisionSteps({ asteroids: [8, -8] });
const chainReactionSteps = generateAsteroidCollisionSteps({ asteroids: [1, 2, 3, -10] });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Asteroid Collision",
  component: StackQueueVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StackQueueVisualizer>;

/** Initial state — all asteroids unprocessed, empty stack */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-simulation with some asteroids pushed onto the stack */
export const MidSimulation: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — smaller asteroid destroyed, two survivors remain */
export const SurvivorComplete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Mutual annihilation — equal-sized asteroids both explode, empty result */
export const MutualAnnihilation: Story = {
  args: {
    visualState: annihilationSteps[annihilationSteps.length - 1]!
      .visualState as StackQueueVisualState,
  },
};

/** Chain reaction — large left-mover destroys all preceding right-movers */
export const ChainReaction: Story = {
  args: {
    visualState: chainReactionSteps[chainReactionSteps.length - 1]!
      .visualState as StackQueueVisualState,
  },
};
