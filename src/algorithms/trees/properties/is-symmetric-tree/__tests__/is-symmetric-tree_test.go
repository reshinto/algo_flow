package main

import "testing"

func makeTreeNodeSymmetric(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func leafSymmetric(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestIsSymmetricNonSymmetricBST(t *testing.T) {
	root := makeTreeNodeSymmetric(4,
		makeTreeNodeSymmetric(2, leafSymmetric(1), leafSymmetric(3)),
		makeTreeNodeSymmetric(6, leafSymmetric(5), leafSymmetric(7)))
	if isSymmetricTree(root) {
		t.Errorf("expected false for non-symmetric BST")
	}
}

func TestIsSymmetricSymmetricTree(t *testing.T) {
	root := makeTreeNodeSymmetric(1,
		makeTreeNodeSymmetric(2, leafSymmetric(3), leafSymmetric(4)),
		makeTreeNodeSymmetric(2, leafSymmetric(4), leafSymmetric(3)))
	if !isSymmetricTree(root) {
		t.Errorf("expected true for symmetric tree")
	}
}

func TestIsSymmetricNullRoot(t *testing.T) {
	if !isSymmetricTree(nil) {
		t.Errorf("expected true for nil root")
	}
}

func TestIsSymmetricSingleNode(t *testing.T) {
	if !isSymmetricTree(leafSymmetric(1)) {
		t.Errorf("expected true for single node")
	}
}

func TestIsSymmetricAsymmetricTree(t *testing.T) {
	root := makeTreeNodeSymmetric(1,
		makeTreeNodeSymmetric(2, nil, leafSymmetric(3)),
		makeTreeNodeSymmetric(2, nil, leafSymmetric(3)))
	if isSymmetricTree(root) {
		t.Errorf("expected false for asymmetric tree")
	}
}
