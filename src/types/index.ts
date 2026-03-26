/**
 * Barrel re-exports for all shared type definitions.
 * Import from `@/types` instead of reaching into individual modules.
 */

export type {
  AlgorithmCategory,
  AlgorithmDefinition,
  AlgorithmMeta,
  ComplexitySpec,
  SupportedLanguage,
} from "./algorithm";

export type { EducationalContent } from "./educational";

export type {
  ArrayElement,
  ArrayElementState,
  ArrayVisualState,
  DPCell,
  DPCellState,
  DPTableVisualState,
  ExecutionStep,
  GraphEdge,
  GraphEdgeState,
  GraphNode,
  GraphNodeState,
  GraphVisualState,
  GridCell,
  GridCellState,
  GridCellType,
  GridVisualState,
  LineHighlight,
  StepMetrics,
  StepType,
  VisualState,
} from "./execution";
