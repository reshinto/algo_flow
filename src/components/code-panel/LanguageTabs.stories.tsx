import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import LanguageTabs from "./LanguageTabs";

const meta: Meta<typeof LanguageTabs> = {
  title: "CodePanel/LanguageTabs",
  component: LanguageTabs,
  decorators: [
    (Story) => (
      <div style={{ background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LanguageTabs>;

export const TypeScriptActive: Story = {
  args: {
    activeLanguage: "typescript",
    onLanguageChange: fn(),
  },
};

export const PythonActive: Story = {
  args: {
    activeLanguage: "python",
    onLanguageChange: fn(),
  },
};

export const JavaActive: Story = {
  args: {
    activeLanguage: "java",
    onLanguageChange: fn(),
  },
};
