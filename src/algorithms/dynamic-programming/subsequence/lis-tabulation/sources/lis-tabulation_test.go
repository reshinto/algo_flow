package main

import "testing"

func TestLisLengthMixedSequence(t *testing.T) {
	if lisLength([]int{10, 9, 2, 5, 3, 7, 101, 18}) != 4 {
		t.Errorf("[10,9,2,5,3,7,101,18] should return 4")
	}
}

func TestLisLengthInterleaved(t *testing.T) {
	if lisLength([]int{0, 1, 0, 3, 2, 3}) != 4 {
		t.Errorf("[0,1,0,3,2,3] should return 4")
	}
}

func TestLisLengthAllEqual(t *testing.T) {
	if lisLength([]int{7, 7, 7}) != 1 {
		t.Errorf("all equal should return 1")
	}
}

func TestLisLengthSingleElement(t *testing.T) {
	if lisLength([]int{1}) != 1 {
		t.Errorf("single element should return 1")
	}
}

func TestLisLengthEmpty(t *testing.T) {
	if lisLength([]int{}) != 0 {
		t.Errorf("empty sequence should return 0")
	}
}

func TestLisLengthStrictlyAscending(t *testing.T) {
	if lisLength([]int{1, 2, 3, 4, 5}) != 5 {
		t.Errorf("strictly ascending should return 5")
	}
}

func TestLisLengthStrictlyDescending(t *testing.T) {
	if lisLength([]int{5, 4, 3, 2, 1}) != 1 {
		t.Errorf("strictly descending should return 1")
	}
}

func TestLisLengthDuplicatesNotCounted(t *testing.T) {
	if lisLength([]int{1, 3, 3, 5}) != 3 {
		t.Errorf("[1,3,3,5] strict increase should return 3")
	}
}
