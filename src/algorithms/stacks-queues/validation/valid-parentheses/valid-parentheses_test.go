package main

import "testing"

func TestValidParenthesesAllTypes(t *testing.T) {
	if !validParentheses("({[]})") {
		t.Errorf("expected true")
	}
}

func TestValidParenthesesSimple(t *testing.T) {
	if !validParentheses("()") {
		t.Errorf("expected true")
	}
}

func TestValidParenthesesNestedSameType(t *testing.T) {
	if !validParentheses("((()))") {
		t.Errorf("expected true")
	}
}

func TestValidParenthesesSequentialPairs(t *testing.T) {
	if !validParentheses("()[]{}") {
		t.Errorf("expected true")
	}
}

func TestValidParenthesesMismatched(t *testing.T) {
	if validParentheses("(]") {
		t.Errorf("expected false")
	}
}

func TestValidParenthesesWrongOrder(t *testing.T) {
	if validParentheses("([)]") {
		t.Errorf("expected false")
	}
}

func TestValidParenthesesUnclosedOpen(t *testing.T) {
	if validParentheses("(") {
		t.Errorf("expected false")
	}
}

func TestValidParenthesesLoneClose(t *testing.T) {
	if validParentheses(")") {
		t.Errorf("expected false")
	}
}

func TestValidParenthesesEmpty(t *testing.T) {
	if !validParentheses("") {
		t.Errorf("expected true")
	}
}

func TestValidParenthesesUnclosedAtEnd(t *testing.T) {
	if validParentheses("({[]})(") {
		t.Errorf("expected false")
	}
}
