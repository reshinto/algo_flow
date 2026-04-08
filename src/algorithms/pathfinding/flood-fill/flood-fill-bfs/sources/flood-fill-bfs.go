// Flood Fill BFS — classic paint bucket fill using breadth-first search
package floodfillbfs

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

type FloodFillResult struct {
	Filled [][]int
	Count  int
}

func FloodFillBfs(grid [][]GridCell, startRow, startCol int) FloodFillResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	filledSet := make([][]bool, rowCount)
	for rowIndex := range filledSet {
		filledSet[rowIndex] = make([]bool, colCount)
	} // @step:initialize
	var filled [][]int // @step:initialize
	// Seed the queue with the start cell
	type Position struct{ row, col int }
	queue := []Position{{startRow, startCol}} // @step:initialize,open-node
	filledSet[startRow][startCol] = true      // @step:open-node

	directions := []Position{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for len(queue) > 0 {
		// Dequeue the front cell — BFS processes cells level by level
		current := queue[0]     // @step:close-node
		queue = queue[1:]       // @step:close-node
		currentRow := current.row // @step:close-node
		currentCol := current.col // @step:close-node
		filled = append(filled, []int{currentRow, currentCol}) // @step:close-node

		// Explore 4-directional neighbors (up, down, left, right)
		for _, dir := range directions {
			neighborRow := currentRow + dir.row
			neighborCol := currentCol + dir.col
			if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
				continue
			}
			if grid[neighborRow][neighborCol].CellType == CellWall {
				continue
			}
			if filledSet[neighborRow][neighborCol] {
				continue
			}
			// Mark on enqueue to avoid duplicates
			filledSet[neighborRow][neighborCol] = true                      // @step:open-node
			queue = append(queue, Position{neighborRow, neighborCol}) // @step:open-node
		}
	}
	count := len(filled)
	return FloodFillResult{Filled: filled, Count: count} // @step:complete
}
