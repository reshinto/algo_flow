/**
 * Single-panel mobile layout (<768px) with tab switcher and proper ARIA roles.
 */
import type { ReactNode } from "react";
import { useAppStore } from "@/store";

interface MobileLayoutProps {
  codePanel: ReactNode;
  visualizationPanel: ReactNode;
  explanationPanel: ReactNode;
}

const TABS = [
  { key: "visualization" as const, label: "Visualize" },
  { key: "code" as const, label: "Code" },
  { key: "explanation" as const, label: "Steps" },
] as const;

export default function MobileLayout({
  codePanel,
  visualizationPanel,
  explanationPanel,
}: MobileLayoutProps) {
  const activePanel = useAppStore((state) => state.activePanel);
  const setActivePanel = useAppStore((state) => state.setActivePanel);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div
        role="tablist"
        aria-label="Panel tabs"
        className="flex shrink-0 border-b border-[var(--color-border-default)] bg-[var(--color-surface-secondary)]"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            id={`tab-${tab.key}`}
            role="tab"
            aria-selected={activePanel === tab.key}
            onClick={() => setActivePanel(tab.key)}
            className={`flex-1 px-3 py-3 text-sm font-medium transition-colors ${
              activePanel === tab.key
                ? "border-b-2 border-[var(--color-accent-cyan)] text-[var(--color-text-primary)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        aria-labelledby={`tab-${activePanel}`}
        className="flex-1 overflow-hidden bg-[var(--color-surface-secondary)]"
      >
        {activePanel === "code" && codePanel}
        {activePanel === "visualization" && visualizationPanel}
        {activePanel === "explanation" && explanationPanel}
      </div>
    </div>
  );
}
