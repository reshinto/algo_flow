import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import type {
  StackQueueVisualState,
  StackElementState,
  InputCharState,
  NumericInputState,
  OutputElementState,
  ResultElementState,
  StackElement,
} from "@/types";

interface StackQueueVisualizerProps {
  visualState: StackQueueVisualState;
}

const INPUT_CHAR_COLORS: Record<InputCharState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  processed: "var(--color-viz-sorted)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
};

const STACK_ELEMENT_COLORS: Record<StackElementState, string> = {
  default: "var(--color-viz-default)",
  pushing: "var(--color-viz-current)",
  popping: "var(--color-viz-swapping)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
};

const NUMERIC_INPUT_COLORS: Record<NumericInputState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  processed: "var(--color-viz-sorted)",
  "result-pending": "var(--color-viz-comparing)",
  resolved: "var(--color-viz-sorted)",
};

const OUTPUT_ELEMENT_COLORS: Record<OutputElementState, string> = {
  default: "var(--color-viz-default)",
  new: "var(--color-viz-current)",
  computed: "var(--color-viz-sorted)",
};

const RESULT_ELEMENT_COLORS: Record<ResultElementState, string> = {
  default: "var(--color-viz-default)",
  pending: "var(--color-viz-comparing)",
  resolved: "var(--color-viz-sorted)",
};

function StackColumn({
  elements,
  label,
  shouldReduceMotion,
}: {
  elements: StackElement[];
  label: string;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-[var(--color-text-muted)]">
        {label} ({elements.length} element{elements.length !== 1 ? "s" : ""})
      </span>
      <div className="flex flex-col-reverse gap-1">
        <AnimatePresence>
          {elements.map((element, idx) => (
            <motion.div
              key={`${element.value}-${idx}`}
              initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scaleY: 1,
                backgroundColor: STACK_ELEMENT_COLORS[element.state],
              }}
              exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              className="flex h-10 w-14 items-center justify-center rounded font-mono text-base font-bold"
              style={{
                border: "1px solid var(--color-border-subtle)",
                color: "var(--color-text-primary)",
              }}
            >
              {element.value}
            </motion.div>
          ))}
        </AnimatePresence>

        {elements.length === 0 && (
          <div
            className="flex h-10 w-14 items-center justify-center rounded font-mono text-xs"
            style={{
              border: "1px dashed var(--color-border-default)",
              color: "var(--color-text-muted)",
            }}
          >
            empty
          </div>
        )}
      </div>
    </div>
  );
}

