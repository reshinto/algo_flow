package main

import "testing"

func makeLCAIterNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func lcaIterLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildLCAIterTree() *BSTNode {
	return makeLCAIterNode(4,
		makeLCAIterNode(2, lcaIterLeaf(1), lcaIterLeaf(3)),
		makeLCAIterNode(6, lcaIterLeaf(5), lcaIterLeaf(7)),
	)
}

func TestBSTLCAIter1And3(t *testing.T) {
	result := bstLowestCommonAncestorIterative(buildLCAIterTree(), 1, 3)
	if result == nil || result.value != 2 {
		t.Errorf("LCA(1,3) should be 2, got %v", result)
	}
}

func TestBSTLCAIter5And7(t *testing.T) {
	result := bstLowestCommonAncestorIterative(buildLCAIterTree(), 5, 7)
	if result == nil || result.value != 6 {
		t.Errorf("LCA(5,7) should be 6, got %v", result)
	}
}

func TestBSTLCAIter1And7(t *testing.T) {
	result := bstLowestCommonAncestorIterative(buildLCAIterTree(), 1, 7)
	if result == nil || result.value != 4 {
		t.Errorf("LCA(1,7) should be 4, got %v", result)
	}
}
