package main

import "testing"

func makeLCAINode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func lcaiLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func buildLCAI7NodeTree() *BinaryNode {
	return makeLCAINode(4,
		makeLCAINode(2, lcaiLeaf(1), lcaiLeaf(3)),
		makeLCAINode(6, lcaiLeaf(5), lcaiLeaf(7)))
}

func TestLCAIterativeNullRoot(t *testing.T) {
	if lowestCommonAncestorIterative(nil, 1, 2) != nil {
		t.Error("null root should return nil")
	}
}

func TestLCAIterativeLCA1And3Is2(t *testing.T) {
	result := lowestCommonAncestorIterative(buildLCAI7NodeTree(), 1, 3)
	if result == nil || result.value != 2 {
		t.Error("LCA(1,3) should be 2")
	}
}

func TestLCAIterativeLCA3And5IsRoot(t *testing.T) {
	result := lowestCommonAncestorIterative(buildLCAI7NodeTree(), 3, 5)
	if result == nil || result.value != 4 {
		t.Error("LCA(3,5) should be 4")
	}
}

func TestLCAIterativeAncestorOfOther(t *testing.T) {
	root := makeLCAINode(4, makeLCAINode(2, lcaiLeaf(1), nil), nil)
	result := lowestCommonAncestorIterative(root, 2, 1)
	if result == nil || result.value != 2 {
		t.Error("ancestor of other should be 2")
	}
}
