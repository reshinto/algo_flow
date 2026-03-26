import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  fontFamily: "Inter, sans-serif",
});

export default function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && chart) {
      // Use a robust unique ID so React strict mode or HMR doesn't crash mermaid parses
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      
      mermaid
        .render(id, chart)
        .then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch((err) => {
          console.error("Mermaid parsing error:", err);
          if (containerRef.current) {
            containerRef.current.innerHTML = `<div class="text-red-400 text-xs">Failed to render diagram</div>`;
          }
        });
    }
  }, [chart]);

  return <div ref={containerRef} className="flex justify-center overflow-x-auto py-6" />;
}
