package iterativedeepeningdfs

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
	grid := makeEmptyGrid(4, 4)
	result := IterativeDeepeningDfs(grid, 0, 0, 3, 3)
	if len(result.Path) == 0 {
		t.Error("expected non-empty path")
	}
	if result.Path[0][0] != 0 || result.Path[0][1] != 0 {
		t.Errorf("expected path start [0,0]")
	}
	last := result.Path[len(result.Path)-1]
	if last[0] != 3 || last[1] != 3 {
		t.Errorf("expected path end [3,3]")
	}
}

func TestFindsShortestPath(t *testing.T) {
	grid := makeEmptyGrid(1, 5)
	result := IterativeDeepeningDfs(grid, 0, 0, 0, 4)
	if len(result.Path) != 5 {
		t.Errorf("expected path length 5, got %d", len(result.Path))
	}
}

func TestReturnsEmptyPathWhenNoRoute(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 0)
	setWallCell(grid, 1, 1)
	result := IterativeDeepeningDfs(grid, 0, 0, 2, 2)
	if len(result.Path) != 0 {
		t.Errorf("expected empty path, got %d steps", len(result.Path))
	}
}

func TestHandlesAdjacentStartAndEnd(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := IterativeDeepeningDfs(grid, 0, 0, 0, 1)
	if len(result.Path) != 2 {
		t.Errorf("expected path length 2, got %d", len(result.Path))
	}
}

func TestDepthReached(t *testing.T) {
	grid := makeEmptyGrid(1, 4)
	result := IterativeDeepeningDfs(grid, 0, 0, 0, 3)
	if result.DepthReached != 3 {
		t.Errorf("expected depthReached 3, got %d", result.DepthReached)
	}
}
