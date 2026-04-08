package dfsexploration

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
	result := DfsExploration(grid, 0, 0)
	if len(result.Visited) != 9 {
		t.Errorf("expected 9 visited cells, got %d", len(result.Visited))
	}
}

func TestStartsWithStartCell(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := DfsExploration(grid, 1, 1)
	if result.Visited[0][0] != 1 || result.Visited[0][1] != 1 {
		t.Errorf("expected first visited to be [1,1]")
	}
}

func TestDoesNotVisitWallCells(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 0)
	setWallCell(grid, 1, 1)
	result := DfsExploration(grid, 0, 0)
	if len(result.Visited) != 1 {
		t.Errorf("expected 1 visited cell, got %d", len(result.Visited))
	}
}

func TestVisitsOnlyReachableCells(t *testing.T) {
	grid := makeEmptyGrid(4, 4)
	for wallRow := 0; wallRow < 4; wallRow++ {
		setWallCell(grid, wallRow, 2)
	}
	result := DfsExploration(grid, 0, 0)
	if len(result.Visited) != 8 {
		t.Errorf("expected 8 visited cells, got %d", len(result.Visited))
	}
}

func TestMaxDepthInLinearCorridor(t *testing.T) {
	grid := makeEmptyGrid(1, 5)
	result := DfsExploration(grid, 0, 0)
	if result.MaxDepth != 4 {
		t.Errorf("expected maxDepth 4, got %d", result.MaxDepth)
	}
}

func TestHandles1x1Grid(t *testing.T) {
	grid := makeEmptyGrid(1, 1)
	result := DfsExploration(grid, 0, 0)
	if len(result.Visited) != 1 {
		t.Errorf("expected 1 visited cell, got %d", len(result.Visited))
	}
	if result.MaxDepth != 0 {
		t.Errorf("expected maxDepth 0, got %d", result.MaxDepth)
	}
}
