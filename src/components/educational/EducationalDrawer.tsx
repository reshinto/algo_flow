/**
 * @file EducationalDrawer.tsx
 * @module components/educational/EducationalDrawer
 *
 * Slide-in DOM overlay presenting rich instructional Markdown documentation natively for the active algorithm.
 * Upgraded dynamically with Tab-based Progressive Disclosure mapping directly to `react-markdown` executing AST logic natively.
 */
import { useState } from "react";
import { FiX, FiClock, FiDatabase } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useAppStore } from "@/store";
import { IconButton } from "@/components/shared";
import MermaidDiagram from "./MermaidDiagram";

/** Explicit enum enforcing physical Tab bounding logic within localized React Component state universally */
type TabId = "overview" | "deep-dive" | "analysis";

/**
 * Main educational Container globally affixed exactly off-screen exclusively until toggled natively.
 * Uses `AnimatePresence` to guarantee safe logical unmounting of massive DOM string arrays dynamically entirely.
 */
export default function EducationalDrawer() {
  const educationalDrawerOpen = useAppStore((state) => state.educationalDrawerOpen);
  const toggleEducationalDrawer = useAppStore((state) => state.toggleEducationalDrawer);
  const definition = useAppStore((state) => state.definition);

  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const educational = definition?.educational;
  const meta = definition?.meta;

  const TABS: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "deep-dive", label: "Deep Dive" },
    { id: "analysis", label: "Analysis & Uses" },
  ];

  return (
    <AnimatePresence>
      {educationalDrawerOpen && (
        <>
          {/* Transparent click-off boundary mapping completely over background Visualizers implicitly closing native layouts */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleEducationalDrawer}
          />

          {/* Core Hardware Drawer locking layout logic securely on the Right peripheral bounds */}
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col bg-[var(--color-surface-secondary)] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Native Header explicitly carrying Algorithm Titles and category metadata firmly decoupled from the markdown loops */}
            <div className="shrink-0 border-b border-[var(--color-border-default)] bg-[var(--color-surface-primary)]">
              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                    {meta?.name ?? "Learning Content"}
                  </h2>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)] uppercase tracking-widest font-medium">
                    {meta?.category?.replace("-", " ") ?? "Algorithm"}
                  </p>
                </div>
                <IconButton
                  label="Close"
                  onClick={toggleEducationalDrawer}
                  size="lg"
                  className="md:h-9 md:w-9"
                >
                  <FiX size={20} />
                </IconButton>
              </div>

              {/* Explicit Tab interaction row natively evaluating localized React States inherently */}
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
                      {/* Active indicator bar natively binding explicitly directly tracking localized hooks perfectly */}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeDrawerTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent-cyan)]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DOM Container physically instantiating massive Markdown strings exclusively into AST layout parsers automatically */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {educational ? (
                <div className="flex flex-col gap-8">
                  {activeTab === "overview" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-6"
                    >
                      {/* TL;DR Highlight Cards rendering native primitive strings independently explicitly bypassing markdown parsers completely */}
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
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <MarkdownRenderer content={educational.howItWorks} />
                    </motion.div>
                  )}

                  {activeTab === "analysis" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
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
                            {educational.strengthsAndLimitations.strengths.map((str, i) => (
                              <li key={i}>{str}</li>
                            ))}
                          </ul>
                        </section>

                        <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4">
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-rose)]">
                            Limitations
                          </h4>
                          <ul className="list-inside list-disc space-y-1.5 text-sm text-[var(--color-text-secondary)]">
                            {educational.strengthsAndLimitations.limitations.map((str, i) => (
                              <li key={i}>{str}</li>
                            ))}
                          </ul>
                        </section>
                      </div>

                      <section>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-cyan)]">
                          Real World Uses
                        </h3>
                        <ul className="list-inside list-disc space-y-2 text-sm text-[var(--color-text-secondary)]">
                          {educational.realWorldUses.map((use, i) => (
                            <li key={i}>{use}</li>
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

/**
 * Modular Card DOM component visually emphasizing generic primitive string boundaries implicitly completely identically natively.
 */
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

/**
 * Core Markdown parsing engine natively orchestrating identical Tailwind typography globally seamlessly explicitly.
 * Definitively intercepts identical Code block AST nodes securely passing Mermaid flowcharts immediately into native Graph Canvas components.
 */
function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-invert max-w-none text-sm leading-relaxed text-[var(--color-text-secondary)] prose-headings:text-[var(--color-text-primary)] prose-h3:text-sm prose-h3:uppercase prose-h3:tracking-wider prose-h3:text-[var(--color-accent-cyan)] prose-a:text-[var(--color-accent-cyan)] prose-strong:text-[var(--color-text-primary)] prose-code:rounded prose-code:bg-[var(--color-surface-tertiary)] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-xs prose-code:text-[var(--color-text-primary)]"
      components={{
        code(props) {
          const { children, className, node: _node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");

          // Render explicitly isolated Mermaid diagrams instantly entirely exclusively bypassing normal generic parsing logic bindings identically completely.
          if (match && match[1] === "mermaid") {
            return <MermaidDiagram chart={String(children).replace(/\n$/, "")} />;
          }

          // Regular inline or block code mapped natively safely
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
