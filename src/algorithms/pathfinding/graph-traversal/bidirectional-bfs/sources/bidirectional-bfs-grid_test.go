package bidirectionalbfsgrid

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
	result := BidirectionalBfsGrid(grid, 0, 0, 4, 4)
	if len(result.Path) == 0 {
		t.Error("expected non-empty path")
	}
	if result.Path[0][0] != 0 || result.Path[0][1] != 0 {
		t.Errorf("expected path start [0,0], got %v", result.Path[0])
	}
	last := result.Path[len(result.Path)-1]
	if last[0] != 4 || last[1] != 4 {
		t.Errorf("expected path end [4,4], got %v", last)
	}
}

func TestReturnsEmptyPathWhenNoRoute(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	setWallCell(grid, 0, 1)
	setWallCell(grid, 1, 0)
	setWallCell(grid, 1, 1)
	result := BidirectionalBfsGrid(grid, 0, 0, 4, 4)
	if len(result.Path) != 0 {
		t.Errorf("expected empty path, got %d steps", len(result.Path))
	}
}

func TestHandlesStartEqualToEnd(t *testing.T) {
	grid := makeEmptyGrid(3, 3)
	result := BidirectionalBfsGrid(grid, 1, 1, 1, 1)
	if len(result.Path) != 1 {
		t.Errorf("expected path length 1, got %d", len(result.Path))
	}
}

func TestPathIsValidAdjacentSteps(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	result := BidirectionalBfsGrid(grid, 0, 0, 4, 4)
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

func TestTracksVisitedCells(t *testing.T) {
	grid := makeEmptyGrid(5, 5)
	result := BidirectionalBfsGrid(grid, 0, 0, 4, 4)
	if len(result.Visited) == 0 {
		t.Error("expected non-empty visited list")
	}
}
