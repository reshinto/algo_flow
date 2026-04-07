// Best-First Tie Breaking — A* with cross-product tie-breaking for aesthetically straight paths
package bestfirsttiebreaking

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

type TieBreakingResult struct {
	Path    [][]int
	Visited [][]int
}

func heuristic(rowA, colA, rowB, colB int) int {
	rowDiff := rowA - rowB
	if rowDiff < 0 {
		rowDiff = -rowDiff
	}
	colDiff := colA - colB
	if colDiff < 0 {
		colDiff = -colDiff
	}
	return rowDiff + colDiff
}

func crossProduct(startRow, startCol, nodeRow, nodeCol, endRow, endCol int) int {
	deltaRow1 := nodeRow - startRow
	deltaCol1 := nodeCol - startCol
	deltaRow2 := endRow - startRow
	deltaCol2 := endCol - startCol
	val := deltaRow1*deltaCol2 - deltaRow2*deltaCol1
	if val < 0 {
		return -val
	}
	return val
}

func reconstructPath(parent [][][]int, end []int, noParent []int) [][]int {
	var path [][]int
	current := end
	for current[0] != noParent[0] || current[1] != noParent[1] {
		path = append([][]int{{current[0], current[1]}}, path...)
		current = parent[current[0]][current[1]]
	}
	return path
}

func BestFirstTieBreaking(grid [][]GridCell, startRow, startCol, endRow, endCol int) TieBreakingResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	noParent := []int{-1, -1}
	parent := make([][][]int, rowCount)
	gCost := make([][]int, rowCount)
	inOpenSet := make([][]bool, rowCount)
	for rowIndex := 0; rowIndex < rowCount; rowIndex++ {
		parent[rowIndex] = make([][]int, colCount)
		gCost[rowIndex] = make([]int, colCount)
		inOpenSet[rowIndex] = make([]bool, colCount)
		for colIndex := 0; colIndex < colCount; colIndex++ {
			parent[rowIndex][colIndex] = noParent
			gCost[rowIndex][colIndex] = math.MaxInt32
		}
	} // @step:initialize
	var visited [][]int // @step:initialize

	gCost[startRow][startCol] = 0 // @step:initialize
	startH := heuristic(startRow, startCol, endRow, endCol)
	startTie := crossProduct(startRow, startCol, startRow, startCol, endRow, endCol)
	// Open list entries: [fCost, hCost, tieBreaker, gCost, row, col]
	type Entry [6]int
	openList := []Entry{{startH, startH, startTie, 0, startRow, startCol}} // @step:initialize,open-node
	inOpenSet[startRow][startCol] = true                                    // @step:open-node

	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for len(openList) > 0 {
		// Sort by: fCost, then hCost, then cross-product tie breaker
		for sortOuter := 0; sortOuter < len(openList); sortOuter++ {
			for sortInner := sortOuter + 1; sortInner < len(openList); sortInner++ {
				first := openList[sortOuter]
				second := openList[sortInner]
				shouldSwap := first[0] > second[0] ||
					(first[0] == second[0] && first[1] > second[1]) ||
					(first[0] == second[0] && first[1] == second[1] && first[2] > second[2])
				if shouldSwap {
					openList[sortOuter], openList[sortInner] = openList[sortInner], openList[sortOuter]
				}
			}
		}

		current := openList[0]   // @step:close-node
		openList = openList[1:]
		currentRow := current[4] // @step:close-node
		currentCol := current[5] // @step:close-node
		currentG := current[3]   // @step:close-node

		visited = append(visited, []int{currentRow, currentCol}) // @step:close-node
		inOpenSet[currentRow][currentCol] = false                 // @step:close-node

		if currentRow == endRow && currentCol == endCol {
			// @step:trace-path
			return TieBreakingResult{Path: reconstructPath(parent, []int{endRow, endCol}, noParent), Visited: visited} // @step:trace-path
		}

		for _, dir := range directions {
			neighborRow := currentRow + dir[0]
			neighborCol := currentCol + dir[1]
			if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
				continue
			}
			if grid[neighborRow][neighborCol].CellType == CellWall {
				continue
			}

			neighborG := currentG + 1
			if neighborG < gCost[neighborRow][neighborCol] {
				gCost[neighborRow][neighborCol] = neighborG                                              // @step:open-node
				parent[neighborRow][neighborCol] = []int{currentRow, currentCol}                         // @step:open-node
				neighborH := heuristic(neighborRow, neighborCol, endRow, endCol)
				neighborF := neighborG + neighborH
				// Cross-product tie-breaking: prefer nodes on the straight line from start to end
				tieBreaker := crossProduct(startRow, startCol, neighborRow, neighborCol, endRow, endCol) // @step:open-node
				inOpenSet[neighborRow][neighborCol] = true
				openList = append(openList, Entry{neighborF, neighborH, tieBreaker, neighborG, neighborRow, neighborCol}) // @step:open-node
			}
		}
	}

	return TieBreakingResult{Path: [][]int{}, Visited: visited} // @step:complete
}
