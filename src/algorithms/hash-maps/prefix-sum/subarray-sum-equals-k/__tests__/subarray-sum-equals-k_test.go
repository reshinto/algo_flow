package main

import "testing"

func TestSubarraySumEqualsK_CountsTwoSubarraysForDefault(t *testing.T) {
	if subarraySumEqualsK([]int{1, 1, 1}, 2) != 2 {
		t.Error("expected 2")
	}
}

func TestSubarraySumEqualsK_Returns2For1_2_3Target3(t *testing.T) {
	if subarraySumEqualsK([]int{1, 2, 3}, 3) != 2 {
		t.Error("expected 2")
	}
}

func TestSubarraySumEqualsK_Returns0WhenNoSubarraySumsToTarget(t *testing.T) {
	if subarraySumEqualsK([]int{1, 2, 3}, 10) != 0 {
		t.Error("expected 0")
	}
}

func TestSubarraySumEqualsK_HandlesSingleElementMatchingTarget(t *testing.T) {
	if subarraySumEqualsK([]int{5}, 5) != 1 {
		t.Error("expected 1")
	}
}

func TestSubarraySumEqualsK_HandlesSingleElementNotMatching(t *testing.T) {
	if subarraySumEqualsK([]int{5}, 3) != 0 {
		t.Error("expected 0")
	}
}

func TestSubarraySumEqualsK_HandlesNegativeNumbers(t *testing.T) {
	if subarraySumEqualsK([]int{1, -1, 1}, 1) != 3 {
		t.Error("expected 3")
	}
}

func TestSubarraySumEqualsK_HandlesEntireArraySummingToTarget(t *testing.T) {
	if subarraySumEqualsK([]int{1, 2, 3, 4}, 10) != 1 {
		t.Error("expected 1")
	}
}

func TestSubarraySumEqualsK_CountsMultipleOverlappingSubarrays(t *testing.T) {
	if subarraySumEqualsK([]int{0, 0, 0}, 0) != 6 {
		t.Error("expected 6")
	}
}

func TestSubarraySumEqualsK_HandlesAllSameElements(t *testing.T) {
	if subarraySumEqualsK([]int{2, 2, 2, 2}, 4) != 3 {
		t.Error("expected 3")
	}
}

func TestSubarraySumEqualsK_HandlesTargetZeroWithMixedValues(t *testing.T) {
	if subarraySumEqualsK([]int{1, -1, 2, -2}, 0) != 3 {
		t.Error("expected 3")
	}
}
