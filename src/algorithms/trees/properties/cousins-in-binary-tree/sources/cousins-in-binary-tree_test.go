package main

import "testing"

func makeCIBTNode(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func cibtLeaf(value int) *TreeNode {
	return &TreeNode{value: value}
}

func buildCIBT7NodeTree() *TreeNode {
	return makeCIBTNode(4,
		makeCIBTNode(2, cibtLeaf(1), cibtLeaf(3)),
		makeCIBTNode(6, cibtLeaf(5), cibtLeaf(7)))
}

func TestCousinsInBinaryTreeCousins1And5(t *testing.T) {
	if cousinsInBinaryTree(buildCIBT7NodeTree(), 1, 5) != true {
		t.Error("1 and 5 should be cousins")
	}
}

func TestCousinsInBinaryTreeSiblingsNotCousins(t *testing.T) {
	if cousinsInBinaryTree(buildCIBT7NodeTree(), 1, 3) != false {
		t.Error("siblings should not be cousins")
	}
}

func TestCousinsInBinaryTreeDifferentDepths(t *testing.T) {
	if cousinsInBinaryTree(buildCIBT7NodeTree(), 2, 1) != false {
		t.Error("different depths should not be cousins")
	}
}

func TestCousinsInBinaryTreeNullRoot(t *testing.T) {
	if cousinsInBinaryTree(nil, 1, 2) != false {
		t.Error("null root should return false")
	}
}

func TestCousinsInBinaryTreeCousins3And7(t *testing.T) {
	if cousinsInBinaryTree(buildCIBT7NodeTree(), 3, 7) != true {
		t.Error("3 and 7 should be cousins")
	}
}
