package main

import "testing"

func TestFindTheDifference_FindsEAddedToAbcd(t *testing.T) {
	result := findTheDifference("abcd", "abcde")
	if result != 'e' {
		t.Errorf("expected 'e', got %c", result)
	}
}

func TestFindTheDifference_FindsAddedCharAtStart(t *testing.T) {
	result := findTheDifference("abc", "zabc")
	if result != 'z' {
		t.Errorf("expected 'z', got %c", result)
	}
}

func TestFindTheDifference_FindsAddedCharDuplicatingExisting(t *testing.T) {
	result := findTheDifference("aab", "aabb")
	if result != 'b' {
		t.Errorf("expected 'b', got %c", result)
	}
}

func TestFindTheDifference_HandlesEmptyOriginal(t *testing.T) {
	result := findTheDifference("", "x")
	if result != 'x' {
		t.Errorf("expected 'x', got %c", result)
	}
}

func TestFindTheDifference_FindsAddedCharInMiddle(t *testing.T) {
	result := findTheDifference("ab", "amb")
	if result != 'm' {
		t.Errorf("expected 'm', got %c", result)
	}
}

func TestFindTheDifference_HandlesSingleCharacterOriginal(t *testing.T) {
	result := findTheDifference("a", "ab")
	if result != 'b' {
		t.Errorf("expected 'b', got %c", result)
	}
}

func TestFindTheDifference_FindsDuplicatedCharInAllSameString(t *testing.T) {
	result := findTheDifference("aaa", "aaaa")
	if result != 'a' {
		t.Errorf("expected 'a', got %c", result)
	}
}

func TestFindTheDifference_WorksWithUppercaseLetters(t *testing.T) {
	result := findTheDifference("ABC", "ABCD")
	if result != 'D' {
		t.Errorf("expected 'D', got %c", result)
	}
}
