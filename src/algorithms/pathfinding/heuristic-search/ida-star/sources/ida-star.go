// IDA* — Iterative Deepening A*: DFS with f-cost threshold that increases each iteration
package idastar

import "math"

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

type IDAStarResult struct {
	Path           [][]int
	Visited        [][]int
	IterationCount int
}

func heuristic(rowA, colA, rowB, colB int) int {
	rowDiff := rowA - rowB
	if rowDiff < 0 { rowDiff = -rowDiff }
	colDiff := colA - colB
	if colDiff < 0 { colDiff = -colDiff }
	return rowDiff + colDiff
}

// Returns -1 for FOUND, math.MaxInt32 for no path, or minimum exceeded threshold
func searchIDA(
	grid [][]GridCell,
	currentPath *[][]int,
	onPath [][]bool,
	gCost, threshold int,
	endRow, endCol int,
	visited *[][]int,
	rowCount, colCount int,
) int {
	head := (*currentPath)[len(*currentPath)-1]
	fCost := gCost + heuristic(head[0], head[1], endRow, endCol) // @step:open-node

	if fCost > threshold {
		return fCost // @step:open-node
	}

	*visited = append(*visited, []int{head[0], head[1]}) // @step:close-node

	if head[0] == endRow && head[1] == endCol {
		return -1 // FOUND // @step:trace-path
	}

	minimumExceeded := math.MaxInt32
	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for _, dir := range directions {
		neighborRow := head[0] + dir[0]
		neighborCol := head[1] + dir[1]
		if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
			continue
		}
		if grid[neighborRow][neighborCol].CellType == CellWall { continue }
		if onPath[neighborRow][neighborCol] { continue } // @step:open-node

		*currentPath = append(*currentPath, []int{neighborRow, neighborCol}) // @step:open-node
		onPath[neighborRow][neighborCol] = true                              // @step:open-node

		subResult := searchIDA(grid, currentPath, onPath, gCost+1, threshold, endRow, endCol, visited, rowCount, colCount)

		if subResult == -1 { return -1 } // FOUND
		if subResult < minimumExceeded { minimumExceeded = subResult }

		*currentPath = (*currentPath)[:len(*currentPath)-1]    // @step:close-node
		onPath[neighborRow][neighborCol] = false               // @step:close-node
	}

	return minimumExceeded
}

func IdaStar(grid [][]GridCell, startRow, startCol, endRow, endCol int) IDAStarResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	var visited [][]int                                                  // @step:initialize
	threshold := heuristic(startRow, startCol, endRow, endCol)           // @step:initialize
	currentPath := [][]int{{startRow, startCol}}                         // @step:initialize
	onPath := make([][]bool, rowCount)
	for rowIndex := range onPath {
		onPath[rowIndex] = make([]bool, colCount)
	} // @step:initialize
	onPath[startRow][startCol] = true // @step:initialize
	iterationCount := 0              // @step:initialize

	for {
		iterationCount++ // @step:close-node
		result := searchIDA(grid, &currentPath, onPath, 0, threshold, endRow, endCol, &visited, rowCount, colCount) // @step:close-node

		if result == -1 {
			// @step:trace-path
			pathCopy := make([][]int, len(currentPath))
			copy(pathCopy, currentPath)
			return IDAStarResult{Path: pathCopy, Visited: visited, IterationCount: iterationCount} // @step:trace-path
		}

		if result == math.MaxInt32 {
			return IDAStarResult{Path: [][]int{}, Visited: visited, IterationCount: iterationCount} // @step:complete
		}

		threshold = result // @step:initialize
	}
}
