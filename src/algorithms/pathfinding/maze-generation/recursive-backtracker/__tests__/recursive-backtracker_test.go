package recursivebacktracker

import "testing"

func makeAllWallsGrid(rows, cols int) [][]GridCell {
	grid := make([][]GridCell, rows)
	for row := range grid {
		grid[row] = make([]GridCell, cols)
		for col := range grid[row] {
			grid[row][col] = GridCell{Row: row, Col: col, CellType: CellWall, State: "default"}
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

func TestCarvesPassages(t *testing.T) {
	grid := makeAllWallsGrid(9, 9)
	grid[1][1].CellType = CellStart
	result := RecursiveBacktrackerMaze(grid, 1, 1)
	if result.PassagesCarved == 0 {
		t.Error("expected passagesCarved > 0")
	}
}

func TestCreatesConnectedMaze(t *testing.T) {
	grid := makeAllWallsGrid(9, 9)
	grid[1][1].CellType = CellStart
	grid[7][7].CellType = CellEnd
	RecursiveBacktrackerMaze(grid, 1, 1)
	if !bfsReachable(grid, 1, 1, 7, 7) {
		t.Error("start should reach end in connected maze")
	}
}

func TestDoesNotCarveBorderCells(t *testing.T) {
	grid := makeAllWallsGrid(9, 9)
	grid[1][1].CellType = CellStart
	RecursiveBacktrackerMaze(grid, 1, 1)
	for col := 0; col < 9; col++ {
		if grid[0][col].CellType != CellWall {
			t.Errorf("row 0 col %d should remain wall", col)
		}
		if grid[8][col].CellType != CellWall {
			t.Errorf("row 8 col %d should remain wall", col)
		}
	}
}

func TestStartCellIsCarved(t *testing.T) {
	grid := makeAllWallsGrid(9, 9)
	grid[1][1].CellType = CellStart
	RecursiveBacktrackerMaze(grid, 1, 1)
	if grid[1][1].CellType == CellWall {
		t.Error("start cell should be carved")
	}
}
