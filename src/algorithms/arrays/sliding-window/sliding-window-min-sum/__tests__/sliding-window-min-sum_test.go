package slidingwindowminsum

import "testing"

func TestDefaultInput(t *testing.T) {
	minSum, windowStartIndex := minSumSubarray([]int{4, 2, 1, 7, 8, 1, 2, 8, 1, 0}, 3)
	if minSum != 7 {
		t.Errorf("Expected minSum=7, got %d", minSum)
	}
	if windowStartIndex != 0 {
		t.Errorf("Expected windowStartIndex=0, got %d", windowStartIndex)
	}
}

func TestWindowAtStart(t *testing.T) {
	minSum, windowStartIndex := minSumSubarray([]int{1, 2, 3, 8, 9, 10}, 3)
	if minSum != 6 {
		t.Errorf("Expected minSum=6, got %d", minSum)
	}
	if windowStartIndex != 0 {
		t.Errorf("Expected windowStartIndex=0, got %d", windowStartIndex)
	}
}

func TestWindowAtEnd(t *testing.T) {
	minSum, windowStartIndex := minSumSubarray([]int{10, 9, 8, 1, 2, 3}, 3)
	if minSum != 6 {
		t.Errorf("Expected minSum=6, got %d", minSum)
	}
	if windowStartIndex != 3 {
		t.Errorf("Expected windowStartIndex=3, got %d", windowStartIndex)
	}
}

func TestEmptyArray(t *testing.T) {
	minSum, _ := minSumSubarray([]int{}, 3)
	if minSum != 0 {
		t.Errorf("Expected minSum=0 for empty array, got %d", minSum)
	}
}

func TestWindowSizeExceedsLength(t *testing.T) {
	minSum, _ := minSumSubarray([]int{1, 2}, 5)
	if minSum != 0 {
		t.Errorf("Expected minSum=0 when window > length, got %d", minSum)
	}
}

func TestNegativeNumbers(t *testing.T) {
	minSum, windowStartIndex := minSumSubarray([]int{-1, -3, -5, -2, -1, -4}, 2)
	if minSum != -8 {
		t.Errorf("Expected minSum=-8, got %d", minSum)
	}
	if windowStartIndex != 1 {
		t.Errorf("Expected windowStartIndex=1, got %d", windowStartIndex)
	}
}

func TestWindowSizeOne(t *testing.T) {
	minSum, windowStartIndex := minSumSubarray([]int{4, 1, 7, 2, 9}, 1)
	if minSum != 1 {
		t.Errorf("Expected minSum=1, got %d", minSum)
	}
	if windowStartIndex != 1 {
		t.Errorf("Expected windowStartIndex=1, got %d", windowStartIndex)
	}
}
