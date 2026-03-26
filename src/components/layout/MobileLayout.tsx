/**
 * @file MobileLayout.tsx
 * @module components/layout/MobileLayout
 *
 * Single-panel mobile layout (<768px environment) built with a granular Tab Switcher.
 * Only the explicitly selected active panel is physically mounted to the DOM simultaneously, aggressively keeping the viewport uncluttered and preventing horizontal overflow constraints natively.
 */
import type { ReactNode } from "react";
import { useAppStore } from "@/store";

/** Formal Component Property Binding guaranteeing specific primitive shapes are passed downwards into the DOM matrix explicitly. */
interface MobileLayoutProps {
  /** The generic React DOM element physically emitting exactly the Monaco Editor rendering */
  codePanel: ReactNode;
  /** The generic React DOM element rendering the complex SVG matrices indicating dataflow algorithm structures */
  visualizationPanel: ReactNode;
  /** The generic React DOM element dictating the markdown explanation mapping directly to Algorithm graphs */
  explanationPanel: ReactNode;
}

/**
 * Rigid primitive mapping strictly enforcing the three possible Tab iterations securely.
 * This array structure explicitly prevents arbitrary string typologies destroying the layout mapping loops inherently.
 */
const TABS = [
  { key: "visualization" as const, label: "Visualize" },
  { key: "code" as const, label: "Code" },
  { key: "explanation" as const, label: "Details" },
] as const;

/**
 * Tab-based Layout Component natively invoked by `AppShell` explicitly when Screen-Width breakpoints detect mobile environments heavily.
 * Intentionally truncates complex Grid mappings into singular focal points physically isolated safely.
 */
export default function MobileLayout({
  codePanel,
  visualizationPanel,
  explanationPanel,
}: MobileLayoutProps) {
  // Directly bind internal interaction logic natively querying the Zustand state to avoid Prop Drilling configurations extensively.
  const activePanel = useAppStore((state) => state.activePanel);
  const setActivePanel = useAppStore((state) => state.setActivePanel);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* 
        Sticky Interactive Tab Bar inherently mounting strictly on the absolute top of the mobile viewing canvas seamlessly 
      */}
      <div className="flex shrink-0 border-b border-[var(--color-border-default)] bg-[var(--color-surface-secondary)]">
        {TABS.map((tab) => (
          <button
            key={tab.key}
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

      {/* 
        Active Display Panel mapping natively ensuring garbage collection physically eliminates un-focused panels completely from the Node Graph instantly preserving RAM inherently 
      */}
      <div className="flex-1 overflow-hidden bg-[var(--color-surface-secondary)]">
        {activePanel === "code" && codePanel}
        {activePanel === "visualization" && visualizationPanel}
        {activePanel === "explanation" && explanationPanel}
      </div>
    </div>
  );
}
