/**
 * Top-level application header containing the algorithm selector dropdown
 * and the toggle for the educational content drawer.
 */
import { useCallback, useMemo } from "react";
import { FiBookOpen } from "react-icons/fi";

import { registry } from "@/registry";
import { useAppStore } from "@/store";
import { CATEGORY_LABELS } from "@/utils/constants";
import { IconButton, Select } from "@/components/shared";

/** Sticky header bar with algorithm selection and educational drawer toggle. */
export default function Header() {
  const selectedId = useAppStore((state) => state.selectedId);
  const selectAlgorithm = useAppStore((state) => state.selectAlgorithm);
  const reset = useAppStore((state) => state.reset);
  const toggleEducationalDrawer = useAppStore((state) => state.toggleEducationalDrawer);

  const algorithmOptions = useMemo(() => {
    return registry.getAll().map((definition) => ({
      value: definition.meta.id,
      label: definition.meta.name,
      group: CATEGORY_LABELS[definition.meta.category] ?? definition.meta.category,
    }));
  }, []);

  // Reset playback state whenever the user switches algorithms
  const handleAlgorithmChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      selectAlgorithm(event.target.value);
      reset();
    },
    [selectAlgorithm, reset],
  );

  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] px-4">
      <h1 className="mr-2 text-lg font-semibold text-[var(--color-text-primary)]">AlgoFlow</h1>

      <Select
        label="Select algorithm"
        options={algorithmOptions}
        value={selectedId ?? ""}
        onChange={handleAlgorithmChange}
      />

      <div className="flex-1" />

      <IconButton label="Toggle learning content" onClick={toggleEducationalDrawer}>
        <FiBookOpen size={18} />
      </IconButton>
    </header>
  );
}
