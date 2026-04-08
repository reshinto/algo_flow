package main

import "testing"

func TestUniquePaths3x7(t *testing.T) {
	if uniquePaths(3, 7) != 28 {
		t.Errorf("3x7 grid should return 28")
	}
}

func TestUniquePaths1x1(t *testing.T) {
	if uniquePaths(1, 1) != 1 {
		t.Errorf("1x1 grid should return 1")
	}
}

func TestUniquePaths3x2(t *testing.T) {
	if uniquePaths(3, 2) != 3 {
		t.Errorf("3x2 grid should return 3")
	}
}

func TestUniquePaths3x3(t *testing.T) {
	if uniquePaths(3, 3) != 6 {
		t.Errorf("3x3 grid should return 6")
	}
}

func TestUniquePathsSingleRow(t *testing.T) {
	if uniquePaths(1, 5) != 1 {
		t.Errorf("single row should return 1")
	}
}

func TestUniquePathsSingleColumn(t *testing.T) {
	if uniquePaths(5, 1) != 1 {
		t.Errorf("single column should return 1")
	}
}

func TestUniquePaths5x5(t *testing.T) {
	if uniquePaths(5, 5) != 70 {
		t.Errorf("5x5 grid should return 70")
	}
}

func TestUniquePaths7x7(t *testing.T) {
	if uniquePaths(7, 7) != 924 {
		t.Errorf("7x7 grid should return 924")
	}
}
