/**
 * Storybook preview configuration.
 * Imports global CSS and sets dark background defaults to match the app's zinc-950 theme.
 */
import type { Preview } from "@storybook/react";

import "../src/index.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#09090b" },
        { name: "panel", value: "#18181b" },
      ],
    },
  },
};

export default preview;
