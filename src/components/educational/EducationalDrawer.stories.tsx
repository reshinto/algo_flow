/** Storybook stories for the EducationalDrawer component. */
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import EducationalDrawer from "./EducationalDrawer";

/**
 * EducationalDrawer reads directly from the Zustand store (definition, educationalDrawerOpen).
 * We use a decorator that sets store state before render so the drawer appears with content.
 */

const sampleEducational = {
  overview:
    "**Bubble Sort** repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
  howItWorks:
    'The algorithm passes through the array multiple times. On each pass, it compares adjacent pairs and swaps them if needed. After each pass, the largest unsorted element "bubbles up" to its correct position.',
  timeAndSpaceComplexity:
    "- **Time:** O(n^2) average and worst case, O(n) best case\n- **Space:** O(1) auxiliary",
  bestAndWorstCase:
    "- **Best:** Already sorted array — only one pass with no swaps\n- **Worst:** Reverse-sorted array — maximum swaps on every pass",
  realWorldUses: [
    "Teaching sorting fundamentals",
    "Small datasets where simplicity matters",
    "Nearly sorted data with adaptive optimization",
  ],
  strengthsAndLimitations: {
    strengths: [
      "Simple to implement and understand",
      "Stable sort (preserves relative order of equal elements)",
      "In-place with O(1) extra memory",
    ],
    limitations: [
      "O(n^2) makes it impractical for large datasets",
      "Many unnecessary comparisons even on nearly sorted data without optimization",
    ],
  },
  whenToUseIt:
    "Use Bubble Sort for educational purposes or very small datasets. For production use, prefer O(n log n) algorithms like Merge Sort or Quick Sort.",
};

const sampleMeta = {
  id: "bubble-sort",
  name: "Bubble Sort",
  category: "sorting",
  description: "A simple comparison-based sorting algorithm",
  timeComplexity: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
  spaceComplexity: "O(1)",
  supportedLanguages: ["typescript" as const, "python" as const, "java" as const],
  defaultInput: [64, 34, 25, 12, 22, 11, 90],
};

/**
 * Decorator that opens the educational drawer and sets a mock definition in the store.
 */
function WithOpenDrawer(Story: React.ComponentType) {
  const setState = useAppStore.setState;

  useEffect(() => {
    setState({
      educationalDrawerOpen: true,
      definition: {
        meta: sampleMeta,
        educational: sampleEducational,
        execute: () => [],
        generateSteps: () => [],
        sources: { typescript: "", python: "", java: "" },
      },
    });

    return () => {
      setState({ educationalDrawerOpen: false, definition: null });
    };
  }, [setState]);

  return <Story />;
}

function WithClosedDrawer(Story: React.ComponentType) {
  const setState = useAppStore.setState;

  useEffect(() => {
    setState({ educationalDrawerOpen: false, definition: null });
  }, [setState]);

  return <Story />;
}

const meta: Meta<typeof EducationalDrawer> = {
  title: "Educational/EducationalDrawer",
  component: EducationalDrawer,
};

export default meta;
type Story = StoryObj<typeof EducationalDrawer>;

/** Drawer is open with full educational content visible on the Overview tab. */
export const OpenWithContent: Story = {
  decorators: [WithOpenDrawer],
};

/** Drawer is closed — component renders nothing via AnimatePresence. */
export const Closed: Story = {
  decorators: [WithClosedDrawer],
};

/** Drawer open but no algorithm selected — shows fallback message. */
export const NoAlgorithmSelected: Story = {
  decorators: [
    (Story) => {
      const setState = useAppStore.setState;
      useEffect(() => {
        setState({ educationalDrawerOpen: true, definition: null });
        return () => {
          setState({ educationalDrawerOpen: false });
        };
      }, [setState]);
      return <Story />;
    },
  ],
};
