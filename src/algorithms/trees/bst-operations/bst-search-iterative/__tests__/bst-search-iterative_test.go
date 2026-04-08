package main

import "testing"

func makeSearchIterNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func searchIterLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildSearchIterTree() *BSTNode {
	return makeSearchIterNode(4,
		makeSearchIterNode(2, searchIterLeaf(1), searchIterLeaf(3)),
		makeSearchIterNode(6, searchIterLeaf(5), searchIterLeaf(7)),
	)
}

func TestBSTSearchIterFindsValue(t *testing.T) {
	result := bstSearchIterative(buildSearchIterTree(), 6)
	if result == nil || result.value != 6 {
		t.Error("should find 6")
	}
}

func TestBSTSearchIterReturnsNilForMissing(t *testing.T) {
	if bstSearchIterative(buildSearchIterTree(), 10) != nil {
		t.Error("missing should return nil")
	}
}

func TestBSTSearchIterFindsRoot(t *testing.T) {
	result := bstSearchIterative(buildSearchIterTree(), 4)
	if result == nil || result.value != 4 {
		t.Error("should find root 4")
	}
}

func TestBSTSearchIterNilTree(t *testing.T) {
	if bstSearchIterative(nil, 5) != nil {
		t.Error("nil tree should return nil")
	}
}

func TestBSTSearchIterFindsLeftLeaf(t *testing.T) {
	result := bstSearchIterative(buildSearchIterTree(), 1)
	if result == nil || result.value != 1 {
		t.Error("should find left leaf 1")
	}
}
