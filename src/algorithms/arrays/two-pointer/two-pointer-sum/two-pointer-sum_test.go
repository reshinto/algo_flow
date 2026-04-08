package twopointersum

import "testing"

func TestBasicSortedArray(t *testing.T) {
	found, leftIndex, rightIndex := twoPointerSum([]int{1, 2, 4, 6, 8, 11, 15}, 10)
	if !found {
		t.Error("Expected found=true")
	}
	if leftIndex != 1 {
		t.Errorf("Expected leftIndex=1, got %d", leftIndex)
	}
	if rightIndex != 4 {
		t.Errorf("Expected rightIndex=4, got %d", rightIndex)
	}
}

func TestPairAtOutermostPositions(t *testing.T) {
	found, leftIndex, rightIndex := twoPointerSum([]int{1, 2, 3, 4, 5}, 6)
	if !found {
		t.Error("Expected found=true")
	}
	if leftIndex != 0 || rightIndex != 4 {
		t.Errorf("Expected indices (0,4), got (%d,%d)", leftIndex, rightIndex)
	}
}

func TestNotFound(t *testing.T) {
	found, leftIndex, rightIndex := twoPointerSum([]int{1, 3, 5, 7}, 2)
	if found {
		t.Error("Expected found=false")
	}
	if leftIndex != -1 || rightIndex != -1 {
		t.Errorf("Expected (-1,-1), got (%d,%d)", leftIndex, rightIndex)
	}
}

func TestSingleElement(t *testing.T) {
	found, _, _ := twoPointerSum([]int{5}, 10)
	if found {
		t.Error("Expected found=false for single element")
	}
}

func TestEmptyArray(t *testing.T) {
	found, _, _ := twoPointerSum([]int{}, 10)
	if found {
		t.Error("Expected found=false for empty array")
	}
}

func TestAllIdenticalElementsMatch(t *testing.T) {
	found, _, _ := twoPointerSum([]int{5, 5, 5, 5}, 10)
	if !found {
		t.Error("Expected found=true for matching identical elements")
	}
}

func TestAllIdenticalElementsNoMatch(t *testing.T) {
	found, _, _ := twoPointerSum([]int{3, 3, 3, 3}, 10)
	if found {
		t.Error("Expected found=false when sum doesn't match")
	}
}

func TestNegativeNumbers(t *testing.T) {
	found, leftIndex, rightIndex := twoPointerSum([]int{-3, -1, 0, 2, 4}, 1)
	if !found {
		t.Error("Expected found=true")
	}
	if leftIndex != 0 || rightIndex != 4 {
		t.Errorf("Expected (0,4), got (%d,%d)", leftIndex, rightIndex)
	}
}
