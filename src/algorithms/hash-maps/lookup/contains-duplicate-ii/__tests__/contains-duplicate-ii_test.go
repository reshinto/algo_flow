package main

import "testing"

func TestContainsDuplicateII_ReturnsTrueForDefaultWithinMaxDistance(t *testing.T) {
	if !containsDuplicateII([]int{1, 2, 3, 1}, 3) {
		t.Error("expected true")
	}
}

func TestContainsDuplicateII_ReturnsFalseWhenDuplicateBeyondMaxDistance(t *testing.T) {
	if containsDuplicateII([]int{1, 2, 3, 1}, 2) {
		t.Error("expected false")
	}
}

func TestContainsDuplicateII_ReturnsTrueWhenAdjacentEqualMaxDistance1(t *testing.T) {
	if !containsDuplicateII([]int{1, 1, 3, 4}, 1) {
		t.Error("expected true")
	}
}

func TestContainsDuplicateII_ReturnsFalseForAllUnique(t *testing.T) {
	if containsDuplicateII([]int{1, 2, 3, 4}, 3) {
		t.Error("expected false")
	}
}

func TestContainsDuplicateII_ReturnsFalseForSingleElement(t *testing.T) {
	if containsDuplicateII([]int{42}, 1) {
		t.Error("expected false")
	}
}

func TestContainsDuplicateII_ReturnsFalseForEmptyArray(t *testing.T) {
	if containsDuplicateII([]int{}, 0) {
		t.Error("expected false")
	}
}

func TestContainsDuplicateII_ReturnsTrueWhenMaxDistanceEqualsFullLength(t *testing.T) {
	if !containsDuplicateII([]int{1, 2, 3, 4, 1}, 4) {
		t.Error("expected true")
	}
}

func TestContainsDuplicateII_ReturnsFalseWhenMaxDistanceIsZero(t *testing.T) {
	if containsDuplicateII([]int{1, 2, 3, 4}, 0) {
		t.Error("expected false")
	}
}

func TestContainsDuplicateII_HandlesNegativeNumbers(t *testing.T) {
	if !containsDuplicateII([]int{-1, 0, -1}, 2) {
		t.Error("expected true")
	}
}

func TestContainsDuplicateII_UpdatesStoredIndexOnReappearance(t *testing.T) {
	if containsDuplicateII([]int{1, 2, 1, 2}, 1) {
		t.Error("expected false")
	}
}

func TestContainsDuplicateII_ReturnsTrueWhenUpdatedIndexCreatesQualifyingPair(t *testing.T) {
	if !containsDuplicateII([]int{1, 0, 1, 1}, 1) {
		t.Error("expected true")
	}
}
