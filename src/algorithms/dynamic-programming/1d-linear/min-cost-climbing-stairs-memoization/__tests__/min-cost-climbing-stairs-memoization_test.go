package main

import "testing"

func TestMinCostClimbingStairsMemoizationEmpty(t *testing.T) {
	if minCostClimbingStairsMemoization([]int{}) != 0 {
		t.Errorf("empty array should return 0")
	}
}

func TestMinCostClimbingStairsMemoizationSingleStep(t *testing.T) {
	if minCostClimbingStairsMemoization([]int{10}) != 0 {
		t.Errorf("[10] should return 0")
	}
}

func TestMinCostClimbingStairsMemoizationTwoCosts(t *testing.T) {
	if minCostClimbingStairsMemoization([]int{10, 15}) != 10 {
		t.Errorf("[10,15] should return 10")
	}
}

func TestMinCostClimbingStairsMemoizationThreeCosts(t *testing.T) {
	if minCostClimbingStairsMemoization([]int{10, 15, 20}) != 15 {
		t.Errorf("[10,15,20] should return 15")
	}
}

func TestMinCostClimbingStairsMemoizationDefaultInput(t *testing.T) {
	if minCostClimbingStairsMemoization([]int{10, 15, 20, 5, 25, 10}) != 30 {
		t.Errorf("default input should return 30")
	}
}

func TestMinCostClimbingStairsMemoizationLeetcodeExample(t *testing.T) {
	if minCostClimbingStairsMemoization([]int{1, 100, 1, 1, 1, 100, 1, 1, 100, 1}) != 6 {
		t.Errorf("leetcode example should return 6")
	}
}
