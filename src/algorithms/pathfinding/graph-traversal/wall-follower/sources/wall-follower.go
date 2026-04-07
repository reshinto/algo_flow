// Wall Follower — right-hand rule maze solving: always keep the right wall, follow it to the exit
package wallfollower

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

type WallFollowerResult struct {
	Path    [][]int
	Visited [][]int
}

// Direction indices: 0=up, 1=right, 2=down, 3=left
var directionRow = [4]int{-1, 0, 1, 0}
var directionCol = [4]int{0, 1, 0, -1}

func canMove(grid [][]GridCell, row, col, direction, rowCount, colCount int) bool {
	nextRow := row + directionRow[direction]
	nextCol := col + directionCol[direction]
	if nextRow < 0 || nextRow >= rowCount || nextCol < 0 || nextCol >= colCount {
		return false
	}
	return grid[nextRow][nextCol].CellType != CellWall
}

func WallFollower(grid [][]GridCell, startRow, startCol, endRow, endCol int) WallFollowerResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	var path [][]int    // @step:initialize
	var visited [][]int // @step:initialize

	currentRow := startRow // @step:initialize
	currentCol := startCol // @step:initialize
	// Start facing right (direction index 1)
	facingDirection := 1         // @step:initialize
	maxSteps := rowCount * colCount * 4 // @step:initialize

	for stepCount := 0; stepCount < maxSteps; stepCount++ {
		// @step:open-node
		path = append(path, []int{currentRow, currentCol})       // @step:close-node
		visited = append(visited, []int{currentRow, currentCol}) // @step:close-node

		// Check if we reached the end
		if currentRow == endRow && currentCol == endCol {
			return WallFollowerResult{Path: path, Visited: visited} // @step:trace-path
		}

		// Right-hand rule: try to turn right first, then forward, then left, then back
		rightDirection := (facingDirection + 1) % 4
		leftDirection := (facingDirection + 3) % 4

		if canMove(grid, currentRow, currentCol, rightDirection, rowCount, colCount) {
			// Turn right and move
			facingDirection = rightDirection                         // @step:open-node
			currentRow += directionRow[facingDirection]             // @step:open-node
			currentCol += directionCol[facingDirection]             // @step:open-node
		} else if canMove(grid, currentRow, currentCol, facingDirection, rowCount, colCount) {
			// Move forward
			currentRow += directionRow[facingDirection] // @step:open-node
			currentCol += directionCol[facingDirection] // @step:open-node
		} else if canMove(grid, currentRow, currentCol, leftDirection, rowCount, colCount) {
			// Turn left and move
			facingDirection = leftDirection                          // @step:open-node
			currentRow += directionRow[facingDirection]             // @step:open-node
			currentCol += directionCol[facingDirection]             // @step:open-node
		} else {
			// Turn back (180 degrees)
			facingDirection = (facingDirection + 2) % 4             // @step:open-node
			currentRow += directionRow[facingDirection]             // @step:open-node
			currentCol += directionCol[facingDirection]             // @step:open-node
		}
	}

	return WallFollowerResult{Path: [][]int{}, Visited: visited} // @step:complete
}
