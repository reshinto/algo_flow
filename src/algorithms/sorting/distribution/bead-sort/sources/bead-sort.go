// Bead Sort (Gravity Sort) — represent numbers as rows of beads, let gravity pull beads down column by column
package main

func beadSort(inputArray []int) []int {
	// @step:initialize
	sourceArray := make([]int, len(inputArray)) // @step:initialize
	copy(sourceArray, inputArray)               // @step:initialize
	arrayLength := len(sourceArray)             // @step:initialize

	if arrayLength <= 1 {
		return sourceArray // @step:complete
	}

	// Offset negative values so all are non-negative integers
	minValue := sourceArray[0] // @step:initialize
	for _, val := range sourceArray {
		if val < minValue {
			minValue = val
		}
	}
	offset := 0 // @step:initialize
	if minValue < 0 {
		offset = -minValue
	}
	shiftedArray := make([]int, arrayLength) // @step:initialize
	for idx, val := range sourceArray {
		shiftedArray[idx] = val + offset
	}
	maxValue := shiftedArray[0] // @step:initialize
	for _, val := range shiftedArray {
		if val > maxValue {
			maxValue = val
		}
	}

	if maxValue == 0 {
		return sourceArray // @step:complete
	}

	// Represent each number as a row of beads on an abacus
	// grid[row][col] = 1 means a bead is present, 0 means empty
	grid := make([][]int, arrayLength) // @step:initialize
	for rowIndex := 0; rowIndex < arrayLength; rowIndex++ {
		grid[rowIndex] = make([]int, maxValue)
		for colIndex := 0; colIndex < shiftedArray[rowIndex]; colIndex++ {
			grid[rowIndex][colIndex] = 1
		}
	}

	// Gravity drop — for each column, count beads and stack them at the bottom
	for colIndex := 0; colIndex < maxValue; colIndex++ {
		// @step:drop-beads,compare
		beadCount := 0 // @step:drop-beads,compare
		for rowIndex := 0; rowIndex < arrayLength; rowIndex++ {
			// @step:drop-beads,compare
			beadCount += grid[rowIndex][colIndex] // @step:drop-beads,compare
			grid[rowIndex][colIndex] = 0          // @step:drop-beads,compare
		}
		// Stack beads at the bottom of this column (gravity effect)
		for rowIndex := arrayLength - beadCount; rowIndex < arrayLength; rowIndex++ {
			// @step:drop-beads
			grid[rowIndex][colIndex] = 1 // @step:drop-beads
		}
	}

	// Read bead counts from each row — each row's bead count is the sorted value
	for rowIndex := 0; rowIndex < arrayLength; rowIndex++ {
		// @step:mark-sorted
		rowBeadCount := 0 // @step:mark-sorted
		for colIndex := 0; colIndex < maxValue; colIndex++ {
			// @step:mark-sorted
			rowBeadCount += grid[rowIndex][colIndex] // @step:mark-sorted
		}
		sourceArray[rowIndex] = rowBeadCount - offset // @step:mark-sorted
	}

	return sourceArray // @step:complete
}
