package main

import (
	"sort"
	"strings"
	"testing"
)

func TestSortCharactersByFrequency_SortsTreeSoEAppearsFirst(t *testing.T) {
	result := sortCharactersByFrequency("tree")
	if result[:2] != "ee" {
		t.Errorf("expected first 2 chars to be 'ee', got %s", result[:2])
	}
	if len(result) != 4 {
		t.Errorf("expected length 4, got %d", len(result))
	}
}

func TestSortCharactersByFrequency_ReturnsSingleCharUnchanged(t *testing.T) {
	if sortCharactersByFrequency("z") != "z" {
		t.Error("expected 'z'")
	}
}

func TestSortCharactersByFrequency_PlacesMostFrequentCharFirst(t *testing.T) {
	result := sortCharactersByFrequency("cccaab")
	if result[:3] != "ccc" {
		t.Errorf("expected first 3 chars to be 'ccc', got %s", result[:3])
	}
}

func TestSortCharactersByFrequency_HandlesAllIdenticalCharacters(t *testing.T) {
	if sortCharactersByFrequency("aaaa") != "aaaa" {
		t.Error("expected 'aaaa'")
	}
}

func TestSortCharactersByFrequency_PreservesAllCharactersInOutput(t *testing.T) {
	input := "mississippi"
	result := sortCharactersByFrequency(input)
	if len(result) != len(input) {
		t.Errorf("expected length %d, got %d", len(input), len(result))
	}
	sortedInput := strings.Split(input, "")
	sort.Strings(sortedInput)
	sortedResult := strings.Split(result, "")
	sort.Strings(sortedResult)
	if strings.Join(sortedResult, "") != strings.Join(sortedInput, "") {
		t.Error("output does not contain same characters as input")
	}
}
