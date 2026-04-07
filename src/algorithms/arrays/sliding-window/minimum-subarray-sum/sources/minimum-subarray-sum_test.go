package minimumsubarraysum

import "testing"

func TestDefaultInput(t *testing.T) {
	minSum, startIndex, endIndex := minimumSubarraySum([]int{3, -4, 2, -3, -1, 7, -5})
	if minSum != -6 {
		t.Errorf("Expected minSum=-6, got %d", minSum)
	}
	if startIndex != 1 {
		t.Errorf("Expected startIndex=1, got %d", startIndex)
	}
	if endIndex != 4 {
		t.Errorf("Expected endIndex=4, got %d", endIndex)
	}
}

func TestAllPositiveReturnsMinElement(t *testing.T) {
	minSum, _, _ := minimumSubarraySum([]int{3, 1, 4, 1, 5})
	if minSum != 1 {
		t.Errorf("Expected minSum=1, got %d", minSum)
	}
}

func TestAllNegativeReturnsFullArray(t *testing.T) {
	minSum, startIndex, endIndex := minimumSubarraySum([]int{-1, -2, -3})
	if minSum != -6 {
		t.Errorf("Expected minSum=-6, got %d", minSum)
	}
	if startIndex != 0 {
		t.Errorf("Expected startIndex=0, got %d", startIndex)
	}
	if endIndex != 2 {
		t.Errorf("Expected endIndex=2, got %d", endIndex)
	}
}

func TestSingleElement(t *testing.T) {
	minSum, startIndex, endIndex := minimumSubarraySum([]int{-5})
	if minSum != -5 {
		t.Errorf("Expected minSum=-5, got %d", minSum)
	}
	if startIndex != 0 || endIndex != 0 {
		t.Errorf("Expected indices (0,0), got (%d,%d)", startIndex, endIndex)
	}
}

func TestEmptyArray(t *testing.T) {
	minSum, _, _ := minimumSubarraySum([]int{})
	if minSum != 0 {
		t.Errorf("Expected minSum=0 for empty array, got %d", minSum)
	}
}

func TestSingleNegativeAmidPositives(t *testing.T) {
	minSum, startIndex, endIndex := minimumSubarraySum([]int{5, 5, -20, 5, 5})
	if minSum != -20 {
		t.Errorf("Expected minSum=-20, got %d", minSum)
	}
	if startIndex != 2 || endIndex != 2 {
		t.Errorf("Expected indices (2,2), got (%d,%d)", startIndex, endIndex)
	}
}

func TestAllSameNegative(t *testing.T) {
	minSum, startIndex, endIndex := minimumSubarraySum([]int{-3, -3, -3})
	if minSum != -9 {
		t.Errorf("Expected minSum=-9, got %d", minSum)
	}
	if startIndex != 0 || endIndex != 2 {
		t.Errorf("Expected indices (0,2), got (%d,%d)", startIndex, endIndex)
	}
}

func TestLargeNegativeInMiddle(t *testing.T) {
	minSum, startIndex, endIndex := minimumSubarraySum([]int{100, -200, 100})
	if minSum != -200 {
		t.Errorf("Expected minSum=-200, got %d", minSum)
	}
	if startIndex != 1 || endIndex != 1 {
		t.Errorf("Expected indices (1,1), got (%d,%d)", startIndex, endIndex)
	}
}
