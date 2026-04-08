package main

import "testing"

func makeTreeNodeSymmetricIterative(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafSymmetricIterative(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestIsSymmetricIterativeSymmetricTree(t *testing.T) {
	root := makeTreeNodeSymmetricIterative(1,
		makeTreeNodeSymmetricIterative(2, leafSymmetricIterative(3), leafSymmetricIterative(4)),
		makeTreeNodeSymmetricIterative(2, leafSymmetricIterative(4), leafSymmetricIterative(3)))
	if !isSymmetricTreeIterative(root) {
		t.Errorf("expected true for symmetric tree")
	}
}

func TestIsSymmetricIterativeNullRoot(t *testing.T) {
	if !isSymmetricTreeIterative(nil) {
		t.Errorf("expected true for nil root")
	}
}

func TestIsSymmetricIterativeSingleNode(t *testing.T) {
	if !isSymmetricTreeIterative(leafSymmetricIterative(1)) {
		t.Errorf("expected true for single node")
	}
}

func TestIsSymmetricIterativeAsymmetricTree(t *testing.T) {
	root := makeTreeNodeSymmetricIterative(1,
		makeTreeNodeSymmetricIterative(2, nil, leafSymmetricIterative(3)),
		makeTreeNodeSymmetricIterative(2, nil, leafSymmetricIterative(3)))
	if isSymmetricTreeIterative(root) {
		t.Errorf("expected false for asymmetric tree")
	}
}
