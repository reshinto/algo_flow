package main

import "testing"

func TestTrieInsertSearchFindsExactWord(t *testing.T) {
	if !trieInsertSearch([]string{"apple", "app"}, "app") {
		t.Error("expected true")
	}
}

func TestTrieInsertSearchPrefixNotFullWord(t *testing.T) {
	if trieInsertSearch([]string{"apple"}, "ap") {
		t.Error("expected false")
	}
}

func TestTrieInsertSearchFindsLongerWord(t *testing.T) {
	if !trieInsertSearch([]string{"apple", "app"}, "apple") {
		t.Error("expected true")
	}
}

func TestTrieInsertSearchNotInTrie(t *testing.T) {
	if trieInsertSearch([]string{"apple", "app", "apricot"}, "banana") {
		t.Error("expected false")
	}
}

func TestTrieInsertSearchEmptyTrie(t *testing.T) {
	if trieInsertSearch([]string{}, "app") {
		t.Error("expected false")
	}
}

func TestTrieInsertSearchSingleWordFound(t *testing.T) {
	if !trieInsertSearch([]string{"hello"}, "hello") {
		t.Error("expected true")
	}
}

func TestTrieInsertSearchExtendsBeyondInserted(t *testing.T) {
	if trieInsertSearch([]string{"app"}, "apple") {
		t.Error("expected false")
	}
}

func TestTrieInsertSearchNoCommonPrefixFound(t *testing.T) {
	if !trieInsertSearch([]string{"cat", "dog", "bird"}, "dog") {
		t.Error("expected true")
	}
}

func TestTrieInsertSearchNoCommonPrefixMiss(t *testing.T) {
	if trieInsertSearch([]string{"cat", "dog", "bird"}, "fox") {
		t.Error("expected false")
	}
}

func TestTrieInsertSearchDuplicateWords(t *testing.T) {
	if !trieInsertSearch([]string{"apple", "apple"}, "apple") {
		t.Error("expected true")
	}
}

func TestTrieInsertSearchSingleCharWords(t *testing.T) {
	if !trieInsertSearch([]string{"a", "b", "c"}, "b") {
		t.Error("expected true")
	}
}

func TestTrieInsertSearchEmptySearchNoEmptyWord(t *testing.T) {
	if trieInsertSearch([]string{"apple", "app"}, "") {
		t.Error("expected false")
	}
}
