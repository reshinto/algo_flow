// Prim's Maze — randomized Prim's algorithm for maze generation
package primsmaze

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

func PrimsMaze(grid [][]GridCell, startRow, startCol int) MazeResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	inMaze := make([][]bool, rowCount)
	for rowIndex := range inMaze {
		inMaze[rowIndex] = make([]bool, colCount)
	} // @step:initialize
	passagesCarved := 0 // @step:initialize

	// Each frontier entry is (wallRow, wallCol, originRow, originCol)
	type FrontierCell [4]int
	var frontier []FrontierCell // @step:initialize

	// Add start cell to maze
	inMaze[startRow][startCol] = true // @step:open-node
	if grid[startRow][startCol].CellType == CellWall {
		grid[startRow][startCol].CellType = CellEmpty // @step:open-node
		passagesCarved++
	}

	directions := [][2]int{{-2, 0}, {2, 0}, {0, -2}, {0, 2}}

	// Add initial frontier walls
	for _, dir := range directions {
		neighborRow := startRow + dir[0]
		neighborCol := startCol + dir[1]
		if neighborRow < 1 || neighborRow >= rowCount-1 { continue }
		if neighborCol < 1 || neighborCol >= colCount-1 { continue }
		if !inMaze[neighborRow][neighborCol] {
			frontier = append(frontier, FrontierCell{neighborRow, neighborCol, startRow, startCol}) // @step:open-node
		}
	}

	for len(frontier) > 0 {
		// Randomly pick a frontier wall
		pickedIndex := rand.Intn(len(frontier))
		picked := frontier[pickedIndex]                                                   // @step:carve-cell
		frontier = append(frontier[:pickedIndex], frontier[pickedIndex+1:]...)
		pickedRow, pickedCol, originRow, originCol := picked[0], picked[1], picked[2], picked[3]

		if inMaze[pickedRow][pickedCol] { continue } // @step:carve-cell

		// Carve the passage cell
		inMaze[pickedRow][pickedCol] = true // @step:carve-cell
		if grid[pickedRow][pickedCol].CellType == CellWall {
			grid[pickedRow][pickedCol].CellType = CellEmpty // @step:carve-cell
			passagesCarved++
		}

		// Carve the wall between origin and picked
		wallRow := originRow + (pickedRow-originRow)/2
		wallCol := originCol + (pickedCol-originCol)/2
		if grid[wallRow][wallCol].CellType == CellWall {
			grid[wallRow][wallCol].CellType = CellEmpty // @step:carve-cell
			passagesCarved++
		}

		// Add new frontier neighbors
		for _, dir := range directions {
			neighborRow := pickedRow + dir[0]
			neighborCol := pickedCol + dir[1]
			if neighborRow < 1 || neighborRow >= rowCount-1 { continue }
			if neighborCol < 1 || neighborCol >= colCount-1 { continue }
			if !inMaze[neighborRow][neighborCol] {
				frontier = append(frontier, FrontierCell{neighborRow, neighborCol, pickedRow, pickedCol}) // @step:open-node
			}
		}
	}

	return MazeResult{PassagesCarved: passagesCarved} // @step:complete
}
