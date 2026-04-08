package main

import "testing"

func makeRSNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func rsLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildRSTree() *BSTNode {
	return makeRSNode(4,
		makeRSNode(2, rsLeaf(1), rsLeaf(3)),
		makeRSNode(6, rsLeaf(5), rsLeaf(7)),
	)
}

func TestBSTRangeSumRange2To6(t *testing.T) {
	if bstRangeSum(buildRSTree(), 2, 6) != 20 {
		t.Error("range sum [2,6] should be 20")
	}
}

func TestBSTRangeSumAllValues(t *testing.T) {
	if bstRangeSum(buildRSTree(), 1, 7) != 28 {
		t.Error("all values sum should be 28")
	}
}

func TestBSTRangeSumNoMatch(t *testing.T) {
	if bstRangeSum(buildRSTree(), 10, 20) != 0 {
		t.Error("no match should return 0")
	}
}

func TestBSTRangeSumSingleMatch(t *testing.T) {
	if bstRangeSum(buildRSTree(), 4, 4) != 4 {
		t.Error("single match should return 4")
	}
}

func TestBSTRangeSumNilTree(t *testing.T) {
	if bstRangeSum(nil, 1, 7) != 0 {
		t.Error("nil tree should return 0")
	}
}
