package main

import "testing"

func makeDelIterNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func delIterLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBSTDeleteIterLeafNode(t *testing.T) {
	tree := makeDelIterNode(4, makeDelIterNode(2, delIterLeaf(1), delIterLeaf(3)), makeDelIterNode(6, delIterLeaf(5), delIterLeaf(7)))
	result := bstDeleteIterative(tree, 7)
	if result.right.right != nil {
		t.Error("leaf node should be deleted")
	}
}

func TestBSTDeleteIterTwoChildren(t *testing.T) {
	tree := makeDelIterNode(4, makeDelIterNode(2, delIterLeaf(1), delIterLeaf(3)), makeDelIterNode(6, delIterLeaf(5), delIterLeaf(7)))
	result := bstDeleteIterative(tree, 6)
	if result.right.value != 7 {
		t.Errorf("expected 7, got %d", result.right.value)
	}
}

func TestBSTDeleteIterOnlyNode(t *testing.T) {
	if bstDeleteIterative(delIterLeaf(5), 5) != nil {
		t.Error("single node delete should return nil")
	}
}

func TestBSTDeleteIterAbsent(t *testing.T) {
	tree := makeDelIterNode(4, delIterLeaf(2), delIterLeaf(6))
	result := bstDeleteIterative(tree, 99)
	if result.value != 4 {
		t.Errorf("expected 4, got %d", result.value)
	}
}
