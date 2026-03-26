import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { IconButton } from "@/components/shared";

interface Option {
  value: string;
  label: string;
  group: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  options: Option[];
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export default function AlgorithmSelectorModal({
  isOpen,
  onClose,
  options,
  onSelect,
  selectedId,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  // Lock body scroll to prevent interacting with the background while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Focus input on mount so users can instantly type to search
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setTimeout(() => document.getElementById("algo-search-input")?.focus(), 50);
    }
  }, [isOpen]);

  const groupedOptions = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const filtered = options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.group.toLowerCase().includes(q)
    );

    const groups = new Map<string, Option[]>();
    for (const option of filtered) {
      const group = groups.get(option.group) ?? [];
      group.push(option);
      groups.set(option.group, group);
    }
    return Array.from(groups.entries());
  }, [options, searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop with a premium blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] shadow-2xl"
          >
            {/* Search Header */}
            <div className="flex items-center gap-3 border-b border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4">
              <FiSearch className="shrink-0 text-[var(--color-text-muted)]" size={20} />
              <input
                id="algo-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search algorithms..."
                className="flex-1 bg-transparent text-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none"
              />
              <IconButton label="Close command palette" onClick={onClose} className="shrink-0">
                <FiX size={20} />
              </IconButton>
            </div>

            {/* Scrolling List */}
            <div className="flex-1 overflow-y-auto p-2">
              {groupedOptions.length === 0 ? (
                <div className="py-12 text-center text-[var(--color-text-muted)]">
                  No algorithms found for "{searchQuery}"
                </div>
              ) : (
                groupedOptions.map(([groupName, groupOptions]) => (
                  <div key={groupName} className="mb-4">
                    <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-emerald)]">
                      {groupName}
                    </div>
                    <div className="flex flex-col gap-1">
                      {groupOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            onSelect(option.value);
                            onClose();
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors ${
                            selectedId === option.value
                              ? "bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)]"
                              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-tertiary)] hover:text-[var(--color-text-primary)]"
                          }`}
                        >
                          <span className="font-medium">{option.label}</span>
                          {selectedId === option.value && (
                            <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_8px_var(--color-accent-cyan)]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
