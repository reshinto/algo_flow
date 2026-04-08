package main

import "testing"

func TestValidPalindromeAManAPlan(t *testing.T) {
	if !validPalindrome("A man, a plan, a canal: Panama") {
		t.Error("expected true")
	}
}

func TestValidPalindromeRaceACarFalse(t *testing.T) {
	if validPalindrome("race a car") {
		t.Error("expected false")
	}
}

func TestValidPalindromeSingleSpace(t *testing.T) {
	if !validPalindrome(" ") {
		t.Error("expected true for single space")
	}
}

func TestValidPalindromeSingleAlnumWithPunctuation(t *testing.T) {
	if !validPalindrome("a.") {
		t.Error("expected true for 'a.'")
	}
}

func TestValidPalindromeEmptyString(t *testing.T) {
	if !validPalindrome("") {
		t.Error("expected true for empty string")
	}
}

func TestValidPalindromeSimplePalindrome(t *testing.T) {
	if !validPalindrome("racecar") {
		t.Error("expected true for 'racecar'")
	}
}

func TestValidPalindromeSimpleNonPalindrome(t *testing.T) {
	if validPalindrome("hello") {
		t.Error("expected false for 'hello'")
	}
}

func TestValidPalindromeCaseInsensitive(t *testing.T) {
	if !validPalindrome("AbBa") {
		t.Error("expected true for 'AbBa'")
	}
}

func TestValidPalindromeOnlyPunctuation(t *testing.T) {
	if !validPalindrome(".,!?") {
		t.Error("expected true for punctuation only")
	}
}

func TestValidPalindromeAlnumWithPunctuation(t *testing.T) {
	if !validPalindrome("...racecar...") {
		t.Error("expected true for '...racecar...'")
	}
}

func TestValidPalindromeAlnumMismatchInMiddle(t *testing.T) {
	if validPalindrome("ab2a") {
		t.Error("expected false for 'ab2a'")
	}
}
