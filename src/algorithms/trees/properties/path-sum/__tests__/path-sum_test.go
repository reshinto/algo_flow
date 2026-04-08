package main

import "testing"

func makeTreeNodePathSum(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafPathSum(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestPathSumExists(t *testing.T) {
	root := makeTreeNodePathSum(4,
		makeTreeNodePathSum(2, leafPathSum(1), leafPathSum(3)),
		makeTreeNodePathSum(6, leafPathSum(5), leafPathSum(7)))
	if !pathSum(root, 7) {
		t.Errorf("expected true: path 4+2+1=7 exists")
	}
}

func TestPathSumNotExists(t *testing.T) {
	root := makeTreeNodePathSum(4,
		makeTreeNodePathSum(2, leafPathSum(1), leafPathSum(3)),
		makeTreeNodePathSum(6, leafPathSum(5), leafPathSum(7)))
	if pathSum(root, 100) {
		t.Errorf("expected false: path sum 100 not exists")
	}
}

func TestPathSumNullRoot(t *testing.T) {
	if pathSum(nil, 5) {
		t.Errorf("expected false for nil root")
	}
}

func TestPathSumSingleNodeMatching(t *testing.T) {
	if !pathSum(leafPathSum(5), 5) {
		t.Errorf("expected true: single node matches target")
	}
}

func TestPathSumSingleNodeNotMatching(t *testing.T) {
	if pathSum(leafPathSum(5), 3) {
		t.Errorf("expected false: single node does not match target")
	}
}
