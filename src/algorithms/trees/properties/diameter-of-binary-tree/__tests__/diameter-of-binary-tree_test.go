package main

import "testing"

func makeTreeNodeDiameter(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafDiameter(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestDiameterBalanced7NodeBST(t *testing.T) {
	root := makeTreeNodeDiameter(4,
		makeTreeNodeDiameter(2, leafDiameter(1), leafDiameter(3)),
		makeTreeNodeDiameter(6, leafDiameter(5), leafDiameter(7)))
	if diameterOfBinaryTree(root) != 4 {
		t.Errorf("expected 4")
	}
}

func TestDiameterNullRoot(t *testing.T) {
	if diameterOfBinaryTree(nil) != 0 {
		t.Errorf("expected 0 for nil root")
	}
}

func TestDiameterSingleNode(t *testing.T) {
	if diameterOfBinaryTree(leafDiameter(1)) != 0 {
		t.Errorf("expected 0 for single node")
	}
}

func TestDiameterTwoNodeTree(t *testing.T) {
	root := makeTreeNodeDiameter(1, leafDiameter(2), nil)
	if diameterOfBinaryTree(root) != 1 {
		t.Errorf("expected 1")
	}
}

func TestDiameterSkewedTree(t *testing.T) {
	root := makeTreeNodeDiameter(1, makeTreeNodeDiameter(2, makeTreeNodeDiameter(3, leafDiameter(4), nil), nil), nil)
	if diameterOfBinaryTree(root) != 3 {
		t.Errorf("expected 3")
	}
}
