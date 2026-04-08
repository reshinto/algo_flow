package main

import "testing"

func TestTwoSum_FindsPairSummingToTargetInDefault(t *testing.T) {
	result := twoSum([]int{2, 7, 11, 15}, 9)
	if result != [2]int{0, 1} {
		t.Errorf("expected [0, 1], got %v", result)
	}
}

func TestTwoSum_FindsPairAtEndOfArray(t *testing.T) {
	result := twoSum([]int{3, 2, 4}, 6)
	if result != [2]int{1, 2} {
		t.Errorf("expected [1, 2], got %v", result)
	}
}

func TestTwoSum_FindsPairUsingSameIndexOnce(t *testing.T) {
	result := twoSum([]int{3, 3}, 6)
	if result != [2]int{0, 1} {
		t.Errorf("expected [0, 1], got %v", result)
	}
}

func TestTwoSum_HandlesNegativeNumbers(t *testing.T) {
	result := twoSum([]int{-3, 4, 3, 90}, 0)
	if result != [2]int{0, 2} {
		t.Errorf("expected [0, 2], got %v", result)
	}
}

func TestTwoSum_HandlesZeroAsTarget(t *testing.T) {
	result := twoSum([]int{-1, 0, 1, 2}, 0)
	if result != [2]int{0, 2} {
		t.Errorf("expected [0, 2], got %v", result)
	}
}

func TestTwoSum_FindsPairAtBeginning(t *testing.T) {
	result := twoSum([]int{5, 3, 1, 9}, 8)
	if result != [2]int{0, 1} {
		t.Errorf("expected [0, 1], got %v", result)
	}
}

func TestTwoSum_HandlesTwoElementArray(t *testing.T) {
	result := twoSum([]int{4, 6}, 10)
	if result != [2]int{0, 1} {
		t.Errorf("expected [0, 1], got %v", result)
	}
}
