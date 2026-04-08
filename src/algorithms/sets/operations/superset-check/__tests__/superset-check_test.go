package main

import "testing"

func TestSupersetCheckAIsProperSupersetOfB(t *testing.T) {
	if !supersetCheck([]int{1, 2, 3, 4, 5}, []int{2, 4}) {
		t.Error("expected true when A is proper superset of B")
	}
}

func TestSupersetCheckElementOfBMissingFromA(t *testing.T) {
	if supersetCheck([]int{1, 2, 3, 4, 5}, []int{2, 9}) {
		t.Error("expected false when element of B is missing from A")
	}
}

func TestSupersetCheckIdenticalArrays(t *testing.T) {
	if !supersetCheck([]int{1, 2, 3}, []int{1, 2, 3}) {
		t.Error("expected true for identical arrays")
	}
}

func TestSupersetCheckEmptyBASupersetOfEmpty(t *testing.T) {
	if !supersetCheck([]int{1, 2, 3}, []int{}) {
		t.Error("expected true when B is empty")
	}
}

func TestSupersetCheckEmptyANonEmptyB(t *testing.T) {
	if supersetCheck([]int{}, []int{1}) {
		t.Error("expected false when A is empty and B is non-empty")
	}
}

func TestSupersetCheckBothEmpty(t *testing.T) {
	if !supersetCheck([]int{}, []int{}) {
		t.Error("expected true for two empty arrays")
	}
}

func TestSupersetCheckBHasElementsNotInA(t *testing.T) {
	if supersetCheck([]int{2, 4}, []int{1, 2, 3, 4, 5}) {
		t.Error("expected false when B has elements not in A")
	}
}

func TestSupersetCheckBEqualsADifferentOrder(t *testing.T) {
	if !supersetCheck([]int{1, 2, 3}, []int{3, 1, 2}) {
		t.Error("expected true when B equals A with different ordering")
	}
}

func TestSupersetCheckSingleElementBPresentInA(t *testing.T) {
	if !supersetCheck([]int{5, 6, 7, 8}, []int{7}) {
		t.Error("expected true when single element B is present in A")
	}
}

func TestSupersetCheckSingleElementBAbsentFromA(t *testing.T) {
	if supersetCheck([]int{5, 6, 7, 8}, []int{9}) {
		t.Error("expected false when single element B is absent from A")
	}
}
