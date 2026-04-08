package main

import "testing"

func makeTreeNodeMinDepthIter(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafMinDepthIter(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestMinimumDepthIterativeBalanced7NodeBST(t *testing.T) {
	root := makeTreeNodeMinDepthIter(4,
		makeTreeNodeMinDepthIter(2, leafMinDepthIter(1), leafMinDepthIter(3)),
		makeTreeNodeMinDepthIter(6, leafMinDepthIter(5), leafMinDepthIter(7)))
	if minimumDepthIterative(root) != 3 {
		t.Errorf("expected 3")
	}
}

func TestMinimumDepthIterativeNullRoot(t *testing.T) {
	if minimumDepthIterative(nil) != 0 {
		t.Errorf("expected 0 for nil root")
	}
}

func TestMinimumDepthIterativeSingleNode(t *testing.T) {
	if minimumDepthIterative(leafMinDepthIter(42)) != 1 {
		t.Errorf("expected 1 for single node")
	}
}

func TestMinimumDepthIterativeTwoLevel(t *testing.T) {
	root := makeTreeNodeMinDepthIter(1, leafMinDepthIter(2), nil)
	if minimumDepthIterative(root) != 2 {
		t.Errorf("expected 2")
	}
}
