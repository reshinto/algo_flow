package main

import "testing"

func TestExprDefaultExpression(t *testing.T) {
	if expressionTreeEvaluation("3 4 + 2 * 7 /") != 2 {
		t.Error("default expression failed")
	}
}

func TestExprSimpleAddition(t *testing.T) {
	if expressionTreeEvaluation("3 4 +") != 7 {
		t.Error("simple addition failed")
	}
}

func TestExprSimpleMultiplication(t *testing.T) {
	if expressionTreeEvaluation("5 6 *") != 30 {
		t.Error("multiplication failed")
	}
}

func TestExprSubtraction(t *testing.T) {
	if expressionTreeEvaluation("10 4 -") != 6 {
		t.Error("subtraction failed")
	}
}

func TestExprIntegerDivision(t *testing.T) {
	if expressionTreeEvaluation("7 2 /") != 3 {
		t.Error("integer division failed")
	}
}

func TestExprNestedExpression(t *testing.T) {
	if expressionTreeEvaluation("2 3 * 4 5 * +") != 26 {
		t.Error("nested expression failed")
	}
}

func TestExprSingleNumber(t *testing.T) {
	if expressionTreeEvaluation("42") != 42 {
		t.Error("single number failed")
	}
}
