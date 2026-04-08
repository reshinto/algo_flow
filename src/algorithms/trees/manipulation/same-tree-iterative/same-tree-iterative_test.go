package main

import "testing"

func makeSTINode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func stiLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestSameTreeIterativeTwoNulls(t *testing.T) {
	if sameTreeIterative(nil, nil) != true {
		t.Error("two nulls should be true")
	}
}

func TestSameTreeIterativeOneNull(t *testing.T) {
	if sameTreeIterative(stiLeaf(1), nil) != false {
		t.Error("one null should be false")
	}
}

func TestSameTreeIterativeIdenticalNodes(t *testing.T) {
	if sameTreeIterative(stiLeaf(1), stiLeaf(1)) != true {
		t.Error("identical single nodes should be true")
	}
}

func TestSameTreeIterativeDifferentNodes(t *testing.T) {
	if sameTreeIterative(stiLeaf(1), stiLeaf(2)) != false {
		t.Error("different single nodes should be false")
	}
}

func TestSameTreeIterativeIdentical7NodeBSTs(t *testing.T) {
	treeA := makeSTINode(4, makeSTINode(2, stiLeaf(1), stiLeaf(3)), makeSTINode(6, stiLeaf(5), stiLeaf(7)))
	treeB := makeSTINode(4, makeSTINode(2, stiLeaf(1), stiLeaf(3)), makeSTINode(6, stiLeaf(5), stiLeaf(7)))
	if sameTreeIterative(treeA, treeB) != true {
		t.Error("identical 7-node BSTs should be true")
	}
}

func TestSameTreeIterativeDifferentStructures(t *testing.T) {
	treeA := makeSTINode(1, stiLeaf(2), nil)
	treeB := makeSTINode(1, nil, stiLeaf(2))
	if sameTreeIterative(treeA, treeB) != false {
		t.Error("different structures should be false")
	}
}
