// Multi-Source BFS — computes distance from nearest wall for every empty cell simultaneously
package multisourcebfs

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

type MultiSourceResult struct {
	Distances   [][]int
	MaxDistance int
}

func MultiSourceBfs(grid [][]GridCell) MultiSourceResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	distances := make([][]int, rowCount)
	for rowIndex := range distances {
		distances[rowIndex] = make([]int, colCount)
		for colIndex := range distances[rowIndex] {
			distances[rowIndex][colIndex] = -1
		}
	} // @step:initialize

	// Seed queue with ALL empty cells adjacent to a wall (distance = 1)
	type Position struct{ row, col int }
	var queue []Position // @step:initialize,open-node
	directions := []Position{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for rowIndex := 0; rowIndex < rowCount; rowIndex++ {
		for colIndex := 0; colIndex < colCount; colIndex++ {
			if grid[rowIndex][colIndex].CellType == CellWall {
				continue
			}
			// Check if any neighbor is a wall
			adjacentToWall := false
			for _, dir := range directions {
				neighborRow := rowIndex + dir.row
				neighborCol := colIndex + dir.col
				if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
					adjacentToWall = true // grid boundary counts as wall
					break
				}
				if grid[neighborRow][neighborCol].CellType == CellWall {
					// @step:open-node
					adjacentToWall = true
					break
				}
			}
			if adjacentToWall {
				distances[rowIndex][colIndex] = 1                        // @step:open-node
				queue = append(queue, Position{rowIndex, colIndex}) // @step:open-node
			}
		}
	}

	maxDistance := 1

	for len(queue) > 0 {
		current := queue[0] // @step:close-node
		queue = queue[1:]
		currentRow := current.row                          // @step:close-node
		currentCol := current.col                          // @step:close-node
		currentDistance := distances[currentRow][currentCol] // @step:update-cost

		for _, dir := range directions {
			neighborRow := currentRow + dir.row
			neighborCol := currentCol + dir.col
			if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
				continue
			}
			if grid[neighborRow][neighborCol].CellType == CellWall {
				continue
			}
			if distances[neighborRow][neighborCol] != -1 {
				continue
			}
			neighborDistance := currentDistance + 1
			distances[neighborRow][neighborCol] = neighborDistance // @step:update-cost
			if neighborDistance > maxDistance {
				maxDistance = neighborDistance
			}
			queue = append(queue, Position{neighborRow, neighborCol}) // @step:open-node
		}
	}

	return MultiSourceResult{Distances: distances, MaxDistance: maxDistance} // @step:complete
}
