package main

import (
	"reflect"
	"testing"
)

func TestFindAllAnagrams_FindsBothWindowsInDefault(t *testing.T) {
	result := findAllAnagrams("cbaebabacd", "abc")
	if !reflect.DeepEqual(result, []int{0, 6}) {
		t.Errorf("expected [0, 6], got %v", result)
	}
}

func TestFindAllAnagrams_FindsConsecutiveOverlappingWindows(t *testing.T) {
	result := findAllAnagrams("abab", "ab")
	if !reflect.DeepEqual(result, []int{0, 1, 2}) {
		t.Errorf("expected [0, 1, 2], got %v", result)
	}
}

func TestFindAllAnagrams_ReturnsEmptyWhenNoAnagram(t *testing.T) {
	result := findAllAnagrams("af", "be")
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestFindAllAnagrams_FindsMatchWhenEntireTextIsAnagram(t *testing.T) {
	result := findAllAnagrams("cba", "abc")
	if !reflect.DeepEqual(result, []int{0}) {
		t.Errorf("expected [0], got %v", result)
	}
}

func TestFindAllAnagrams_HandlesSingleCharacterPattern(t *testing.T) {
	result := findAllAnagrams("aaab", "a")
	if !reflect.DeepEqual(result, []int{0, 1, 2}) {
		t.Errorf("expected [0, 1, 2], got %v", result)
	}
}

func TestFindAllAnagrams_ReturnsEmptyWhenPatternLongerThanText(t *testing.T) {
	result := findAllAnagrams("ab", "abc")
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestFindAllAnagrams_ReturnsEmptyWhenNoWindowMatches(t *testing.T) {
	result := findAllAnagrams("aabbcc", "bca")
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestFindAllAnagrams_FindsAllWindowsForRepeatedCharPattern(t *testing.T) {
	result := findAllAnagrams("aababb", "aab")
	containsZero := false
	containsOne := false
	for _, val := range result {
		if val == 0 {
			containsZero = true
		}
		if val == 1 {
			containsOne = true
		}
	}
	if !containsZero || !containsOne {
		t.Errorf("expected result to contain 0 and 1, got %v", result)
	}
}
