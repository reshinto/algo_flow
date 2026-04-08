package main

import "testing"

func TestZAlgorithmPatternAtStart(t *testing.T) {
	if zAlgorithm("ABCDEF", "ABC") != 0 {
		t.Error("expected 0")
	}
}

func TestZAlgorithmPatternInMiddle(t *testing.T) {
	if zAlgorithm("AABXAABXCAABXAABXAY", "AABXAAB") != 0 {
		t.Error("expected 0")
	}
}

func TestZAlgorithmPatternNearEnd(t *testing.T) {
	if zAlgorithm("XYZAABXAAB", "AABXAAB") != 3 {
		t.Error("expected 3")
	}
}

func TestZAlgorithmPatternAtEnd(t *testing.T) {
	if zAlgorithm("XYZABC", "ABC") != 3 {
		t.Error("expected 3")
	}
}

func TestZAlgorithmPatternNotFound(t *testing.T) {
	if zAlgorithm("ABCDEFG", "XYZ") != -1 {
		t.Error("expected -1")
	}
}

func TestZAlgorithmSingleCharFound(t *testing.T) {
	if zAlgorithm("HELLO", "L") != 2 {
		t.Error("expected 2")
	}
}

func TestZAlgorithmSingleCharNotFound(t *testing.T) {
	if zAlgorithm("HELLO", "Z") != -1 {
		t.Error("expected -1")
	}
}

func TestZAlgorithmEmptyPattern(t *testing.T) {
	if zAlgorithm("HELLO", "") != 0 {
		t.Error("expected 0 for empty pattern")
	}
}

func TestZAlgorithmTextEqualsPattern(t *testing.T) {
	if zAlgorithm("ABCD", "ABCD") != 0 {
		t.Error("expected 0")
	}
}

func TestZAlgorithmPatternLongerThanText(t *testing.T) {
	if zAlgorithm("AB", "ABCD") != -1 {
		t.Error("expected -1")
	}
}

func TestZAlgorithmRepeatedChars(t *testing.T) {
	if zAlgorithm("AAAAAB", "AAAB") != 2 {
		t.Error("expected 2")
	}
}

func TestZAlgorithmFirstOfMultiple(t *testing.T) {
	if zAlgorithm("ABABABAB", "ABAB") != 0 {
		t.Error("expected 0")
	}
}
