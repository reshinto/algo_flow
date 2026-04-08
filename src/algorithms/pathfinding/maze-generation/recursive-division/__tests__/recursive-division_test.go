package recursivedivision

import "testing"

func makeOpenGrid(rows, cols int) [][]GridCell {
	grid := make([][]GridCell, rows)
	for row := range grid {
		grid[row] = make([]GridCell, cols)
		for col := range grid[row] {
			grid[row][col] = GridCell{Row: row, Col: col, CellType: CellEmpty, State: "default"}
		}
	}
	return grid
}

func bfsReachable(grid [][]GridCell, startRow, startCol, endRow, endCol int) bool {
	rowCount, colCount := len(grid), len(grid[0])
	visited := make([][]bool, rowCount)
	for row := range visited {
		visited[row] = make([]bool, colCount)
	}
	type pos struct{ row, col int }
	queue := []pos{{startRow, startCol}}
	visited[startRow][startCol] = true
	dirs := []pos{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]
		if curr.row == endRow && curr.col == endCol {
			return true
		}
		for _, dir := range dirs {
			nr, nc := curr.row+dir.row, curr.col+dir.col
			if nr >= 0 && nr < rowCount && nc >= 0 && nc < colCount && !visited[nr][nc] && grid[nr][nc].CellType != CellWall {
				visited[nr][nc] = true
				queue = append(queue, pos{nr, nc})
			}
		}
	}
	return false
}

func TestBuildsWalls(t *testing.T) {
	grid := makeOpenGrid(9, 9)
	grid[1][1].CellType = CellStart
	grid[7][7].CellType = CellEnd
	result := RecursiveDivision(grid, 1, 1, 7, 7)
	if result.WallsBuilt == 0 {
		t.Error("expected wallsBuilt > 0")
	}
}

func TestStartAndEndPreserved(t *testing.T) {
	grid := makeOpenGrid(9, 9)
	grid[1][1].CellType = CellStart
	grid[7][7].CellType = CellEnd
	RecursiveDivision(grid, 1, 1, 7, 7)
	if grid[1][1].CellType != CellStart {
		t.Error("start cell should be preserved")
	}
	if grid[7][7].CellType != CellEnd {
		t.Error("end cell should be preserved")
	}
}

func TestPathStillExists(t *testing.T) {
	grid := makeOpenGrid(9, 9)
	grid[1][1].CellType = CellStart
	grid[7][7].CellType = CellEnd
	RecursiveDivision(grid, 1, 1, 7, 7)
	if !bfsReachable(grid, 1, 1, 7, 7) {
		t.Error("start should still reach end after division")
	}
}

func TestWallsActuallyAdded(t *testing.T) {
	grid := makeOpenGrid(9, 9)
	grid[1][1].CellType = CellStart
	grid[7][7].CellType = CellEnd
	RecursiveDivision(grid, 1, 1, 7, 7)
	wallCount := 0
	for _, row := range grid {
		for _, cell := range row {
			if cell.CellType == CellWall {
				wallCount++
			}
		}
	}
	if wallCount == 0 {
		t.Error("expected wall cells in grid after division")
	}
}
