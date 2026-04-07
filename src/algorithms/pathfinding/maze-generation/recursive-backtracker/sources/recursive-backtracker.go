// Recursive Backtracker Maze — DFS-based maze carving with random neighbor selection
package recursivebacktracker

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

func RecursiveBacktrackerMaze(grid [][]GridCell, startRow, startCol int) MazeResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	visited := make([][]bool, rowCount)
	for rowIndex := range visited {
		visited[rowIndex] = make([]bool, colCount)
	} // @step:initialize
	passagesCarved := 0 // @step:initialize

	// DFS stack — stores passage cell coordinates (odd row and col only)
	type Position struct{ row, col int }
	var stack []Position // @step:initialize

	// Mark start cell as visited and push onto stack
	visited[startRow][startCol] = true              // @step:carve-cell
	stack = append(stack, Position{startRow, startCol}) // @step:carve-cell

	directions := [][2]int{{-2, 0}, {2, 0}, {0, -2}, {0, 2}}

	for len(stack) > 0 {
		current := stack[len(stack)-1] // @step:visit
		currentRow := current.row      // @step:visit
		currentCol := current.col      // @step:visit

		// Collect unvisited passage-cell neighbors
		var unvisitedNeighbors []Position // @step:visit
		for _, dir := range directions {
			neighborRow := currentRow + dir[0]
			neighborCol := currentCol + dir[1]
			if neighborRow < 1 || neighborRow >= rowCount-1 { continue }
			if neighborCol < 1 || neighborCol >= colCount-1 { continue }
			if !visited[neighborRow][neighborCol] {
				unvisitedNeighbors = append(unvisitedNeighbors, Position{neighborRow, neighborCol}) // @step:visit
			}
		}

		if len(unvisitedNeighbors) > 0 {
			// Randomly choose one unvisited neighbor
			chosenIndex := rand.Intn(len(unvisitedNeighbors))
			chosen := unvisitedNeighbors[chosenIndex] // @step:carve-cell
			chosenRow := chosen.row
			chosenCol := chosen.col

			// Carve the wall between current and chosen
			wallRow := currentRow + (chosenRow-currentRow)/2
			wallCol := currentCol + (chosenCol-currentCol)/2
			grid[wallRow][wallCol].CellType = CellEmpty // @step:carve-cell
			passagesCarved++

			// Carve the chosen cell itself
			if grid[chosenRow][chosenCol].CellType == CellWall {
				grid[chosenRow][chosenCol].CellType = CellEmpty // @step:carve-cell
				passagesCarved++
			}

			visited[chosenRow][chosenCol] = true                         // @step:carve-cell
			stack = append(stack, Position{chosenRow, chosenCol}) // @step:carve-cell
		} else {
			// Backtrack — no unvisited neighbors remain
			stack = stack[:len(stack)-1] // @step:visit
		}
	}

	return MazeResult{PassagesCarved: passagesCarved} // @step:complete
}
