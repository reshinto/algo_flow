package main

import "testing"

func TestContainsDuplicate_ReturnsTrueForDefaultWithRepeatedValue(t *testing.T) {
	if !containsDuplicate([]int{1, 2, 3, 1}) {
		t.Error("expected true")
	}
}

func TestContainsDuplicate_ReturnsFalseWhenAllUnique(t *testing.T) {
	if containsDuplicate([]int{1, 2, 3, 4}) {
		t.Error("expected false")
	}
}

func TestContainsDuplicate_ReturnsFalseForSingleElement(t *testing.T) {
	if containsDuplicate([]int{42}) {
		t.Error("expected false")
	}
}

func TestContainsDuplicate_ReturnsFalseForEmptyArray(t *testing.T) {
	if containsDuplicate([]int{}) {
		t.Error("expected false")
	}
}

func TestContainsDuplicate_ReturnsTrueWhenFirstTwoElementsEqual(t *testing.T) {
	if !containsDuplicate([]int{5, 5, 6, 7}) {
		t.Error("expected true")
	}
}

func TestContainsDuplicate_ReturnsTrueWhenDuplicateAtEnd(t *testing.T) {
	if !containsDuplicate([]int{1, 2, 3, 4, 5, 1}) {
		t.Error("expected true")
	}
}

func TestContainsDuplicate_ReturnsTrueWhenAllSame(t *testing.T) {
	if !containsDuplicate([]int{7, 7, 7, 7}) {
		t.Error("expected true")
	}
}

func TestContainsDuplicate_HandlesNegativeNumbers(t *testing.T) {
	if !containsDuplicate([]int{-1, -2, -3, -1}) {
		t.Error("expected true")
	}
}

func TestContainsDuplicate_ReturnsFalseWhenNegativesAllDistinct(t *testing.T) {
	if containsDuplicate([]int{-3, -2, -1, 0}) {
		t.Error("expected false")
	}
}
