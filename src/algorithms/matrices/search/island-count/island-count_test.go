package main

import "testing"

func TestIslandCountCounts2IslandsInStandardGrid(t *testing.T) {
	grid := [][]int{{1, 1, 0, 0}, {1, 0, 0, 1}, {0, 0, 1, 1}, {0, 0, 0, 0}}
	if islandCount(grid) != 2 {
		t.Errorf("expected 2 islands")
	}
}

func TestIslandCountReturns0WhenNoIslands(t *testing.T) {
	grid := [][]int{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}
	if islandCount(grid) != 0 {
		t.Errorf("expected 0 islands")
	}
}

func TestIslandCountEntireGridIsLand(t *testing.T) {
	grid := [][]int{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}}
	if islandCount(grid) != 1 {
		t.Errorf("expected 1 island")
	}
}

func TestIslandCount1x1WithIsland(t *testing.T) {
	grid := [][]int{{1}}
	if islandCount(grid) != 1 {
		t.Errorf("expected 1 island")
	}
}

func TestIslandCount1x1WithNoIsland(t *testing.T) {
	grid := [][]int{{0}}
	if islandCount(grid) != 0 {
		t.Errorf("expected 0 islands")
	}
}

func TestIslandCountDiagonallyAdjacentNotConnected(t *testing.T) {
	grid := [][]int{{1, 0, 1}, {0, 1, 0}, {1, 0, 1}}
	if islandCount(grid) != 5 {
		t.Errorf("expected 5 islands (diagonals not connected)")
	}
}

func TestIslandCountLShapedIslandCountsAsOne(t *testing.T) {
	grid := [][]int{{1, 0}, {1, 0}, {1, 1}}
	if islandCount(grid) != 1 {
		t.Errorf("expected 1 island for L-shape")
	}
}

func TestIslandCountSingleRowGrid(t *testing.T) {
	grid := [][]int{{1, 0, 1, 1, 0, 1}}
	if islandCount(grid) != 3 {
		t.Errorf("expected 3 islands in single row")
	}
}

func TestIslandCountSingleColumnGrid(t *testing.T) {
	grid := [][]int{{1}, {0}, {1}, {1}, {0}}
	if islandCount(grid) != 2 {
		t.Errorf("expected 2 islands in single column")
	}
}

func TestIslandCountDefaultInput3Islands(t *testing.T) {
	grid := [][]int{
		{1, 1, 0, 0, 0},
		{1, 1, 0, 0, 0},
		{0, 0, 1, 0, 0},
		{0, 0, 0, 1, 1},
	}
	if islandCount(grid) != 3 {
		t.Errorf("expected 3 islands in default input")
	}
}
