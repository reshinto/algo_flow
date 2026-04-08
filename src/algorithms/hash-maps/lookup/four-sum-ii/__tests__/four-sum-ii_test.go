package main

import "testing"

func TestFourSumII_Returns2ForDefault(t *testing.T) {
	if fourSumII([]int{1, 2}, []int{-2, -1}, []int{-1, 2}, []int{0, 2}) != 2 {
		t.Error("expected 2")
	}
}

func TestFourSumII_Returns0WhenNoZeroSum(t *testing.T) {
	if fourSumII([]int{1, 2}, []int{3, 4}, []int{5, 6}, []int{7, 8}) != 0 {
		t.Error("expected 0")
	}
}

func TestFourSumII_HandlesAllZeros(t *testing.T) {
	if fourSumII([]int{0, 0}, []int{0, 0}, []int{0, 0}, []int{0, 0}) != 16 {
		t.Error("expected 16")
	}
}

func TestFourSumII_HandlesSingleElementArrays(t *testing.T) {
	if fourSumII([]int{1}, []int{-1}, []int{1}, []int{-1}) != 1 {
		t.Error("expected 1")
	}
}

func TestFourSumII_HandlesNegativeValues(t *testing.T) {
	if fourSumII([]int{-1, -2}, []int{1, 2}, []int{1, 2}, []int{-1, -2}) != 6 {
		t.Error("expected 6")
	}
}

func TestFourSumII_CountsAllTuplesNotUnique(t *testing.T) {
	if fourSumII([]int{1, 1}, []int{-1, -1}, []int{0}, []int{0}) != 4 {
		t.Error("expected 4")
	}
}

func TestFourSumII_HandlesLargeComplementaryValues(t *testing.T) {
	if fourSumII([]int{1000}, []int{-1000}, []int{500}, []int{-500}) != 1 {
		t.Error("expected 1")
	}
}
