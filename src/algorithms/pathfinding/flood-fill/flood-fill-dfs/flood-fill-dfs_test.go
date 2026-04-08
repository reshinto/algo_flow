package floodfilldfs

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

func TestFillsAllCellsOnSmallEmptyGrid(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := FloodFillDfs(grid, 0, 0)
	if result.Count != 9 {
		t.Errorf("expected 9 filled cells, got %d", result.Count)
	}
}

func TestRespectsWalls(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 1)
	setWallCell(grid, 2, 1)
	result := FloodFillDfs(grid, 0, 0)
	if result.Count != 3 {
		t.Errorf("expected 3 filled cells, got %d", result.Count)
	}
}

func TestFillsSameTotalCount(t *testing.T) {
	grid := makeEmptyGrid(4, 4)
	setWallCell(grid, 1, 2)
	setWallCell(grid, 2, 2)
	result := FloodFillDfs(grid, 0, 0)
	if result.Count != 14 {
		t.Errorf("expected 14 filled cells, got %d", result.Count)
	}
}

func TestIsolatedCell(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 0)
	setWallCell(grid, 1, 2)
	setWallCell(grid, 2, 1)
	result := FloodFillDfs(grid, 1, 1)
	if result.Count != 1 {
		t.Errorf("expected 1 isolated cell, got %d", result.Count)
	}
}

func TestCountMatchesFilledLength(t *testing.T) {
	grid := makeEmptyGrid(4, 4)
	setWallCell(grid, 0, 2)
	setWallCell(grid, 1, 2)
	result := FloodFillDfs(grid, 0, 0)
	if result.Count != len(result.Filled) {
		t.Errorf("count %d does not match filled length %d", result.Count, len(result.Filled))
	}
}
