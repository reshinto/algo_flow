import { useAppStore } from "@/store";
import { Badge } from "@/components/shared";

export default function ExplanationPanel() {
  const steps = useAppStore((state) => state.steps);
  const currentStepIndex = useAppStore((state) => state.currentStepIndex);
  const definition = useAppStore((state) => state.definition);

  const currentStep = steps[currentStepIndex];

  if (!definition || !currentStep) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          Select an algorithm to see step details
        </p>
      </div>
    );
  }

  const { metrics, variables, description, type } = currentStep;

  return (
    <div className="flex h-full flex-col overflow-y-auto p-4">
      {/* Step description */}
      <div className="mb-4">
        <div className="mb-1 flex items-center gap-2">
          <Badge variant="cyan">{type}</Badge>
          <span className="text-xs text-[var(--color-text-muted)]">
            Step {currentStepIndex + 1} / {steps.length}
          </span>
        </div>
        <p className="text-sm text-[var(--color-text-primary)]">{description}</p>
      </div>

      {/* Metrics — always show all slots so layout doesn't shift */}
      <div className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Metrics
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <MetricItem label="Steps" value={metrics.elapsedSteps} />
          <MetricItem label="Comparisons" value={metrics.comparisons} />
          <MetricItem label="Swaps" value={metrics.swaps} />
          <MetricItem label="Visits" value={metrics.visits} />
          <MetricItem label="Cache Hits" value={metrics.cacheHits} />
          <MetricItem label="Queue Ops" value={metrics.queueOperations} />
        </div>
      </div>

      {/* Variables — fixed height per entry to avoid reflow */}
      <div className="min-h-0 flex-1">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Variables
        </h3>
        <div className="space-y-1.5">
          {Object.entries(variables).map(([variableName, variableValue]) => (
            <div
              key={variableName}
              className="flex items-start justify-between gap-2 rounded bg-[var(--color-surface-tertiary)] px-2 py-1.5"
            >
              <span className="shrink-0 font-mono text-xs text-[var(--color-accent-violet)]">
                {variableName}
              </span>
              <span className="min-w-0 break-all text-right font-mono text-xs text-[var(--color-text-secondary)]">
                {formatValue(variableValue)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-[var(--color-surface-tertiary)] px-2 py-1">
      <div className="text-[10px] text-[var(--color-text-muted)]">{label}</div>
      <div className="font-mono text-sm font-medium text-[var(--color-text-primary)]">{value}</div>
    </div>
  );
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.join(", ")}]`;
  }
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }
  return String(value);
}
