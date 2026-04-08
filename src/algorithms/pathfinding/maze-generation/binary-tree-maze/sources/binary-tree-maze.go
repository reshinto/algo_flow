// Binary Tree Maze — for each cell, randomly carve north or east
package binarytreemaze

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

func BinaryTreeMaze(grid [][]GridCell) MazeResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	passagesCarved := 0 // @step:initialize

	// Carve all passage cells first
	for rowIndex := 1; rowIndex < rowCount-1; rowIndex += 2 {
		for colIndex := 1; colIndex < colCount-1; colIndex += 2 {
			if grid[rowIndex][colIndex].CellType == CellWall {
				grid[rowIndex][colIndex].CellType = CellEmpty // @step:carve-cell
				passagesCarved++
			}

			// Determine which directions are available: north (row-1) and east (col+1)
			canGoNorth := rowIndex-2 >= 1          // @step:carve-cell
			canGoEast := colIndex+2 <= colCount-2  // @step:carve-cell

			if canGoNorth && canGoEast {
				if rand.Float64() < 0.5 {
					grid[rowIndex-1][colIndex].CellType = CellEmpty // @step:carve-cell — carve north
					passagesCarved++
				} else {
					grid[rowIndex][colIndex+1].CellType = CellEmpty // @step:carve-cell — carve east
					passagesCarved++
				}
			} else if canGoNorth {
				grid[rowIndex-1][colIndex].CellType = CellEmpty // @step:carve-cell — only north available
				passagesCarved++
			} else if canGoEast {
				grid[rowIndex][colIndex+1].CellType = CellEmpty // @step:carve-cell — only east available
				passagesCarved++
			}
			// Corner cell (top-right): no north or east — leave isolated
		}
	}

	return MazeResult{PassagesCarved: passagesCarved} // @step:complete
}
