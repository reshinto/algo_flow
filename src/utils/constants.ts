/**
 * @file constants.ts
 * @module utils/constants
 *
 * Global application constants.
 * Centralizing UI constraints, timing variables, and mapping structures ensures that changes
 * to fundamental values (like breakpoints or speeds) immediately reflect everywhere without hunting for magic numbers.
 */
import type { SupportedLanguage } from "@/types";
import { discoverAlgorithmIds } from "@/utils/source-loader";

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

/** Rigidly typed array defining valid Monaco parsing environments */
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["typescript", "python", "java"];

/** Human-readable string mappings for the UI language dropdown selectors */
export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
};

/** Precise parser identification strings required by the underlying Monaco Editor component */
export const MONACO_LANGUAGE_MAP: Record<SupportedLanguage, string> = {
  typescript: "typescript",
  python: "python",
  java: "java",
};

/**
 * Intelligent Algorithm Registry auto-discovery map.
 * This dynamically invokes the `source-loader` Vite meta generator to automatically
 * construct valid enumeration identifiers from the underlying file system.
 *
 * E.g., Adding a file `quick-sort.ts` instantly generates `{ QUICK_SORT: "quick-sort" }` globally!
 */
export const ALGORITHM_ID = discoverAlgorithmIds();

export type AlgorithmId = string;

/** Header categories utilized by the Command Palette Modal and top-level Drawer filtering */
export const CATEGORY_LABELS: Record<string, string> = {
  sorting: "Sorting",
  searching: "Searching",
  graph: "Graph Traversal",
  pathfinding: "Pathfinding",
  "dynamic-programming": "Dynamic Programming",
  "array-techniques": "Array Techniques",
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
