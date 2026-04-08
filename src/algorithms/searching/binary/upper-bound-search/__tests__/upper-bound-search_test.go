package main

import "testing"

func TestUpperBoundSearchReturnsFirstElementStrictlyGreater(t *testing.T) {
	result := upperBoundSearch([]int{1, 3, 3, 5, 5, 5, 8, 12}, 5)
	if result != 6 {
		t.Errorf("expected 6, got %d", result)
	}
}

func TestUpperBoundSearchReturnsZeroWhenTargetSmallerThanAll(t *testing.T) {
	result := upperBoundSearch([]int{2, 4, 6, 8}, 0)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestUpperBoundSearchReturnsArrayLengthWhenTargetEqualsLast(t *testing.T) {
	result := upperBoundSearch([]int{1, 2, 3, 4}, 4)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}

func TestUpperBoundSearchReturnsArrayLengthWhenTargetExceedsAll(t *testing.T) {
	result := upperBoundSearch([]int{1, 2, 3, 4}, 99)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}

func TestUpperBoundSearchHandlesEmptyArray(t *testing.T) {
	result := upperBoundSearch([]int{}, 5)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestUpperBoundSearchSingleElementTargetSmaller(t *testing.T) {
	result := upperBoundSearch([]int{10}, 5)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestUpperBoundSearchSingleElementTargetEquals(t *testing.T) {
	result := upperBoundSearch([]int{10}, 10)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestUpperBoundSearchSingleElementTargetLarger(t *testing.T) {
	result := upperBoundSearch([]int{10}, 20)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestUpperBoundSearchAllElementsDuplicates(t *testing.T) {
	result := upperBoundSearch([]int{5, 5, 5, 5, 5}, 5)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestUpperBoundSearchForFirstElementValue(t *testing.T) {
	result := upperBoundSearch([]int{1, 3, 5, 7, 9}, 1)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestUpperBoundSearchForLastElementValue(t *testing.T) {
	result := upperBoundSearch([]int{1, 3, 5, 7, 9}, 9)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestUpperBoundSearchWithinRangeOfDuplicates(t *testing.T) {
	result := upperBoundSearch([]int{1, 3, 3, 3, 7}, 3)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}
