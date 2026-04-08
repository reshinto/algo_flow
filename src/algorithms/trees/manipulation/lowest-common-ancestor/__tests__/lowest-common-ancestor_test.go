package main

import "testing"

func makeLCANode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func lcaLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func buildLCA7NodeTree() *BinaryNode {
	return makeLCANode(4,
		makeLCANode(2, lcaLeaf(1), lcaLeaf(3)),
		makeLCANode(6, lcaLeaf(5), lcaLeaf(7)))
}

func TestLCANullRoot(t *testing.T) {
	if lowestCommonAncestor(nil, 1, 2) != nil {
		t.Error("null root should return nil")
	}
}

func TestLCALCA1And3Is2(t *testing.T) {
	result := lowestCommonAncestor(buildLCA7NodeTree(), 1, 3)
	if result == nil || result.value != 2 {
		t.Error("LCA(1,3) should be 2")
	}
}

func TestLCALCA3And5IsRoot(t *testing.T) {
	result := lowestCommonAncestor(buildLCA7NodeTree(), 3, 5)
	if result == nil || result.value != 4 {
		t.Error("LCA(3,5) should be 4")
	}
}

func TestLCAAncestorOfOther(t *testing.T) {
	root := makeLCANode(4, makeLCANode(2, lcaLeaf(1), nil), nil)
	result := lowestCommonAncestor(root, 2, 1)
	if result == nil || result.value != 2 {
		t.Error("ancestor of other should be 2")
	}
}
