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
import PanelLayout from "./PanelLayout";
import MobileLayout from "./MobileLayout";

export default function AppShell() {
  usePlaybackEngine();
  useKeyboardShortcuts();
  const isMobile = useResponsiveLayout();

  const selectAlgorithm = useAppStore((state) => state.selectAlgorithm);
  const selectedId = useAppStore((state) => state.selectedId);

  /* Auto-select first algorithm on mount */
  useEffect(() => {
    if (!selectedId) {
      const allAlgorithms = registry.getAll();
      if (allAlgorithms[0]) {
        selectAlgorithm(allAlgorithms[0].meta.id);
      }
    }
  }, [selectedId, selectAlgorithm]);

  return (
    <div className="flex h-dvh flex-col bg-[var(--color-surface-primary)]">
      <Header />
      {isMobile ? (
        <MobileLayout
          codePanel={<CodePanel />}
          visualizationPanel={<VisualizationPanel />}
          explanationPanel={<ExplanationPanel />}
        />
      ) : (
        <PanelLayout
          codePanel={<CodePanel />}
          visualizationPanel={<VisualizationPanel />}
          explanationPanel={<ExplanationPanel />}
        />
      )}
      <PlaybackControls />
      <EducationalDrawer />
    </div>
  );
}
