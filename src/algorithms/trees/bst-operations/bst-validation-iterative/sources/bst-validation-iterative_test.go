package main

import "testing"

func makeBSTValIterNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func bstValIterLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildBSTValIterTree() *BSTNode {
	return makeBSTValIterNode(4,
		makeBSTValIterNode(2, bstValIterLeaf(1), bstValIterLeaf(3)),
		makeBSTValIterNode(6, bstValIterLeaf(5), bstValIterLeaf(7)),
	)
}

func TestBSTValidationIterativeValidTree(t *testing.T) {
	result := bstValidationIterative(buildBSTValIterTree())
	if result != true {
		t.Error("valid BST should return true")
	}
}

func TestBSTValidationIterativeInvalidTree(t *testing.T) {
	invalid := makeBSTValIterNode(5, bstValIterLeaf(6), bstValIterLeaf(7))
	if bstValidationIterative(invalid) != false {
		t.Error("invalid BST should return false")
	}
}

func TestBSTValidationIterativeNull(t *testing.T) {
	if bstValidationIterative(nil) != true {
		t.Error("null should return true")
	}
}

func TestBSTValidationIterativeSingleNode(t *testing.T) {
	if bstValidationIterative(bstValIterLeaf(10)) != true {
		t.Error("single node should return true")
	}
}
