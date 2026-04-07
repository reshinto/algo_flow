package main

import "testing"

func TestStringRotationCheckValidRotation(t *testing.T) {
	if !stringRotationCheck("waterbottle", "erbottlewat") {
		t.Error("expected true")
	}
}

func TestStringRotationCheckZeroOffset(t *testing.T) {
	if !stringRotationCheck("hello", "hello") {
		t.Error("expected true")
	}
}

func TestStringRotationCheckSingleCharMatch(t *testing.T) {
	if !stringRotationCheck("a", "a") {
		t.Error("expected true")
	}
}

func TestStringRotationCheckSingleCharNoMatch(t *testing.T) {
	if stringRotationCheck("a", "b") {
		t.Error("expected false")
	}
}

func TestStringRotationCheckDifferentLengths(t *testing.T) {
	if stringRotationCheck("abc", "ab") {
		t.Error("expected false")
	}
}

func TestStringRotationCheckBottlewater(t *testing.T) {
	if !stringRotationCheck("waterbottle", "bottlewater") {
		t.Error("expected true")
	}
}

func TestStringRotationCheckNotARotation(t *testing.T) {
	if stringRotationCheck("abcde", "abced") {
		t.Error("expected false")
	}
}

func TestStringRotationCheckRotationByOne(t *testing.T) {
	if !stringRotationCheck("abcde", "bcdea") {
		t.Error("expected true")
	}
}

func TestStringRotationCheckRotationFromEnd(t *testing.T) {
	if !stringRotationCheck("abcde", "eabcd") {
		t.Error("expected true")
	}
}

func TestStringRotationCheckTwoEmptyStrings(t *testing.T) {
	if !stringRotationCheck("", "") {
		t.Error("expected true")
	}
}

func TestStringRotationCheckOneEmptyOneNot(t *testing.T) {
	if stringRotationCheck("abc", "") {
		t.Error("expected false")
	}
}

func TestStringRotationCheckRepeatedCharsNotRotation(t *testing.T) {
	if stringRotationCheck("aabaa", "baaab") {
		t.Error("expected false")
	}
}

func TestStringRotationCheckRepeatedCharsValidRotation(t *testing.T) {
	if !stringRotationCheck("aab", "baa") {
		t.Error("expected true")
	}
}
