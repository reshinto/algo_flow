package main

import (
	"math"
	"testing"
)

const int32Min = math.MinInt32
const int32Max = math.MaxInt32

func TestStringToIntegerPlainPositive(t *testing.T) {
	if stringToInteger("42") != 42 {
		t.Error("expected 42")
	}
}

func TestStringToIntegerNegativeWithLeadingWhitespace(t *testing.T) {
	if stringToInteger("   -42") != -42 {
		t.Error("expected -42")
	}
}

func TestStringToIntegerStopsAtNonDigit(t *testing.T) {
	if stringToInteger("4193 with words") != 4193 {
		t.Error("expected 4193")
	}
}

func TestStringToIntegerStartsWithLetters(t *testing.T) {
	if stringToInteger("words and 987") != 0 {
		t.Error("expected 0")
	}
}

func TestStringToIntegerEmptyString(t *testing.T) {
	if stringToInteger("") != 0 {
		t.Error("expected 0")
	}
}

func TestStringToIntegerOnlyWhitespace(t *testing.T) {
	if stringToInteger("   ") != 0 {
		t.Error("expected 0")
	}
}

func TestStringToIntegerExplicitPlus(t *testing.T) {
	if stringToInteger("+100") != 100 {
		t.Error("expected 100")
	}
}

func TestStringToIntegerZero(t *testing.T) {
	if stringToInteger("0") != 0 {
		t.Error("expected 0")
	}
}

func TestStringToIntegerClampAboveMax(t *testing.T) {
	if stringToInteger("2147483648") != int32Max {
		t.Error("expected INT32_MAX")
	}
}

func TestStringToIntegerClampBelowMin(t *testing.T) {
	if stringToInteger("-2147483649") != int32Min {
		t.Error("expected INT32_MIN")
	}
}

func TestStringToIntegerExtremelyLarge(t *testing.T) {
	if stringToInteger("99999999999999999") != int32Max {
		t.Error("expected INT32_MAX")
	}
}

func TestStringToIntegerExtremelyLargeNegative(t *testing.T) {
	if stringToInteger("-99999999999999999") != int32Min {
		t.Error("expected INT32_MIN")
	}
}

func TestStringToIntegerLeadingWhitespacePositive(t *testing.T) {
	if stringToInteger("  123") != 123 {
		t.Error("expected 123")
	}
}

func TestStringToIntegerStopsAfterSignWithLetters(t *testing.T) {
	if stringToInteger("-abc") != 0 {
		t.Error("expected 0")
	}
}

func TestStringToIntegerInt32MaxExact(t *testing.T) {
	if stringToInteger("2147483647") != int32Max {
		t.Error("expected INT32_MAX")
	}
}

func TestStringToIntegerInt32MinExact(t *testing.T) {
	if stringToInteger("-2147483648") != int32Min {
		t.Error("expected INT32_MIN")
	}
}
