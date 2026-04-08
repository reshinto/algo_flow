package main

import (
	"strings"
	"testing"
)

func TestCharacterFrequencySortEmptyString(t *testing.T) {
	if characterFrequencySort("") != "" {
		t.Error("expected empty string for empty input")
	}
}

func TestCharacterFrequencySortTreeStartsWithEE(t *testing.T) {
	result := characterFrequencySort("tree")
	if !strings.HasPrefix(result, "ee") {
		t.Errorf("expected result to start with 'ee', got: %s", result)
	}
	if len(result) != 4 {
		t.Errorf("expected length 4, got: %d", len(result))
	}
}

func TestCharacterFrequencySortCccaaaGroupedBlocks(t *testing.T) {
	result := characterFrequencySort("cccaaa")
	if len(result) != 6 {
		t.Errorf("expected length 6, got: %d", len(result))
	}
	firstBlock := result[:3]
	secondBlock := result[3:]
	if firstBlock != "ccc" && firstBlock != "aaa" {
		t.Errorf("unexpected first block: %s", firstBlock)
	}
	if secondBlock != "ccc" && secondBlock != "aaa" {
		t.Errorf("unexpected second block: %s", secondBlock)
	}
	if firstBlock == secondBlock {
		t.Error("blocks should differ")
	}
}

func TestCharacterFrequencySortAabStartsWithAA(t *testing.T) {
	result := characterFrequencySort("aab")
	if !strings.HasPrefix(result, "aa") {
		t.Errorf("expected 'aa' prefix, got: %s", result)
	}
	if len(result) != 3 {
		t.Errorf("expected length 3, got: %d", len(result))
	}
}

func TestCharacterFrequencySortSingleCharacter(t *testing.T) {
	if characterFrequencySort("z") != "z" {
		t.Error("expected 'z' for single char input")
	}
}

func TestCharacterFrequencySortAllSameCharacters(t *testing.T) {
	if characterFrequencySort("aaaa") != "aaaa" {
		t.Error("expected 'aaaa' for all-same input")
	}
}

func TestCharacterFrequencySortPreservesAllCharacters(t *testing.T) {
	input := "programming"
	result := characterFrequencySort(input)
	if len(result) != len(input) {
		t.Errorf("expected length %d, got: %d", len(input), len(result))
	}
	for _, ch := range input {
		inputCount := strings.Count(input, string(ch))
		outputCount := strings.Count(result, string(ch))
		if inputCount != outputCount {
			t.Errorf("character %c count mismatch: input=%d output=%d", ch, inputCount, outputCount)
		}
	}
}

func TestCharacterFrequencySortEeebbastartswithEee(t *testing.T) {
	result := characterFrequencySort("eeebba")
	if !strings.HasPrefix(result, "eee") {
		t.Errorf("expected 'eee' prefix, got: %s", result)
	}
}

func TestCharacterFrequencySortAabbccContiguousBlocks(t *testing.T) {
	result := characterFrequencySort("aabbcc")
	if len(result) != 6 {
		t.Errorf("expected length 6, got: %d", len(result))
	}
	runes := []rune(result)
	for blockStart := 0; blockStart < 6; blockStart += 2 {
		if runes[blockStart] != runes[blockStart+1] {
			t.Errorf("expected contiguous block at position %d", blockStart)
		}
	}
}

func TestCharacterFrequencySortUppercaseLowercaseDistinct(t *testing.T) {
	result := characterFrequencySort("Aabb")
	if !strings.HasPrefix(result, "bb") {
		t.Errorf("expected 'bb' prefix, got: %s", result)
	}
	if len(result) != 4 {
		t.Errorf("expected length 4, got: %d", len(result))
	}
}
