package main

import "testing"

func makeSearchNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func searchLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildSearchTree() *BSTNode {
	return makeSearchNode(4,
		makeSearchNode(2, searchLeaf(1), searchLeaf(3)),
		makeSearchNode(6, searchLeaf(5), searchLeaf(7)),
	)
}

func TestBSTSearchFindsExisting(t *testing.T) {
	result := bstSearch(buildSearchTree(), 5)
	if result == nil || result.value != 5 {
		t.Error("should find 5")
	}
}

func TestBSTSearchReturnsNilForMissing(t *testing.T) {
	if bstSearch(buildSearchTree(), 9) != nil {
		t.Error("missing value should return nil")
	}
}

func TestBSTSearchFindsRoot(t *testing.T) {
	result := bstSearch(buildSearchTree(), 4)
	if result == nil || result.value != 4 {
		t.Error("should find root 4")
	}
}

func TestBSTSearchFindsLeaf(t *testing.T) {
	result := bstSearch(buildSearchTree(), 1)
	if result == nil || result.value != 1 {
		t.Error("should find leaf 1")
	}
}

func TestBSTSearchNilTree(t *testing.T) {
	if bstSearch(nil, 5) != nil {
		t.Error("nil tree should return nil")
	}
}
