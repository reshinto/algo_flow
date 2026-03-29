/**
 * Top-level application header bar.
 * Controls algorithm selection, theme toggle, and educational drawer access.
 */
import { useState, useMemo } from "react";
import { FiBookOpen, FiChevronDown, FiSun, FiMoon, FiMonitor } from "react-icons/fi";

import { registry } from "@/registry";
import { useAppStore } from "@/store";
import { CATEGORY_LABELS, TECHNIQUE_LABELS, CATEGORY_ACCENT_MAP } from "@/utils/constants";
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
    return registry.getAll().map((definition) => {
      const categoryLabel = CATEGORY_LABELS[definition.meta.category] ?? definition.meta.category;
      const techniqueLabel = definition.meta.technique
        ? TECHNIQUE_LABELS[definition.meta.technique]
        : undefined;
      return {
        value: definition.meta.id,
        label: definition.meta.name,
        group: techniqueLabel ? `${categoryLabel} › ${techniqueLabel}` : categoryLabel,
      };
    });
  }, []);

  const currentAlgorithmName =
    algorithmOptions.find((option) => option.value === selectedId)?.label ?? "Select algorithm...";

  const currentGroup = algorithmOptions.find((option) => option.value === selectedId)?.group;

  const currentDefinition = selectedId ? registry.get(selectedId) : undefined;
  const accentVar = currentDefinition
    ? (CATEGORY_ACCENT_MAP[currentDefinition.meta.category] ?? "--color-text-muted")
    : "--color-text-muted";

  const ThemeIcon = theme === "light" ? FiSun : theme === "system" ? FiMonitor : FiMoon;
  const themeLabel =
    theme === "dark"
      ? "Switch to light theme"
      : theme === "light"
        ? "Switch to system theme"
        : "Switch to dark theme";

  return (
    <>
      <header className="flex shrink-0 items-center gap-3 border-b border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] px-4 py-2">
        <h1 className="hidden shrink-0 text-lg font-semibold text-[var(--color-text-primary)] sm:block">
          AlgoFlow
        </h1>

        <div className="min-w-0 flex-1">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex w-full max-w-sm items-center justify-between rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-3 py-2 transition-all hover:border-[var(--color-accent-cyan)]/50 hover:bg-[var(--color-surface-tertiary)] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)]"
            aria-label="Search algorithms"
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              {selectedId && (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: `var(${accentVar})` }}
                  aria-hidden="true"
                />
              )}
              <div className="min-w-0 flex-1">
                {selectedId && currentGroup && (
                  <p
                    className="mb-0.5 truncate text-xs font-normal leading-tight text-[var(--color-text-secondary)]"
                    aria-hidden="true"
                  >
                    {currentGroup}
                  </p>
                )}
                <p className="truncate text-sm font-semibold leading-tight text-[var(--color-text-primary)]">
                  {currentAlgorithmName}
                </p>
              </div>
            </div>
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
