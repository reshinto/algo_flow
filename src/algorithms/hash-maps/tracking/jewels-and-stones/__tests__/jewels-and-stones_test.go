package main

import "testing"

func TestJewelsAndStones_Returns3ForDefault(t *testing.T) {
	if jewelsAndStones("aA", "aAAbbbb") != 3 {
		t.Error("expected 3")
	}
}

func TestJewelsAndStones_Returns0WhenNoStonesAreJewels(t *testing.T) {
	if jewelsAndStones("z", "aAAbbbb") != 0 {
		t.Error("expected 0")
	}
}

func TestJewelsAndStones_ReturnsFullStoneCountWhenEveryStonesIsJewel(t *testing.T) {
	if jewelsAndStones("abc", "abcabc") != 6 {
		t.Error("expected 6")
	}
}

func TestJewelsAndStones_HandlesEmptyStonesString(t *testing.T) {
	if jewelsAndStones("aA", "") != 0 {
		t.Error("expected 0")
	}
}

func TestJewelsAndStones_HandlesSingleMatchingStone(t *testing.T) {
	if jewelsAndStones("a", "a") != 1 {
		t.Error("expected 1")
	}
}

func TestJewelsAndStones_HandlesSingleNonMatchingStone(t *testing.T) {
	if jewelsAndStones("a", "b") != 0 {
		t.Error("expected 0")
	}
}

func TestJewelsAndStones_IsCaseSensitive(t *testing.T) {
	if jewelsAndStones("A", "aA") != 1 {
		t.Error("expected 1")
	}
}

func TestJewelsAndStones_HandlesDuplicateJewelCharacters(t *testing.T) {
	if jewelsAndStones("aa", "aaa") != 3 {
		t.Error("expected 3")
	}
}
