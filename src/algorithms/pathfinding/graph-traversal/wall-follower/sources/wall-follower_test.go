package wallfollower

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

func TestFindsPathInSimpleCorridor(t *testing.T) {
	grid := makeEmptyGrid(1, 5)
	result := WallFollower(grid, 0, 0, 0, 4)
	if len(result.Path) == 0 {
		t.Error("expected non-empty path")
	}
	last := result.Path[len(result.Path)-1]
	if last[0] != 0 || last[1] != 4 {
		t.Errorf("expected path end [0,4], got %v", last)
	}
}

func TestStartsPathAtStartPosition(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := WallFollower(grid, 0, 0, 2, 2)
	if result.Path[0][0] != 0 || result.Path[0][1] != 0 {
		t.Errorf("expected path start [0,0]")
	}
}

func TestReturnsEmptyPathWhenStartIsolated(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 0)
	setWallCell(grid, 1, 1)
	result := WallFollower(grid, 0, 0, 2, 2)
	if len(result.Path) != 0 {
		t.Errorf("expected empty path, got %d steps", len(result.Path))
	}
}

func TestPathStepsAreAdjacent(t *testing.T) {
	grid := makeEmptyGrid(1, 5)
	result := WallFollower(grid, 0, 0, 0, 4)
	for pathIndex := 1; pathIndex < len(result.Path); pathIndex++ {
		prev := result.Path[pathIndex-1]
		curr := result.Path[pathIndex]
		rowDiff := curr[0] - prev[0]
		if rowDiff < 0 {
			rowDiff = -rowDiff
		}
		colDiff := curr[1] - prev[1]
		if colDiff < 0 {
			colDiff = -colDiff
		}
		if rowDiff+colDiff != 1 {
			t.Errorf("path step %d not adjacent", pathIndex)
		}
	}
}

func TestReturnsVisitedCells(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := WallFollower(grid, 0, 0, 2, 2)
	if len(result.Visited) == 0 {
		t.Error("expected non-empty visited list")
	}
}
