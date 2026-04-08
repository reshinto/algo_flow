package main

import (
	"math"
	"testing"
)

func makeTreeNodeMaxPath(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafMaxPath(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestMaximumPathSumBalanced7NodeBST(t *testing.T) {
	// best path: 3+2+4+6+7 = 22
	root := makeTreeNodeMaxPath(4,
		makeTreeNodeMaxPath(2, leafMaxPath(1), leafMaxPath(3)),
		makeTreeNodeMaxPath(6, leafMaxPath(5), leafMaxPath(7)))
	if maximumPathSum(root) != 22 {
		t.Errorf("expected 22")
	}
}

func TestMaximumPathSumSingleNode(t *testing.T) {
	if maximumPathSum(leafMaxPath(-3)) != -3 {
		t.Errorf("expected -3")
	}
}

func TestMaximumPathSumAllNegative(t *testing.T) {
	root := makeTreeNodeMaxPath(-1, leafMaxPath(-2), leafMaxPath(-3))
	if maximumPathSum(root) != -1 {
		t.Errorf("expected -1")
	}
}

func TestMaximumPathSumNullRoot(t *testing.T) {
	result := maximumPathSum(nil)
	if result != math.MinInt32 {
		t.Errorf("expected MinInt32 for nil root, got %d", result)
	}
}
