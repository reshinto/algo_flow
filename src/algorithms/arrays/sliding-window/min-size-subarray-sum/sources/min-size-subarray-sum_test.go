package minsizesubarraysum

import "testing"

func TestMinSizeSubarraySumBasic(t *testing.T) {
	minLength, startIndex := minSizeSubarraySum([]int{2, 3, 1, 2, 4, 3}, 7)
	if minLength != 2 || startIndex != 4 {
		t.Errorf("expected (2, 4), got (%d, %d)", minLength, startIndex)
	}
}

func TestMinSizeSubarraySumSingleElementMeetsTarget(t *testing.T) {
	minLength, _ := minSizeSubarraySum([]int{1, 4, 4}, 4)
	if minLength != 1 {
		t.Errorf("expected 1, got %d", minLength)
	}
}

func TestMinSizeSubarraySumNoValidSubarray(t *testing.T) {
	minLength, _ := minSizeSubarraySum([]int{1, 1, 1, 1}, 10)
	if minLength != 0 {
		t.Errorf("expected 0, got %d", minLength)
	}
}

func TestMinSizeSubarraySumWholeArray(t *testing.T) {
	minLength, startIndex := minSizeSubarraySum([]int{1, 2, 3}, 6)
	if minLength != 3 || startIndex != 0 {
		t.Errorf("expected (3, 0), got (%d, %d)", minLength, startIndex)
	}
}

func TestMinSizeSubarraySumEmptyArray(t *testing.T) {
	minLength, _ := minSizeSubarraySum([]int{}, 7)
	if minLength != 0 {
		t.Errorf("expected 0, got %d", minLength)
	}
}

func TestMinSizeSubarraySumZeroTarget(t *testing.T) {
	minLength, _ := minSizeSubarraySum([]int{1, 2, 3}, 0)
	if minLength != 0 {
		t.Errorf("expected 0, got %d", minLength)
	}
}

func TestMinSizeSubarraySumSingleElementExact(t *testing.T) {
	minLength, startIndex := minSizeSubarraySum([]int{7}, 7)
	if minLength != 1 || startIndex != 0 {
		t.Errorf("expected (1, 0), got (%d, %d)", minLength, startIndex)
	}
}

func TestMinSizeSubarraySumRepeatedElements(t *testing.T) {
	minLength, _ := minSizeSubarraySum([]int{3, 3, 3, 3}, 6)
	if minLength != 2 {
		t.Errorf("expected 2, got %d", minLength)
	}
}

func TestMinSizeSubarraySumLargeFirstElement(t *testing.T) {
	minLength, startIndex := minSizeSubarraySum([]int{100, 1, 1, 1, 1}, 100)
	if minLength != 1 || startIndex != 0 {
		t.Errorf("expected (1, 0), got (%d, %d)", minLength, startIndex)
	}
}
