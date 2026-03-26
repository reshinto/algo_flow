/**
 * Slide-in drawer that displays educational content (overview, complexity,
 * real-world uses, etc.) for the currently selected algorithm.
 * Animated with Framer Motion and dismissed via backdrop click or close button.
 */
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { useAppStore } from "@/store";
import { IconButton, Badge } from "@/components/shared";

/** Right-anchored drawer overlay showing algorithm learning material. */
export default function EducationalDrawer() {
  const educationalDrawerOpen = useAppStore((state) => state.educationalDrawerOpen);
  const toggleEducationalDrawer = useAppStore((state) => state.toggleEducationalDrawer);
  const definition = useAppStore((state) => state.definition);

  const educational = definition?.educational;
  const meta = definition?.meta;

  return (
    <AnimatePresence>
      {educationalDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleEducationalDrawer}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto bg-[var(--color-surface-secondary)] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {meta?.name ?? "Learning Content"}
                </h2>
                {meta && (
                  <div className="mt-1 flex gap-2">
                    <Badge variant="emerald">{meta.timeComplexity.average}</Badge>
                    <Badge variant="cyan">{meta.spaceComplexity}</Badge>
                  </div>
                )}
              </div>
              <IconButton label="Close" onClick={toggleEducationalDrawer}>
                <FiX size={20} />
              </IconButton>
            </div>

            {/* Content */}
            {educational ? (
              <div className="flex flex-col gap-6 px-5 py-5">
                <ContentSection title="Overview" content={educational.overview} />
                <ContentSection title="How It Works" content={educational.howItWorks} />
                <ContentSection
                  title="Time & Space Complexity"
                  content={educational.timeAndSpaceComplexity}
                />
                <ContentSection title="Best & Worst Case" content={educational.bestAndWorstCase} />
                <ListSection title="Real-World Uses" items={educational.realWorldUses} />
                <StrengthsLimitations
                  strengths={educational.strengthsAndLimitations.strengths}
                  limitations={educational.strengthsAndLimitations.limitations}
                />
                <ContentSection title="When to Use It" content={educational.whenToUseIt} />
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center p-5">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Select an algorithm to view learning content
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ContentSection({ title, content }: { title: string; content: string }) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-cyan)]">
        {title}
      </h3>
      <div className="whitespace-pre-line text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {content}
      </div>
    </section>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-cyan)]">
        {title}
      </h3>
      <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {items.map((item, itemIndex) => (
          <li key={itemIndex}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function StrengthsLimitations({
  strengths,
  limitations,
}: {
  strengths: string[];
  limitations: string[];
}) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-cyan)]">
        Strengths & Limitations
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="mb-1 text-xs font-medium text-[var(--color-accent-emerald)]">Strengths</h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-[var(--color-text-secondary)]">
            {strengths.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-1 text-xs font-medium text-[var(--color-accent-rose)]">Limitations</h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-[var(--color-text-secondary)]">
            {limitations.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
