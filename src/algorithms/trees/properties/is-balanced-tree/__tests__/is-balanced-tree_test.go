package main

import "testing"

func makeTreeNodeBalanced(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafBalanced(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestIsBalancedBalanced7NodeBST(t *testing.T) {
	root := makeTreeNodeBalanced(4,
		makeTreeNodeBalanced(2, leafBalanced(1), leafBalanced(3)),
		makeTreeNodeBalanced(6, leafBalanced(5), leafBalanced(7)))
	if !isBalancedTree(root) {
		t.Errorf("expected true for balanced BST")
	}
}

func TestIsBalancedNullRoot(t *testing.T) {
	if !isBalancedTree(nil) {
		t.Errorf("expected true for nil root")
	}
}

func TestIsBalancedSingleNode(t *testing.T) {
	if !isBalancedTree(leafBalanced(1)) {
		t.Errorf("expected true for single node")
	}
}

func TestIsBalancedUnbalancedTree(t *testing.T) {
	root := makeTreeNodeBalanced(1, makeTreeNodeBalanced(2, makeTreeNodeBalanced(3, leafBalanced(4), nil), nil), nil)
	if isBalancedTree(root) {
		t.Errorf("expected false for unbalanced tree")
	}
}

func TestIsBalancedTwoNodeTree(t *testing.T) {
	root := makeTreeNodeBalanced(1, leafBalanced(2), nil)
	if !isBalancedTree(root) {
		t.Errorf("expected true for two-node tree")
	}
}
