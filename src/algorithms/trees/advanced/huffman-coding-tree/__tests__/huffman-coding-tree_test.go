package main

import (
	"strings"
	"testing"
)

var defaultHuffmanFreqs = []CharFreq{
	{Char: 'a', Freq: 5},
	{Char: 'b', Freq: 9},
	{Char: 'c', Freq: 12},
	{Char: 'd', Freq: 13},
	{Char: 'e', Freq: 16},
	{Char: 'f', Freq: 45},
}

func isValidBinary(code string) bool {
	for _, bit := range code {
		if bit != '0' && bit != '1' {
			return false
		}
	}
	return len(code) > 0
}

func TestHuffmanProducesEncodingsForAll(t *testing.T) {
	result := huffmanCodingTree(defaultHuffmanFreqs)
	for _, item := range defaultHuffmanFreqs {
		if _, ok := result[item.Char]; !ok {
			t.Errorf("missing encoding for %c", item.Char)
		}
	}
}

func TestHuffmanValidBinaryStrings(t *testing.T) {
	result := huffmanCodingTree(defaultHuffmanFreqs)
	for ch, encoding := range result {
		if !isValidBinary(encoding) {
			t.Errorf("invalid encoding for %c: %q", ch, encoding)
		}
	}
}

func TestHuffmanMostFrequentGetsShortest(t *testing.T) {
	result := huffmanCodingTree(defaultHuffmanFreqs)
	fLen := len(result['f'])
	for _, item := range defaultHuffmanFreqs {
		if item.Char != 'f' {
			if fLen > len(result[item.Char]) {
				t.Errorf("f should have shortest code, but %c has shorter", item.Char)
			}
		}
	}
}

func TestHuffmanPrefixFree(t *testing.T) {
	result := huffmanCodingTree(defaultHuffmanFreqs)
	codes := make([]string, 0)
	for _, enc := range result {
		codes = append(codes, enc)
	}
	for idxA, codeA := range codes {
		for idxB, codeB := range codes {
			if idxA != idxB && strings.HasPrefix(codeA, codeB) && codeA != codeB {
				t.Errorf("code %q is a prefix of %q", codeB, codeA)
			}
		}
	}
}

func TestHuffmanSingleCharacter(t *testing.T) {
	result := huffmanCodingTree([]CharFreq{{Char: 'x', Freq: 10}})
	if result['x'] != "0" {
		t.Errorf("expected '0', got %q", result['x'])
	}
}
