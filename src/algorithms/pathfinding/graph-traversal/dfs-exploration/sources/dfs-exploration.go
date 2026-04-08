// DFS Exploration — explore all reachable cells using iterative depth-first search with a stack
package dfsexploration

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

type DfsExplorationResult struct {
	Visited  [][]int
	MaxDepth int
}

func DfsExploration(grid [][]GridCell, startRow, startCol int) DfsExplorationResult {
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

	// Stack stores (row, col, depth) tuples for iterative DFS
	type Frame struct{ row, col, depth int }
	stack := []Frame{{startRow, startCol, 0}} // @step:initialize,open-node
	visitedSet[startRow][startCol] = true     // @step:open-node
	maxDepth := 0                             // @step:initialize

	// Directions in reverse order for natural DFS snaking
	type Position struct{ row, col int }
	directions := []Position{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

	for len(stack) > 0 {
		// Pop from top of stack — DFS always expands the deepest unvisited cell
		current := stack[len(stack)-1]   // @step:close-node
		stack = stack[:len(stack)-1]     // @step:close-node
		currentRow := current.row        // @step:close-node
		currentCol := current.col        // @step:close-node
		currentDepth := current.depth    // @step:close-node
		visited = append(visited, []int{currentRow, currentCol}) // @step:close-node
		if currentDepth > maxDepth {
			maxDepth = currentDepth // @step:close-node
		}

		// Explore 4-directional neighbors in reverse order for natural DFS snaking
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
			visitedSet[neighborRow][neighborCol] = true                                         // @step:open-node
			stack = append(stack, Frame{neighborRow, neighborCol, currentDepth + 1}) // @step:open-node
		}
	}

	return DfsExplorationResult{Visited: visited, MaxDepth: maxDepth} // @step:complete
}
