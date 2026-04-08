package main

import "testing"

func makeTreeNodeSumLeft(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafSumLeft(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestSumOfLeftLeaves7NodeBST(t *testing.T) {
	root := makeTreeNodeSumLeft(4,
		makeTreeNodeSumLeft(2, leafSumLeft(1), leafSumLeft(3)),
		makeTreeNodeSumLeft(6, leafSumLeft(5), leafSumLeft(7)))
	if sumOfLeftLeaves(root) != 6 {
		t.Errorf("expected 6")
	}
}

func TestSumOfLeftLeavesNullRoot(t *testing.T) {
	if sumOfLeftLeaves(nil) != 0 {
		t.Errorf("expected 0 for nil root")
	}
}

func TestSumOfLeftLeavesSingleNode(t *testing.T) {
	if sumOfLeftLeaves(leafSumLeft(1)) != 0 {
		t.Errorf("expected 0 for single node")
	}
}

func TestSumOfLeftLeavesLeftLeaf(t *testing.T) {
	root := makeTreeNodeSumLeft(1, leafSumLeft(5), nil)
	if sumOfLeftLeaves(root) != 5 {
		t.Errorf("expected 5")
	}
}

func TestSumOfLeftLeavesNoLeftLeaves(t *testing.T) {
	root := makeTreeNodeSumLeft(1, nil, leafSumLeft(2))
	if sumOfLeftLeaves(root) != 0 {
		t.Errorf("expected 0 when no left leaves")
	}
}
