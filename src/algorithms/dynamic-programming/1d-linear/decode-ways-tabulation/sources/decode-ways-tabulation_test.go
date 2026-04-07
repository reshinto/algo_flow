package main

import "testing"

func TestDecodeWaysTabulation12321(t *testing.T) {
	if decodeWaysTabulation("12321") != 6 {
		t.Errorf("'12321' should return 6")
	}
}

func TestDecodeWaysTabulation226(t *testing.T) {
	if decodeWaysTabulation("226") != 3 {
		t.Errorf("'226' should return 3")
	}
}

func TestDecodeWaysTabulationSingleZero(t *testing.T) {
	if decodeWaysTabulation("0") != 0 {
		t.Errorf("'0' should return 0")
	}
}

func TestDecodeWaysTabulation10(t *testing.T) {
	if decodeWaysTabulation("10") != 1 {
		t.Errorf("'10' should return 1")
	}
}

func TestDecodeWaysTabulation12(t *testing.T) {
	if decodeWaysTabulation("12") != 2 {
		t.Errorf("'12' should return 2")
	}
}

func TestDecodeWaysTabulationEmpty(t *testing.T) {
	if decodeWaysTabulation("") != 0 {
		t.Errorf("empty string should return 0")
	}
}

func TestDecodeWaysTabulationDoubleZero(t *testing.T) {
	if decodeWaysTabulation("00") != 0 {
		t.Errorf("'00' should return 0")
	}
}
