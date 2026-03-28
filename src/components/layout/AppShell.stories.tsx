/**
 * Storybook stories for the AppShell component.
 *
 * AppShell is the root layout orchestrator. It depends on the Zustand store,
 * algorithm registry, playback engine hook, keyboard shortcuts hook, and
 * responsive layout hook. Rendering it in isolation requires the full
 * application context (registered algorithms, populated store, etc.).
 *
 * A single "Default" story is provided that mounts the real component.
 * It will work correctly only when algorithms are imported and registered
 * (which happens via the barrel import in src/algorithms/index.ts, pulled
 * in transitively through the store or registry initialization).
 */
import type { Meta, StoryObj } from "@storybook/react";
import AppShell from "./AppShell";

const meta: Meta<typeof AppShell> = {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

/** Full application shell — requires algorithm registry to be populated. */
export const Default: Story = {};
