package astar

import "testing"

func makeGrid(rows, cols int) [][]GridCell {
	grid := make([][]GridCell, rows)
	for row := range grid {
		grid[row] = make([]GridCell, cols)
		for col := range grid[row] {
			grid[row][col] = GridCell{Row: row, Col: col, CellType: CellEmpty, State: "default"}
		}
	}
	return grid
}

func TestFindsPath(t *testing.T) {
	grid := makeGrid(5, 5)
	grid[0][0].CellType = CellStart
	grid[4][4].CellType = CellEnd
	result := AStarGrid(grid, [2]int{0, 0}, [2]int{4, 4})
	if len(result.Path) == 0 {
		t.Error("expected path to be found")
	}
}

func TestShortestPathLength(t *testing.T) {
	grid := makeGrid(5, 5)
	grid[0][0].CellType = CellStart
	grid[4][4].CellType = CellEnd
	result := AStarGrid(grid, [2]int{0, 0}, [2]int{4, 4})
	if len(result.Path) != 9 {
		t.Errorf("expected path length 9, got %d", len(result.Path))
	}
}

func TestPathEmptyWhenBlocked(t *testing.T) {
	grid := makeGrid(3, 3)
	grid[0][0].CellType = CellStart
	grid[2][2].CellType = CellEnd
	for row := 0; row < 3; row++ {
		grid[row][1].CellType = CellWall
	}
	result := AStarGrid(grid, [2]int{0, 0}, [2]int{2, 2})
	if len(result.Path) != 0 {
		t.Error("expected empty path when blocked")
	}
}

func TestNavigatesAroundWall(t *testing.T) {
	grid := makeGrid(5, 5)
	grid[0][0].CellType = CellStart
	grid[4][4].CellType = CellEnd
	for row := 0; row < 4; row++ {
		grid[row][2].CellType = CellWall
	}
	result := AStarGrid(grid, [2]int{0, 0}, [2]int{4, 4})
	if len(result.Path) == 0 {
		t.Error("expected path around wall")
	}
}

func TestAdjacentCells(t *testing.T) {
	grid := makeGrid(3, 3)
	grid[0][0].CellType = CellStart
	grid[0][1].CellType = CellEnd
	result := AStarGrid(grid, [2]int{0, 0}, [2]int{0, 1})
	if len(result.Path) != 2 {
		t.Errorf("expected path length 2, got %d", len(result.Path))
	}
}

func TestTracksVisited(t *testing.T) {
	grid := makeGrid(5, 5)
	grid[0][0].CellType = CellStart
	grid[4][4].CellType = CellEnd
	result := AStarGrid(grid, [2]int{0, 0}, [2]int{4, 4})
	if len(result.Visited) == 0 {
		t.Error("expected visited cells to be tracked")
	}
}
