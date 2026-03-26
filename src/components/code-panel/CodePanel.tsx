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

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const decorationsRef = useRef<editor.IEditorDecorationsCollection | null>(null);

  const sourceCode = definition?.sources[activeLanguage] ?? "";
  const monacoLanguage = MONACO_LANGUAGE_MAP[activeLanguage];

  const currentStep = steps[currentStepIndex];
  const highlightedLines = useMemo(() => {
    if (!currentStep) return [];
    const lineHighlight = currentStep.highlightedLines.find(
      (highlight) => highlight.language === activeLanguage,
    );
    return lineHighlight?.lines ?? [];
  }, [currentStep, activeLanguage]);

  /* Update decorations whenever highlighted lines change */
  useEffect(() => {
    const editorInstance = editorRef.current;
    if (!editorInstance) return;

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

    if (decorationsRef.current) {
      decorationsRef.current.clear();
    }
    decorationsRef.current = editorInstance.createDecorationsCollection(decorations);

    /* Scroll to first highlighted line */
    if (highlightedLines.length > 0) {
      const firstLine = highlightedLines[0]!;
      editorInstance.revealLineInCenterIfOutsideViewport(firstLine);
    }
  }, [highlightedLines]);

  const handleEditorDidMount = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor) => {
      editorRef.current = editorInstance;

      /* Apply initial decorations */
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
