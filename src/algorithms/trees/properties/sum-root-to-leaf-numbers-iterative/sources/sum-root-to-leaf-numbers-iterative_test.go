package main

import "testing"

func makeTreeNodeSumLeafIter(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafSumLeafIter(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestSumRootToLeafNumbersIterative7NodeBST(t *testing.T) {
	// 421+423+465+467=1776
	root := makeTreeNodeSumLeafIter(4,
		makeTreeNodeSumLeafIter(2, leafSumLeafIter(1), leafSumLeafIter(3)),
		makeTreeNodeSumLeafIter(6, leafSumLeafIter(5), leafSumLeafIter(7)))
	if sumRootToLeafNumbersIterative(root) != 1776 {
		t.Errorf("expected 1776")
	}
}

func TestSumRootToLeafNumbersIterativeNullRoot(t *testing.T) {
	if sumRootToLeafNumbersIterative(nil) != 0 {
		t.Errorf("expected 0 for nil root")
	}
}

func TestSumRootToLeafNumbersIterativeSingleNode(t *testing.T) {
	if sumRootToLeafNumbersIterative(leafSumLeafIter(5)) != 5 {
		t.Errorf("expected 5")
	}
}

func TestSumRootToLeafNumbersIterativeSimple3Node(t *testing.T) {
	// 12+13=25
	root := makeTreeNodeSumLeafIter(1, leafSumLeafIter(2), leafSumLeafIter(3))
	if sumRootToLeafNumbersIterative(root) != 25 {
		t.Errorf("expected 25")
	}
}
