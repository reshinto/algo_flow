package main

import "testing"

func TestReverseStringStandardWord(t *testing.T) {
	if reverseString("hello") != "olleh" {
		t.Error("expected 'olleh'")
	}
}

func TestReverseStringSingleChar(t *testing.T) {
	if reverseString("a") != "a" {
		t.Error("expected 'a'")
	}
}

func TestReverseStringEmptyString(t *testing.T) {
	if reverseString("") != "" {
		t.Error("expected empty string")
	}
}

func TestReverseStringTwoChars(t *testing.T) {
	if reverseString("ab") != "ba" {
		t.Error("expected 'ba'")
	}
}

func TestReverseStringPalindrome(t *testing.T) {
	if reverseString("racecar") != "racecar" {
		t.Error("expected 'racecar'")
	}
}

func TestReverseStringWithSpaces(t *testing.T) {
	if reverseString("hello world") != "dlrow olleh" {
		t.Error("expected 'dlrow olleh'")
	}
}

func TestReverseStringRepeatedChars(t *testing.T) {
	if reverseString("aaaa") != "aaaa" {
		t.Error("expected 'aaaa'")
	}
}

func TestReverseStringLongerWord(t *testing.T) {
	if reverseString("algorithm") != "mhtirogla" {
		t.Error("expected 'mhtirogla'")
	}
}
