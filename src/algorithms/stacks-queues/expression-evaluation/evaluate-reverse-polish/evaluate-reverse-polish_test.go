package main

import "testing"

func TestEvaluateReversePolishAdditionThenMultiplication(t *testing.T) {
	if evaluateReversePolish([]string{"2", "1", "+", "3", "*"}) != 9 {
		t.Errorf("expected 9")
	}
}

func TestEvaluateReversePolishDivisionThenAddition(t *testing.T) {
	if evaluateReversePolish([]string{"4", "13", "5", "/", "+"}) != 6 {
		t.Errorf("expected 6")
	}
}

func TestEvaluateReversePolishComplexExample(t *testing.T) {
	tokens := []string{"10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"}
	if evaluateReversePolish(tokens) != 22 {
		t.Errorf("expected 22")
	}
}

func TestEvaluateReversePolishSingleOperand(t *testing.T) {
	if evaluateReversePolish([]string{"42"}) != 42 {
		t.Errorf("expected 42")
	}
}

func TestEvaluateReversePolishSimpleAddition(t *testing.T) {
	if evaluateReversePolish([]string{"3", "4", "+"}) != 7 {
		t.Errorf("expected 7")
	}
}

func TestEvaluateReversePolishSubtraction(t *testing.T) {
	if evaluateReversePolish([]string{"10", "3", "-"}) != 7 {
		t.Errorf("expected 7")
	}
}

func TestEvaluateReversePolishMultiplication(t *testing.T) {
	if evaluateReversePolish([]string{"5", "6", "*"}) != 30 {
		t.Errorf("expected 30")
	}
}

func TestEvaluateReversePolishDivisionPositive(t *testing.T) {
	if evaluateReversePolish([]string{"7", "2", "/"}) != 3 {
		t.Errorf("expected 3")
	}
}

func TestEvaluateReversePolishDivisionNegative(t *testing.T) {
	if evaluateReversePolish([]string{"7", "-3", "/"}) != -2 {
		t.Errorf("expected -2")
	}
}

func TestEvaluateReversePolishNegativeOperands(t *testing.T) {
	if evaluateReversePolish([]string{"-3", "4", "*"}) != -12 {
		t.Errorf("expected -12")
	}
}

func TestEvaluateReversePolishChainedExpression(t *testing.T) {
	if evaluateReversePolish([]string{"2", "3", "+", "4", "1", "-", "*"}) != 15 {
		t.Errorf("expected 15")
	}
}
