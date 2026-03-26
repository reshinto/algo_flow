/**
 * @file Header.tsx
 * @module components/layout/Header
 *
 * Top-level application persistent visual bar.
 * Controls the Command Palette initialization flow and the underlying Education Drawer accessibility toggle.
 */
import { useState, useMemo } from "react";
import { FiBookOpen, FiChevronDown } from "react-icons/fi";

import { registry } from "@/registry";
import { useAppStore } from "@/store";
import { CATEGORY_LABELS } from "@/utils/constants";
import { IconButton } from "@/components/shared";

import AlgorithmSelectorModal from "./AlgorithmSelectorModal";

/**
 * Sticky header bar displaying the literal application branding, active algorithm, and documentation hooks.
 */
export default function Header() {
  // Bind directly to global store variables to ensure the text label precisely matches the backend graph logic
  const selectedId = useAppStore((state) => state.selectedId);
  const selectAlgorithm = useAppStore((state) => state.selectAlgorithm);
  const reset = useAppStore((state) => state.reset);
  const toggleEducationalDrawer = useAppStore((state) => state.toggleEducationalDrawer);

  // Local React state solely gating whether the massive Framer Motion structural overlay renders on screen
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Aggressively cache the registry output to avoid continuously tearing down Memory matrices while rendering
  const algorithmOptions = useMemo(() => {
    return registry.getAll().map((definition) => ({
      value: definition.meta.id,
      label: definition.meta.name,
      group: CATEGORY_LABELS[definition.meta.category] ?? definition.meta.category,
    }));
  }, []);

  const currentAlgorithmName =
    algorithmOptions.find((o) => o.value === selectedId)?.label ?? "Select algorithm...";

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] px-4 md:h-12">
        {/* Hide literal text title entirely on mobile devices to strictly maximize tapping real-estate for the custom selector logic */}
        <h1 className="hidden shrink-0 text-lg font-semibold text-[var(--color-text-primary)] sm:block">
          AlgoFlow
        </h1>

        <div className="min-w-0 flex-1">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex h-11 w-full max-w-sm items-center justify-between rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-4 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent-cyan)]/50 hover:bg-[var(--color-surface-tertiary)] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)] md:h-9"
            aria-label="Search algorithms"
          >
            <span className="truncate">{currentAlgorithmName}</span>
            <FiChevronDown className="shrink-0 text-[var(--color-text-muted)]" size={16} />
          </button>
        </div>

        <IconButton
          label="Toggle learning content"
          onClick={toggleEducationalDrawer}
          size="lg"
          className="shrink-0 md:h-9 md:w-9"
        >
          <FiBookOpen size={18} />
        </IconButton>
      </header>

      {/* Floating Framer Motion overlay completely disjointed from standard flow semantics */}
      <AlgorithmSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        options={algorithmOptions}
        selectedId={selectedId}
        onSelect={(id) => {
          selectAlgorithm(id);
          // Hard wipe the engine whenever an algorithm pivots to prevent legacy values corrupting visualization traces
          reset();
        }}
      />
    </>
  );
}
