/** Step generator for Rotate Layer by Layer — produces ExecutionStep[] using MatrixLayerTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixLayerTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ROTATE_LAYER_BY_LAYER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ROTATE_LAYER_BY_LAYER!);

export interface RotateLayerByLayerInput {
  matrix: number[][];
}

export function generateRotateLayerByLayerSteps(input: RotateLayerByLayerInput): ExecutionStep[] {
  const matrix = input.matrix.map((row) => [...row]);
  const matrixSize = matrix.length;
  const totalLayers = Math.floor(matrixSize / 2);
  const tracker = new MatrixLayerTracker(matrix, ROTATE_LAYER_BY_LAYER_LINE_MAP);

  tracker.initialize({ matrixSize, totalLayers });

  for (let layerIdx = 0; layerIdx < totalLayers; layerIdx++) {
    const topRow = layerIdx;
    const bottomRow = matrixSize - 1 - layerIdx;
    const leftCol = layerIdx;
    const rightCol = matrixSize - 1 - layerIdx;

    tracker.selectLayer(layerIdx, { layerIdx, topRow, bottomRow, leftCol, rightCol });

    for (let positionIdx = layerIdx; positionIdx < matrixSize - 1 - layerIdx; positionIdx++) {
      const offset = positionIdx - layerIdx;

      // 4-way cyclic rotation using 3 swaps with a temp variable:
      // Top → Right → Bottom → Left → Top (cyclic)
      // Swap 1: top ↔ right (saves top into right's position logically)
      tracker.swapCells(topRow, leftCol + offset, topRow + offset, rightCol, {
        layerIdx,
        positionIdx,
        offset,
        swapStep: 1,
        description: "Top ↔ Right",
      });

      // Swap 2: top ↔ bottom
      tracker.swapCells(topRow, leftCol + offset, bottomRow, rightCol - offset, {
        layerIdx,
        positionIdx,
        offset,
        swapStep: 2,
        description: "Top ↔ Bottom",
      });

      // Swap 3: top ↔ left
      tracker.swapCells(topRow, leftCol + offset, bottomRow - offset, leftCol, {
        layerIdx,
        positionIdx,
        offset,
        swapStep: 3,
        description: "Top ↔ Left",
      });
    }

    tracker.processLayer(
      layerIdx,
      { layerIdx, topRow, bottomRow, leftCol, rightCol },
      `Layer ${layerIdx} rotation complete`,
    );
  }

  tracker.complete({ matrixSize, totalLayers });
  return tracker.getSteps();
}
