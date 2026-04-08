package main

import "testing"

func makeRSIterNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func rsIterLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildRSIterTree() *BSTNode {
	return makeRSIterNode(4,
		makeRSIterNode(2, rsIterLeaf(1), rsIterLeaf(3)),
		makeRSIterNode(6, rsIterLeaf(5), rsIterLeaf(7)),
	)
}

func TestBSTRangeSumIterRange3To7(t *testing.T) {
	if bstRangeSumIterative(buildRSIterTree(), 3, 7) != 25 {
		t.Error("range sum [3,7] should be 25")
	}
}

func TestBSTRangeSumIterAllValues(t *testing.T) {
	if bstRangeSumIterative(buildRSIterTree(), 1, 7) != 28 {
		t.Error("all values sum should be 28")
	}
}

func TestBSTRangeSumIterNoMatch(t *testing.T) {
	if bstRangeSumIterative(buildRSIterTree(), 10, 20) != 0 {
		t.Error("no match should return 0")
	}
}

func TestBSTRangeSumIterNilTree(t *testing.T) {
	if bstRangeSumIterative(nil, 1, 7) != 0 {
		t.Error("nil tree should return 0")
	}
}
