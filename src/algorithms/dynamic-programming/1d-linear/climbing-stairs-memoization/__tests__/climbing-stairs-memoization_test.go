package main

import "testing"

func TestClimbingStairsMemoizationZeroStairs(t *testing.T) {
	memo := make(map[int]int)
	if climbingStairsMemoization(0, memo) != 1 {
		t.Errorf("expected 1 for 0 stairs")
	}
}

func TestClimbingStairsMemoizationOneStair(t *testing.T) {
	memo := make(map[int]int)
	if climbingStairsMemoization(1, memo) != 1 {
		t.Errorf("expected 1 for 1 stair")
	}
}

func TestClimbingStairsMemoizationTwoStairs(t *testing.T) {
	memo := make(map[int]int)
	if climbingStairsMemoization(2, memo) != 2 {
		t.Errorf("expected 2 for 2 stairs")
	}
}

func TestClimbingStairsMemoizationSixStairs(t *testing.T) {
	memo := make(map[int]int)
	if climbingStairsMemoization(6, memo) != 13 {
		t.Errorf("expected 13 for 6 stairs")
	}
}

func TestClimbingStairsMemoizationSevenStairs(t *testing.T) {
	memo := make(map[int]int)
	if climbingStairsMemoization(7, memo) != 21 {
		t.Errorf("expected 21 for 7 stairs")
	}
}

func TestClimbingStairsMemoizationSequence(t *testing.T) {
	expected := []int{1, 1, 2, 3, 5, 8, 13, 21}
	for stairCount, expectedValue := range expected {
		memo := make(map[int]int)
		result := climbingStairsMemoization(stairCount, memo)
		if result != expectedValue {
			t.Errorf("stairs=%d: expected %d, got %d", stairCount, expectedValue, result)
		}
	}
}
