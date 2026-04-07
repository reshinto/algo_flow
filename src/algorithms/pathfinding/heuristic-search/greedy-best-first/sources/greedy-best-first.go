// Greedy Best-First Search — navigate a grid using only the heuristic h(n) = Manhattan distance
package greedybestfirst

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

type GreedyResult struct {
	Path    [][]int
	Visited [][]int
}

func manhattanDistance(rowA, colA, rowB, colB int) int {
	rowDiff := rowA - rowB
	if rowDiff < 0 { rowDiff = -rowDiff }
	colDiff := colA - colB
	if colDiff < 0 { colDiff = -colDiff }
	return rowDiff + colDiff
}

func reconstructPath(parent [][][]int, end, noParent []int) [][]int {
	var path [][]int
	current := end
	for current[0] != noParent[0] || current[1] != noParent[1] {
		path = append([][]int{{current[0], current[1]}}, path...)
		current = parent[current[0]][current[1]]
	}
	return path
}

func GreedyBestFirst(grid [][]GridCell, startRow, startCol, endRow, endCol int) GreedyResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	noParent := []int{-1, -1}
	parent := make([][][]int, rowCount)
	inOpenSet := make([][]bool, rowCount)
	closedSet := make([][]bool, rowCount)
	for rowIndex := 0; rowIndex < rowCount; rowIndex++ {
		parent[rowIndex] = make([][]int, colCount)
		inOpenSet[rowIndex] = make([]bool, colCount)
		closedSet[rowIndex] = make([]bool, colCount)
		for colIndex := range parent[rowIndex] {
			parent[rowIndex][colIndex] = noParent
		}
	} // @step:initialize
	var visited [][]int // @step:initialize

	// Priority queue entries: [hCost, row, col]
	type Entry [3]int
	openList := []Entry{{manhattanDistance(startRow, startCol, endRow, endCol), startRow, startCol}} // @step:initialize,open-node
	inOpenSet[startRow][startCol] = true                                                              // @step:open-node

	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for len(openList) > 0 {
		// Dequeue node with lowest hCost (greedy: ignore g-cost entirely)
		for sortOuter := 0; sortOuter < len(openList); sortOuter++ {
			for sortInner := sortOuter + 1; sortInner < len(openList); sortInner++ {
				if openList[sortOuter][0] > openList[sortInner][0] {
					openList[sortOuter], openList[sortInner] = openList[sortInner], openList[sortOuter]
				}
			}
		} // @step:close-node
		current := openList[0]   // @step:close-node
		openList = openList[1:]
		currentRow := current[1] // @step:close-node
		currentCol := current[2] // @step:close-node

		closedSet[currentRow][currentCol] = true                       // @step:close-node
		visited = append(visited, []int{currentRow, currentCol}) // @step:close-node

		// Check if goal reached
		if currentRow == endRow && currentCol == endCol {
			// @step:trace-path
			return GreedyResult{Path: reconstructPath(parent, []int{endRow, endCol}, noParent), Visited: visited} // @step:trace-path
		}

		// Expand neighbors sorted by heuristic only
		for _, dir := range directions {
			neighborRow := currentRow + dir[0]
			neighborCol := currentCol + dir[1]
			if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
				continue
			}
			if grid[neighborRow][neighborCol].CellType == CellWall { continue }
			if closedSet[neighborRow][neighborCol] { continue }
			if inOpenSet[neighborRow][neighborCol] { continue }

			// Greedy: use only heuristic, g-cost is always treated as 0
			hCost := manhattanDistance(neighborRow, neighborCol, endRow, endCol)  // @step:open-node
			inOpenSet[neighborRow][neighborCol] = true                            // @step:open-node
			parent[neighborRow][neighborCol] = []int{currentRow, currentCol}      // @step:open-node
			openList = append(openList, Entry{hCost, neighborRow, neighborCol})   // @step:open-node
		}
	}

	return GreedyResult{Path: [][]int{}, Visited: visited} // @step:complete
}
