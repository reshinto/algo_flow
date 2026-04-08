package subarraysumequalk

import "testing"

func TestCountTwoSubarrays(t *testing.T) {
	count, _ := subarraySumEqualsK([]int{1, 2, 3}, 3)
	if count != 2 {
		t.Errorf("Expected 2, got %d", count)
	}
}

func TestNoMatch(t *testing.T) {
	count, _ := subarraySumEqualsK([]int{1, 2, 3}, 10)
	if count != 0 {
		t.Errorf("Expected 0, got %d", count)
	}
}

func TestSingleElementEqualsK(t *testing.T) {
	count, _ := subarraySumEqualsK([]int{5, 1, 3}, 5)
	if count != 1 {
		t.Errorf("Expected 1, got %d", count)
	}
}

func TestEmptyArray(t *testing.T) {
	count, _ := subarraySumEqualsK([]int{}, 3)
	if count != 0 {
		t.Errorf("Expected 0, got %d", count)
	}
}

func TestAllEqualToK(t *testing.T) {
	count, _ := subarraySumEqualsK([]int{3, 3, 3}, 3)
	if count != 3 {
		t.Errorf("Expected 3, got %d", count)
	}
}

func TestAllZerosTargetZero(t *testing.T) {
	count, _ := subarraySumEqualsK([]int{0, 0, 0}, 0)
	if count != 6 {
		t.Errorf("Expected 6, got %d", count)
	}
}

func TestSingleElementMatch(t *testing.T) {
	count, _ := subarraySumEqualsK([]int{7}, 7)
	if count != 1 {
		t.Errorf("Expected 1, got %d", count)
	}
}

func TestSingleElementNoMatch(t *testing.T) {
	count, _ := subarraySumEqualsK([]int{4}, 7)
	if count != 0 {
		t.Errorf("Expected 0, got %d", count)
	}
}
