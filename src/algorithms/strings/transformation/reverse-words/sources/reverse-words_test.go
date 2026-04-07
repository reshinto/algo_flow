package main

import "testing"

func TestReverseWordsTheSkyIsBlue(t *testing.T) {
	if reverseWords("the sky is blue") != "blue is sky the" {
		t.Error("expected 'blue is sky the'")
	}
}

func TestReverseWordsLeadingTrailingSpaces(t *testing.T) {
	if reverseWords("  hello world  ") != "world hello" {
		t.Error("expected 'world hello'")
	}
}

func TestReverseWordsMultipleSpaces(t *testing.T) {
	if reverseWords("a   good   example") != "example good a" {
		t.Error("expected 'example good a'")
	}
}

func TestReverseWordsSingleWord(t *testing.T) {
	if reverseWords("hello") != "hello" {
		t.Error("expected 'hello'")
	}
}

func TestReverseWordsSingleWordWithSpaces(t *testing.T) {
	if reverseWords("   spaces   ") != "spaces" {
		t.Error("expected 'spaces'")
	}
}

func TestReverseWordsTwoWords(t *testing.T) {
	if reverseWords("foo bar") != "bar foo" {
		t.Error("expected 'bar foo'")
	}
}

func TestReverseWordsThreeWords(t *testing.T) {
	if reverseWords("one two three") != "three two one" {
		t.Error("expected 'three two one'")
	}
}

func TestReverseWordsLongerSentence(t *testing.T) {
	if reverseWords("let us practice") != "practice us let" {
		t.Error("expected 'practice us let'")
	}
}

func TestReverseWordsLeadingSpacesOnly(t *testing.T) {
	if reverseWords("   word") != "word" {
		t.Error("expected 'word'")
	}
}

func TestReverseWordsTrailingSpacesOnly(t *testing.T) {
	if reverseWords("word   ") != "word" {
		t.Error("expected 'word'")
	}
}
