import { describe, it, expect, beforeEach } from "vitest";

import type { AlgorithmDefinition, ExecutionStep } from "@/types";
import { registry } from "@/registry";

import { useAppStore } from "./index";

const MOCK_STEPS: ExecutionStep[] = [
  {
    index: 0,
    type: "initialize",
    description: "Start",
    highlightedLines: [],
    variables: {},
    visualState: { kind: "array", elements: [], pointers: {} },
    metrics: {
      comparisons: 0,
      swaps: 0,
      visits: 0,
      cacheHits: 0,
      queueOperations: 0,
      elapsedSteps: 1,
    },
  },
  {
    index: 1,
    type: "compare",
    description: "Compare",
    highlightedLines: [],
    variables: {},
    visualState: { kind: "array", elements: [], pointers: {} },
    metrics: {
      comparisons: 1,
      swaps: 0,
      visits: 0,
      cacheHits: 0,
      queueOperations: 0,
      elapsedSteps: 2,
    },
  },
  {
    index: 2,
    type: "complete",
    description: "Done",
    highlightedLines: [],
    variables: {},
    visualState: { kind: "array", elements: [], pointers: {} },
    metrics: {
      comparisons: 1,
      swaps: 0,
      visits: 0,
      cacheHits: 0,
      queueOperations: 0,
      elapsedSteps: 3,
    },
  },
];

const MOCK_DEFINITION: AlgorithmDefinition = {
  meta: {
    id: "test-algo",
    name: "Test Algorithm",
    category: "sorting",
    description: "A test algorithm",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n^2)" },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [3, 1, 2],
  },
  execute: () => [1, 2, 3],
  generateSteps: () => MOCK_STEPS,
  educational: {
    overview: "Test",
    howItWorks: "Test",
    timeAndSpaceComplexity: "Test",
    bestAndWorstCase: "Test",
    realWorldUses: ["Test"],
    strengthsAndLimitations: { strengths: ["Fast"], limitations: ["Slow"] },
    whenToUseIt: "Test",
  },
  sources: { typescript: "// ts", python: "# py", java: "// java" },
};

describe("AppStore", () => {
  beforeEach(() => {
    registry.clear();
    useAppStore.setState({
      selectedId: null,
      definition: null,
      input: null,
      steps: [],
      totalSteps: 0,
      currentStepIndex: 0,
      isPlaying: false,
      speed: 1,
      activeLanguage: "typescript",
      isEditing: false,
      editedCode: null,
      isMobileDrawerOpen: false,
      educationalDrawerOpen: false,
      activePanel: "visualization",
    });
  });

  describe("AlgorithmSlice", () => {
    it("selects an algorithm and computes steps", () => {
      registry.register(MOCK_DEFINITION);
      useAppStore.getState().selectAlgorithm("test-algo");

      const state = useAppStore.getState();
      expect(state.selectedId).toBe("test-algo");
      expect(state.definition).toBe(MOCK_DEFINITION);
      expect(state.steps).toHaveLength(3);
      expect(state.totalSteps).toBe(3);
    });

    it("does nothing when selecting a nonexistent algorithm", () => {
      useAppStore.getState().selectAlgorithm("nonexistent");
      expect(useAppStore.getState().selectedId).toBeNull();
    });
  });

  describe("PlaybackSlice", () => {
    it("plays and pauses", () => {
      useAppStore.getState().play();
      expect(useAppStore.getState().isPlaying).toBe(true);

      useAppStore.getState().pause();
      expect(useAppStore.getState().isPlaying).toBe(false);
    });

    it("toggles playback", () => {
      useAppStore.getState().togglePlayback();
      expect(useAppStore.getState().isPlaying).toBe(true);

      useAppStore.getState().togglePlayback();
      expect(useAppStore.getState().isPlaying).toBe(false);
    });

    it("steps forward within bounds", () => {
      useAppStore.getState().stepForward(3);
      expect(useAppStore.getState().currentStepIndex).toBe(1);

      useAppStore.getState().stepForward(3);
      expect(useAppStore.getState().currentStepIndex).toBe(2);
    });

    it("stops playing when reaching the end", () => {
      useAppStore.setState({ currentStepIndex: 2, isPlaying: true });
      useAppStore.getState().stepForward(3);

      expect(useAppStore.getState().isPlaying).toBe(false);
      expect(useAppStore.getState().currentStepIndex).toBe(2);
    });

    it("steps backward within bounds", () => {
      useAppStore.setState({ currentStepIndex: 2 });
      useAppStore.getState().stepBackward();
      expect(useAppStore.getState().currentStepIndex).toBe(1);
    });

    it("does not step backward below 0", () => {
      useAppStore.getState().stepBackward();
      expect(useAppStore.getState().currentStepIndex).toBe(0);
    });

    it("seeks to a specific step", () => {
      useAppStore.getState().seekTo(2);
      expect(useAppStore.getState().currentStepIndex).toBe(2);
    });

    it("resets playback state", () => {
      useAppStore.setState({ currentStepIndex: 2, isPlaying: true });
      useAppStore.getState().reset();

      expect(useAppStore.getState().currentStepIndex).toBe(0);
      expect(useAppStore.getState().isPlaying).toBe(false);
    });

    it("sets playback speed", () => {
      useAppStore.getState().setSpeed(4);
      expect(useAppStore.getState().speed).toBe(4);
    });
  });

  describe("EditorSlice", () => {
    it("changes active language and cancels editing", () => {
      useAppStore.setState({ isEditing: true, editedCode: "some code" });
      useAppStore.getState().setLanguage("python");

      const state = useAppStore.getState();
      expect(state.activeLanguage).toBe("python");
      expect(state.isEditing).toBe(false);
      expect(state.editedCode).toBeNull();
    });

    it("starts and cancels editing", () => {
      useAppStore.getState().startEditing("original code");
      expect(useAppStore.getState().isEditing).toBe(true);
      expect(useAppStore.getState().editedCode).toBe("original code");

      useAppStore.getState().cancelEditing();
      expect(useAppStore.getState().isEditing).toBe(false);
      expect(useAppStore.getState().editedCode).toBeNull();
    });

    it("updates edited code", () => {
      useAppStore.getState().startEditing("original");
      useAppStore.getState().updateEditedCode("modified");
      expect(useAppStore.getState().editedCode).toBe("modified");
    });
  });

  describe("UISlice", () => {
    it("toggles mobile drawer", () => {
      useAppStore.getState().toggleMobileDrawer();
      expect(useAppStore.getState().isMobileDrawerOpen).toBe(true);

      useAppStore.getState().toggleMobileDrawer();
      expect(useAppStore.getState().isMobileDrawerOpen).toBe(false);
    });

    it("closes mobile drawer", () => {
      useAppStore.setState({ isMobileDrawerOpen: true });
      useAppStore.getState().closeMobileDrawer();
      expect(useAppStore.getState().isMobileDrawerOpen).toBe(false);
    });

    it("toggles educational drawer", () => {
      useAppStore.getState().toggleEducationalDrawer();
      expect(useAppStore.getState().educationalDrawerOpen).toBe(true);
    });

    it("sets active panel", () => {
      useAppStore.getState().setActivePanel("code");
      expect(useAppStore.getState().activePanel).toBe("code");
    });
  });
});
