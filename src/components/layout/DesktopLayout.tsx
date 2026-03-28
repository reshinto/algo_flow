/**
 * Desktop 3-panel resizable layout (code | visualization | explanation) for viewports >= 1024px.
 */
import { Group, Panel, Separator } from "react-resizable-panels";
import type { ReactNode } from "react";

interface DesktopLayoutProps {
  /** The explicit React element rendering the exact Monaco Code layout directly inherently */
  codePanel: ReactNode;
  /** The isolated execution Canvas projecting algorithms precisely onto DOM limits natively */
  visualizationPanel: ReactNode;
  /** The generic React Object loading absolute markdown string structures physically securely */
  explanationPanel: ReactNode;
}

/**
 * Thin draggable divider between resizable panels mapping natively to pointer interactions structurally manipulating flex ratios absolutely implicitly.
 */
function ResizeHandle() {
  return (
    <Separator className="group flex w-1 items-center justify-center bg-[var(--color-surface-primary)] transition-colors hover:bg-[var(--color-accent-cyan)]/20">
      {/* Inner visual pill making the draggable area distinctively noticeable explicitly for interactions naturally */}
      <div className="h-8 w-0.5 rounded-full bg-[var(--color-border-default)] transition-colors group-hover:bg-[var(--color-accent-cyan)]" />
    </Separator>
  );
}

/**
 * Three-column resizable layout for desktop viewports explicitly configured exclusively for breakpoints >=1024px.
 * Mounts standard flex components side-by-side structurally distributing available Real-Estate implicitly.
 */
export default function DesktopLayout({
  codePanel,
  visualizationPanel,
  explanationPanel,
}: DesktopLayoutProps) {
  return (
    <Group orientation="horizontal" className="flex-1">
      {/* 
        Code Panel Constraint: 
        Defaults to roughly a third of the screen securely, preventing absolute squishing past minimum pixel density mapping explicitly 
      */}
      <Panel defaultSize={30} minSize={20}>
        <div className="flex h-full flex-col overflow-hidden bg-[var(--color-surface-secondary)]">
          {codePanel}
        </div>
      </Panel>

      <ResizeHandle />

      {/* 
        Canvas Panel Constraint: 
        The highest priority layout section, natively monopolizing around 45% default density definitively mapping execution frames securely.
      */}
      <Panel defaultSize={45} minSize={25}>
        <div className="flex h-full flex-col overflow-hidden bg-[var(--color-surface-secondary)]">
          {visualizationPanel}
        </div>
      </Panel>

      <ResizeHandle />

      {/* 
        Explanation Panel Constraint: 
        The trailing section encapsulating the Markdown strings, defaults explicitly slightly smaller securely isolating content bounds dynamically inherently 
      */}
      <Panel defaultSize={25} minSize={15}>
        <div className="flex h-full flex-col overflow-hidden bg-[var(--color-surface-secondary)]">
          {explanationPanel}
        </div>
      </Panel>
    </Group>
  );
}
