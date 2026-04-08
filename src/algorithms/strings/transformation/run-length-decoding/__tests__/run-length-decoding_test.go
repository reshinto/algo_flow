package main

import "testing"

func TestRunLengthDecodingDefaultExample(t *testing.T) {
	if runLengthDecoding("3a2b4c") != "aaabbcccc" {
		t.Error("expected 'aaabbcccc'")
	}
}

func TestRunLengthDecodingAllSingleCount(t *testing.T) {
	if runLengthDecoding("1a1b1c") != "abc" {
		t.Error("expected 'abc'")
	}
}

func TestRunLengthDecodingEmptyString(t *testing.T) {
	if runLengthDecoding("") != "" {
		t.Error("expected empty string")
	}
}

func TestRunLengthDecodingSingleGroupOneChar(t *testing.T) {
	if runLengthDecoding("1z") != "z" {
		t.Error("expected 'z'")
	}
}

func TestRunLengthDecodingSingleGroupManyChars(t *testing.T) {
	if runLengthDecoding("5x") != "xxxxx" {
		t.Error("expected 'xxxxx'")
	}
}

func TestRunLengthDecodingMixedCountGroups(t *testing.T) {
	if runLengthDecoding("2a3b1c") != "aabbbc" {
		t.Error("expected 'aabbbc'")
	}
}

func TestRunLengthDecodingMultiDigitCount(t *testing.T) {
	if runLengthDecoding("10a") != "aaaaaaaaaa" {
		t.Error("expected 'aaaaaaaaaa'")
	}
}

func TestRunLengthDecodingTwoIdenticalGroups(t *testing.T) {
	if runLengthDecoding("2a2a") != "aaaa" {
		t.Error("expected 'aaaa'")
	}
}

func TestRunLengthDecodingUppercaseLetters(t *testing.T) {
	if runLengthDecoding("3A2B") != "AAABB" {
		t.Error("expected 'AAABB'")
	}
}
