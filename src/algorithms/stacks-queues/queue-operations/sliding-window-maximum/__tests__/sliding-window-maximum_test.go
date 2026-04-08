package main

import (
	"reflect"
	"testing"
)

func TestSlidingWindowMaxLeetcode239(t *testing.T) {
	if !reflect.DeepEqual(slidingWindowMaxMonotonic([]int{1, 3, -1, -3, 5, 3, 6, 7}, 3), []int{3, 3, 5, 5, 6, 7}) {
		t.Errorf("expected [3 3 5 5 6 7]")
	}
}

func TestSlidingWindowMaxWindowEqualsLength(t *testing.T) {
	if !reflect.DeepEqual(slidingWindowMaxMonotonic([]int{4, 2, 7}, 3), []int{7}) {
		t.Errorf("expected [7]")
	}
}

func TestSlidingWindowMaxWindowSizeOne(t *testing.T) {
	if !reflect.DeepEqual(slidingWindowMaxMonotonic([]int{5, 3, 8, 1}, 1), []int{5, 3, 8, 1}) {
		t.Errorf("expected [5 3 8 1]")
	}
}

func TestSlidingWindowMaxIncreasing(t *testing.T) {
	if !reflect.DeepEqual(slidingWindowMaxMonotonic([]int{1, 2, 3, 4, 5}, 3), []int{3, 4, 5}) {
		t.Errorf("expected [3 4 5]")
	}
}

func TestSlidingWindowMaxDecreasing(t *testing.T) {
	if !reflect.DeepEqual(slidingWindowMaxMonotonic([]int{5, 4, 3, 2, 1}, 3), []int{5, 4, 3}) {
		t.Errorf("expected [5 4 3]")
	}
}

func TestSlidingWindowMaxNegative(t *testing.T) {
	if !reflect.DeepEqual(slidingWindowMaxMonotonic([]int{-4, -2, -7, -1}, 2), []int{-2, -2, -1}) {
		t.Errorf("expected [-2 -2 -1]")
	}
}

func TestSlidingWindowMaxSingleElement(t *testing.T) {
	if !reflect.DeepEqual(slidingWindowMaxMonotonic([]int{42}, 1), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestSlidingWindowMaxAllEqual(t *testing.T) {
	if !reflect.DeepEqual(slidingWindowMaxMonotonic([]int{3, 3, 3, 3}, 2), []int{3, 3, 3}) {
		t.Errorf("expected [3 3 3]")
	}
}
