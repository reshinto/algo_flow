package main

import "testing"

func makeLCANode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func lcaLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildLCATree() *BSTNode {
	return makeLCANode(4,
		makeLCANode(2, lcaLeaf(1), lcaLeaf(3)),
		makeLCANode(6, lcaLeaf(5), lcaLeaf(7)),
	)
}

func TestBSTLCA1And3(t *testing.T) {
	result := bstLowestCommonAncestor(buildLCATree(), 1, 3)
	if result == nil || result.value != 2 {
		t.Errorf("LCA(1,3) should be 2, got %v", result)
	}
}

func TestBSTLCA1And7(t *testing.T) {
	result := bstLowestCommonAncestor(buildLCATree(), 1, 7)
	if result == nil || result.value != 4 {
		t.Errorf("LCA(1,7) should be 4, got %v", result)
	}
}

func TestBSTLCA5And7(t *testing.T) {
	result := bstLowestCommonAncestor(buildLCATree(), 5, 7)
	if result == nil || result.value != 6 {
		t.Errorf("LCA(5,7) should be 6, got %v", result)
	}
}

func TestBSTLCAOneValueEqualsLCA(t *testing.T) {
	result := bstLowestCommonAncestor(buildLCATree(), 2, 3)
	if result == nil || result.value != 2 {
		t.Errorf("LCA(2,3) should be 2, got %v", result)
	}
}
