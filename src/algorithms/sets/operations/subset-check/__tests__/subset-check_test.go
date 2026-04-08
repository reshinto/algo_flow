package main

import "testing"

func TestSubsetCheckAIsProperSubsetOfB(t *testing.T) {
	if !subsetCheck([]int{2, 4}, []int{1, 2, 3, 4, 5}) {
		t.Error("expected true when A is proper subset of B")
	}
}

func TestSubsetCheckElementMissingFromB(t *testing.T) {
	if subsetCheck([]int{2, 9}, []int{1, 2, 3, 4, 5}) {
		t.Error("expected false when element of A is missing from B")
	}
}

func TestSubsetCheckIdenticalArrays(t *testing.T) {
	if !subsetCheck([]int{1, 2, 3}, []int{1, 2, 3}) {
		t.Error("expected true for identical arrays")
	}
}

func TestSubsetCheckEmptyAIsSubsetOfAny(t *testing.T) {
	if !subsetCheck([]int{}, []int{1, 2, 3}) {
		t.Error("expected true for empty A")
	}
}

func TestSubsetCheckEmptyBNonEmptyA(t *testing.T) {
	if subsetCheck([]int{1}, []int{}) {
		t.Error("expected false when B is empty and A is non-empty")
	}
}

func TestSubsetCheckBothEmpty(t *testing.T) {
	if !subsetCheck([]int{}, []int{}) {
		t.Error("expected true for two empty arrays")
	}
}

func TestSubsetCheckAHasElementsNotInB(t *testing.T) {
	if subsetCheck([]int{1, 2, 3, 4, 5}, []int{2, 4}) {
		t.Error("expected false when A has elements not in B")
	}
}

func TestSubsetCheckAEqualsBDifferentOrder(t *testing.T) {
	if !subsetCheck([]int{3, 1, 2}, []int{1, 2, 3}) {
		t.Error("expected true when A equals B with different ordering")
	}
}

func TestSubsetCheckSingleElementPresentInB(t *testing.T) {
	if !subsetCheck([]int{7}, []int{5, 6, 7, 8}) {
		t.Error("expected true when single element A is present in B")
	}
}

func TestSubsetCheckSingleElementAbsentFromB(t *testing.T) {
	if subsetCheck([]int{9}, []int{5, 6, 7, 8}) {
		t.Error("expected false when single element A is absent from B")
	}
}
