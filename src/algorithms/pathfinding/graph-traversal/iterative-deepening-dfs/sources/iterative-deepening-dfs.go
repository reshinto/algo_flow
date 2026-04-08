// Iterative Deepening DFS — DFS with increasing depth limits, combining BFS optimality with DFS memory efficiency
package iterativedeepeningdfs

import "fmt"

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

type IddfsResult struct {
	Path         [][]int
	Visited      [][]int
	DepthReached int
}

func depthLimitedSearch(
	grid [][]GridCell,
	currentRow, currentCol, endRow, endCol int,
	depthRemaining int,
	pathSet map[string]bool,
	allVisited *[][]int,
	rowCount, colCount int,
) [][]int {
	*allVisited = append(*allVisited, []int{currentRow, currentCol})

	if currentRow == endRow && currentCol == endCol {
		return [][]int{{currentRow, currentCol}}
	}

	if depthRemaining == 0 {
		return nil
	}

	pathSet[fmt.Sprintf("%d,%d", currentRow, currentCol)] = true
	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for _, dir := range directions {
		neighborRow := currentRow + dir[0]
		neighborCol := currentCol + dir[1]
		if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
			continue
		}
		if grid[neighborRow][neighborCol].CellType == CellWall {
			continue
		}
		if pathSet[fmt.Sprintf("%d,%d", neighborRow, neighborCol)] {
			continue
		}

		subResult := depthLimitedSearch(grid, neighborRow, neighborCol, endRow, endCol,
			depthRemaining-1, pathSet, allVisited, rowCount, colCount)
		if subResult != nil {
			result := [][]int{{currentRow, currentCol}}
			result = append(result, subResult...)
			delete(pathSet, fmt.Sprintf("%d,%d", currentRow, currentCol))
			return result
		}
	}

	delete(pathSet, fmt.Sprintf("%d,%d", currentRow, currentCol))
	return nil
}

func IterativeDeepeningDfs(grid [][]GridCell, startRow, startCol, endRow, endCol int) IddfsResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	var allVisited [][]int // @step:initialize

	// Increase depth limit one step at a time until target is reached
	for depthLimit := 0; depthLimit <= rowCount*colCount; depthLimit++ {
		// @step:initialize
		pathSet := make(map[string]bool) // @step:open-node
		result := depthLimitedSearch(grid, startRow, startCol, endRow, endCol,
			depthLimit, pathSet, &allVisited, rowCount, colCount) // @step:close-node

		if result != nil {
			return IddfsResult{Path: result, Visited: allVisited, DepthReached: depthLimit} // @step:trace-path
		}
	}

	return IddfsResult{Path: [][]int{}, Visited: allVisited, DepthReached: 0} // @step:complete
}
