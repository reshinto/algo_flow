// Bidirectional BFS — BFS from start and end simultaneously, meeting in the middle
package bidirectionalbfsgrid

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

type BidirectionalBfsResult struct {
	Path    [][]int
	Visited [][]int
}

type position struct{ row, col int }

func buildPath(
	forwardParent [][]position,
	backwardParent [][]position,
	meetingPoint position,
	noParent position,
) [][]int {
	// Build forward path: start → meeting point
	var forwardPath [][]int
	current := meetingPoint
	for current != noParent {
		forwardPath = append([][]int{{current.row, current.col}}, forwardPath...)
		current = forwardParent[current.row][current.col]
	}
	// Build backward path: meeting point → end
	current = backwardParent[meetingPoint.row][meetingPoint.col]
	for current != noParent {
		forwardPath = append(forwardPath, []int{current.row, current.col})
		current = backwardParent[current.row][current.col]
	}
	return forwardPath
}

func BidirectionalBfsGrid(grid [][]GridCell, startRow, startCol, endRow, endCol int) BidirectionalBfsResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}

	if startRow == endRow && startCol == endCol {
		return BidirectionalBfsResult{Path: [][]int{{startRow, startCol}}, Visited: [][]int{{startRow, startCol}}} // @step:complete
	}

	noParent := position{-1, -1}
	// Separate parent maps for forward and backward searches
	forwardParent := make([][]position, rowCount)
	backwardParent := make([][]position, rowCount)
	forwardVisited := make([][]bool, rowCount)
	backwardVisited := make([][]bool, rowCount)
	for rowIndex := 0; rowIndex < rowCount; rowIndex++ {
		forwardParent[rowIndex] = make([]position, colCount)
		backwardParent[rowIndex] = make([]position, colCount)
		forwardVisited[rowIndex] = make([]bool, colCount)
		backwardVisited[rowIndex] = make([]bool, colCount)
		for colIndex := range forwardParent[rowIndex] {
			forwardParent[rowIndex][colIndex] = noParent
			backwardParent[rowIndex][colIndex] = noParent
		}
	} // @step:initialize

	forwardQueue := []position{{startRow, startCol}}  // @step:initialize,open-node
	backwardQueue := []position{{endRow, endCol}}      // @step:initialize,open-node
	forwardVisited[startRow][startCol] = true          // @step:open-node
	backwardVisited[endRow][endCol] = true             // @step:open-node

	directions := []position{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	var allVisited [][]int

	for len(forwardQueue) > 0 || len(backwardQueue) > 0 {
		// Expand forward frontier one step
		if len(forwardQueue) > 0 {
			current := forwardQueue[0] // @step:close-node
			forwardQueue = forwardQueue[1:]
			currentRow := current.row // @step:close-node
			currentCol := current.col // @step:close-node
			allVisited = append(allVisited, []int{currentRow, currentCol}) // @step:close-node

			for _, dir := range directions {
				neighborRow := currentRow + dir.row
				neighborCol := currentCol + dir.col
				if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
					continue
				}
				if grid[neighborRow][neighborCol].CellType == CellWall { continue }
				if forwardVisited[neighborRow][neighborCol] { continue }
				forwardVisited[neighborRow][neighborCol] = true                                           // @step:open-node
				forwardParent[neighborRow][neighborCol] = position{currentRow, currentCol}               // @step:open-node
				forwardQueue = append(forwardQueue, position{neighborRow, neighborCol})                   // @step:open-node

				// Meeting point detected
				if backwardVisited[neighborRow][neighborCol] {
					path := buildPath(forwardParent, backwardParent, position{neighborRow, neighborCol}, noParent)
					return BidirectionalBfsResult{Path: path, Visited: allVisited} // @step:trace-path
				}
			}
		}

		// Expand backward frontier one step
		if len(backwardQueue) > 0 {
			current := backwardQueue[0] // @step:close-node
			backwardQueue = backwardQueue[1:]
			currentRow := current.row // @step:close-node
			currentCol := current.col // @step:close-node
			allVisited = append(allVisited, []int{currentRow, currentCol}) // @step:close-node

			for _, dir := range directions {
				neighborRow := currentRow + dir.row
				neighborCol := currentCol + dir.col
				if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
					continue
				}
				if grid[neighborRow][neighborCol].CellType == CellWall { continue }
				if backwardVisited[neighborRow][neighborCol] { continue }
				backwardVisited[neighborRow][neighborCol] = true                                           // @step:open-node
				backwardParent[neighborRow][neighborCol] = position{currentRow, currentCol}               // @step:open-node
				backwardQueue = append(backwardQueue, position{neighborRow, neighborCol})                   // @step:open-node

				// Meeting point detected
				if forwardVisited[neighborRow][neighborCol] {
					path := buildPath(forwardParent, backwardParent, position{neighborRow, neighborCol}, noParent)
					return BidirectionalBfsResult{Path: path, Visited: allVisited} // @step:trace-path
				}
			}
		}
	}

	return BidirectionalBfsResult{Path: [][]int{}, Visited: allVisited} // @step:complete
}
