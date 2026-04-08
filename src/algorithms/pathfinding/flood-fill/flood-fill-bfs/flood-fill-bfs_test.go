package floodfillbfs

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
	result := FloodFillBfs(grid, 0, 0)
	if result.Count != 9 {
		t.Errorf("expected 9 filled cells, got %d", result.Count)
	}
	if len(result.Filled) != 9 {
		t.Errorf("expected filled length 9, got %d", len(result.Filled))
	}
}

func TestRespectsWalls(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 1)
	setWallCell(grid, 2, 1)
	result := FloodFillBfs(grid, 0, 0)
	if result.Count != 3 {
		t.Errorf("expected 3 filled cells, got %d", result.Count)
	}
}

func TestEnclosedRegion(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	for col := 0; col < 5; col++ {
		setWallCell(grid, 0, col)
		setWallCell(grid, 4, col)
	}
	for row := 1; row < 4; row++ {
		setWallCell(grid, row, 0)
		setWallCell(grid, row, 4)
	}
	result := FloodFillBfs(grid, 2, 2)
	if result.Count != 9 {
		t.Errorf("expected 9 cells in enclosed region, got %d", result.Count)
	}
}

func TestSeedCellIsFirstFilled(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := FloodFillBfs(grid, 1, 1)
	if result.Filled[0][0] != 1 || result.Filled[0][1] != 1 {
		t.Errorf("expected first filled cell to be [1,1]")
	}
}

func TestIsolatedCell(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 0)
	setWallCell(grid, 1, 2)
	setWallCell(grid, 2, 1)
	result := FloodFillBfs(grid, 1, 1)
	if result.Count != 1 {
		t.Errorf("expected 1 isolated cell, got %d", result.Count)
	}
}

func TestCountMatchesFilledLength(t *testing.T) {
	grid := makeEmptyGrid(4, 4)
	setWallCell(grid, 2, 0)
	setWallCell(grid, 2, 1)
	setWallCell(grid, 2, 2)
	result := FloodFillBfs(grid, 0, 0)
	if result.Count != len(result.Filled) {
		t.Errorf("count %d does not match filled length %d", result.Count, len(result.Filled))
	}
}
