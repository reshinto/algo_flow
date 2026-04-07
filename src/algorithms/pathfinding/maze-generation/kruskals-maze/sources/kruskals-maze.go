// Kruskal's Maze — Union-Find based maze generation by randomly removing walls
package kruskalsmaze

import "math/rand"

type CellType int

const (
	CellEmpty CellType = iota
	CellWall
	CellStart
	CellEnd
)

type GridCell struct {
	Row      int
	Col      int
	CellType CellType
	State    string
}

type MazeResult struct {
	PassagesCarved int
}

func findSet(setId [][]int, row, col int) int {
	// @step:initialize
	return setId[row][col]
}

func mergeSets(setId [][]int, rowA, colA, rowB, colB, rowCount, colCount int) {
	// @step:initialize
	idA := findSet(setId, rowA, colA)
	idB := findSet(setId, rowB, colB)
	if idA == idB { return }
	for rowIndex := 0; rowIndex < rowCount; rowIndex++ {
		for colIndex := 0; colIndex < colCount; colIndex++ {
			if setId[rowIndex][colIndex] == idB {
				setId[rowIndex][colIndex] = idA
			}
		}
	}
}

func KruskalsMaze(grid [][]GridCell) MazeResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	passagesCarved := 0 // @step:initialize

	// Union-Find: each cell has a set ID
	setId := make([][]int, rowCount)
	for rowIndex := 0; rowIndex < rowCount; rowIndex++ {
		setId[rowIndex] = make([]int, colCount)
		for colIndex := 0; colIndex < colCount; colIndex++ {
			setId[rowIndex][colIndex] = rowIndex*colCount + colIndex
		}
	} // @step:initialize

	// Collect all internal walls between passage cells
	type Wall [6]int
	var walls []Wall // @step:initialize

	for rowIndex := 1; rowIndex < rowCount-1; rowIndex += 2 {
		for colIndex := 1; colIndex < colCount-1; colIndex += 2 {
			if grid[rowIndex][colIndex].CellType == CellWall {
				grid[rowIndex][colIndex].CellType = CellEmpty // @step:merge-cells
				passagesCarved++
			}
			if colIndex+2 < colCount-1 {
				walls = append(walls, Wall{rowIndex, colIndex + 1, rowIndex, colIndex, rowIndex, colIndex + 2})
			}
			if rowIndex+2 < rowCount-1 {
				walls = append(walls, Wall{rowIndex + 1, colIndex, rowIndex, colIndex, rowIndex + 2, colIndex})
			}
		}
	}

	// Shuffle walls randomly (Fisher-Yates)
	rand.Shuffle(len(walls), func(wallIndexA, wallIndexB int) {
		walls[wallIndexA], walls[wallIndexB] = walls[wallIndexB], walls[wallIndexA]
	}) // @step:merge-cells

	// Process each wall
	for _, wall := range walls {
		wallRow, wallCol := wall[0], wall[1]
		cellARow, cellACol := wall[2], wall[3]
		cellBRow, cellBCol := wall[4], wall[5]
		if findSet(setId, cellARow, cellACol) != findSet(setId, cellBRow, cellBCol) {
			// @step:merge-cells
			grid[wallRow][wallCol].CellType = CellEmpty                                       // @step:merge-cells
			passagesCarved++
			mergeSets(setId, cellARow, cellACol, cellBRow, cellBCol, rowCount, colCount) // @step:merge-cells
		}
	}

	return MazeResult{PassagesCarved: passagesCarved} // @step:complete
}
