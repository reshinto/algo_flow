package main

import "testing"

func TestDecodeStringSimple(t *testing.T) {
	if decodeString("3[a]") != "aaa" {
		t.Errorf("expected 'aaa'")
	}
}

func TestDecodeStringNested(t *testing.T) {
	if decodeString("3[a2[c]]") != "accaccacc" {
		t.Errorf("expected 'accaccacc'")
	}
}

func TestDecodeStringMultipleGroups(t *testing.T) {
	if decodeString("2[abc]3[cd]ef") != "abcabccdcdcdef" {
		t.Errorf("expected 'abcabccdcdcdef'")
	}
}

func TestDecodeStringPlainString(t *testing.T) {
	if decodeString("abc") != "abc" {
		t.Errorf("expected 'abc'")
	}
}

func TestDecodeStringSingleCharRepeated(t *testing.T) {
	if decodeString("5[z]") != "zzzzz" {
		t.Errorf("expected 'zzzzz'")
	}
}

func TestDecodeStringDeeplyNested(t *testing.T) {
	if decodeString("2[2[a]]") != "aaaa" {
		t.Errorf("expected 'aaaa'")
	}
}

func TestDecodeStringEmpty(t *testing.T) {
	if decodeString("") != "" {
		t.Errorf("expected empty string")
	}
}

func TestDecodeStringMultiDigitCount(t *testing.T) {
	if decodeString("10[a]") != "aaaaaaaaaa" {
		t.Errorf("expected 'aaaaaaaaaa'")
	}
}
