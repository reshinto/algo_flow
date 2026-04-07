package main

import "testing"

func TestRomanToInteger_ConvertsMcmxcivTo1994(t *testing.T) {
	if romanToInteger("MCMXCIV") != 1994 {
		t.Error("expected 1994")
	}
}

func TestRomanToInteger_ConvertsIiiTo3(t *testing.T) {
	if romanToInteger("III") != 3 {
		t.Error("expected 3")
	}
}

func TestRomanToInteger_ConvertsIvTo4(t *testing.T) {
	if romanToInteger("IV") != 4 {
		t.Error("expected 4")
	}
}

func TestRomanToInteger_ConvertsIxTo9(t *testing.T) {
	if romanToInteger("IX") != 9 {
		t.Error("expected 9")
	}
}

func TestRomanToInteger_ConvertsLviiiTo58(t *testing.T) {
	if romanToInteger("LVIII") != 58 {
		t.Error("expected 58")
	}
}

func TestRomanToInteger_ConvertsMTo1000(t *testing.T) {
	if romanToInteger("M") != 1000 {
		t.Error("expected 1000")
	}
}

func TestRomanToInteger_ConvertsMmmdccxlixTo3749(t *testing.T) {
	if romanToInteger("MMMDCCXLIX") != 3749 {
		t.Error("expected 3749")
	}
}

func TestRomanToInteger_ConvertsXlTo40(t *testing.T) {
	if romanToInteger("XL") != 40 {
		t.Error("expected 40")
	}
}

func TestRomanToInteger_ConvertsCdTo400(t *testing.T) {
	if romanToInteger("CD") != 400 {
		t.Error("expected 400")
	}
}

func TestRomanToInteger_ConvertsMmmcmxcixTo3999(t *testing.T) {
	if romanToInteger("MMMCMXCIX") != 3999 {
		t.Error("expected 3999")
	}
}
