package main

import "testing"

func makeTreeNodeMinDepth(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafMinDepth(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestMinimumDepthBalanced7NodeBST(t *testing.T) {
	root := makeTreeNodeMinDepth(4,
		makeTreeNodeMinDepth(2, leafMinDepth(1), leafMinDepth(3)),
		makeTreeNodeMinDepth(6, leafMinDepth(5), leafMinDepth(7)))
	if minimumDepth(root) != 3 {
		t.Errorf("expected 3")
	}
}

func TestMinimumDepthNullRoot(t *testing.T) {
	if minimumDepth(nil) != 0 {
		t.Errorf("expected 0 for nil root")
	}
}

func TestMinimumDepthSingleNode(t *testing.T) {
	if minimumDepth(leafMinDepth(42)) != 1 {
		t.Errorf("expected 1 for single node")
	}
}

func TestMinimumDepthSingleChildNotLeaf(t *testing.T) {
	root := makeTreeNodeMinDepth(1, nil, makeTreeNodeMinDepth(2, nil, leafMinDepth(3)))
	if minimumDepth(root) != 3 {
		t.Errorf("expected 3 for single-child chain")
	}
}

func TestMinimumDepthTwoLevel(t *testing.T) {
	root := makeTreeNodeMinDepth(1, leafMinDepth(2), nil)
	if minimumDepth(root) != 2 {
		t.Errorf("expected 2")
	}
}
