package main

import "testing"

func TestBackspaceStringCompareBothSame(t *testing.T) {
	if !backspaceStringCompare("ab#c", "ad#c") {
		t.Errorf("expected true")
	}
}

func TestBackspaceStringCompareBothErased(t *testing.T) {
	if !backspaceStringCompare("ab##", "c#d#") {
		t.Errorf("expected true")
	}
}

func TestBackspaceStringCompareDifferent(t *testing.T) {
	if backspaceStringCompare("a#c", "b") {
		t.Errorf("expected false")
	}
}

func TestBackspaceStringCompareBothEmpty(t *testing.T) {
	if !backspaceStringCompare("", "") {
		t.Errorf("expected true")
	}
}

func TestBackspaceStringCompareIdentical(t *testing.T) {
	if !backspaceStringCompare("a", "a") {
		t.Errorf("expected true")
	}
}

func TestBackspaceStringCompareDifferentLengths(t *testing.T) {
	if backspaceStringCompare("abc", "a") {
		t.Errorf("expected false")
	}
}

func TestBackspaceStringCompareBackspaceOnEmpty(t *testing.T) {
	if !backspaceStringCompare("#a", "a") {
		t.Errorf("expected true")
	}
}

func TestBackspaceStringCompareMultipleBackspaces(t *testing.T) {
	if !backspaceStringCompare("nzp#o#g", "b#nzp#o#g") {
		t.Errorf("expected true")
	}
}
