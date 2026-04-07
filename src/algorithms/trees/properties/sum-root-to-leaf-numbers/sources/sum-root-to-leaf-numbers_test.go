package main

import "testing"

func makeTreeNodeSumLeaf(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafSumLeaf(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestSumRootToLeafNumbers7NodeBST(t *testing.T) {
	// 421+423+465+467=1776
	root := makeTreeNodeSumLeaf(4,
		makeTreeNodeSumLeaf(2, leafSumLeaf(1), leafSumLeaf(3)),
		makeTreeNodeSumLeaf(6, leafSumLeaf(5), leafSumLeaf(7)))
	if sumRootToLeafNumbers(root) != 1776 {
		t.Errorf("expected 1776")
	}
}

func TestSumRootToLeafNumbersNullRoot(t *testing.T) {
	if sumRootToLeafNumbers(nil) != 0 {
		t.Errorf("expected 0 for nil root")
	}
}

func TestSumRootToLeafNumbersSingleNode(t *testing.T) {
	if sumRootToLeafNumbers(leafSumLeaf(5)) != 5 {
		t.Errorf("expected 5")
	}
}

func TestSumRootToLeafNumbersSimple3Node(t *testing.T) {
	// 12+13=25
	root := makeTreeNodeSumLeaf(1, leafSumLeaf(2), leafSumLeaf(3))
	if sumRootToLeafNumbers(root) != 25 {
		t.Errorf("expected 25")
	}
}
