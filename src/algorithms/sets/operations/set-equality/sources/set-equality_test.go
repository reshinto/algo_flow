package main

import "testing"

func TestSetEqualitySameElementsDifferentOrder(t *testing.T) {
	if !setEquality([]int{3, 1, 2}, []int{2, 3, 1}) {
		t.Error("expected true for same elements in different order")
	}
}

func TestSetEqualityIdenticalArrays(t *testing.T) {
	if !setEquality([]int{1, 2, 3}, []int{1, 2, 3}) {
		t.Error("expected true for identical arrays")
	}
}

func TestSetEqualityBHasElementNotInA(t *testing.T) {
	if setEquality([]int{1, 2, 3}, []int{1, 2, 9}) {
		t.Error("expected false when B has element not in A")
	}
}

func TestSetEqualityAHasMoreUniqueElements(t *testing.T) {
	if setEquality([]int{1, 2, 3, 4}, []int{1, 2, 3}) {
		t.Error("expected false when A has more unique elements")
	}
}

func TestSetEqualityBHasMoreUniqueElements(t *testing.T) {
	if setEquality([]int{1, 2, 3}, []int{1, 2, 3, 4}) {
		t.Error("expected false when B has more unique elements")
	}
}

func TestSetEqualityBothEmpty(t *testing.T) {
	if !setEquality([]int{}, []int{}) {
		t.Error("expected true for two empty arrays")
	}
}

func TestSetEqualityAEmptyBNonEmpty(t *testing.T) {
	if setEquality([]int{}, []int{1}) {
		t.Error("expected false when A is empty and B is non-empty")
	}
}

func TestSetEqualityBEmptyANonEmpty(t *testing.T) {
	if setEquality([]int{1}, []int{}) {
		t.Error("expected false when B is empty and A is non-empty")
	}
}

func TestSetEqualityDuplicatesSameUniqueSet(t *testing.T) {
	if !setEquality([]int{1, 1, 2, 3}, []int{1, 2, 2, 3}) {
		t.Error("expected true when duplicates but same unique set")
	}
}

func TestSetEqualitySingleElementEqual(t *testing.T) {
	if !setEquality([]int{7}, []int{7}) {
		t.Error("expected true for equal single elements")
	}
}

func TestSetEqualitySingleElementNotEqual(t *testing.T) {
	if setEquality([]int{7}, []int{8}) {
		t.Error("expected false for unequal single elements")
	}
}
