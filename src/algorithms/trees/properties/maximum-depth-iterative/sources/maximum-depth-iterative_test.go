package main

import "testing"

func makeTreeNodeMaxDepthIter(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafMaxDepthIter(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestMaximumDepthIterativeBalanced7NodeBST(t *testing.T) {
	root := makeTreeNodeMaxDepthIter(4,
		makeTreeNodeMaxDepthIter(2, leafMaxDepthIter(1), leafMaxDepthIter(3)),
		makeTreeNodeMaxDepthIter(6, leafMaxDepthIter(5), leafMaxDepthIter(7)))
	if maximumDepthIterative(root) != 3 {
		t.Errorf("expected 3")
	}
}

func TestMaximumDepthIterativeNullRoot(t *testing.T) {
	if maximumDepthIterative(nil) != 0 {
		t.Errorf("expected 0 for nil root")
	}
}

func TestMaximumDepthIterativeSingleNode(t *testing.T) {
	if maximumDepthIterative(leafMaxDepthIter(42)) != 1 {
		t.Errorf("expected 1 for single node")
	}
}

func TestMaximumDepthIterativeLeftSkewed(t *testing.T) {
	root := makeTreeNodeMaxDepthIter(5, makeTreeNodeMaxDepthIter(4, makeTreeNodeMaxDepthIter(3, makeTreeNodeMaxDepthIter(2, leafMaxDepthIter(1), nil), nil), nil), nil)
	if maximumDepthIterative(root) != 5 {
		t.Errorf("expected 5 for left-skewed tree")
	}
}

func TestMaximumDepthIterativeTwoLevel(t *testing.T) {
	root := makeTreeNodeMaxDepthIter(1, leafMaxDepthIter(2), nil)
	if maximumDepthIterative(root) != 2 {
		t.Errorf("expected 2")
	}
}
