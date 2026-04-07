package main

import "testing"

func makeSTNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func stLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestSameTreeTwoNulls(t *testing.T) {
	if sameTree(nil, nil) != true {
		t.Error("two nulls should be true")
	}
}

func TestSameTreeOneNull(t *testing.T) {
	if sameTree(stLeaf(1), nil) != false {
		t.Error("one null should be false")
	}
}

func TestSameTreeIdenticalNodes(t *testing.T) {
	if sameTree(stLeaf(1), stLeaf(1)) != true {
		t.Error("identical single nodes should be true")
	}
}

func TestSameTreeDifferentNodes(t *testing.T) {
	if sameTree(stLeaf(1), stLeaf(2)) != false {
		t.Error("different single nodes should be false")
	}
}

func TestSameTreeIdentical7NodeBSTs(t *testing.T) {
	treeA := makeSTNode(4, makeSTNode(2, stLeaf(1), stLeaf(3)), makeSTNode(6, stLeaf(5), stLeaf(7)))
	treeB := makeSTNode(4, makeSTNode(2, stLeaf(1), stLeaf(3)), makeSTNode(6, stLeaf(5), stLeaf(7)))
	if sameTree(treeA, treeB) != true {
		t.Error("identical 7-node BSTs should be true")
	}
}

func TestSameTreeDifferentStructures(t *testing.T) {
	treeA := makeSTNode(1, stLeaf(2), nil)
	treeB := makeSTNode(1, nil, stLeaf(2))
	if sameTree(treeA, treeB) != false {
		t.Error("different structures should be false")
	}
}
