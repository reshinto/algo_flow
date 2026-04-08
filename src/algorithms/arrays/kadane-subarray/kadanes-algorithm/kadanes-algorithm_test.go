package kadanesalgorithm

import "testing"

func TestMixedArray(t *testing.T) {
	maxSum, start, end := kadanesAlgorithm([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4})
	if maxSum != 6 || start != 3 || end != 6 {
		t.Errorf("Expected maxSum=6 start=3 end=6, got %d %d %d", maxSum, start, end)
	}
}

func TestAllPositive(t *testing.T) {
	maxSum, start, end := kadanesAlgorithm([]int{1, 2, 3, 4, 5})
	if maxSum != 15 || start != 0 || end != 4 {
		t.Errorf("Expected maxSum=15 start=0 end=4, got %d %d %d", maxSum, start, end)
	}
}

func TestAllNegative(t *testing.T) {
	maxSum, start, end := kadanesAlgorithm([]int{-5, -3, -8, -1, -4})
	if maxSum != -1 || start != 3 || end != 3 {
		t.Errorf("Expected maxSum=-1 start=3 end=3, got %d %d %d", maxSum, start, end)
	}
}

func TestSingleElement(t *testing.T) {
	maxSum, start, end := kadanesAlgorithm([]int{42})
	if maxSum != 42 || start != 0 || end != 0 {
		t.Errorf("Expected maxSum=42 start=0 end=0, got %d %d %d", maxSum, start, end)
	}
}

func TestEmptyArray(t *testing.T) {
	maxSum, start, end := kadanesAlgorithm([]int{})
	if maxSum != 0 || start != -1 || end != -1 {
		t.Errorf("Expected maxSum=0 start=-1 end=-1, got %d %d %d", maxSum, start, end)
	}
}

func TestAllIdentical(t *testing.T) {
	maxSum, start, end := kadanesAlgorithm([]int{3, 3, 3, 3})
	if maxSum != 12 || start != 0 || end != 3 {
		t.Errorf("Expected maxSum=12 start=0 end=3, got %d %d %d", maxSum, start, end)
	}
}

func TestMaxAtStart(t *testing.T) {
	maxSum, start, end := kadanesAlgorithm([]int{10, 9, -100, 1, 2})
	if maxSum != 19 || start != 0 || end != 1 {
		t.Errorf("Expected maxSum=19 start=0 end=1, got %d %d %d", maxSum, start, end)
	}
}

func TestMaxAtEnd(t *testing.T) {
	maxSum, start, end := kadanesAlgorithm([]int{1, -100, 8, 9, 10})
	if maxSum != 27 || start != 2 || end != 4 {
		t.Errorf("Expected maxSum=27 start=2 end=4, got %d %d %d", maxSum, start, end)
	}
}
