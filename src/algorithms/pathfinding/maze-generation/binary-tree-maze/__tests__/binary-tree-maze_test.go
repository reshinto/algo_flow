package binarytreemaze

import "testing"

func makeAllWallsGrid(rows, cols int) [][]GridCell {
	grid := make([][]GridCell, rows)
	for row := range grid {
		grid[row] = make([]GridCell, cols)
		for col := range grid[row] {
			grid[row][col] = GridCell{Row: row, Col: col, CellType: CellWall, State: "default"}
		}
	}
	return grid
}

func TestCarvesPassages(t *testing.T) {
	grid := makeAllWallsGrid(9, 9)
	grid[1][1].CellType = CellStart
	result := BinaryTreeMaze(grid)
	if result.PassagesCarved == 0 {
		t.Error("expected passagesCarved > 0")
	}
}

func TestCarvesAllOddIndexedPassageCells(t *testing.T) {
	grid := makeAllWallsGrid(9, 9)
	grid[1][1].CellType = CellStart
	BinaryTreeMaze(grid)
	for row := 1; row < 8; row += 2 {
		for col := 1; col < 8; col += 2 {
			if grid[row][col].CellType == CellWall {
				t.Errorf("passage cell [%d,%d] should not be wall", row, col)
			}
		}
	}
}

func TestDoesNotCarveBorderCells(t *testing.T) {
	grid := makeAllWallsGrid(9, 9)
	BinaryTreeMaze(grid)
	for col := 0; col < 9; col++ {
		if grid[0][col].CellType != CellWall {
			t.Errorf("row 0 col %d should remain wall", col)
		}
		if grid[8][col].CellType != CellWall {
			t.Errorf("row 8 col %d should remain wall", col)
		}
	}
}

func TestPassagesCarvedGreaterThan16(t *testing.T) {
	grid := makeAllWallsGrid(9, 9)
	grid[1][1].CellType = CellStart
	result := BinaryTreeMaze(grid)
	if result.PassagesCarved <= 16 {
		t.Errorf("expected > 16 passages carved, got %d", result.PassagesCarved)
	}
}
