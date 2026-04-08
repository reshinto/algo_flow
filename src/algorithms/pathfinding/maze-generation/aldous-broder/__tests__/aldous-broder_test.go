package aldousbroder

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
	rowCount := len(grid)
	colCount := len(grid[0])
	visited := make([][]bool, rowCount)
	for rowIndex := range visited {
		visited[rowIndex] = make([]bool, colCount)
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
			nextRow, nextCol := curr.row+dir.row, curr.col+dir.col
			if nextRow < 0 || nextRow >= rowCount || nextCol < 0 || nextCol >= colCount {
				continue
			}
			if !visited[nextRow][nextCol] && grid[nextRow][nextCol].CellType != CellWall {
				visited[nextRow][nextCol] = true
				queue = append(queue, pos{nextRow, nextCol})
			}
		}
	}
	return false
}

func TestCarvesPassages(t *testing.T) {
	grid := makeAllWallsGrid(7, 7)
	grid[1][1].CellType = CellStart
	result := AldousBroder(grid, 1, 1)
	if result.PassagesCarved == 0 {
		t.Error("expected passagesCarved > 0")
	}
}

func TestCreatesConnectedMaze(t *testing.T) {
	grid := makeAllWallsGrid(7, 7)
	grid[1][1].CellType = CellStart
	grid[5][5].CellType = CellEnd
	AldousBroder(grid, 1, 1)
	if !bfsReachable(grid, 1, 1, 5, 5) {
		t.Error("start should reach end in connected maze")
	}
}

func TestDoesNotCarveBorderCells(t *testing.T) {
	grid := makeAllWallsGrid(7, 7)
	grid[1][1].CellType = CellStart
	AldousBroder(grid, 1, 1)
	for col := 0; col < 7; col++ {
		if grid[0][col].CellType != CellWall {
			t.Errorf("row 0 col %d should remain wall", col)
		}
		if grid[6][col].CellType != CellWall {
			t.Errorf("row 6 col %d should remain wall", col)
		}
	}
}

func TestCarvesStartCell(t *testing.T) {
	grid := makeAllWallsGrid(7, 7)
	grid[1][1].CellType = CellStart
	AldousBroder(grid, 1, 1)
	if grid[1][1].CellType == CellWall {
		t.Error("start cell should not be wall after maze generation")
	}
}
