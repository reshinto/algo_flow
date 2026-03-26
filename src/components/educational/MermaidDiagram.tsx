/**
 * @file MermaidDiagram.tsx
 * @module components/educational/MermaidDiagram
 *
 * Safely evaluates untrusted Mermaid syntax completely decoupled from standard DOM rendering loops securely.
 * Asynchronously renders explicitly isolated SVG strings natively preventing blockages uniformly on the primary UI thread identically optimally.
 */
import { useEffect, useRef } from "react";
import mermaid from "mermaid";

// Prevent automated implicit parsing immediately hijacking default DOM elements upon initial load explicitly
mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  fontFamily: "Inter, sans-serif",
});

/** Formally dictates explicit string inputs required inherently to bootstrap a valid Graph. */
export default function MermaidDiagram({ chart }: { chart: string }) {
  // Physical absolute reference capturing exactly where the generated SVG securely merges into DOM structures.
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && chart) {
      /*
       * Heavy Duty Safeguard:
       * Mermaid internally mandates entirely unique ID nodes persistently during execution.
       * Generating random math hashes securely prevents React Strict Mode or Hot-Module-Reloading
       * duplicating element caches intrinsically triggering catastrophic library crashes explicitly.
       */
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      mermaid
        .render(id, chart)
        .then(({ svg }) => {
          if (containerRef.current) {
            // Unsafe insertion purely required inherently by Mermaid bypassing React DOM diffs uniquely directly.
            containerRef.current.innerHTML = svg;
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("Mermaid parsing error:", err);
          if (containerRef.current) {
            containerRef.current.innerHTML = `<div class="text-red-400 text-xs">Failed to render diagram</div>`;
          }
        });
    }
  }, [chart]);

  return <div ref={containerRef} className="flex justify-center overflow-x-auto py-6" />;
}
