package main

import "testing"

func makeGTNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func gtLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBSTToGreaterTree3NodeBST(t *testing.T) {
	// Node 3->3, node 2->5, node 1->6
	tree := makeGTNode(2, gtLeaf(1), gtLeaf(3))
	result := bstToGreaterTree(tree)
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

func TestBSTToGreaterTreeSingleNode(t *testing.T) {
	result := bstToGreaterTree(gtLeaf(5))
	if result == nil || result.value != 5 {
		t.Error("single node should remain 5")
	}
}

func TestBSTToGreaterTreeNilTree(t *testing.T) {
	if bstToGreaterTree(nil) != nil {
		t.Error("nil tree should return nil")
	}
}
