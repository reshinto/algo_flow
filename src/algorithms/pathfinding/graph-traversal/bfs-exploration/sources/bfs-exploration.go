// BFS Exploration — explore all reachable cells layer-by-layer using breadth-first search
package bfsexploration

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

type BfsExplorationResult struct {
	Visited [][]int
	Layers  int
}

func BfsExploration(grid [][]GridCell, startRow, startCol int) BfsExplorationResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	visitedSet := make([][]bool, rowCount)
	for rowIndex := range visitedSet {
		visitedSet[rowIndex] = make([]bool, colCount)
	} // @step:initialize
	var visited [][]int // @step:initialize

	// Seed the queue with the start cell and mark layer boundaries
	type Position struct{ row, col int }
	queue := []Position{{startRow, startCol}} // @step:initialize,open-node
	visitedSet[startRow][startCol] = true     // @step:open-node
	layerCount := 0                           // @step:initialize

	directions := []Position{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for len(queue) > 0 {
		// Process the entire current layer before advancing depth
		layerSize := len(queue) // @step:close-node
		layerCount++            // @step:close-node

		for offsetIndex := 0; offsetIndex < layerSize; offsetIndex++ {
			current := queue[0]  // @step:close-node
			queue = queue[1:]    // @step:close-node
			currentRow := current.row // @step:close-node
			currentCol := current.col // @step:close-node
			visited = append(visited, []int{currentRow, currentCol}) // @step:close-node

			// Explore 4-directional neighbors
			for _, dir := range directions {
				neighborRow := currentRow + dir.row
				neighborCol := currentCol + dir.col
				if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
					continue
				}
				if grid[neighborRow][neighborCol].CellType == CellWall {
					continue
				}
				if visitedSet[neighborRow][neighborCol] {
					continue
				}
				visitedSet[neighborRow][neighborCol] = true                      // @step:open-node
				queue = append(queue, Position{neighborRow, neighborCol}) // @step:open-node
			}
		}
	}

	return BfsExplorationResult{Visited: visited, Layers: layerCount} // @step:complete
}
