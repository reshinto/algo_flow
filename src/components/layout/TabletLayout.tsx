/**
 * Tablet 2-panel layout (768-1023px): visualization + explanation/code with tab switcher.
 */
import { useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import type { ReactNode } from "react";

interface TabletLayoutProps {
  codePanel: ReactNode;
  visualizationPanel: ReactNode;
  explanationPanel: ReactNode;
}

type RightPanelTab = "steps" | "code";

const RIGHT_PANEL_TABS: { key: RightPanelTab; label: string }[] = [
  { key: "steps", label: "Steps" },
  { key: "code", label: "Code" },
];

function ResizeHandle() {
  return (
    <Separator className="group flex w-1 items-center justify-center bg-[var(--color-surface-primary)] transition-colors hover:bg-[var(--color-accent-cyan)]/20">
      <div className="h-8 w-0.5 rounded-full bg-[var(--color-border-default)] transition-colors group-hover:bg-[var(--color-accent-cyan)]" />
    </Separator>
  );
}

export default function TabletLayout({
  codePanel,
  visualizationPanel,
  explanationPanel,
}: TabletLayoutProps) {
  const [activeTab, setActiveTab] = useState<RightPanelTab>("steps");

  return (
    <Group orientation="horizontal" className="flex-1">
      <Panel defaultSize={60} minSize={40}>
        <div className="flex h-full flex-col overflow-hidden bg-[var(--color-surface-secondary)]">
          {visualizationPanel}
        </div>
      </Panel>

      <ResizeHandle />

      <Panel defaultSize={40} minSize={25}>
        <div className="flex h-full flex-col overflow-hidden bg-[var(--color-surface-secondary)]">
          <div
            role="tablist"
            className="flex shrink-0 border-b border-[var(--color-border-default)]"
          >
            {RIGHT_PANEL_TABS.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                id={`tablet-tab-${tab.key}`}
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                  activeTab === tab.key
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
            aria-labelledby={`tablet-tab-${activeTab}`}
            className="flex-1 overflow-hidden"
          >
            {activeTab === "steps" && explanationPanel}
            {activeTab === "code" && codePanel}
          </div>
        </div>
      </Panel>
    </Group>
  );
}
