import { useState, useMemo } from "react";
import { FiBookOpen, FiChevronDown } from "react-icons/fi";

import { registry } from "@/registry";
import { useAppStore } from "@/store";
import { CATEGORY_LABELS } from "@/utils/constants";
import { IconButton } from "@/components/shared";

import AlgorithmSelectorModal from "./AlgorithmSelectorModal";

/** Sticky header bar with algorithm selection and educational drawer toggle. */
export default function Header() {
  const selectedId = useAppStore((state) => state.selectedId);
  const selectAlgorithm = useAppStore((state) => state.selectAlgorithm);
  const reset = useAppStore((state) => state.reset);
  const toggleEducationalDrawer = useAppStore((state) => state.toggleEducationalDrawer);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        {/* Hide title on mobile to maximize room for the custom selector */}
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

      <AlgorithmSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        options={algorithmOptions}
        selectedId={selectedId}
        onSelect={(id) => {
          selectAlgorithm(id);
          reset();
        }}
      />
    </>
  );
}
