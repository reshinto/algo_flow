// D* Lite — Incremental replanning: searches from goal to start, then replans after obstacle discovery
package dstarlite

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

type DStarResult struct {
	Path        [][]int
	Visited     [][]int
	ReplanCount int
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

func reconstructPath(parent [][][]int, end, noParent []int) [][]int {
	var path [][]int
	current := end
	for current[0] != noParent[0] || current[1] != noParent[1] {
		path = append([][]int{{current[0], current[1]}}, path...)
		current = parent[current[0]][current[1]]
	}
	return path
}

func aStarSearch(
	grid [][]GridCell,
	startRow, startCol, endRow, endCol int,
	rowCount, colCount int,
	visited *[][]int,
) [][]int {
	noParent := []int{-1, -1}
	parent := make([][][]int, rowCount)
	gCost := make([][]int, rowCount)
	for rowIndex := 0; rowIndex < rowCount; rowIndex++ {
		parent[rowIndex] = make([][]int, colCount)
		gCost[rowIndex] = make([]int, colCount)
		for colIndex := range parent[rowIndex] {
			parent[rowIndex][colIndex] = noParent
			gCost[rowIndex][colIndex] = math.MaxInt32
		}
	}
	gCost[startRow][startCol] = 0
	startH := heuristic(startRow, startCol, endRow, endCol)
	type Entry [4]int // fCost, gCost, row, col
	openList := []Entry{{startH, 0, startRow, startCol}}

	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for len(openList) > 0 {
		// Sort by fCost
		for sortOuter := 0; sortOuter < len(openList); sortOuter++ {
			for sortInner := sortOuter + 1; sortInner < len(openList); sortInner++ {
				if openList[sortOuter][0] > openList[sortInner][0] {
					openList[sortOuter], openList[sortInner] = openList[sortInner], openList[sortOuter]
				}
			}
		}
		current := openList[0]
		openList = openList[1:]
		currentG := current[1]
		currentRow := current[2]
		currentCol := current[3]

		*visited = append(*visited, []int{currentRow, currentCol}) // @step:close-node

		if currentRow == endRow && currentCol == endCol {
			return reconstructPath(parent, []int{endRow, endCol}, noParent) // @step:trace-path
		}

		for _, dir := range directions {
			neighborRow := currentRow + dir[0]
			neighborCol := currentCol + dir[1]
			if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
				continue
			}
			if grid[neighborRow][neighborCol].CellType == CellWall { continue }
			neighborG := currentG + 1
			if neighborG < gCost[neighborRow][neighborCol] {
				gCost[neighborRow][neighborCol] = neighborG                                              // @step:open-node
				parent[neighborRow][neighborCol] = []int{currentRow, currentCol}                         // @step:open-node
				neighborH := heuristic(neighborRow, neighborCol, endRow, endCol)
				openList = append(openList, Entry{neighborG + neighborH, neighborG, neighborRow, neighborCol}) // @step:open-node
			}
		}
	}
	return nil
}

func findObstacleCandidate(grid [][]GridCell, path [][]int, rowCount, colCount int) (int, int, bool) {
	if len(path) < 4 { return 0, 0, false }
	midCell := path[len(path)/2]
	candidates := [][2]int{
		{midCell[0] - 1, midCell[1]}, {midCell[0] + 1, midCell[1]},
		{midCell[0], midCell[1] - 1}, {midCell[0], midCell[1] + 1},
	}
	for _, candidate := range candidates {
		if candidate[0] < 0 || candidate[0] >= rowCount { continue }
		if candidate[1] < 0 || candidate[1] >= colCount { continue }
		if grid[candidate[0]][candidate[1]].CellType == CellEmpty {
			return candidate[0], candidate[1], true
		}
	}
	return 0, 0, false
}

func DStarLite(grid [][]GridCell, startRow, startCol, endRow, endCol int) DStarResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	// Work on a mutable copy of the grid for obstacle simulation
	workingGrid := make([][]GridCell, rowCount)
	for rowIndex := range workingGrid {
		workingGrid[rowIndex] = make([]GridCell, colCount)
		copy(workingGrid[rowIndex], grid[rowIndex])
	} // @step:initialize
	var visited [][]int // @step:initialize
	replanCount := 0   // @step:initialize

	// Phase 1: initial A* search from start to end
	initialResult := aStarSearch(workingGrid, startRow, startCol, endRow, endCol, rowCount, colCount, &visited) // @step:close-node

	if initialResult == nil {
		return DStarResult{Path: [][]int{}, Visited: visited, ReplanCount: replanCount} // @step:complete
	}

	replanCount++ // @step:close-node

	// Phase 2: simulate discovering a new obstacle mid-path and replan
	obstacleRow, obstacleCol, found := findObstacleCandidate(workingGrid, initialResult, rowCount, colCount) // @step:open-node

	if found {
		workingGrid[obstacleRow][obstacleCol].CellType = CellWall // @step:open-node

		replanResult := aStarSearch(workingGrid, startRow, startCol, endRow, endCol, rowCount, colCount, &visited) // @step:close-node
		replanCount++                                                                                               // @step:close-node

		if replanResult != nil {
			return DStarResult{Path: replanResult, Visited: visited, ReplanCount: replanCount} // @step:trace-path
		}
		return DStarResult{Path: [][]int{}, Visited: visited, ReplanCount: replanCount} // @step:complete
	}

	return DStarResult{Path: initialResult, Visited: visited, ReplanCount: replanCount} // @step:trace-path
}
