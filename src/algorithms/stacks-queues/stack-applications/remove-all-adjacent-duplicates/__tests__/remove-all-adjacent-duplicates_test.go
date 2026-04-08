package main

import "testing"

func TestRemoveAllAdjacentDuplicatesDefault(t *testing.T) {
	if removeAllAdjacentDuplicates("abbaca") != "ca" {
		t.Errorf("expected 'ca'")
	}
}

func TestRemoveAllAdjacentDuplicatesCascading(t *testing.T) {
	if removeAllAdjacentDuplicates("azxxzy") != "ay" {
		t.Errorf("expected 'ay'")
	}
}

func TestRemoveAllAdjacentDuplicatesEmpty(t *testing.T) {
	if removeAllAdjacentDuplicates("") != "" {
		t.Errorf("expected empty string")
	}
}

func TestRemoveAllAdjacentDuplicatesNoDuplicates(t *testing.T) {
	if removeAllAdjacentDuplicates("abc") != "abc" {
		t.Errorf("expected 'abc'")
	}
}

func TestRemoveAllAdjacentDuplicatesAllSame(t *testing.T) {
	if removeAllAdjacentDuplicates("aaaaaa") != "" {
		t.Errorf("expected empty string")
	}
}

func TestRemoveAllAdjacentDuplicatesPaired(t *testing.T) {
	if removeAllAdjacentDuplicates("aabb") != "" {
		t.Errorf("expected empty string")
	}
}

func TestRemoveAllAdjacentDuplicatesSingle(t *testing.T) {
	if removeAllAdjacentDuplicates("a") != "a" {
		t.Errorf("expected 'a'")
	}
}

func TestRemoveAllAdjacentDuplicatesPalindrome(t *testing.T) {
	if removeAllAdjacentDuplicates("abba") != "" {
		t.Errorf("expected empty string")
	}
}
