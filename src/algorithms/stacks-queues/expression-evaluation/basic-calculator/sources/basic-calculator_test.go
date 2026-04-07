package main

import "testing"

func TestBasicCalculatorSimpleAddition(t *testing.T) {
	if basicCalculator("1 + 1") != 2 {
		t.Errorf("expected 2")
	}
}

func TestBasicCalculatorMixedWithSpaces(t *testing.T) {
	if basicCalculator(" 2-1 + 2 ") != 3 {
		t.Errorf("expected 3")
	}
}

func TestBasicCalculatorComplexNested(t *testing.T) {
	if basicCalculator("(1+(4+5+2)-3)+(6+8)") != 23 {
		t.Errorf("expected 23")
	}
}

func TestBasicCalculatorDefaultInput(t *testing.T) {
	if basicCalculator("1 + (2 - 3)") != 0 {
		t.Errorf("expected 0")
	}
}

func TestBasicCalculatorSingleNumber(t *testing.T) {
	if basicCalculator("42") != 42 {
		t.Errorf("expected 42")
	}
}

func TestBasicCalculatorSimpleSubtraction(t *testing.T) {
	if basicCalculator("10 - 3") != 7 {
		t.Errorf("expected 7")
	}
}

func TestBasicCalculatorDeeplyNested(t *testing.T) {
	if basicCalculator("(((1 + 2)))") != 3 {
		t.Errorf("expected 3")
	}
}

func TestBasicCalculatorNegativeResult(t *testing.T) {
	if basicCalculator("1 - (2 + 3)") != -4 {
		t.Errorf("expected -4")
	}
}
