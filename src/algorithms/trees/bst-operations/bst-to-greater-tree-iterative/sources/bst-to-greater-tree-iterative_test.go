package main

import "testing"

func makeGTIterNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func gtiLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBSTToGreaterTreeIter3NodeBST(t *testing.T) {
	// Node 3->3, node 2->5, node 1->6
	tree := makeGTIterNode(2, gtiLeaf(1), gtiLeaf(3))
	result := bstToGreaterTreeIterative(tree)
	if result == nil || result.value != 5 {
		t.Errorf("root should be 5, got %v", result)
	}
	if result.right == nil || result.right.value != 3 {
		t.Error("right should be 3")
	}
	if result.left == nil || result.left.value != 6 {
		t.Error("left should be 6")
	}
}

func TestBSTToGreaterTreeIterSingleNode(t *testing.T) {
	result := bstToGreaterTreeIterative(gtiLeaf(7))
	if result == nil || result.value != 7 {
		t.Error("single node should remain 7")
	}
}

func TestBSTToGreaterTreeIterNilTree(t *testing.T) {
	if bstToGreaterTreeIterative(nil) != nil {
		t.Error("nil tree should return nil")
	}
}
