/**
 * Command palette for algorithm selection with search filtering,
 * category pill filters, and two-level group hierarchy.
 * Includes focus trap, ARIA labelling, and reduced-motion support.
 */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { IconButton } from "@/components/shared";
import { CATEGORY_LABELS, CATEGORY_ACCENT_MAP } from "@/utils/constants";

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

interface TechniqueGroup {
  technique: string;
  options: Option[];
}

interface CategoryGroup {
  category: string;
  categoryId: string;
  techniques: TechniqueGroup[];
}

interface CategoryPillProps {
  label: string;
  isActive: boolean;
  accentVar: string;
  onClick: () => void;
}

function CategoryPill({ label, isActive, accentVar, onClick }: CategoryPillProps) {
  return (
    <button
      aria-pressed={isActive}
      onClick={onClick}
      className="shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)]"
      style={
        isActive
          ? {
              borderColor: `var(${accentVar})`,
              backgroundColor: `color-mix(in srgb, var(${accentVar}) 20%, transparent)`,
              color: `var(${accentVar})`,
            }
          : {
              borderColor: `color-mix(in srgb, var(--color-text-muted) 60%, transparent)`,
              color: `var(--color-text-secondary)`,
            }
      }
    >
      {label}
    </button>
  );
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Derive the category id from a group string like "Dynamic Programming › 1D Linear" */
function categoryIdFromLabel(categoryLabel: string): string {
  for (const [categoryId, label] of Object.entries(CATEGORY_LABELS)) {
    if (label === categoryLabel) return categoryId;
  }
  // Fallback: slugify the label
  return categoryLabel.toLowerCase().replaceAll(" ", "-");
}

export default function AlgorithmSelectorModal({
  isOpen,
  onClose,
  options,
  onSelect,
  selectedId,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const shouldReduceMotion = useReducedMotion();

  /**
   * Wrap onClose so that category and search are reset before closing.
   * This avoids calling setState synchronously inside a useEffect body
   * (which triggers cascading renders).
   */
  const handleClose = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery("");
    onClose();
  }, [onClose]);

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
        handleClose();
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
    [handleClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  /** All unique category ids derived from the options list */
  const availableCategories = useMemo(() => {
    const categoryIds = new Set<string>();
    for (const option of options) {
      const parts = option.group.split(" › ");
      const rawCategory = parts[0] ?? option.group;
      categoryIds.add(categoryIdFromLabel(rawCategory));
    }
    return Array.from(categoryIds);
  }, [options]);

  const groupedOptions = useMemo((): CategoryGroup[] => {
    const query = searchQuery.toLowerCase();

    const filtered = options.filter((option) => {
      const matchesSearch =
        option.label.toLowerCase().includes(query) || option.group.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      if (selectedCategory !== null) {
        const parts = option.group.split(" › ");
        const rawCategory = parts[0] ?? option.group;
        return categoryIdFromLabel(rawCategory) === selectedCategory;
      }

      return true;
    });

    const categoryMap = new Map<string, Map<string, Option[]>>();

    for (const option of filtered) {
      const parts = option.group.split(" › ");
      const rawCategory = parts[0] ?? option.group;
      const technique = parts[1] ?? "";
      const categoryId = categoryIdFromLabel(rawCategory);

      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, new Map());
      }

      const techniqueMap = categoryMap.get(categoryId)!;
      const techniqueOptions = techniqueMap.get(technique) ?? [];
      techniqueOptions.push(option);
      techniqueMap.set(technique, techniqueOptions);
    }

    const result: CategoryGroup[] = [];
    for (const [categoryId, techniqueMap] of categoryMap.entries()) {
      const techniques: TechniqueGroup[] = [];
      for (const [technique, techniqueOptions] of techniqueMap.entries()) {
        techniques.push({ technique, options: techniqueOptions });
      }
      result.push({ category: CATEGORY_LABELS[categoryId] ?? categoryId, categoryId, techniques });
    }
    return result;
  }, [options, searchQuery, selectedCategory]);

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, damping: 25, stiffness: 300 };

  const fadeTransition = shouldReduceMotion ? { duration: 0 } : undefined;

  const selectedCategoryLabel =
    selectedCategory !== null ? (CATEGORY_LABELS[selectedCategory] ?? selectedCategory) : null;

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
            onClick={handleClose}
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
            {/* Search input */}
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
                onClick={handleClose}
                className="shrink-0"
                title="Close"
              >
                <FiX size={20} />
              </IconButton>
            </div>

            {/* Category pill filters — onWheel converts vertical scroll to horizontal for mouse users */}
            <div
              className="flex shrink-0 gap-2 overflow-x-auto px-4 py-3 scrollbar-none border-b border-[var(--color-border-subtle)]"
              role="group"
              aria-label="Filter by category"
              onWheel={(wheelEvent) => {
                if (wheelEvent.deltaY !== 0) {
                  wheelEvent.currentTarget.scrollLeft += wheelEvent.deltaY;
                  wheelEvent.preventDefault();
                }
              }}
            >
              <CategoryPill
                label="All"
                isActive={selectedCategory === null}
                accentVar="--color-accent-cyan"
                onClick={() => setSelectedCategory(null)}
              />

              {availableCategories.map((categoryId) => (
                <CategoryPill
                  key={categoryId}
                  label={CATEGORY_LABELS[categoryId] ?? categoryId}
                  isActive={selectedCategory === categoryId}
                  accentVar={CATEGORY_ACCENT_MAP[categoryId] ?? "--color-accent-cyan"}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
                  }
                />
              ))}
            </div>

            {/* Algorithm list */}
            <div className="flex-1 overflow-y-auto p-2">
              {groupedOptions.length === 0 ? (
                <div className="py-12 text-center text-[var(--color-text-muted)]">
                  {selectedCategoryLabel !== null && searchQuery.length > 0
                    ? `No algorithms found in "${selectedCategoryLabel}" for "${searchQuery}"`
                    : `No algorithms found for "${searchQuery}"`}
                </div>
              ) : (
                groupedOptions.map((categoryGroup) => {
                  const accentVar =
                    CATEGORY_ACCENT_MAP[categoryGroup.categoryId] ?? "--color-accent-cyan";

                  return (
                    <div key={categoryGroup.categoryId} className="mb-4">
                      {/* Category header */}
                      <div
                        className="flex items-center gap-2 px-3 pt-3 pb-1 border-l-2"
                        style={{ borderColor: `var(${accentVar})` }}
                        aria-hidden="true"
                      >
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-primary)]">
                          {categoryGroup.category}
                        </span>
                      </div>

                      {categoryGroup.techniques.map((techniqueGroup) => {
                        const showTechniqueHeader =
                          techniqueGroup.technique.length > 0 &&
                          techniqueGroup.technique !== categoryGroup.category;

                        return (
                          <div key={techniqueGroup.technique || categoryGroup.categoryId}>
                            {/* Technique sub-header */}
                            {showTechniqueHeader && (
                              <div className="mt-2 pl-5 pr-3 pb-1" aria-hidden="true">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                                  {techniqueGroup.technique}
                                </span>
                              </div>
                            )}

                            {/* Algorithm buttons */}
                            <div className="flex flex-col gap-1">
                              {techniqueGroup.options.map((option) => (
                                <button
                                  key={option.value}
                                  ref={selectedId === option.value ? selectedRef : undefined}
                                  onClick={() => {
                                    onSelect(option.value);
                                    handleClose();
                                  }}
                                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 pl-6 text-left transition-colors ${
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
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
