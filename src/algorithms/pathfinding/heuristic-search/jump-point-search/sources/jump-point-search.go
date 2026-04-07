// Jump Point Search — A* optimization that "jumps" over intermediate nodes in uniform-cost grids
package jumppointsearch

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

type JpsResult struct {
	Path       [][]int
	Visited    [][]int
	JumpPoints [][]int
}

func heuristic(rowA, colA, rowB, colB int) int {
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

func hasForced(grid [][]GridCell, row, col, deltaRow, deltaCol, rowCount, colCount int) bool {
	if deltaRow != 0 && deltaCol == 0 {
		prevRow := row - deltaRow
		leftBlocked := col-1 >= 0 && prevRow >= 0 && prevRow < rowCount && grid[prevRow][col-1].CellType == CellWall
		rightBlocked := col+1 < colCount && prevRow >= 0 && prevRow < rowCount && grid[prevRow][col+1].CellType == CellWall
		leftOpen := col-1 >= 0 && grid[row][col-1].CellType != CellWall
		rightOpen := col+1 < colCount && grid[row][col+1].CellType != CellWall
		return (leftBlocked && leftOpen) || (rightBlocked && rightOpen)
	}
	if deltaCol != 0 && deltaRow == 0 {
		prevCol := col - deltaCol
		upBlocked := row-1 >= 0 && prevCol >= 0 && prevCol < colCount && grid[row-1][prevCol].CellType == CellWall
		downBlocked := row+1 < rowCount && prevCol >= 0 && prevCol < colCount && grid[row+1][prevCol].CellType == CellWall
		upOpen := row-1 >= 0 && grid[row-1][col].CellType != CellWall
		downOpen := row+1 < rowCount && grid[row+1][col].CellType != CellWall
		return (upBlocked && upOpen) || (downBlocked && downOpen)
	}
	return false
}

func jumpStep(grid [][]GridCell, row, col, deltaRow, deltaCol, endRow, endCol, rowCount, colCount int) (int, int, bool) {
	currentRow := row + deltaRow
	currentCol := col + deltaCol
	for {
		if currentRow < 0 || currentRow >= rowCount || currentCol < 0 || currentCol >= colCount { return 0, 0, false }
		if grid[currentRow][currentCol].CellType == CellWall { return 0, 0, false }
		if currentRow == endRow && currentCol == endCol { return currentRow, currentCol, true }
		if hasForced(grid, currentRow, currentCol, deltaRow, deltaCol, rowCount, colCount) { return currentRow, currentCol, true }
		if deltaRow != 0 && currentRow == endRow { return currentRow, currentCol, true }
		if deltaCol != 0 && currentCol == endCol { return currentRow, currentCol, true }
		currentRow += deltaRow
		currentCol += deltaCol
	}
}

func JumpPointSearch(grid [][]GridCell, startRow, startCol, endRow, endCol int) JpsResult {
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
		for colIndex := range parent[rowIndex] {
			parent[rowIndex][colIndex] = noParent
			gCost[rowIndex][colIndex] = math.MaxInt32
		}
	} // @step:initialize
	var visited [][]int    // @step:initialize
	var jumpPoints [][]int // @step:initialize

	gCost[startRow][startCol] = 0 // @step:initialize
	startH := heuristic(startRow, startCol, endRow, endCol)
	type Entry [4]int // fCost, gCost, row, col
	openList := []Entry{{startH, 0, startRow, startCol}} // @step:initialize,open-node
	inOpenSet[startRow][startCol] = true                 // @step:open-node

	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for len(openList) > 0 {
		for sortOuter := 0; sortOuter < len(openList); sortOuter++ {
			for sortInner := sortOuter + 1; sortInner < len(openList); sortInner++ {
				if openList[sortOuter][0] > openList[sortInner][0] {
					openList[sortOuter], openList[sortInner] = openList[sortInner], openList[sortOuter]
				}
			}
		}
		current := openList[0]   // @step:close-node
		openList = openList[1:]
		currentRow := current[2] // @step:close-node
		currentCol := current[3] // @step:close-node
		currentG := current[1]   // @step:close-node

		visited = append(visited, []int{currentRow, currentCol}) // @step:close-node

		if currentRow == endRow && currentCol == endCol {
			// @step:trace-path
			return JpsResult{Path: reconstructPath(parent, []int{endRow, endCol}, noParent), Visited: visited, JumpPoints: jumpPoints} // @step:trace-path
		}

		// Try jumping in each cardinal direction from the current node
		for _, dir := range directions {
			jumpRow, jumpCol, found := jumpStep(grid, currentRow, currentCol, dir[0], dir[1], endRow, endCol, rowCount, colCount)
			if !found { continue }

			// Mark intermediate nodes along the jump as jump points
			scanRow := currentRow + dir[0]
			scanCol := currentCol + dir[1]
			for scanRow != jumpRow || scanCol != jumpCol {
				if hasForced(grid, scanRow, scanCol, dir[0], dir[1], rowCount, colCount) {
					jumpPoints = append(jumpPoints, []int{scanRow, scanCol}) // @step:visit
				}
				scanRow += dir[0]
				scanCol += dir[1]
			}

			neighborG := currentG + heuristic(currentRow, currentCol, jumpRow, jumpCol)
			if neighborG < gCost[jumpRow][jumpCol] {
				gCost[jumpRow][jumpCol] = neighborG                                              // @step:open-node
				parent[jumpRow][jumpCol] = []int{currentRow, currentCol}                         // @step:open-node
				jumpH := heuristic(jumpRow, jumpCol, endRow, endCol)
				jumpF := neighborG + jumpH
				inOpenSet[jumpRow][jumpCol] = true
				openList = append(openList, Entry{jumpF, neighborG, jumpRow, jumpCol}) // @step:open-node
			}
		}
	}

	return JpsResult{Path: [][]int{}, Visited: visited, JumpPoints: jumpPoints} // @step:complete
}
