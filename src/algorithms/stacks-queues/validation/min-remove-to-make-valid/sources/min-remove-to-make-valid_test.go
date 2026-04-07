package main

import "testing"

func TestMinRemoveToMakeValidAlreadyBalanced(t *testing.T) {
	if minRemoveToMakeValid("(ab)") != "(ab)" {
		t.Errorf("expected '(ab)'")
	}
}

func TestMinRemoveToMakeValidUnmatchedOpen(t *testing.T) {
	if minRemoveToMakeValid("a(b(c)d") != "ab(c)d" {
		t.Errorf("expected 'ab(c)d'")
	}
}

func TestMinRemoveToMakeValidUnmatchedClose(t *testing.T) {
	if minRemoveToMakeValid("a)b") != "ab" {
		t.Errorf("expected 'ab'")
	}
}

func TestMinRemoveToMakeValidMultipleClose(t *testing.T) {
	if minRemoveToMakeValid("))ab") != "ab" {
		t.Errorf("expected 'ab'")
	}
}

func TestMinRemoveToMakeValidMultipleOpen(t *testing.T) {
	if minRemoveToMakeValid("ab((") != "ab" {
		t.Errorf("expected 'ab'")
	}
}

func TestMinRemoveToMakeValidLeetcodeExample(t *testing.T) {
	if minRemoveToMakeValid("lee(t(c)o)de)") != "lee(t(c)o)de" {
		t.Errorf("expected 'lee(t(c)o)de'")
	}
}

func TestMinRemoveToMakeValidAllUnmatched(t *testing.T) {
	if minRemoveToMakeValid(")))") != "" {
		t.Errorf("expected empty string")
	}
}

func TestMinRemoveToMakeValidEmpty(t *testing.T) {
	if minRemoveToMakeValid("") != "" {
		t.Errorf("expected empty string")
	}
}

func TestMinRemoveToMakeValidNoParens(t *testing.T) {
	if minRemoveToMakeValid("abcdef") != "abcdef" {
		t.Errorf("expected 'abcdef'")
	}
}

func TestMinRemoveToMakeValidDeeplyNested(t *testing.T) {
	if minRemoveToMakeValid("((()))") != "((()))" {
		t.Errorf("expected '((()))'")
	}
}

func TestMinRemoveToMakeValidBothUnmatched(t *testing.T) {
	if minRemoveToMakeValid(")a(b(c)d(") != "ab(c)d" {
		t.Errorf("expected 'ab(c)d'")
	}
}
