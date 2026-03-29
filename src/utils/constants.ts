/**
 * @file constants.ts
 * @module utils/constants
 *
 * Global application constants.
 * Centralizing UI constraints, timing variables, and mapping structures ensures that changes
 * to fundamental values (like breakpoints or speeds) immediately reflect everywhere without hunting for magic numbers.
 */
import type { AlgorithmCategory, SupportedLanguage } from "@/types";
import {
  discoverAlgorithmIds,
  discoverCategoryLabels,
  discoverTechniqueLabels,
} from "@/utils/source-loader";

/** Configurable velocity multipliers bound to user transport controls (0.25x -> 4.0x) */
export const PLAYBACK_SPEEDS = [0.25, 0.5, 1, 2, 4] as const;
export type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number];

/** Global heartbeat timing for algorithm progression (1x = 500 milliseconds per tick) */
export const BASE_PLAYBACK_INTERVAL_MS = 500;

/** Pixel boundary values used by Framer Motion and `useResponsiveLayout` for rigid layout shifting */
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

/** Human-readable string mappings for the UI language dropdown selectors */
export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
};

/** Derived from LANGUAGE_LABELS keys — single source of truth for supported languages */
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_LABELS) as SupportedLanguage[];

/** Derived from LANGUAGE_LABELS values lowercased — Monaco parser identifiers */
export const MONACO_LANGUAGE_MAP = Object.fromEntries(
  Object.entries(LANGUAGE_LABELS).map(([key, label]) => [key, label.toLowerCase()]),
) as Record<SupportedLanguage, string>;

/**
 * Intelligent Algorithm Registry auto-discovery map.
 * This dynamically invokes the `source-loader` Vite meta generator to automatically
 * construct valid enumeration identifiers from the underlying file system.
 *
 * E.g., Adding a file `quick-sort.ts` instantly generates `{ QUICK_SORT: "quick-sort" }` globally!
 */
export const ALGORITHM_ID = discoverAlgorithmIds();

export type AlgorithmId = string;

/**
 * Auto-discovered category labels from the algorithms directory structure.
 * Adding a new `src/algorithms/<category>/` folder automatically generates its label.
 * Labels are Title Case versions of the directory name (e.g. "dynamic-programming" → "Dynamic Programming").
 */
export const CATEGORY_LABELS: Record<string, string> = discoverCategoryLabels();

/**
 * Typed category key constants derived from CATEGORY_LABELS — single source of truth.
 * Keys are UPPER_SNAKE_CASE versions of the category id.
 * Usage: CATEGORY.DYNAMIC_PROGRAMMING → "dynamic-programming"
 */
export const CATEGORY = Object.fromEntries(
  Object.keys(CATEGORY_LABELS).map((key) => [key.toUpperCase().replaceAll("-", "_"), key]),
) as Record<string, AlgorithmCategory>;

/**
 * Auto-discovered technique labels from the algorithms directory structure.
 * Adding a new `src/algorithms/<category>/<technique>/` folder automatically generates its label.
 * Labels are Title Case versions of the directory name (e.g. "two-pointer" → "Two Pointer").
 */
export const TECHNIQUE_LABELS: Record<string, string> = discoverTechniqueLabels();

/** Maps each algorithm category to one of 6 accent CSS custom properties for pill filters and group borders */
export const CATEGORY_ACCENT_MAP: Record<string, string> = {
  arrays: "--color-accent-cyan",
  sorting: "--color-accent-emerald",
  searching: "--color-accent-blue",
  graph: "--color-accent-violet",
  pathfinding: "--color-accent-amber",
  "dynamic-programming": "--color-accent-rose",
  "hash-maps": "--color-accent-cyan",
  heaps: "--color-accent-emerald",
  "linked-lists": "--color-accent-blue",
  matrices: "--color-accent-violet",
  sets: "--color-accent-amber",
  "stacks-queues": "--color-accent-rose",
  strings: "--color-accent-cyan",
  trees: "--color-accent-emerald",
};

/** Structural bounding limits enforcing that Pathfinding Grid instances render optimally on mobile/desktop without overflow */
export const GRID_DEFAULTS = {
  rows: 15,
  cols: 30,
  maxRows: 30,
  maxCols: 30,
  /** Pre-defined [row, col] origin for algorithms like Dijkstra */
  startPosition: [1, 1] as [number, number],
  /** Pre-defined [row, col] destination */
  endPosition: [13, 28] as [number, number],
} as const;
