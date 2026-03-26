import type { SupportedLanguage } from "@/types";

/** Playback speed multipliers */
export const PLAYBACK_SPEEDS = [0.25, 0.5, 1, 2, 4] as const;
export type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number];

/** Default playback interval in milliseconds (at 1x speed) */
export const BASE_PLAYBACK_INTERVAL_MS = 500;

/** Responsive breakpoints in pixels */
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

/** Supported languages for code display */
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["typescript", "python", "java"];

/** Display labels for languages */
export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
};

/** Monaco editor language identifiers */
export const MONACO_LANGUAGE_MAP: Record<SupportedLanguage, string> = {
  typescript: "typescript",
  python: "python",
  java: "java",
};

/** Algorithm category display labels */
export const CATEGORY_LABELS: Record<string, string> = {
  sorting: "Sorting",
  searching: "Searching",
  graph: "Graph Traversal",
  pathfinding: "Pathfinding",
  "dynamic-programming": "Dynamic Programming",
  "array-techniques": "Array Techniques",
};

/** Pathfinding grid defaults */
export const GRID_DEFAULTS = {
  rows: 15,
  cols: 30,
  maxRows: 30,
  maxCols: 30,
  startPosition: [1, 1] as [number, number],
  endPosition: [13, 28] as [number, number],
} as const;
