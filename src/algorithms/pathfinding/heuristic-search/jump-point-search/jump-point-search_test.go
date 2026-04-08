package jumppointsearch

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

func TestFindsPathAlongSharedRow(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	result := JumpPointSearch(grid, 2, 0, 2, 4)
	if len(result.Path) == 0 {
		t.Error("expected non-empty path")
	}
	if result.Path[0][0] != 2 || result.Path[0][1] != 0 {
		t.Errorf("expected path start [2,0]")
	}
	last := result.Path[len(result.Path)-1]
	if last[0] != 2 || last[1] != 4 {
		t.Errorf("expected path end [2,4]")
	}
}

func TestReturnsEmptyPathWhenNoRoute(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 0)
	setWallCell(grid, 1, 1)
	result := JumpPointSearch(grid, 0, 0, 4, 4)
	if len(result.Path) != 0 {
		t.Errorf("expected empty path, got %d steps", len(result.Path))
	}
}

func TestHandlesStartEqualToEnd(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := JumpPointSearch(grid, 1, 1, 1, 1)
	if len(result.Path) != 1 {
		t.Errorf("expected path length 1, got %d", len(result.Path))
	}
}

func TestExploresFewerNodesOnCorridor(t *testing.T) {
	grid := makeEmptyGrid(10, 3)
	result := JumpPointSearch(grid, 0, 1, 9, 1)
	if len(result.Visited) >= 30 {
		t.Errorf("expected fewer than 30 visited nodes, got %d", len(result.Visited))
	}
	if len(result.Path) == 0 {
		t.Error("expected non-empty path")
	}
}
