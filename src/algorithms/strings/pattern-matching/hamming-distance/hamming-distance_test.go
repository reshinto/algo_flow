package main

import "testing"

func TestHammingDistanceKarolinKathrin(t *testing.T) {
	if hammingDistance("karolin", "kathrin") != 3 {
		t.Error("expected 3")
	}
}

func TestHammingDistanceIdenticalStrings(t *testing.T) {
	if hammingDistance("abcdef", "abcdef") != 0 {
		t.Error("expected 0")
	}
}

func TestHammingDistanceAllCharsDiffer(t *testing.T) {
	if hammingDistance("aaaa", "bbbb") != 4 {
		t.Error("expected 4")
	}
}

func TestHammingDistanceSingleCharDifference(t *testing.T) {
	if hammingDistance("hello", "hxllo") != 1 {
		t.Error("expected 1")
	}
}

func TestHammingDistanceDifferentLengths(t *testing.T) {
	if hammingDistance("abc", "abcd") != -1 {
		t.Error("expected -1")
	}
}

func TestHammingDistanceTextLongerThanPattern(t *testing.T) {
	if hammingDistance("abcde", "abc") != -1 {
		t.Error("expected -1")
	}
}

func TestHammingDistanceSingleCharMatch(t *testing.T) {
	if hammingDistance("a", "a") != 0 {
		t.Error("expected 0")
	}
}

func TestHammingDistanceSingleCharDiffer(t *testing.T) {
	if hammingDistance("a", "b") != 1 {
		t.Error("expected 1")
	}
}

func TestHammingDistanceTwoEmptyStrings(t *testing.T) {
	if hammingDistance("", "") != 0 {
		t.Error("expected 0")
	}
}

func TestHammingDistanceBinaryStringPair(t *testing.T) {
	if hammingDistance("1011101", "1001001") != 2 {
		t.Error("expected 2")
	}
}

func TestHammingDistanceUppercaseComparison(t *testing.T) {
	if hammingDistance("TONED", "ROSES") != 3 {
		t.Error("expected 3")
	}
}
