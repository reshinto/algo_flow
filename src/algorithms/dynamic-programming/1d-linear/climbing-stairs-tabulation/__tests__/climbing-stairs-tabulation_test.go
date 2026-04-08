package main

import "testing"

func TestClimbingStairsTabulationZeroStairs(t *testing.T) {
	if climbingStairsTabulation(0) != 1 {
		t.Errorf("expected 1 for 0 stairs")
	}
}

func TestClimbingStairsTabulationOneStair(t *testing.T) {
	if climbingStairsTabulation(1) != 1 {
		t.Errorf("expected 1 for 1 stair")
	}
}

func TestClimbingStairsTabulationTwoStairs(t *testing.T) {
	if climbingStairsTabulation(2) != 2 {
		t.Errorf("expected 2 for 2 stairs")
	}
}

func TestClimbingStairsTabulationThreeStairs(t *testing.T) {
	if climbingStairsTabulation(3) != 3 {
		t.Errorf("expected 3 for 3 stairs")
	}
}

func TestClimbingStairsTabulationFourStairs(t *testing.T) {
	if climbingStairsTabulation(4) != 5 {
		t.Errorf("expected 5 for 4 stairs")
	}
}

func TestClimbingStairsTabulationSixStairs(t *testing.T) {
	if climbingStairsTabulation(6) != 13 {
		t.Errorf("expected 13 for 6 stairs")
	}
}

func TestClimbingStairsTabulationSevenStairs(t *testing.T) {
	if climbingStairsTabulation(7) != 21 {
		t.Errorf("expected 21 for 7 stairs")
	}
}
