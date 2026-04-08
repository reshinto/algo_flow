package main

import "testing"

func TestLisMemoizationEmpty(t *testing.T) {
	if lisMemoization([]int{}) != 0 {
		t.Errorf("empty sequence should return 0")
	}
}

func TestLisMemoizationSingleElement(t *testing.T) {
	if lisMemoization([]int{42}) != 1 {
		t.Errorf("single element should return 1")
	}
}

func TestLisMemoizationStrictlyDescending(t *testing.T) {
	if lisMemoization([]int{5, 4, 3, 2, 1}) != 1 {
		t.Errorf("strictly descending should return 1")
	}
}

func TestLisMemoizationStrictlyAscending(t *testing.T) {
	if lisMemoization([]int{1, 2, 3, 4, 5}) != 5 {
		t.Errorf("strictly ascending should return 5")
	}
}

func TestLisMemoizationMixedSequence(t *testing.T) {
	if lisMemoization([]int{10, 9, 2, 5, 3, 7, 101, 18}) != 4 {
		t.Errorf("[10,9,2,5,3,7,101,18] should return 4")
	}
}

func TestLisMemoizationPartialIncreasing(t *testing.T) {
	if lisMemoization([]int{3, 10, 2, 1, 20}) != 3 {
		t.Errorf("[3,10,2,1,20] should return 3")
	}
}

func TestLisMemoizationTwoDescending(t *testing.T) {
	if lisMemoization([]int{3, 2}) != 1 {
		t.Errorf("[3,2] should return 1")
	}
}

func TestLisMemoizationNonConsecutiveIncrease(t *testing.T) {
	if lisMemoization([]int{50, 3, 10, 7, 40, 80}) != 4 {
		t.Errorf("[50,3,10,7,40,80] should return 4")
	}
}

func TestLisMemoizationAllEqual(t *testing.T) {
	if lisMemoization([]int{7, 7, 7, 7}) != 1 {
		t.Errorf("all equal elements should return 1")
	}
}

func TestLisMemoizationLongerSequence(t *testing.T) {
	if lisMemoization([]int{1, 3, 6, 7, 9, 4, 10, 5, 6}) != 6 {
		t.Errorf("[1,3,6,7,9,4,10,5,6] should return 6")
	}
}
