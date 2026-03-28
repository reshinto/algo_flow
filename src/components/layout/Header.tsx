/**
 * Top-level application header bar.
 * Controls algorithm selection, theme toggle, and educational drawer access.
 */
import { useState, useMemo } from "react";
import { FiBookOpen, FiChevronDown, FiSun, FiMoon, FiMonitor } from "react-icons/fi";

import { registry } from "@/registry";
import { useAppStore } from "@/store";
import { CATEGORY_LABELS } from "@/utils/constants";
import { IconButton } from "@/components/shared";

import AlgorithmSelectorModal from "./AlgorithmSelectorModal";

export default function Header() {
  const selectedId = useAppStore((state) => state.selectedId);
  const selectAlgorithm = useAppStore((state) => state.selectAlgorithm);
  const reset = useAppStore((state) => state.reset);
  const toggleEducationalDrawer = useAppStore((state) => state.toggleEducationalDrawer);
  const educationalDrawerOpen = useAppStore((state) => state.educationalDrawerOpen);
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const algorithmOptions = useMemo(() => {
    return registry.getAll().map((definition) => ({
      value: definition.meta.id,
      label: definition.meta.name,
      group: CATEGORY_LABELS[definition.meta.category] ?? definition.meta.category,
    }));
  }, []);

  const currentAlgorithmName =
    algorithmOptions.find((option) => option.value === selectedId)?.label ?? "Select algorithm...";

  const ThemeIcon = theme === "light" ? FiSun : theme === "system" ? FiMonitor : FiMoon;
  const themeLabel =
    theme === "dark"
      ? "Switch to light theme"
      : theme === "light"
        ? "Switch to system theme"
        : "Switch to dark theme";

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] px-4 md:h-12">
        <h1 className="hidden shrink-0 text-lg font-semibold text-[var(--color-text-primary)] sm:block">
          AlgoFlow
        </h1>

        <div className="min-w-0 flex-1">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex h-11 w-full max-w-sm items-center justify-between rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-4 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent-cyan)]/50 hover:bg-[var(--color-surface-tertiary)] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)] md:h-9"
            aria-label="Search algorithms"
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
          >
            <span className="truncate">{currentAlgorithmName}</span>
            <FiChevronDown className="shrink-0 text-[var(--color-text-muted)]" size={16} />
          </button>
        </div>

        <IconButton
          label={themeLabel}
          onClick={toggleTheme}
          size="lg"
          className="shrink-0 md:h-9 md:w-9"
          title={themeLabel}
        >
          <ThemeIcon size={18} />
        </IconButton>

        <IconButton
          label="Toggle learning content"
          onClick={toggleEducationalDrawer}
          size="lg"
          className={`shrink-0 md:h-9 md:w-9 ${educationalDrawerOpen ? "bg-[var(--color-accent-cyan)]/15 ring-1 ring-[var(--color-accent-cyan)]/40" : ""}`}
          title="Toggle learning content"
        >
          <FiBookOpen size={18} />
        </IconButton>
      </header>

      <AlgorithmSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        options={algorithmOptions}
        selectedId={selectedId}
        onSelect={(algorithmId) => {
          selectAlgorithm(algorithmId);
          reset();
        }}
      />
    </>
  );
}
