package main

import "testing"

func makePruningNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func pruningLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestBTPReturnsNilForAllZeros(t *testing.T) {
	root := makePruningNode(0, pruningLeaf(0), pruningLeaf(0))
	if binaryTreePruning(root) != nil {
		t.Error("all-zero tree should return nil")
	}
}

func TestBTPReturnsNilForSingleZero(t *testing.T) {
	if binaryTreePruning(pruningLeaf(0)) != nil {
		t.Error("single zero should return nil")
	}
}

func TestBTPKeepsSingleOneNode(t *testing.T) {
	result := binaryTreePruning(pruningLeaf(1))
	if result == nil || result.value != 1 {
		t.Error("single one node should be kept")
	}
}

func TestBTPPrunesZeroOnlySubtrees(t *testing.T) {
	root := makePruningNode(
		1,
		makePruningNode(0, pruningLeaf(0), pruningLeaf(0)),
		makePruningNode(1, pruningLeaf(0), pruningLeaf(1)),
	)
	pruned := binaryTreePruning(root)
	if pruned == nil {
		t.Fatal("root should not be nil")
	}
	if pruned.left != nil {
		t.Error("left subtree should be pruned")
	}
	if pruned.right == nil {
		t.Fatal("right subtree should be kept")
	}
	if pruned.right.left != nil {
		t.Error("right.left should be pruned")
	}
	if pruned.right.right == nil || pruned.right.right.value != 1 {
		t.Error("right.right should be 1")
	}
}

func TestBTPNilInput(t *testing.T) {
	if binaryTreePruning(nil) != nil {
		t.Error("nil input should return nil")
	}
}
