package main

import "testing"

func TestLongestValidParenthesesDoubleOpen(t *testing.T) {
	if longestValidParentheses("(()") != 2 {
		t.Errorf("expected 2")
	}
}

func TestLongestValidParenthesesInterleaved(t *testing.T) {
	if longestValidParentheses(")()())") != 4 {
		t.Errorf("expected 4")
	}
}

func TestLongestValidParenthesesEmpty(t *testing.T) {
	if longestValidParentheses("") != 0 {
		t.Errorf("expected 0")
	}
}

func TestLongestValidParenthesesNested(t *testing.T) {
	if longestValidParentheses("(()())") != 6 {
		t.Errorf("expected 6")
	}
}

func TestLongestValidParenthesesTwoPairs(t *testing.T) {
	if longestValidParentheses("()()") != 4 {
		t.Errorf("expected 4")
	}
}

func TestLongestValidParenthesesAllOpen(t *testing.T) {
	if longestValidParentheses("(((") != 0 {
		t.Errorf("expected 0")
	}
}
