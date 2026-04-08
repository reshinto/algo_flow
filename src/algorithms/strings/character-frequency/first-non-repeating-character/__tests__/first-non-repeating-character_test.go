package main

import "testing"

func TestFirstNonRepeatingCharacterLeetcode(t *testing.T) {
	if firstNonRepeatingCharacter("leetcode") != 0 {
		t.Error("expected 0 for 'leetcode'")
	}
}

func TestFirstNonRepeatingCharacterLoveleetcode(t *testing.T) {
	if firstNonRepeatingCharacter("loveleetcode") != 2 {
		t.Error("expected 2 for 'loveleetcode'")
	}
}

func TestFirstNonRepeatingCharacterAabbAllRepeat(t *testing.T) {
	if firstNonRepeatingCharacter("aabb") != -1 {
		t.Error("expected -1 for 'aabb'")
	}
}

func TestFirstNonRepeatingCharacterSingleChar(t *testing.T) {
	if firstNonRepeatingCharacter("z") != 0 {
		t.Error("expected 0 for 'z'")
	}
}

func TestFirstNonRepeatingCharacterAabbccAllRepeat(t *testing.T) {
	if firstNonRepeatingCharacter("aabbcc") != -1 {
		t.Error("expected -1 for 'aabbcc'")
	}
}

func TestFirstNonRepeatingCharacterUniqueInMiddle(t *testing.T) {
	if firstNonRepeatingCharacter("aabbc") != 4 {
		t.Error("expected 4 for 'aabbc'")
	}
}

func TestFirstNonRepeatingCharacterFirstIsUnique(t *testing.T) {
	if firstNonRepeatingCharacter("xaabb") != 0 {
		t.Error("expected 0 for 'xaabb'")
	}
}

func TestFirstNonRepeatingCharacterLastIsUnique(t *testing.T) {
	if firstNonRepeatingCharacter("aabbz") != 4 {
		t.Error("expected 4 for 'aabbz'")
	}
}

func TestFirstNonRepeatingCharacterAllIdentical(t *testing.T) {
	if firstNonRepeatingCharacter("aaaa") != -1 {
		t.Error("expected -1 for 'aaaa'")
	}
}

func TestFirstNonRepeatingCharacterTwoUniqueChars(t *testing.T) {
	if firstNonRepeatingCharacter("ab") != 0 {
		t.Error("expected 0 for 'ab'")
	}
}

func TestFirstNonRepeatingCharacterDddccdbba(t *testing.T) {
	if firstNonRepeatingCharacter("dddccdbba") != 8 {
		t.Error("expected 8 for 'dddccdbba'")
	}
}
