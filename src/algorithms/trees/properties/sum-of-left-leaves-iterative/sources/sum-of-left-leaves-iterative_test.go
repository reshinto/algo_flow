package main

import "testing"

func makeTreeNodeSumLeftIter(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafSumLeftIter(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestSumOfLeftLeavesIterative7NodeBST(t *testing.T) {
	root := makeTreeNodeSumLeftIter(4,
		makeTreeNodeSumLeftIter(2, leafSumLeftIter(1), leafSumLeftIter(3)),
		makeTreeNodeSumLeftIter(6, leafSumLeftIter(5), leafSumLeftIter(7)))
	if sumOfLeftLeavesIterative(root) != 6 {
		t.Errorf("expected 6")
	}
}

func TestSumOfLeftLeavesIterativeNullRoot(t *testing.T) {
	if sumOfLeftLeavesIterative(nil) != 0 {
		t.Errorf("expected 0 for nil root")
	}
}

func TestSumOfLeftLeavesIterativeSingleNode(t *testing.T) {
	if sumOfLeftLeavesIterative(leafSumLeftIter(1)) != 0 {
		t.Errorf("expected 0 for single node")
	}
}

func TestSumOfLeftLeavesIterativeLeftLeaf(t *testing.T) {
	root := makeTreeNodeSumLeftIter(1, leafSumLeftIter(5), nil)
	if sumOfLeftLeavesIterative(root) != 5 {
		t.Errorf("expected 5")
	}
}
