/**
 * @file App.tsx
 * @module core/App
 *
 * Root application mounting component.
 * Deliberately kept completely shallow to prevent prop-drilling.
 * Delegates 100% of internal state, layout topology, and routing logic downward explicitly to the `AppShell`.
 */
import AppShell from "@/components/layout/AppShell";

/**
 * Native Vite mounting footprint.
 * @returns An isolated container enveloping the entire application hierarchy.
 */
export default function App() {
  return <AppShell />;
}
