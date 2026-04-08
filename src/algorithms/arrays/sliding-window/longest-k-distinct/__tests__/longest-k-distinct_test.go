package longestkdistinct

import "testing"

func TestDefaultInput(t *testing.T) {
	maxLen, _ := longestKDistinct([]int{1, 2, 1, 2, 3, 3, 4, 1}, 2)
	if maxLen != 4 {
		t.Errorf("Expected 4, got %d", maxLen)
	}
}

func TestKEqualsOne(t *testing.T) {
	maxLen, start := longestKDistinct([]int{1, 2, 2, 3, 3, 3}, 1)
	if maxLen != 3 || start != 3 {
		t.Errorf("Expected maxLen=3 start=3, got %d %d", maxLen, start)
	}
}

func TestKGteDistinct(t *testing.T) {
	maxLen, start := longestKDistinct([]int{1, 2, 3}, 5)
	if maxLen != 3 || start != 0 {
		t.Errorf("Expected maxLen=3 start=0, got %d %d", maxLen, start)
	}
}

func TestAllIdentical(t *testing.T) {
	maxLen, start := longestKDistinct([]int{2, 2, 2, 2}, 2)
	if maxLen != 4 || start != 0 {
		t.Errorf("Expected maxLen=4 start=0, got %d %d", maxLen, start)
	}
}

func TestKZero(t *testing.T) {
	maxLen, _ := longestKDistinct([]int{1, 2, 3}, 0)
	if maxLen != 0 {
		t.Errorf("Expected 0, got %d", maxLen)
	}
}

func TestEmptyArray(t *testing.T) {
	maxLen, _ := longestKDistinct([]int{}, 2)
	if maxLen != 0 {
		t.Errorf("Expected 0, got %d", maxLen)
	}
}

func TestSingleElement(t *testing.T) {
	maxLen, start := longestKDistinct([]int{7}, 1)
	if maxLen != 1 || start != 0 {
		t.Errorf("Expected maxLen=1 start=0, got %d %d", maxLen, start)
	}
}
