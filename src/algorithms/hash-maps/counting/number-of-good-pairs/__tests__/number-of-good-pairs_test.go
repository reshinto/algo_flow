package main

import "testing"

func TestNumberOfGoodPairs_Returns4ForDefault(t *testing.T) {
	if numberOfGoodPairs([]int{1, 2, 3, 1, 1, 3}) != 4 {
		t.Error("expected 4")
	}
}

func TestNumberOfGoodPairs_Returns6ForAllOnes(t *testing.T) {
	if numberOfGoodPairs([]int{1, 1, 1, 1}) != 6 {
		t.Error("expected 6")
	}
}

func TestNumberOfGoodPairs_Returns0ForAllDistinct(t *testing.T) {
	if numberOfGoodPairs([]int{1, 2, 3}) != 0 {
		t.Error("expected 0")
	}
}

func TestNumberOfGoodPairs_Returns1For1_1(t *testing.T) {
	if numberOfGoodPairs([]int{1, 1}) != 1 {
		t.Error("expected 1")
	}
}

func TestNumberOfGoodPairs_Returns0ForSingleElement(t *testing.T) {
	if numberOfGoodPairs([]int{5}) != 0 {
		t.Error("expected 0")
	}
}

func TestNumberOfGoodPairs_Returns0ForEmptyArray(t *testing.T) {
	if numberOfGoodPairs([]int{}) != 0 {
		t.Error("expected 0")
	}
}

func TestNumberOfGoodPairs_Returns3For2_2_2(t *testing.T) {
	if numberOfGoodPairs([]int{2, 2, 2}) != 3 {
		t.Error("expected 3")
	}
}

func TestNumberOfGoodPairs_HandlesNegativeNumbers(t *testing.T) {
	if numberOfGoodPairs([]int{-1, -1, 2}) != 1 {
		t.Error("expected 1")
	}
}
