package main

import "testing"

func TestLongestCommonPrefixFlowerFlowFlight(t *testing.T) {
	if longestCommonPrefix([]string{"flower", "flow", "flight"}) != "fl" {
		t.Error("expected 'fl'")
	}
}

func TestLongestCommonPrefixNoCommon(t *testing.T) {
	if longestCommonPrefix([]string{"dog", "racecar", "car"}) != "" {
		t.Error("expected empty string")
	}
}

func TestLongestCommonPrefixSingleEmptyString(t *testing.T) {
	if longestCommonPrefix([]string{""}) != "" {
		t.Error("expected empty string")
	}
}

func TestLongestCommonPrefixSingleElement(t *testing.T) {
	if longestCommonPrefix([]string{"hello"}) != "hello" {
		t.Error("expected 'hello'")
	}
}

func TestLongestCommonPrefixEmptyArray(t *testing.T) {
	if longestCommonPrefix([]string{}) != "" {
		t.Error("expected empty string for empty array")
	}
}

func TestLongestCommonPrefixOneEmptyString(t *testing.T) {
	if longestCommonPrefix([]string{"abc", ""}) != "" {
		t.Error("expected empty string")
	}
}

func TestLongestCommonPrefixAllIdentical(t *testing.T) {
	if longestCommonPrefix([]string{"abc", "abc", "abc"}) != "abc" {
		t.Error("expected 'abc'")
	}
}

func TestLongestCommonPrefixPrefixIsShortest(t *testing.T) {
	if longestCommonPrefix([]string{"ab", "abc", "abcd"}) != "ab" {
		t.Error("expected 'ab'")
	}
}

func TestLongestCommonPrefixAb(t *testing.T) {
	if longestCommonPrefix([]string{"ab", "a"}) != "a" {
		t.Error("expected 'a'")
	}
}

func TestLongestCommonPrefixPartialOverlap(t *testing.T) {
	if longestCommonPrefix([]string{"interview", "internal"}) != "inter" {
		t.Error("expected 'inter'")
	}
}