export default function StackQueueVisualizer({ visualState }: StackQueueVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const {
    stackElements,
    inputChars,
    statusMessage,
    inputArray,
    queueElements,
    auxiliaryStack,
    outputElements,
    resultArray,
    monotonicOrder,
    circularBuffer,
    phase,
  } = visualState;

  const hasInputChars = inputChars.length > 0;
  const hasInputArray = inputArray && inputArray.length > 0;
  const hasQueue = queueElements && queueElements.length > 0;
  const hasAuxiliary = auxiliaryStack && auxiliaryStack.length > 0;
  const hasOutput = outputElements && outputElements.length > 0;
  const hasResult = resultArray && resultArray.some((element) => element.state !== "default");
  const hasCircular = circularBuffer !== undefined;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 overflow-auto p-4">
      {/* Input character row */}
      {hasInputChars && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Input</span>
          <div className="flex flex-wrap gap-1">
            {inputChars.map((char, idx) => (
              <motion.div
                key={idx}
                className="flex h-9 w-9 items-center justify-center rounded font-mono text-sm font-bold"
                animate={{ backgroundColor: INPUT_CHAR_COLORS[char.state] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
                style={{
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {char.value}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Numeric input array row */}
      {hasInputArray && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Input Array</span>
          <div className="flex flex-wrap gap-1">
            {inputArray.map((element) => (
              <motion.div
                key={element.index}
                className="flex h-9 min-w-9 flex-col items-center justify-center rounded px-1 font-mono text-sm font-bold"
                animate={{ backgroundColor: NUMERIC_INPUT_COLORS[element.state] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
                style={{
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                <span>{element.value}</span>
                <span className="text-[0.6rem] opacity-50">{element.index}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Main data structures row — stack, queue, auxiliary side by side */}
      <div className="flex items-start justify-center gap-8">
        {/* Stack */}
        {stackElements.length > 0 || (!hasQueue && !hasCircular) ? (
          <StackColumn
            elements={stackElements}
            label={monotonicOrder ? `Stack (${monotonicOrder})` : "Stack"}
            shouldReduceMotion={shouldReduceMotion}
          />
        ) : null}

        {/* Queue */}
        {(hasQueue || queueElements !== undefined) && (
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-[var(--color-text-muted)]">
              Queue ({queueElements?.length ?? 0} element
              {(queueElements?.length ?? 0) !== 1 ? "s" : ""})
            </span>
            <div className="flex items-center gap-0.5">
              <span className="mr-1 text-[0.6rem] text-[var(--color-text-muted)]">front</span>
              <AnimatePresence>
                {queueElements?.map((element, idx) => (
                  <motion.div
                    key={`q-${element.value}-${idx}`}
                    initial={{ opacity: 0, x: 10, scaleX: 0.8 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scaleX: 1,
                      backgroundColor: STACK_ELEMENT_COLORS[element.state],
                    }}
                    exit={{ opacity: 0, x: -10, scaleX: 0.8 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                    className="flex h-10 w-14 items-center justify-center rounded font-mono text-base font-bold"
                    style={{
                      border: "1px solid var(--color-border-subtle)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {element.value}
                  </motion.div>
                ))}
              </AnimatePresence>
              {(!queueElements || queueElements.length === 0) && (
                <div
                  className="flex h-10 w-14 items-center justify-center rounded font-mono text-xs"
                  style={{
                    border: "1px dashed var(--color-border-default)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  empty
                </div>
              )}
              <span className="ml-1 text-[0.6rem] text-[var(--color-text-muted)]">rear</span>
            </div>
          </div>
        )}

        {/* Auxiliary Stack */}
        {hasAuxiliary && (
          <StackColumn
            elements={auxiliaryStack}
            label="Auxiliary"
            shouldReduceMotion={shouldReduceMotion}
          />
        )}
      </div>

      {/* Circular Buffer */}
      {hasCircular && circularBuffer && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            Circular Buffer (capacity: {circularBuffer.capacity})
          </span>
          <div className="flex flex-wrap gap-1">
            {circularBuffer.elements.map((element, idx) => {
              const isFront = idx === circularBuffer.frontIndex;
              const isRear = idx === circularBuffer.rearIndex;
              const isEmpty = element === null;
              return (
                <motion.div
                  key={idx}
                  className="flex h-10 min-w-10 flex-col items-center justify-center rounded px-1 font-mono text-sm font-bold"
                  animate={{
                    backgroundColor: isEmpty
                      ? "var(--color-viz-default)"
                      : isFront || isRear
                        ? "var(--color-viz-current)"
                        : "var(--color-viz-sorted)",
                  }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
                  style={{
                    border:
                      isFront || isRear
                        ? "2px solid var(--color-accent-cyan)"
                        : "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  <span>{isEmpty ? "-" : String(element)}</span>
                  <span className="text-[0.5rem] opacity-50">
                    {isFront && isRear ? "F/R" : isFront ? "F" : isRear ? "R" : idx}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Output elements row */}
      {hasOutput && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Output</span>
          <div className="flex flex-wrap gap-1">
            {outputElements.map((element, idx) => (
              <motion.div
                key={`out-${idx}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  backgroundColor: OUTPUT_ELEMENT_COLORS[element.state],
                }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="flex h-9 min-w-9 items-center justify-center rounded px-1.5 font-mono text-sm font-bold"
                style={{
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {element.value}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Result array row */}
      {hasResult && resultArray && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Result</span>
          <div className="flex flex-wrap gap-1">
            {resultArray.map((element) => (
              <motion.div
                key={element.index}
                className="flex h-9 min-w-9 flex-col items-center justify-center rounded px-1 font-mono text-sm font-bold"
                animate={{ backgroundColor: RESULT_ELEMENT_COLORS[element.state] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
                style={{
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                <span>{element.value === null ? "-" : element.value}</span>
                <span className="text-[0.6rem] opacity-50">{element.index}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Status + Phase + Monotonic badge */}
      <div className="flex flex-col items-center gap-1">
        {(phase || monotonicOrder) && (
          <div className="flex gap-2">
            {phase && (
              <span
                className="rounded px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: "var(--color-surface-overlay)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {phase}
              </span>
            )}
            {monotonicOrder && (
              <span
                className="rounded px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: "var(--color-surface-overlay)",
                  color: "var(--color-accent-cyan)",
                }}
              >
                Monotonic {monotonicOrder}
              </span>
            )}
          </div>
        )}
        {statusMessage && (
          <div
            className="text-center text-sm font-semibold"
            style={{
              color:
                statusMessage.includes("✓") || statusMessage.includes("complete")
                  ? "var(--color-accent-emerald)"
                  : statusMessage.includes("✗") || statusMessage.includes("invalid")
                    ? "var(--color-accent-rose)"
                    : "var(--color-text-secondary)",
            }}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}
