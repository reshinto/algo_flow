/**
 * Vitest setup file.
 * Registers jest-dom matchers and enforces a 1-second per-test timeout.
 * Tests exceeding 1 second are flagged as faulty — likely caused by
 * a memory leak, an infinite loop, or test inputs too large for the
 * algorithm's time complexity.
 */
import "@testing-library/jest-dom/vitest";
import { beforeEach, afterEach } from "vitest";

const TEST_TIMEOUT_MS = 1000;

beforeEach(({ task }) => {
  (task as Record<string, unknown>).__startTime = performance.now();
});

afterEach(({ task }) => {
  const startTime = (task as Record<string, unknown>).__startTime as number | undefined;
  if (startTime !== undefined) {
    const elapsed = performance.now() - startTime;
    if (elapsed > TEST_TIMEOUT_MS) {
      throw new Error(
        `FAULTY TEST: "${task.name}" took ${Math.round(elapsed)}ms (limit: ${String(TEST_TIMEOUT_MS)}ms). ` +
          "This likely indicates a memory leak, an infinite loop, or test inputs " +
          "that are too large for the algorithm's time complexity. " +
          "Reduce input size or cap iteration count.",
      );
    }
  }
});
