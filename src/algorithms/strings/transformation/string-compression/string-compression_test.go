package main

import "testing"

func TestStringCompressionCompressesRepeated(t *testing.T) {
	if stringCompression("aabcccccaaa") != "a2b1c5a3" {
		t.Error("expected 'a2b1c5a3'")
	}
}

func TestStringCompressionReturnsOriginalIfNotShorter(t *testing.T) {
	if stringCompression("abc") != "abc" {
		t.Error("expected 'abc'")
	}
}

func TestStringCompressionEmptyString(t *testing.T) {
	if stringCompression("") != "" {
		t.Error("expected empty string")
	}
}

func TestStringCompressionSingleChar(t *testing.T) {
	if stringCompression("a") != "a" {
		t.Error("expected 'a'")
	}
}

func TestStringCompressionTwoIdenticalCharsSameLength(t *testing.T) {
	if stringCompression("aa") != "aa" {
		t.Error("expected 'aa'")
	}
}

func TestStringCompressionLongRun(t *testing.T) {
	if stringCompression("aaaaaaa") != "a7" {
		t.Error("expected 'a7'")
	}
}

func TestStringCompressionAlternatingSegments(t *testing.T) {
	if stringCompression("aaabbbccc") != "a3b3c3" {
		t.Error("expected 'a3b3c3'")
	}
}

func TestStringCompressionNoRuns(t *testing.T) {
	if stringCompression("abcd") != "abcd" {
		t.Error("expected 'abcd'")
	}
}

func TestStringCompressionLongRunThenShort(t *testing.T) {
	if stringCompression("aaaaab") != "a5b1" {
		t.Error("expected 'a5b1'")
	}
}

func TestStringCompressionTwoDistinctRuns(t *testing.T) {
	if stringCompression("aaabbb") != "a3b3" {
		t.Error("expected 'a3b3'")
	}
}

func TestStringCompressionSingleThenLongRun(t *testing.T) {
	if stringCompression("abbbbb") != "a1b5" {
		t.Error("expected 'a1b5'")
	}
}

func TestStringCompressionDigits(t *testing.T) {
	if stringCompression("1111222") != "1423" {
		t.Error("expected '1423'")
	}
}
