package main

import "testing"

func makeBSTValNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func bstValLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildBSTValTree() *BSTNode {
	return makeBSTValNode(4,
		makeBSTValNode(2, bstValLeaf(1), bstValLeaf(3)),
		makeBSTValNode(6, bstValLeaf(5), bstValLeaf(7)),
	)
}

func TestBSTValidationValidTree(t *testing.T) {
	if bstValidation(buildBSTValTree()) != true {
		t.Error("valid BST should return true")
	}
}

func TestBSTValidationInvalidTree(t *testing.T) {
	invalid := makeBSTValNode(5, bstValLeaf(6), bstValLeaf(7))
	if bstValidation(invalid) != false {
		t.Error("invalid BST should return false")
	}
}

func TestBSTValidationNull(t *testing.T) {
	if bstValidation(nil) != true {
		t.Error("null should return true")
	}
}

func TestBSTValidationSingleNode(t *testing.T) {
	if bstValidation(bstValLeaf(42)) != true {
		t.Error("single node should return true")
	}
}

func TestBSTValidationNonLocalViolation(t *testing.T) {
	invalid := makeBSTValNode(5, nil, makeBSTValNode(10, bstValLeaf(3), nil))
	if bstValidation(invalid) != false {
		t.Error("non-local violation should return false")
	}
}
