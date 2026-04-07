package main

import (
	"reflect"
	"sort"
	"testing"
)

func TestSuffixArrayConstructionBanana(t *testing.T) {
	expected := []int{5, 3, 1, 0, 4, 2}
	if !reflect.DeepEqual(suffixArrayConstruction("banana"), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestSuffixArrayConstructionSingleChar(t *testing.T) {
	expected := []int{0}
	if !reflect.DeepEqual(suffixArrayConstruction("a"), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestSuffixArrayConstructionEmptyString(t *testing.T) {
	result := suffixArrayConstruction("")
	if len(result) != 0 {
		t.Error("expected empty slice for empty string")
	}
}

func TestSuffixArrayConstructionAb(t *testing.T) {
	if !reflect.DeepEqual(suffixArrayConstruction("ab"), []int{0, 1}) {
		t.Error("expected [0, 1]")
	}
}

func TestSuffixArrayConstructionBa(t *testing.T) {
	if !reflect.DeepEqual(suffixArrayConstruction("ba"), []int{1, 0}) {
		t.Error("expected [1, 0]")
	}
}

func TestSuffixArrayConstructionAaa(t *testing.T) {
	if !reflect.DeepEqual(suffixArrayConstruction("aaa"), []int{2, 1, 0}) {
		t.Error("expected [2, 1, 0]")
	}
}

func TestSuffixArrayConstructionMississippi(t *testing.T) {
	expected := []int{10, 7, 4, 1, 0, 9, 8, 6, 3, 5, 2}
	if !reflect.DeepEqual(suffixArrayConstruction("mississippi"), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestSuffixArrayConstructionLengthEqualsInput(t *testing.T) {
	if len(suffixArrayConstruction("hello")) != 5 {
		t.Error("expected length 5")
	}
}

func TestSuffixArrayConstructionIsPermutation(t *testing.T) {
	text := "abracadabra"
	result := suffixArrayConstruction(text)
	sorted := make([]int, len(result))
	copy(sorted, result)
	sort.Ints(sorted)
	for idx := range text {
		if sorted[idx] != idx {
			t.Errorf("not a permutation at index %d", idx)
		}
	}
}

func TestSuffixArrayConstructionAbab(t *testing.T) {
	if !reflect.DeepEqual(suffixArrayConstruction("abab"), []int{2, 0, 3, 1}) {
		t.Error("expected [2, 0, 3, 1]")
	}
}

func TestSuffixArrayConstructionSortedSuffixes(t *testing.T) {
	text := "banana"
	suffixArray := suffixArrayConstruction(text)
	for rankIdx := 0; rankIdx < len(suffixArray)-1; rankIdx++ {
		currentSuffix := text[suffixArray[rankIdx]:]
		nextSuffix := text[suffixArray[rankIdx+1]:]
		if currentSuffix > nextSuffix {
			t.Errorf("suffixes not sorted at rank %d: %s > %s", rankIdx, currentSuffix, nextSuffix)
		}
	}
}
