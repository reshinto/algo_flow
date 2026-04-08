package main

import "testing"

func TestInfixToPostfixComplexPrecedence(t *testing.T) {
	if infixToPostfix("a+b*(c-d)") != "a b c d - * +" {
		t.Errorf("expected 'a b c d - * +'")
	}
}

func TestInfixToPostfixSimpleAddition(t *testing.T) {
	if infixToPostfix("a+b") != "a b +" {
		t.Errorf("expected 'a b +'")
	}
}

func TestInfixToPostfixParenthesizedTimesC(t *testing.T) {
	if infixToPostfix("(a+b)*c") != "a b + c *" {
		t.Errorf("expected 'a b + c *'")
	}
}

func TestInfixToPostfixLeftAssociative(t *testing.T) {
	if infixToPostfix("a+b+c") != "a b + c +" {
		t.Errorf("expected 'a b + c +'")
	}
}

func TestInfixToPostfixSingleOperand(t *testing.T) {
	if infixToPostfix("a") != "a" {
		t.Errorf("expected 'a'")
	}
}

func TestInfixToPostfixMultiplyBeforeAdd(t *testing.T) {
	if infixToPostfix("a*b+c") != "a b * c +" {
		t.Errorf("expected 'a b * c +'")
	}
}

func TestInfixToPostfixMultiplyBindsTighter(t *testing.T) {
	if infixToPostfix("a+b*c") != "a b c * +" {
		t.Errorf("expected 'a b c * +'")
	}
}

func TestInfixToPostfixNestedParens(t *testing.T) {
	if infixToPostfix("(a+b)*(c+d)") != "a b + c d + *" {
		t.Errorf("expected 'a b + c d + *'")
	}
}

func TestInfixToPostfixRightDeepNesting(t *testing.T) {
	if infixToPostfix("a+(b+(c+d))") != "a b c d + + +" {
		t.Errorf("expected 'a b c d + + +'")
	}
}

func TestInfixToPostfixAllFourOperators(t *testing.T) {
	if infixToPostfix("a+b*c-d/e") != "a b c * + d e / -" {
		t.Errorf("expected 'a b c * + d e / -'")
	}
}
