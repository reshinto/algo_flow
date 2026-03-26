/**
 * Desktop 3-panel resizable layout (code | visualization | explanation).
 * Uses react-resizable-panels for user-adjustable column widths.
 */
import { Group, Panel, Separator } from "react-resizable-panels";
import type { ReactNode } from "react";

interface PanelLayoutProps {
  codePanel: ReactNode;
  visualizationPanel: ReactNode;
  explanationPanel: ReactNode;
}

/** Thin draggable divider between resizable panels. */
function ResizeHandle() {
  return (
    <Separator className="group flex w-1 items-center justify-center bg-[var(--color-surface-primary)] transition-colors hover:bg-[var(--color-accent-cyan)]/20">
      <div className="h-8 w-0.5 rounded-full bg-[var(--color-border-default)] transition-colors group-hover:bg-[var(--color-accent-cyan)]" />
    </Separator>
  );
}

/** Three-column resizable layout for desktop viewports (>=1024px). */
export default function PanelLayout({
  codePanel,
  visualizationPanel,
  explanationPanel,
}: PanelLayoutProps) {
  return (
    <Group orientation="horizontal" className="flex-1">
      <Panel defaultSize={30} minSize={20}>
        <div className="flex h-full flex-col overflow-hidden bg-[var(--color-surface-secondary)]">
          {codePanel}
        </div>
      </Panel>

      <ResizeHandle />

      <Panel defaultSize={45} minSize={25}>
        <div className="flex h-full flex-col overflow-hidden bg-[var(--color-surface-secondary)]">
          {visualizationPanel}
        </div>
      </Panel>

      <ResizeHandle />

      <Panel defaultSize={25} minSize={15}>
        <div className="flex h-full flex-col overflow-hidden bg-[var(--color-surface-secondary)]">
          {explanationPanel}
        </div>
      </Panel>
    </Group>
  );
}
