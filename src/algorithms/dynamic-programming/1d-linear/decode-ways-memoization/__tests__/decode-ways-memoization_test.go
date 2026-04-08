package main

import "testing"

func TestDecodeWaysMemoizationEmptyString(t *testing.T) {
	if decodeWaysMemoization("") != 0 {
		t.Errorf("empty string should return 0")
	}
}

func TestDecodeWaysMemoizationSingleDigit(t *testing.T) {
	if decodeWaysMemoization("1") != 1 {
		t.Errorf("'1' should return 1")
	}
}

func TestDecodeWaysMemoizationLeadingZero(t *testing.T) {
	if decodeWaysMemoization("0") != 0 {
		t.Errorf("'0' should return 0")
	}
}

func TestDecodeWaysMemoization12(t *testing.T) {
	if decodeWaysMemoization("12") != 2 {
		t.Errorf("'12' should return 2")
	}
}

func TestDecodeWaysMemoization226(t *testing.T) {
	if decodeWaysMemoization("226") != 3 {
		t.Errorf("'226' should return 3")
	}
}

func TestDecodeWaysMemoization12321(t *testing.T) {
	if decodeWaysMemoization("12321") != 6 {
		t.Errorf("'12321' should return 6")
	}
}

func TestDecodeWaysMemoization123(t *testing.T) {
	if decodeWaysMemoization("123") != 3 {
		t.Errorf("'123' should return 3")
	}
}

func TestDecodeWaysMemoizationDoubleZero(t *testing.T) {
	if decodeWaysMemoization("00") != 0 {
		t.Errorf("'00' should return 0")
	}
}
