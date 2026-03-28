/**
 * @file AppShell.tsx
 * @module components/layout/AppShell
 *
 * Top-level application shell and responsive layout orchestrator.
 * Wires together the three main content panels (code, visualization, explanation), the playback controls, and the educational drawer.
 * Delegates explicitly to PanelLayout (desktop/tablet 3-panel resizable) or MobileLayout (single-panel tab switcher) based on live viewport bounds.
 * Initializes cross-cutting architectural concerns: the playback engine tick loop, global keyboard shortcuts, and auto-mounting logic.
 */
import { useEffect } from "react";

import { usePlaybackEngine } from "@/hooks/usePlaybackEngine";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useAppStore } from "@/store";
import { registry } from "@/registry";
import CodePanel from "@/components/code-panel/CodePanel";
import VisualizationPanel from "@/components/visualization/VisualizationPanel";
import ExplanationPanel from "@/components/explanation-panel/ExplanationPanel";
import PlaybackControls from "@/components/playback/PlaybackControls";
import EducationalDrawer from "@/components/educational/EducationalDrawer";

import Header from "./Header";
import DesktopLayout from "./DesktopLayout";
import TabletLayout from "./TabletLayout";
import MobileLayout from "./MobileLayout";

/**
 * Root layout component -- Mounts global React hooks, evaluates layout modality constraints, and auto-selects the first registered algorithm.
 * @returns The core application HTML footprint spanning `100dvh`.
 */
export default function AppShell() {
  // Boot Sequence 1: Attach logic engines that require absolute DOM / Window mapping without bounds.
  usePlaybackEngine();
  useKeyboardShortcuts();

  const layoutTier = useResponsiveLayout();

  const selectAlgorithm = useAppStore((state) => state.selectAlgorithm);
  const selectedId = useAppStore((state) => state.selectedId);

  /* Auto-select first algorithm inherently discovered on initial mount to prevent blank screens */
  useEffect(() => {
    if (!selectedId) {
      const allAlgorithms = registry.getAll();
      if (allAlgorithms[0]) {
        selectAlgorithm(allAlgorithms[0].meta.id);
      }
    }
  }, [selectedId, selectAlgorithm]);

  // Viewport Height constraint (h-dvh) enforces that scrolling happens *strictly* inside the dynamic panels, never the DOM Body.
  return (
    <div className="flex h-dvh flex-col bg-[var(--color-surface-primary)]">
      <Header />

      {layoutTier === "mobile" ? (
        <MobileLayout
          codePanel={<CodePanel />}
          visualizationPanel={<VisualizationPanel />}
          explanationPanel={<ExplanationPanel />}
        />
      ) : layoutTier === "tablet" ? (
        <TabletLayout
          codePanel={<CodePanel />}
          visualizationPanel={<VisualizationPanel />}
          explanationPanel={<ExplanationPanel />}
        />
      ) : (
        <DesktopLayout
          codePanel={<CodePanel />}
          visualizationPanel={<VisualizationPanel />}
          explanationPanel={<ExplanationPanel />}
        />
      )}

      {/* Persistent UI attachments independent of layout scaling */}
      <PlaybackControls />
      <EducationalDrawer />
    </div>
  );
}
