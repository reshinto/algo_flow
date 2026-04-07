package main

import "testing"

func makeInsIterNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func insIterLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBSTInsertIterGreaterThanAll(t *testing.T) {
	tree := makeInsIterNode(4,
		makeInsIterNode(2, insIterLeaf(1), insIterLeaf(3)),
		makeInsIterNode(6, insIterLeaf(5), insIterLeaf(7)),
	)
	result := bstInsertIterative(tree, 8)
	if result.right.right.right.value != 8 {
		t.Error("insert greater than all failed")
	}
}

func TestBSTInsertIterCreatesRootFromNil(t *testing.T) {
	result := bstInsertIterative(nil, 5)
	if result == nil || result.value != 5 {
		t.Error("create root from nil failed")
	}
}

func TestBSTInsertIterLeftChild(t *testing.T) {
	result := bstInsertIterative(insIterLeaf(10), 5)
	if result.left == nil || result.left.value != 5 {
		t.Error("left child insert failed")
	}
}

func TestBSTInsertIterIgnoresDuplicates(t *testing.T) {
	tree := makeInsIterNode(4, insIterLeaf(2), insIterLeaf(6))
	result := bstInsertIterative(tree, 2)
	if result.left.right != nil {
		t.Error("duplicate should be ignored")
	}
}
