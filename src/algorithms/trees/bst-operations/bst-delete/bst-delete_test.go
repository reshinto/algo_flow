package main

import "testing"

func makeBSTNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func bstLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBSTDeleteLeafNode(t *testing.T) {
	tree := makeBSTNode(4, makeBSTNode(2, bstLeaf(1), bstLeaf(3)), makeBSTNode(6, bstLeaf(5), bstLeaf(7)))
	result := bstDelete(tree, 1)
	if result.left.left != nil {
		t.Error("leaf node should be deleted")
	}
}

func TestBSTDeleteNodeWithOneChild(t *testing.T) {
	tree := makeBSTNode(4, makeBSTNode(2, bstLeaf(1), nil), bstLeaf(6))
	result := bstDelete(tree, 2)
	if result.left.value != 1 {
		t.Errorf("expected 1, got %d", result.left.value)
	}
}

func TestBSTDeleteNodeWithTwoChildren(t *testing.T) {
	tree := makeBSTNode(4, makeBSTNode(2, bstLeaf(1), bstLeaf(3)), makeBSTNode(6, bstLeaf(5), bstLeaf(7)))
	result := bstDelete(tree, 4)
	if result == nil {
		t.Error("result should not be nil after deleting root with two children")
	}
}

func TestBSTDeleteOnlyNode(t *testing.T) {
	if bstDelete(bstLeaf(5), 5) != nil {
		t.Error("single node delete should return nil")
	}
}

func TestBSTDeleteUnchangedWhenNotFound(t *testing.T) {
	tree := makeBSTNode(4, bstLeaf(2), bstLeaf(6))
	result := bstDelete(tree, 99)
	if result.value != 4 {
		t.Errorf("expected 4, got %d", result.value)
	}
}
