package main

import "testing"

func TestLongestConsecutiveSequence_FindsSequenceInDefault(t *testing.T) {
	if longestConsecutiveSequence([]int{100, 4, 200, 1, 3, 2}) != 4 {
		t.Error("expected 4")
	}
}

func TestLongestConsecutiveSequence_Returns1ForNoConsecutivePairs(t *testing.T) {
	if longestConsecutiveSequence([]int{10, 20, 30}) != 1 {
		t.Error("expected 1")
	}
}

func TestLongestConsecutiveSequence_HandlesFullyConsecutiveArray(t *testing.T) {
	if longestConsecutiveSequence([]int{1, 2, 3, 4, 5}) != 5 {
		t.Error("expected 5")
	}
}

func TestLongestConsecutiveSequence_HandlesSingleElement(t *testing.T) {
	if longestConsecutiveSequence([]int{42}) != 1 {
		t.Error("expected 1")
	}
}

func TestLongestConsecutiveSequence_HandlesDuplicateValues(t *testing.T) {
	if longestConsecutiveSequence([]int{1, 2, 2, 3}) != 3 {
		t.Error("expected 3")
	}
}

func TestLongestConsecutiveSequence_HandlesNegativeNumbers(t *testing.T) {
	if longestConsecutiveSequence([]int{-3, -2, -1, 0, 1}) != 5 {
		t.Error("expected 5")
	}
}

func TestLongestConsecutiveSequence_HandlesSequenceSpanningNegativeAndPositive(t *testing.T) {
	if longestConsecutiveSequence([]int{-1, 0, 1}) != 3 {
		t.Error("expected 3")
	}
}

func TestLongestConsecutiveSequence_ReturnsCorrectLengthForTwoDisjointSequences(t *testing.T) {
	if longestConsecutiveSequence([]int{1, 2, 3, 10, 11, 12, 13}) != 4 {
		t.Error("expected 4")
	}
}

func TestLongestConsecutiveSequence_HandlesUnsortedInput(t *testing.T) {
	if longestConsecutiveSequence([]int{5, 1, 3, 2, 4}) != 5 {
		t.Error("expected 5")
	}
}
