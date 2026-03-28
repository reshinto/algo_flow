/**
 * Command palette for algorithm selection with search filtering.
 * Includes focus trap, ARIA labelling, and reduced-motion support.
 */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function AlgorithmSelectorModal({
  isOpen,
  onClose,
  options,
  onSelect,
  selectedId,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const selectedRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const shouldReduceMotion = useReducedMotion();

  /* Scroll lock and auto-scroll to selected item */
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        selectedRef.current?.scrollIntoView({ block: "center" });
      });
    } else {
      document.body.style.overflow = "unset";
      (triggerRef.current as HTMLElement | null)?.focus();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /* Focus trap: keep Tab cycling inside the modal */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0]!;
      const lastElement = focusableElements[focusableElements.length - 1]!;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const groupedOptions = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered = options.filter(
      (option) =>
        option.label.toLowerCase().includes(query) || option.group.toLowerCase().includes(query),
    );

    const groups = new Map<string, Option[]>();
    for (const option of filtered) {
      const group = groups.get(option.group) ?? [];
      group.push(option);
      groups.set(option.group, group);
    }
    return Array.from(groups.entries());
  }, [options, searchQuery]);

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, damping: 25, stiffness: 300 };

  const fadeTransition = shouldReduceMotion ? { duration: 0 } : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="algo-search-input"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fadeTransition}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            ref={modalRef}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95, y: -10 }}
            transition={springTransition}
            className="relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4">
              <FiSearch className="shrink-0 text-[var(--color-text-muted)]" size={20} />
              <input
                id="algo-search-input"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search algorithms..."
                autoFocus
                className="flex-1 bg-transparent text-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none"
              />
              <IconButton
                label="Close command palette"
                onClick={onClose}
                className="shrink-0"
                title="Close"
              >
                <FiX size={20} />
              </IconButton>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {groupedOptions.length === 0 ? (
                <div className="py-12 text-center text-[var(--color-text-muted)]">
                  No algorithms found for &quot;{searchQuery}&quot;
                </div>
              ) : (
                groupedOptions.map(([groupName, groupOptions]) => (
                  <div key={groupName} className="mb-4">
                    <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                      {groupName}
                    </div>
                    <div className="flex flex-col gap-1">
                      {groupOptions.map((option) => (
                        <button
                          key={option.value}
                          ref={selectedId === option.value ? selectedRef : undefined}
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
