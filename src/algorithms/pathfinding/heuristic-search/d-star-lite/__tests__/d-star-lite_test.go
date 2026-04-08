package dstarlite

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
	result := DStarLite(grid, 0, 0, 4, 4)
	if len(result.Path) == 0 {
		t.Error("expected non-empty path")
	}
	if result.Path[0][0] != 0 || result.Path[0][1] != 0 {
		t.Errorf("expected path start [0,0]")
	}
	last := result.Path[len(result.Path)-1]
	if last[0] != 4 || last[1] != 4 {
		t.Errorf("expected path end [4,4]")
	}
}

func TestReturnsEmptyPathWhenNoRoute(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 0)
	setWallCell(grid, 1, 1)
	result := DStarLite(grid, 0, 0, 4, 4)
	if len(result.Path) != 0 {
		t.Errorf("expected empty path, got %d steps", len(result.Path))
	}
}

func TestHandlesStartEqualToEnd(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := DStarLite(grid, 1, 1, 1, 1)
	if len(result.Path) != 1 {
		t.Errorf("expected path length 1, got %d", len(result.Path))
	}
}

func TestPerformsAtLeastOneSearch(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	result := DStarLite(grid, 0, 0, 4, 4)
	if result.ReplanCount == 0 {
		t.Error("expected replanCount > 0")
	}
}

func TestTracksVisitedCells(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	result := DStarLite(grid, 0, 0, 4, 4)
	if len(result.Visited) == 0 {
		t.Error("expected non-empty visited list")
	}
}
