/** Storybook stories for the PlaybackControls component. */
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import PlaybackControls from "./PlaybackControls";

/**
 * PlaybackControls reads playback state (currentStepIndex, totalSteps, isPlaying, speed)
 * and actions (play, pause, stepForward, stepBackward, reset, seekTo, setSpeed) from Zustand.
 * Store state is set via decorators to simulate different playback states.
 */

function WithIdleState(Story: React.ComponentType) {
  const setState = useAppStore.setState;
  useEffect(() => {
    setState({
      currentStepIndex: 0,
      totalSteps: 20,
      isPlaying: false,
      speed: 1,
    });
  }, [setState]);
  return <Story />;
}

function WithPlayingState(Story: React.ComponentType) {
  const setState = useAppStore.setState;
  useEffect(() => {
    setState({
      currentStepIndex: 8,
      totalSteps: 20,
      isPlaying: true,
      speed: 1,
    });
  }, [setState]);
  return <Story />;
}

function WithMidPlayback(Story: React.ComponentType) {
  const setState = useAppStore.setState;
  useEffect(() => {
    setState({
      currentStepIndex: 10,
      totalSteps: 20,
      isPlaying: false,
      speed: 2,
    });
  }, [setState]);
  return <Story />;
}

function WithEndOfPlayback(Story: React.ComponentType) {
  const setState = useAppStore.setState;
  useEffect(() => {
    setState({
      currentStepIndex: 19,
      totalSteps: 20,
      isPlaying: false,
      speed: 1,
    });
  }, [setState]);
  return <Story />;
}

function WithNoSteps(Story: React.ComponentType) {
  const setState = useAppStore.setState;
  useEffect(() => {
    setState({
      currentStepIndex: 0,
      totalSteps: 0,
      isPlaying: false,
      speed: 1,
    });
  }, [setState]);
  return <Story />;
}

const meta: Meta<typeof PlaybackControls> = {
  title: "Playback/PlaybackControls",
  component: PlaybackControls,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PlaybackControls>;

/** Paused at the beginning with steps available. */
export const Idle: Story = {
  decorators: [WithIdleState],
};

/** Actively playing mid-execution. */
export const Playing: Story = {
  decorators: [WithPlayingState],
};

/** Paused at step 10 of 20 with 2x speed selected. */
export const MidPlayback: Story = {
  decorators: [WithMidPlayback],
};

/** Paused at the final step — play and step-forward are disabled. */
export const EndOfPlayback: Story = {
  decorators: [WithEndOfPlayback],
};

/** No steps loaded — all controls disabled. */
export const NoSteps: Story = {
  decorators: [WithNoSteps],
};
