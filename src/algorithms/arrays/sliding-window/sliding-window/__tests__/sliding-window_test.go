package slidingwindow

import "testing"

func TestBasicArray(t *testing.T) {
	maxSum, windowStartIndex := maxSumSubarray([]int{2, 1, 5, 1, 3, 2}, 3)
	if maxSum != 9 {
		t.Errorf("Expected maxSum=9, got %d", maxSum)
	}
	if windowStartIndex != 2 {
		t.Errorf("Expected windowStartIndex=2, got %d", windowStartIndex)
	}
}

func TestWindowAtStart(t *testing.T) {
	maxSum, windowStartIndex := maxSumSubarray([]int{10, 9, 8, 1, 2, 3}, 3)
	if maxSum != 27 {
		t.Errorf("Expected maxSum=27, got %d", maxSum)
	}
	if windowStartIndex != 0 {
		t.Errorf("Expected windowStartIndex=0, got %d", windowStartIndex)
	}
}

func TestWindowAtEnd(t *testing.T) {
	maxSum, windowStartIndex := maxSumSubarray([]int{1, 2, 3, 8, 9, 10}, 3)
	if maxSum != 27 {
		t.Errorf("Expected maxSum=27, got %d", maxSum)
	}
	if windowStartIndex != 3 {
		t.Errorf("Expected windowStartIndex=3, got %d", windowStartIndex)
	}
}

func TestEmptyArray(t *testing.T) {
	maxSum, _ := maxSumSubarray([]int{}, 3)
	if maxSum != 0 {
		t.Errorf("Expected maxSum=0 for empty array, got %d", maxSum)
	}
}

func TestWindowExceedsLength(t *testing.T) {
	maxSum, _ := maxSumSubarray([]int{1, 2}, 5)
	if maxSum != 0 {
		t.Errorf("Expected maxSum=0 when window > length, got %d", maxSum)
	}
}

func TestNegativeNumbers(t *testing.T) {
	maxSum, windowStartIndex := maxSumSubarray([]int{-1, -3, -5, -2, -1, -4}, 2)
	if maxSum != -3 {
		t.Errorf("Expected maxSum=-3, got %d", maxSum)
	}
	if windowStartIndex != 3 {
		t.Errorf("Expected windowStartIndex=3, got %d", windowStartIndex)
	}
}

func TestDefaultAlgorithmInput(t *testing.T) {
	maxSum, windowStartIndex := maxSumSubarray([]int{2, 1, 5, 1, 3, 2, 8, 4, 3, 5}, 3)
	if maxSum != 15 {
		t.Errorf("Expected maxSum=15, got %d", maxSum)
	}
	if windowStartIndex != 6 {
		t.Errorf("Expected windowStartIndex=6, got %d", windowStartIndex)
	}
}
