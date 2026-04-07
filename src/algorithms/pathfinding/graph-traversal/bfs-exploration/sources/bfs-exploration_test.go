package bfsexploration

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

func TestVisitsAllCellsInOpenGrid(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := BfsExploration(grid, 0, 0)
	if len(result.Visited) != 9 {
		t.Errorf("expected 9 visited cells, got %d", len(result.Visited))
	}
}

func TestStartsWithStartCell(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := BfsExploration(grid, 1, 1)
	if result.Visited[0][0] != 1 || result.Visited[0][1] != 1 {
		t.Errorf("expected first visited to be [1,1]")
	}
}

func TestDoesNotVisitWallCells(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 0)
	setWallCell(grid, 1, 1)
	result := BfsExploration(grid, 0, 0)
	if len(result.Visited) != 1 {
		t.Errorf("expected 1 visited cell, got %d", len(result.Visited))
	}
}

func TestVisitsOnlyReachableCells(t *testing.T) {
	grid := makeEmptyGrid(4, 4)
	for wallRow := 0; wallRow < 4; wallRow++ {
		setWallCell(grid, wallRow, 2)
	}
	result := BfsExploration(grid, 0, 0)
	if len(result.Visited) != 8 {
		t.Errorf("expected 8 visited cells, got %d", len(result.Visited))
	}
}

func TestHandles1x1Grid(t *testing.T) {
	grid := makeEmptyGrid(1, 1)
	result := BfsExploration(grid, 0, 0)
	if len(result.Visited) != 1 {
		t.Errorf("expected 1 visited cell, got %d", len(result.Visited))
	}
	if result.Layers != 1 {
		t.Errorf("expected layers=1, got %d", result.Layers)
	}
}

func TestNoCellVisitedTwice(t *testing.T) {
	grid := makeEmptyGrid(4, 4)
	result := BfsExploration(grid, 0, 0)
	type pos struct{ row, col int }
	seen := make(map[pos]bool)
	for _, cell := range result.Visited {
		key := pos{cell[0], cell[1]}
		if seen[key] {
			t.Errorf("cell %v visited twice", key)
		}
		seen[key] = true
	}
}
