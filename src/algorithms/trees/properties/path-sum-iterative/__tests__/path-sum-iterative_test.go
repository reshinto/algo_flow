package main

import "testing"

func makeTreeNodePathSumIter(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafPathSumIter(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestPathSumIterativeExists(t *testing.T) {
	root := makeTreeNodePathSumIter(4,
		makeTreeNodePathSumIter(2, leafPathSumIter(1), leafPathSumIter(3)),
		makeTreeNodePathSumIter(6, leafPathSumIter(5), leafPathSumIter(7)))
	if !pathSumIterative(root, 7) {
		t.Errorf("expected true: path 4+2+1=7 exists")
	}
}

func TestPathSumIterativeNotExists(t *testing.T) {
	root := makeTreeNodePathSumIter(4,
		makeTreeNodePathSumIter(2, leafPathSumIter(1), leafPathSumIter(3)),
		makeTreeNodePathSumIter(6, leafPathSumIter(5), leafPathSumIter(7)))
	if pathSumIterative(root, 100) {
		t.Errorf("expected false: path sum 100 not exists")
	}
}

func TestPathSumIterativeNullRoot(t *testing.T) {
	if pathSumIterative(nil, 5) {
		t.Errorf("expected false for nil root")
	}
}

func TestPathSumIterativeSingleNodeMatching(t *testing.T) {
	if !pathSumIterative(leafPathSumIter(5), 5) {
		t.Errorf("expected true: single node matches target")
	}
}
