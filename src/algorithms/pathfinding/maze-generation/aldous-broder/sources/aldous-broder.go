// Aldous-Broder Maze — uniform random spanning tree via random walk
package aldousbroder

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

func AldousBroder(grid [][]GridCell, startRow, startCol int) MazeResult {
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

	// Count total passage cells (odd row and odd col)
	totalPassageCells := 0 // @step:initialize
	for rowIndex := 1; rowIndex < rowCount-1; rowIndex += 2 {
		for colIndex := 1; colIndex < colCount-1; colIndex += 2 {
			totalPassageCells++
		}
	}

	visitedCount := 0        // @step:initialize
	currentRow := startRow   // @step:initialize
	currentCol := startCol   // @step:initialize

	// Mark start as visited and carve it
	visited[currentRow][currentCol] = true // @step:visit
	if grid[currentRow][currentCol].CellType == CellWall {
		grid[currentRow][currentCol].CellType = CellEmpty // @step:carve-cell
		passagesCarved++
	}
	visitedCount++

	directions := [][2]int{{-2, 0}, {2, 0}, {0, -2}, {0, 2}}
	maxIterations := rowCount * colCount * 10

	for iterations := 0; visitedCount < totalPassageCells && iterations < maxIterations; iterations++ {
		// Collect valid passage-cell neighbors
		type Position struct{ row, col int }
		var validNeighbors []Position // @step:visit
		for _, dir := range directions {
			neighborRow := currentRow + dir[0]
			neighborCol := currentCol + dir[1]
			if neighborRow < 1 || neighborRow >= rowCount-1 { continue }
			if neighborCol < 1 || neighborCol >= colCount-1 { continue }
			validNeighbors = append(validNeighbors, Position{neighborRow, neighborCol})
		}
		if len(validNeighbors) == 0 { break }

		// Pick a random neighbor (random walk)
		chosenIndex := rand.Intn(len(validNeighbors))
		nextRow := validNeighbors[chosenIndex].row // @step:visit
		nextCol := validNeighbors[chosenIndex].col // @step:visit

		if !visited[nextRow][nextCol] {
			// Carve the wall between current and next
			wallRow := currentRow + (nextRow-currentRow)/2
			wallCol := currentCol + (nextCol-currentCol)/2
			grid[wallRow][wallCol].CellType = CellEmpty // @step:carve-cell
			passagesCarved++

			if grid[nextRow][nextCol].CellType == CellWall {
				grid[nextRow][nextCol].CellType = CellEmpty // @step:carve-cell
				passagesCarved++
			}

			visited[nextRow][nextCol] = true // @step:carve-cell
			visitedCount++
		}

		currentRow = nextRow // @step:visit
		currentCol = nextCol // @step:visit
	}

	return MazeResult{PassagesCarved: passagesCarved} // @step:complete
}
