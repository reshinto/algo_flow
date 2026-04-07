package main

import "testing"

func TestFirstUniqueCharacter_Returns0ForLeetcode(t *testing.T) {
	if firstUniqueCharacter("leetcode") != 0 {
		t.Error("expected 0 for 'leetcode'")
	}
}

func TestFirstUniqueCharacter_Returns2ForLoveleetcode(t *testing.T) {
	if firstUniqueCharacter("loveleetcode") != 2 {
		t.Error("expected 2 for 'loveleetcode'")
	}
}

func TestFirstUniqueCharacter_ReturnsMinus1ForAabb(t *testing.T) {
	if firstUniqueCharacter("aabb") != -1 {
		t.Error("expected -1 for 'aabb'")
	}
}

func TestFirstUniqueCharacter_Returns0ForSingleChar(t *testing.T) {
	if firstUniqueCharacter("z") != 0 {
		t.Error("expected 0 for 'z'")
	}
}

func TestFirstUniqueCharacter_ReturnsMinus1WhenAllRepeat(t *testing.T) {
	if firstUniqueCharacter("aabbcc") != -1 {
		t.Error("expected -1 for 'aabbcc'")
	}
}

func TestFirstUniqueCharacter_ReturnsLastIndexWhenOnlyLastIsUnique(t *testing.T) {
	if firstUniqueCharacter("aabc") != 2 {
		t.Error("expected 2 for 'aabc'")
	}
}

func TestFirstUniqueCharacter_HandlesAllDistinctCharacters(t *testing.T) {
	if firstUniqueCharacter("abcde") != 0 {
		t.Error("expected 0 for 'abcde'")
	}
}

func TestFirstUniqueCharacter_ReturnsMinus1ForAbab(t *testing.T) {
	if firstUniqueCharacter("abab") != -1 {
		t.Error("expected -1 for 'abab'")
	}
}

func TestFirstUniqueCharacter_HandlesAadadaad(t *testing.T) {
	if firstUniqueCharacter("aadadaad") != -1 {
		t.Error("expected -1 for 'aadadaad'")
	}
}

func TestFirstUniqueCharacter_FindsUniquenessConsideringFullFrequency(t *testing.T) {
	if firstUniqueCharacter("aba") != 1 {
		t.Error("expected 1 for 'aba'")
	}
}
