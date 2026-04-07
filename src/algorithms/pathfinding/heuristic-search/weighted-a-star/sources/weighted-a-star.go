// Weighted A* — A* with inflated heuristic: f(n) = g(n) + weight * h(n). Trades optimality for speed.
package weightedastar

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

type WeightedAStarResult struct {
	Path    [][]int
	Visited [][]int
	Weight  float64
}

func heuristic(rowA, colA, rowB, colB int) float64 {
	rowDiff := rowA - rowB
	if rowDiff < 0 { rowDiff = -rowDiff }
	colDiff := colA - colB
	if colDiff < 0 { colDiff = -colDiff }
	return float64(rowDiff + colDiff)
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

func WeightedAStar(grid [][]GridCell, startRow, startCol, endRow, endCol int, weight float64) WeightedAStarResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	noParent := []int{-1, -1}
	parent := make([][][]int, rowCount)
	gCost := make([][]float64, rowCount)
	inOpenSet := make([][]bool, rowCount)
	for rowIndex := 0; rowIndex < rowCount; rowIndex++ {
		parent[rowIndex] = make([][]int, colCount)
		gCost[rowIndex] = make([]float64, colCount)
		inOpenSet[rowIndex] = make([]bool, colCount)
		for colIndex := range parent[rowIndex] {
			parent[rowIndex][colIndex] = noParent
			gCost[rowIndex][colIndex] = math.MaxFloat64
		}
	} // @step:initialize
	var visited [][]int // @step:initialize

	gCost[startRow][startCol] = 0 // @step:initialize
	startH := heuristic(startRow, startCol, endRow, endCol)
	startF := 0.0 + weight*startH
	// Open list entries: [fCost*1000, gCost*1000, row, col]
	type Entry struct {
		fCost float64
		gCost float64
		row   int
		col   int
	}
	openList := []Entry{{startF, 0.0, startRow, startCol}} // @step:initialize,open-node
	inOpenSet[startRow][startCol] = true                   // @step:open-node

	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for len(openList) > 0 {
		for sortOuter := 0; sortOuter < len(openList); sortOuter++ {
			for sortInner := sortOuter + 1; sortInner < len(openList); sortInner++ {
				if openList[sortOuter].fCost > openList[sortInner].fCost {
					openList[sortOuter], openList[sortInner] = openList[sortInner], openList[sortOuter]
				}
			}
		}
		current := openList[0]   // @step:close-node
		openList = openList[1:]
		currentRow := current.row // @step:close-node
		currentCol := current.col // @step:close-node
		currentG := current.gCost // @step:close-node

		visited = append(visited, []int{currentRow, currentCol}) // @step:close-node
		inOpenSet[currentRow][currentCol] = false                 // @step:close-node

		if currentRow == endRow && currentCol == endCol {
			// @step:trace-path
			return WeightedAStarResult{Path: reconstructPath(parent, []int{endRow, endCol}, noParent), Visited: visited, Weight: weight} // @step:trace-path
		}

		for _, dir := range directions {
			neighborRow := currentRow + dir[0]
			neighborCol := currentCol + dir[1]
			if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
				continue
			}
			if grid[neighborRow][neighborCol].CellType == CellWall { continue }

			neighborG := currentG + 1.0
			if neighborG < gCost[neighborRow][neighborCol] {
				gCost[neighborRow][neighborCol] = neighborG                                 // @step:open-node
				parent[neighborRow][neighborCol] = []int{currentRow, currentCol}            // @step:open-node
				neighborH := heuristic(neighborRow, neighborCol, endRow, endCol)
				// Weighted heuristic: inflating h by weight encourages greedy behavior
				neighborF := neighborG + weight*neighborH                                   // @step:open-node
				inOpenSet[neighborRow][neighborCol] = true
				openList = append(openList, Entry{neighborF, neighborG, neighborRow, neighborCol}) // @step:open-node
			}
		}
	}

	return WeightedAStarResult{Path: [][]int{}, Visited: visited, Weight: weight} // @step:complete
}
