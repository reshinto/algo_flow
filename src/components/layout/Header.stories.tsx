/**
 * Storybook stories for the Header component.
 *
 * Header reads from the Zustand store (selectedId, theme, educationalDrawerOpen)
 * and the algorithm registry to build the selector options. Store state is
 * injected via decorators to render each visual variant.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--color-surface-primary)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

function WithNoAlgorithmSelected(Story: React.ComponentType) {
  useEffect(() => {
    useAppStore.setState({ selectedId: null });
    return () => {
      useAppStore.setState({ selectedId: null });
    };
  }, []);
  return <Story />;
}

function WithBubbleSortSelected(Story: React.ComponentType) {
  useEffect(() => {
    useAppStore.setState({ selectedId: "bubble-sort" });
    return () => {
      useAppStore.setState({ selectedId: null });
    };
  }, []);
  return <Story />;
}

function WithSlidingWindowSelected(Story: React.ComponentType) {
  useEffect(() => {
    useAppStore.setState({ selectedId: "sliding-window-max-sum" });
    return () => {
      useAppStore.setState({ selectedId: null });
    };
  }, []);
  return <Story />;
}

/** Default header — no algorithm selected, shows placeholder text in the selector. */
export const Default: Story = {
  decorators: [WithNoAlgorithmSelected],
};

/** Algorithm selected — shows accent dot, breadcrumb context, and semibold algorithm name. */
export const WithBreadcrumb: Story = {
  decorators: [WithBubbleSortSelected],
};

/**
 * Algorithm with a longer name and deep breadcrumb — verifies the selector button
 * truncates the breadcrumb correctly and the accent dot + name remain visible.
 */
export const LongName: Story = {
  decorators: [WithSlidingWindowSelected],
};
