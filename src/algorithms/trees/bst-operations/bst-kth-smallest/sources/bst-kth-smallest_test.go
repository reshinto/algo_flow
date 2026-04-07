package main

import "testing"

func makeKthNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func kthLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildKthTree() *BSTNode {
	return makeKthNode(4,
		makeKthNode(2, kthLeaf(1), kthLeaf(3)),
		makeKthNode(6, kthLeaf(5), kthLeaf(7)),
	)
}

func TestBSTKthSmallestFirst(t *testing.T) {
	if bstKthSmallest(buildKthTree(), 1) != 1 {
		t.Error("1st smallest should be 1")
	}
}

func TestBSTKthSmallestThird(t *testing.T) {
	if bstKthSmallest(buildKthTree(), 3) != 3 {
		t.Error("3rd smallest should be 3")
	}
}

func TestBSTKthSmallestSeventh(t *testing.T) {
	if bstKthSmallest(buildKthTree(), 7) != 7 {
		t.Error("7th smallest should be 7")
	}
}

func TestBSTKthSmallestOutOfRange(t *testing.T) {
	if bstKthSmallest(buildKthTree(), 10) != -1 {
		t.Error("out of range should return -1")
	}
}
