package main

import "testing"

func TestIntegerToRoman_Converts1994ToMcmxciv(t *testing.T) {
	if integerToRoman(1994) != "MCMXCIV" {
		t.Error("expected MCMXCIV")
	}
}

func TestIntegerToRoman_Converts3ToIii(t *testing.T) {
	if integerToRoman(3) != "III" {
		t.Error("expected III")
	}
}

func TestIntegerToRoman_Converts58ToLviii(t *testing.T) {
	if integerToRoman(58) != "LVIII" {
		t.Error("expected LVIII")
	}
}

func TestIntegerToRoman_Converts1ToI(t *testing.T) {
	if integerToRoman(1) != "I" {
		t.Error("expected I")
	}
}

func TestIntegerToRoman_Converts3999ToMmmcmxcix(t *testing.T) {
	if integerToRoman(3999) != "MMMCMXCIX" {
		t.Error("expected MMMCMXCIX")
	}
}

func TestIntegerToRoman_Converts9ToIx(t *testing.T) {
	if integerToRoman(9) != "IX" {
		t.Error("expected IX")
	}
}

func TestIntegerToRoman_Converts40ToXl(t *testing.T) {
	if integerToRoman(40) != "XL" {
		t.Error("expected XL")
	}
}

func TestIntegerToRoman_Converts1000ToM(t *testing.T) {
	if integerToRoman(1000) != "M" {
		t.Error("expected M")
	}
}
