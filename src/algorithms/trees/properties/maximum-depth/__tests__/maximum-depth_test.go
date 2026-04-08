package main

import "testing"

func makeTreeNodeMaxDepth(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafMaxDepth(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestMaximumDepthBalanced7NodeBST(t *testing.T) {
	root := makeTreeNodeMaxDepth(4,
		makeTreeNodeMaxDepth(2, leafMaxDepth(1), leafMaxDepth(3)),
		makeTreeNodeMaxDepth(6, leafMaxDepth(5), leafMaxDepth(7)))
	if maximumDepth(root) != 3 {
		t.Errorf("expected 3")
	}
}

func TestMaximumDepthNullRoot(t *testing.T) {
	if maximumDepth(nil) != 0 {
		t.Errorf("expected 0 for nil root")
	}
}

func TestMaximumDepthSingleNode(t *testing.T) {
	if maximumDepth(leafMaxDepth(42)) != 1 {
		t.Errorf("expected 1 for single node")
	}
}

func TestMaximumDepthLeftSkewed(t *testing.T) {
	root := makeTreeNodeMaxDepth(5, makeTreeNodeMaxDepth(4, makeTreeNodeMaxDepth(3, makeTreeNodeMaxDepth(2, leafMaxDepth(1), nil), nil), nil), nil)
	if maximumDepth(root) != 5 {
		t.Errorf("expected 5 for left-skewed tree")
	}
}

func TestMaximumDepthTwoLevel(t *testing.T) {
	root := makeTreeNodeMaxDepth(1, leafMaxDepth(2), nil)
	if maximumDepth(root) != 2 {
		t.Errorf("expected 2")
	}
}
