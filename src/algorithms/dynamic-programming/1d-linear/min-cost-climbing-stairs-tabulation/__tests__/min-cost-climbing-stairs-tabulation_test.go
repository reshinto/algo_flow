package main

import "testing"

func TestMinCostClimbingStairsTabulationEmpty(t *testing.T) {
	if minCostClimbingStairsTabulation([]int{}) != 0 {
		t.Errorf("empty array should return 0")
	}
}

func TestMinCostClimbingStairsTabulation10_15(t *testing.T) {
	if minCostClimbingStairsTabulation([]int{10, 15}) != 10 {
		t.Errorf("[10,15] should return 10")
	}
}

func TestMinCostClimbingStairsTabulation10_15_20(t *testing.T) {
	if minCostClimbingStairsTabulation([]int{10, 15, 20}) != 15 {
		t.Errorf("[10,15,20] should return 15")
	}
}

func TestMinCostClimbingStairsTabulationDefaultInput(t *testing.T) {
	if minCostClimbingStairsTabulation([]int{10, 15, 20, 5, 25, 10}) != 30 {
		t.Errorf("default input should return 30")
	}
}

func TestMinCostClimbingStairsTabulationLeetcodeExample(t *testing.T) {
	if minCostClimbingStairsTabulation([]int{1, 100, 1, 1, 1, 100, 1, 1, 100, 1}) != 6 {
		t.Errorf("leetcode example should return 6")
	}
}

func TestMinCostClimbingStairsTabulationSingleElement(t *testing.T) {
	if minCostClimbingStairsTabulation([]int{5}) != 0 {
		t.Errorf("[5] should return 0")
	}
}
