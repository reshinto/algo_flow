/**
 * Slide-in drawer presenting educational content for the active algorithm.
 * Uses AnimatePresence for enter/exit animations with reduced-motion support.
 */
import { useState, useEffect, useRef } from "react";
import { FiX, FiClock, FiDatabase } from "react-icons/fi";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useAppStore } from "@/store";
import { IconButton } from "@/components/shared";
import MermaidDiagram from "./MermaidDiagram";

type TabId = "overview" | "deep-dive" | "analysis";

export default function EducationalDrawer() {
  const educationalDrawerOpen = useAppStore((state) => state.educationalDrawerOpen);
  const toggleEducationalDrawer = useAppStore((state) => state.toggleEducationalDrawer);
  const definition = useAppStore((state) => state.definition);
  const shouldReduceMotion = useReducedMotion();

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  /* Focus management: move focus into drawer on open, return on close */
  useEffect(() => {
    if (educationalDrawerOpen) {
      triggerRef.current = document.activeElement;
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else if (triggerRef.current) {
      (triggerRef.current as HTMLElement).focus();
    }
  }, [educationalDrawerOpen]);

  const educational = definition?.educational;
  const meta = definition?.meta;

  const TABS: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "deep-dive", label: "Deep Dive" },
    { id: "analysis", label: "Analysis & Uses" },
  ];

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, damping: 30, stiffness: 300 };

  const fadeTransition = shouldReduceMotion ? { duration: 0 } : undefined;

  return (
    <AnimatePresence>
      {educationalDrawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fadeTransition}
            onClick={toggleEducationalDrawer}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col bg-[var(--color-surface-secondary)] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={springTransition}
          >
            <div className="shrink-0 border-b border-[var(--color-border-default)] bg-[var(--color-surface-primary)]">
              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                    {meta?.name ?? "Learning Content"}
                  </h2>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
                    {meta?.category?.replace("-", " ") ?? "Algorithm"}
                  </p>
                </div>
                <IconButton
                  ref={closeButtonRef}
                  label="Close"
                  onClick={toggleEducationalDrawer}
                  size="lg"
                  className="md:h-9 md:w-9"
                  title="Close"
                >
                  <FiX size={20} />
                </IconButton>
              </div>

              {educational && (
                <div className="flex gap-6 px-6">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative pb-3 text-sm font-medium transition-colors hover:text-[var(--color-text-primary)] ${
                        activeTab === tab.id
                          ? "text-[var(--color-text-primary)]"
                          : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId={shouldReduceMotion ? undefined : "activeDrawerTab"}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent-cyan)]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {educational ? (
                <div className="flex flex-col gap-8">
                  {activeTab === "overview" && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-6"
                    >
                      {meta && (
                        <div className="grid grid-cols-2 gap-4">
                          <HighlightCard
                            icon={<FiClock />}
                            title="Avg Time Complexity"
                            value={meta.timeComplexity.average}
                          />
                          <HighlightCard
                            icon={<FiDatabase />}
                            title="Space Complexity"
                            value={meta.spaceComplexity}
                          />
                        </div>
                      )}

                      <MarkdownRenderer content={educational.overview} />
                      <MarkdownRenderer
                        content={`### When to Use It\n${educational.whenToUseIt}`}
                      />
                    </motion.div>
                  )}

                  {activeTab === "deep-dive" && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <MarkdownRenderer content={educational.howItWorks} />
                    </motion.div>
                  )}

                  {activeTab === "analysis" && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-8"
                    >
                      <section>
                        <MarkdownRenderer
                          content={`### Complexity Breakdown\n${educational.timeAndSpaceComplexity}`}
                        />
                      </section>

                      <section>
                        <MarkdownRenderer
                          content={`### Extremes\n${educational.bestAndWorstCase}`}
                        />
                      </section>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4">
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-emerald)]">
                            Strengths
                          </h4>
                          <ul className="list-inside list-disc space-y-1.5 text-sm text-[var(--color-text-secondary)]">
                            {educational.strengthsAndLimitations.strengths.map(
                              (strength, strengthIndex) => (
                                <li key={strengthIndex}>{strength}</li>
                              ),
                            )}
                          </ul>
                        </section>

                        <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4">
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-rose)]">
                            Limitations
                          </h4>
                          <ul className="list-inside list-disc space-y-1.5 text-sm text-[var(--color-text-secondary)]">
                            {educational.strengthsAndLimitations.limitations.map(
                              (limitation, limitationIndex) => (
                                <li key={limitationIndex}>{limitation}</li>
                              ),
                            )}
                          </ul>
                        </section>
                      </div>

                      <section>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-cyan)]">
                          Real World Uses
                        </h3>
                        <ul className="list-inside list-disc space-y-2 text-sm text-[var(--color-text-secondary)]">
                          {educational.realWorldUses.map((use, useIndex) => (
                            <li key={useIndex}>{use}</li>
                          ))}
                        </ul>
                      </section>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Select an algorithm to view content
                  </p>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function HighlightCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[var(--color-border-default)] bg-gradient-to-br from-[var(--color-surface-primary)] to-[var(--color-surface-secondary)] p-4 shadow-sm">
      <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider">{title}</span>
      </div>
      <div className="font-mono text-lg font-medium text-[var(--color-accent-cyan)]">{value}</div>
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-invert max-w-none text-sm leading-relaxed text-[var(--color-text-secondary)] prose-headings:text-[var(--color-text-primary)] prose-h3:text-sm prose-h3:uppercase prose-h3:tracking-wider prose-h3:text-[var(--color-accent-cyan)] prose-a:text-[var(--color-accent-cyan)] prose-strong:text-[var(--color-text-primary)] prose-code:rounded prose-code:bg-[var(--color-surface-tertiary)] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-xs prose-code:text-[var(--color-text-primary)]"
      components={{
        code(props) {
          const { children, className, node: _node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");

          if (match && match[1] === "mermaid") {
            return <MermaidDiagram chart={String(children).replace(/\n$/, "")} />;
          }

          return (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
