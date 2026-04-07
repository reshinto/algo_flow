package main

import "testing"

func TestPerfectSquares12(t *testing.T) {
	if perfectSquares(12) != 3 {
		t.Errorf("n=12 should return 3")
	}
}

func TestPerfectSquares13(t *testing.T) {
	if perfectSquares(13) != 2 {
		t.Errorf("n=13 should return 2")
	}
}

func TestPerfectSquares1(t *testing.T) {
	if perfectSquares(1) != 1 {
		t.Errorf("n=1 should return 1")
	}
}

func TestPerfectSquares4(t *testing.T) {
	if perfectSquares(4) != 1 {
		t.Errorf("n=4 should return 1")
	}
}

func TestPerfectSquares7(t *testing.T) {
	if perfectSquares(7) != 4 {
		t.Errorf("n=7 should return 4")
	}
}

func TestPerfectSquares0(t *testing.T) {
	if perfectSquares(0) != 0 {
		t.Errorf("n=0 should return 0")
	}
}

func TestPerfectSquares9(t *testing.T) {
	if perfectSquares(9) != 1 {
		t.Errorf("n=9 should return 1")
	}
}

func TestPerfectSquares5(t *testing.T) {
	if perfectSquares(5) != 2 {
		t.Errorf("n=5 should return 2")
	}
}
