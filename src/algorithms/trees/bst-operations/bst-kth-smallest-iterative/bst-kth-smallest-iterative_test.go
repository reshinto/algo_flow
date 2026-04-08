package main

import "testing"

func makeKthIterNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func kthIterLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildKthIterTree() *BSTNode {
	return makeKthIterNode(4,
		makeKthIterNode(2, kthIterLeaf(1), kthIterLeaf(3)),
		makeKthIterNode(6, kthIterLeaf(5), kthIterLeaf(7)),
	)
}

func TestBSTKthSmallestIterFirst(t *testing.T) {
	if bstKthSmallestIterative(buildKthIterTree(), 1) != 1 {
		t.Error("1st smallest should be 1")
	}
}

func TestBSTKthSmallestIterSecond(t *testing.T) {
	if bstKthSmallestIterative(buildKthIterTree(), 2) != 2 {
		t.Error("2nd smallest should be 2")
	}
}

func TestBSTKthSmallestIterSeventh(t *testing.T) {
	if bstKthSmallestIterative(buildKthIterTree(), 7) != 7 {
		t.Error("7th smallest should be 7")
	}
}

func TestBSTKthSmallestIterOutOfRange(t *testing.T) {
	if bstKthSmallestIterative(buildKthIterTree(), 99) != -1 {
		t.Error("out of range should return -1")
	}
}
