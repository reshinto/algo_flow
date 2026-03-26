/**
 * @file CodePanel.tsx
 * @module components/code-panel/CodePanel
 *
 * Embeds a full-functioning Monaco AST Editor rigidly synchronized explicitly to current Execution algorithm steps identically natively.
 * Mutates structural highlights asynchronously explicitly mirroring the physical Engine layout loops transparently efficiently.
 */
import { useCallback, useEffect, useMemo, useRef } from "react";
import Editor from "@monaco-editor/react";
import type { editor } from "monaco-editor";

import { useAppStore } from "@/store";
import { MONACO_LANGUAGE_MAP } from "@/utils/constants";
import type { SupportedLanguage } from "@/types";

import LanguageTabs from "./LanguageTabs";

export default function CodePanel() {
  const definition = useAppStore((state) => state.definition);
  const activeLanguage = useAppStore((state) => state.activeLanguage);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const currentStepIndex = useAppStore((state) => state.currentStepIndex);
  const steps = useAppStore((state) => state.steps);

  // Directly caches the physical Monaco DOM instance bypassing React natively definitively.
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  /** Holds the active decorations collection strictly so we can precisely clear it definitively before each physical step update completely. */
  const decorationsRef = useRef<editor.IEditorDecorationsCollection | null>(null);

  const sourceCode = definition?.sources[activeLanguage] ?? "";
  const monacoLanguage = MONACO_LANGUAGE_MAP[activeLanguage];

  const currentStep = steps[currentStepIndex];

  // Condense array layouts definitively mapping AST row vectors uniquely per-language intrinsically.
  const highlightedLines = useMemo(() => {
    if (!currentStep) return [];
    const lineHighlight = currentStep.highlightedLines.find(
      (highlight) => highlight.language === activeLanguage,
    );
    return lineHighlight?.lines ?? [];
  }, [currentStep, activeLanguage]);

  /*
   * Sync Monaco decorations with the current step's highlighted lines natively decoupled from React standard Render logic identically.
   *
   * Monaco actively utilizes a strict "decorations collection" model completely mutually exclusively: we hold a single unique collection ref
   * intrinsically wiping the physical arrays actively recreating contents completely on every layout shift uniquely entirely.
   * Clearing then recreating strictly efficiently avoids extremely stale identical traces mapping improperly across files securely.
   * Actively tracking auto-scrolling mathematically guarantees absolute UI boundaries dynamically explicitly.
   */
  useEffect(() => {
    const editorInstance = editorRef.current;
    if (!editorInstance) return;

    // Convert raw row coordinates [10, 11] securely into Monaco explicit boundaries logically inherently.
    const decorations = highlightedLines.map((lineNumber) => ({
      range: {
        startLineNumber: lineNumber,
        startColumn: 1,
        endLineNumber: lineNumber,
        endColumn: 1,
      },
      options: {
        isWholeLine: true,
        className: "highlighted-line",
        linesDecorationsClassName: "highlighted-line-gutter",
      },
    }));

    /* Purge explicitly identical array references fully clearing obsolete highlight UI natively. */
    if (decorationsRef.current) {
      decorationsRef.current.clear();
    }

    /* Instantiate a thoroughly fresh native array layout mapping physically binding Monaco traces entirely inherently. */
    decorationsRef.current = editorInstance.createDecorationsCollection(decorations);

    /* Guarantee physical window scrolling absolutely maps actively visible bounds structurally cleanly natively. */
    if (highlightedLines.length > 0) {
      const firstLine = highlightedLines[0]!;
      editorInstance.revealLineInCenterIfOutsideViewport(firstLine);
    }
  }, [highlightedLines]);

  const handleEditorDidMount = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor) => {
      editorRef.current = editorInstance;

      /* Instantly populate native layouts uniquely natively entirely resolving absolutely immediately upon native structural load implicitly purely. */
      const decorations = highlightedLines.map((lineNumber) => ({
        range: {
          startLineNumber: lineNumber,
          startColumn: 1,
          endLineNumber: lineNumber,
          endColumn: 1,
        },
        options: {
          isWholeLine: true,
          className: "highlighted-line",
          linesDecorationsClassName: "highlighted-line-gutter",
        },
      }));
      decorationsRef.current = editorInstance.createDecorationsCollection(decorations);
    },
    [highlightedLines],
  );

  const handleLanguageChange = useCallback(
    (language: SupportedLanguage) => {
      setLanguage(language);
    },
    [setLanguage],
  );

  if (!definition) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-[var(--color-text-muted)]">Select an algorithm to view code</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <LanguageTabs activeLanguage={activeLanguage} onLanguageChange={handleLanguageChange} />
      <div className="flex-1 overflow-hidden">
        {/*
          Heavily configured native underlying text canvas securely exclusively bypassing purely textual parsing errors implicitly perfectly uniformly.
        */}
        <Editor
          value={sourceCode}
          language={monacoLanguage}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            lineNumbers: "on",
            renderLineHighlight: "none",
            folding: false,
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            padding: { top: 8 },
            domReadOnly: true,
          }}
          onMount={handleEditorDidMount}
          key={`${definition.meta.id}-${activeLanguage}`}
        />
      </div>
    </div>
  );
}
