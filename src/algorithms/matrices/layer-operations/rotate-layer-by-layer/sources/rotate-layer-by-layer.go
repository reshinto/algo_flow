// Rotate Layer by Layer
// Rotates an n×n matrix 90° clockwise by processing each concentric layer (ring) from outside in.
// For each layer, performs a 4-way cyclic swap of elements using a temp variable.
// Time: O(n²) — every element is touched exactly once
// Space: O(1) — in-place, only a temp variable is used

package main

func rotateLayerByLayer(matrix [][]int) [][]int {
	matrixSize := len(matrix)     // @step:initialize
	totalLayers := matrixSize / 2 // @step:initialize

	for layerIdx := 0; layerIdx < totalLayers; layerIdx++ {
		// @step:select-layer
		topRow := layerIdx                    // @step:select-layer
		bottomRow := matrixSize - 1 - layerIdx // @step:select-layer
		leftCol := layerIdx                   // @step:select-layer
		rightCol := matrixSize - 1 - layerIdx  // @step:select-layer

		for positionIdx := layerIdx; positionIdx < matrixSize-1-layerIdx; positionIdx++ {
			// @step:swap-cells
			offset := positionIdx - layerIdx // @step:swap-cells

			// Save top
			temp := matrix[topRow][leftCol+offset] // @step:swap-cells

			// Left → Top
			matrix[topRow][leftCol+offset] = matrix[bottomRow-offset][leftCol] // @step:swap-cells

			// Bottom → Left
			matrix[bottomRow-offset][leftCol] = matrix[bottomRow][rightCol-offset] // @step:swap-cells

			// Right → Bottom
			matrix[bottomRow][rightCol-offset] = matrix[topRow+offset][rightCol] // @step:swap-cells

			// Top (saved) → Right
			matrix[topRow+offset][rightCol] = temp // @step:swap-cells
		}
	}

	return matrix // @step:complete
}
