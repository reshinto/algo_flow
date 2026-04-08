package main

import "testing"

func makeDLNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func dlLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestDeleteLeavesWithValueSingleTarget(t *testing.T) {
	result := deleteLeavesWithValue(dlLeaf(1), 1)
	if result != nil {
		t.Error("single target node should return nil")
	}
}

func TestDeleteLeavesWithValueNoMatch(t *testing.T) {
	root := makeDLNode(1, dlLeaf(2), dlLeaf(3))
	result := deleteLeavesWithValue(root, 9)
	if result == nil || result.value != 1 || result.left == nil || result.right == nil {
		t.Error("no match should leave tree unchanged")
	}
}

func TestDeleteLeavesWithValueDeletesLeaf(t *testing.T) {
	root := makeDLNode(1, dlLeaf(2), dlLeaf(3))
	result := deleteLeavesWithValue(root, 2)
	if result.left != nil {
		t.Error("left leaf should be deleted")
	}
	if result.right == nil || result.right.value != 3 {
		t.Error("right child should remain")
	}
}

func TestDeleteLeavesWithValueCascades(t *testing.T) {
	root := makeDLNode(1, dlLeaf(2), nil)
	result := deleteLeavesWithValue(root, 2)
	if result == nil || result.value != 1 || result.left != nil {
		t.Error("cascade: parent keeps, child removed")
	}
}
