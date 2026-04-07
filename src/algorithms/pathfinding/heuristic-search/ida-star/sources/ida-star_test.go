package idastar

import "testing"

func makeEmptyGrid(rows, cols int) [][]GridCell {
	grid := make([][]GridCell, rows)
	for row := range grid {
		grid[row] = make([]GridCell, cols)
		for col := range grid[row] {
			grid[row][col] = GridCell{Row: row, Col: col, CellType: CellEmpty, State: "default"}
		}
	}
	return grid
}

func setWallCell(grid [][]GridCell, row, col int) {
	grid[row][col].CellType = CellWall
}

func TestFindsPathOnEmptyGrid(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	result := IdaStar(grid, 0, 0, 4, 4)
	if len(result.Path) == 0 {
		t.Error("expected non-empty path")
	}
	last := result.Path[len(result.Path)-1]
	if last[0] != 4 || last[1] != 4 {
		t.Errorf("expected path end [4,4]")
	}
}

func TestFindsOptimalPathLength(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	result := IdaStar(grid, 0, 0, 4, 4)
	if len(result.Path) != 9 {
		t.Errorf("expected path length 9, got %d", len(result.Path))
	}
}

func TestReturnsEmptyPathWhenNoRoute(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 0)
	setWallCell(grid, 1, 1)
	result := IdaStar(grid, 0, 0, 4, 4)
	if len(result.Path) != 0 {
		t.Errorf("expected empty path, got %d steps", len(result.Path))
	}
}

func TestHandlesAdjacentStartAndEnd(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := IdaStar(grid, 0, 0, 0, 1)
	if len(result.Path) != 2 {
		t.Errorf("expected path length 2, got %d", len(result.Path))
	}
}

func TestHandlesStartEqualToEnd(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := IdaStar(grid, 1, 1, 1, 1)
	if len(result.Path) != 1 {
		t.Errorf("expected path length 1, got %d", len(result.Path))
	}
}

func TestRecordsIterationCount(t *testing.T) {
	grid := makeEmptyGrid(4, 4)
	result := IdaStar(grid, 0, 0, 3, 3)
	if result.IterationCount == 0 {
		t.Error("expected iterationCount > 0")
	}
}
