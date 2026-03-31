// Rotate Layer by Layer
// Rotates an n×n matrix 90° clockwise by processing each concentric layer (ring) from outside in.
// For each layer, performs a 4-way cyclic swap of elements using a temp variable.
// Time: O(n²) — every element is touched exactly once
// Space: O(1) — in-place, only a temp variable is used

function rotateLayerByLayer(matrix: number[][]): number[][] {
  const matrixSize = matrix.length; // @step:initialize
  const totalLayers = Math.floor(matrixSize / 2); // @step:initialize

  for (let layerIdx = 0; layerIdx < totalLayers; layerIdx++) {
    // @step:select-layer
    const topRow = layerIdx; // @step:select-layer
    const bottomRow = matrixSize - 1 - layerIdx; // @step:select-layer
    const leftCol = layerIdx; // @step:select-layer
    const rightCol = matrixSize - 1 - layerIdx; // @step:select-layer

    for (let positionIdx = layerIdx; positionIdx < matrixSize - 1 - layerIdx; positionIdx++) {
      // @step:swap-cells
      const offset = positionIdx - layerIdx; // @step:swap-cells

      // Save top
      const temp = matrix[topRow]![leftCol + offset]!; // @step:swap-cells

      // Left → Top
      matrix[topRow]![leftCol + offset] = matrix[bottomRow - offset]![leftCol]!; // @step:swap-cells

      // Bottom → Left
      matrix[bottomRow - offset]![leftCol] = matrix[bottomRow]![rightCol - offset]!; // @step:swap-cells

      // Right → Bottom
      matrix[bottomRow]![rightCol - offset] = matrix[topRow + offset]![rightCol]!; // @step:swap-cells

      // Top (saved) → Right
      matrix[topRow + offset]![rightCol] = temp; // @step:swap-cells
    }
  }

  return matrix; // @step:complete
}
