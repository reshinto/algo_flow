/** Storybook stories for the ArrayInputEditor component. */
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import ArrayInputEditor from "./ArrayInputEditor";

const meta: Meta<typeof ArrayInputEditor> = {
  title: "Input Editor/ArrayInputEditor",
  component: ArrayInputEditor,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayInputEditor>;

/** Default state with a small numeric array. */
export const Default: Story = {
  args: {
    values: [64, 34, 25, 12, 22, 11, 90],
    onChange: fn(),
    label: "Array values (comma-separated)",
  },
};

/** Single element array. */
export const SingleElement: Story = {
  args: {
    values: [42],
    onChange: fn(),
    label: "Array values (comma-separated)",
  },
};

/** Large array with many elements. */
export const LargeArray: Story = {
  args: {
    values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
    onChange: fn(),
    label: "Array values (comma-separated)",
  },
};
