package main

import "testing"

func TestPalindromeCheckRacecar(t *testing.T) {
	if !palindromeCheck("racecar") {
		t.Error("expected true for 'racecar'")
	}
}

func TestPalindromeCheckHelloFalse(t *testing.T) {
	if palindromeCheck("hello") {
		t.Error("expected false for 'hello'")
	}
}

func TestPalindromeCheckSingleChar(t *testing.T) {
	if !palindromeCheck("a") {
		t.Error("expected true for single char")
	}
}

func TestPalindromeCheckEmptyString(t *testing.T) {
	if !palindromeCheck("") {
		t.Error("expected true for empty string")
	}
}

func TestPalindromeCheckTwoCharNonPalindrome(t *testing.T) {
	if palindromeCheck("ab") {
		t.Error("expected false for 'ab'")
	}
}

func TestPalindromeCheckOddLengthPalindrome(t *testing.T) {
	if !palindromeCheck("aba") {
		t.Error("expected true for 'aba'")
	}
}

func TestPalindromeCheckEvenLengthPalindrome(t *testing.T) {
	if !palindromeCheck("abba") {
		t.Error("expected true for 'abba'")
	}
}

func TestPalindromeCheckFirstLastDiffer(t *testing.T) {
	if palindromeCheck("abca") {
		t.Error("expected false for 'abca'")
	}
}

func TestPalindromeCheckAllSameChars(t *testing.T) {
	if !palindromeCheck("aaaa") {
		t.Error("expected true for 'aaaa'")
	}
}
