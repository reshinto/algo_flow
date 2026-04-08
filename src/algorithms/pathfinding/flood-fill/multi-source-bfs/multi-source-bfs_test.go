package multisourcebfs

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

func TestSingleCellDistanceIs1(t *testing.T) {
	grid := makeEmptyGrid(1, 1)
	result := MultiSourceBfs(grid)
	if result.Distances[0][0] != 1 {
		t.Errorf("expected distance 1 for single cell, got %d", result.Distances[0][0])
	}
	if result.MaxDistance != 1 {
		t.Errorf("expected maxDistance 1, got %d", result.MaxDistance)
	}
}

func TestSingleRowAllDistance1(t *testing.T) {
	grid := makeEmptyGrid(1, 5)
	result := MultiSourceBfs(grid)
	for col, dist := range result.Distances[0] {
		if dist != 1 {
			t.Errorf("expected distance 1 at col %d, got %d", col, dist)
		}
	}
}

func TestCenterOf3x3HasDistance2(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := MultiSourceBfs(grid)
	if result.Distances[1][1] != 2 {
		t.Errorf("expected distance 2 at center, got %d", result.Distances[1][1])
	}
	if result.MaxDistance != 2 {
		t.Errorf("expected maxDistance 2, got %d", result.MaxDistance)
	}
}

func TestWallsHaveDistanceMinusOne(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	grid[1][1].CellType = CellWall
	result := MultiSourceBfs(grid)
	if result.Distances[1][1] != -1 {
		t.Errorf("expected -1 for wall cell, got %d", result.Distances[1][1])
	}
}

func TestCenterOf5x5HasMaxDistance3(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	result := MultiSourceBfs(grid)
	if result.MaxDistance != 3 {
		t.Errorf("expected maxDistance 3, got %d", result.MaxDistance)
	}
	if result.Distances[2][2] != 3 {
		t.Errorf("expected distance 3 at 5x5 center, got %d", result.Distances[2][2])
	}
}
