package main

import "testing"

func makeTreeNodeBalancedIterative(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafBalancedIterative(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestIsBalancedIterativeBalanced7NodeBST(t *testing.T) {
	root := makeTreeNodeBalancedIterative(4,
		makeTreeNodeBalancedIterative(2, leafBalancedIterative(1), leafBalancedIterative(3)),
		makeTreeNodeBalancedIterative(6, leafBalancedIterative(5), leafBalancedIterative(7)))
	if !isBalancedTreeIterative(root) {
		t.Errorf("expected true for balanced BST")
	}
}

func TestIsBalancedIterativeNullRoot(t *testing.T) {
	if !isBalancedTreeIterative(nil) {
		t.Errorf("expected true for nil root")
	}
}

func TestIsBalancedIterativeSingleNode(t *testing.T) {
	if !isBalancedTreeIterative(leafBalancedIterative(1)) {
		t.Errorf("expected true for single node")
	}
}

func TestIsBalancedIterativeUnbalancedTree(t *testing.T) {
	root := makeTreeNodeBalancedIterative(1, makeTreeNodeBalancedIterative(2, makeTreeNodeBalancedIterative(3, leafBalancedIterative(4), nil), nil), nil)
	if isBalancedTreeIterative(root) {
		t.Errorf("expected false for unbalanced tree")
	}
}
