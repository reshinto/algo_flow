// Recursive Division Maze — builds walls in an open grid, leaving one gap per wall
package recursivedivision

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
	WallsBuilt int
}

func buildWallsInRegion(
	grid [][]GridCell,
	topRow, leftCol, bottomRow, rightCol int,
	startRow, startCol, endRow, endCol int,
	wallsBuilt *int,
) {
	regionHeight := bottomRow - topRow // @step:carve-cell
	regionWidth := rightCol - leftCol  // @step:carve-cell

	if regionHeight < 2 || regionWidth < 2 { return } // @step:carve-cell

	// Choose orientation: horizontal wall if taller, vertical if wider
	buildHorizontal := regionHeight >= regionWidth // @step:carve-cell

	if buildHorizontal {
		wallRow := topRow + 2*rand.Intn(regionHeight/2) + 1  // @step:carve-cell
		gapCol := leftCol + 2*rand.Intn((regionWidth+2)/2) // @step:carve-cell

		for colIndex := leftCol; colIndex <= rightCol; colIndex++ {
			// @step:carve-cell
			if wallRow < 0 || wallRow >= len(grid) { continue }
			if colIndex < 0 || colIndex >= len(grid[0]) { continue }
			cell := &grid[wallRow][colIndex]
			if cell.CellType == CellStart || cell.CellType == CellEnd { continue }
			if colIndex == gapCol { continue }
			cell.CellType = CellWall // @step:carve-cell
			*wallsBuilt++
		}

		buildWallsInRegion(grid, topRow, leftCol, wallRow-1, rightCol, startRow, startCol, endRow, endCol, wallsBuilt)     // @step:carve-cell
		buildWallsInRegion(grid, wallRow+1, leftCol, bottomRow, rightCol, startRow, startCol, endRow, endCol, wallsBuilt) // @step:carve-cell
	} else {
		wallCol := leftCol + 2*rand.Intn(regionWidth/2) + 1   // @step:carve-cell
		gapRow := topRow + 2*rand.Intn((regionHeight+2)/2) // @step:carve-cell

		for rowIndex := topRow; rowIndex <= bottomRow; rowIndex++ {
			// @step:carve-cell
			if rowIndex < 0 || rowIndex >= len(grid) { continue }
			if wallCol < 0 || wallCol >= len(grid[0]) { continue }
			cell := &grid[rowIndex][wallCol]
			if cell.CellType == CellStart || cell.CellType == CellEnd { continue }
			if rowIndex == gapRow { continue }
			cell.CellType = CellWall // @step:carve-cell
			*wallsBuilt++
		}

		buildWallsInRegion(grid, topRow, leftCol, bottomRow, wallCol-1, startRow, startCol, endRow, endCol, wallsBuilt)     // @step:carve-cell
		buildWallsInRegion(grid, topRow, wallCol+1, bottomRow, rightCol, startRow, startCol, endRow, endCol, wallsBuilt) // @step:carve-cell
	}
}

func RecursiveDivision(grid [][]GridCell, startRow, startCol, endRow, endCol int) MazeResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	wallsBuilt := 0 // @step:initialize

	buildWallsInRegion(grid, 0, 0, rowCount-1, colCount-1, startRow, startCol, endRow, endCol, &wallsBuilt) // @step:carve-cell

	return MazeResult{WallsBuilt: wallsBuilt} // @step:complete
}
