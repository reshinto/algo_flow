package main

import "testing"

func makeMBTINode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func mbtiLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestMergeBinaryTreesIterativeNullA(t *testing.T) {
	treeB := mbtiLeaf(1)
	result := mergeBinaryTreesIterative(nil, treeB)
	if result != treeB {
		t.Error("null A should return B")
	}
}

func TestMergeBinaryTreesIterativeNullB(t *testing.T) {
	treeA := mbtiLeaf(1)
	result := mergeBinaryTreesIterative(treeA, nil)
	if result != treeA {
		t.Error("null B should return A")
	}
}

func TestMergeBinaryTreesIterativeSumsSingleNodes(t *testing.T) {
	result := mergeBinaryTreesIterative(mbtiLeaf(3), mbtiLeaf(5))
	if result == nil || result.value != 8 {
		t.Error("sum of 3 and 5 should be 8")
	}
}

func TestMergeBinaryTreesIterative7NodeTrees(t *testing.T) {
	treeA := makeMBTINode(4,
		makeMBTINode(2, mbtiLeaf(1), mbtiLeaf(3)),
		makeMBTINode(6, mbtiLeaf(5), mbtiLeaf(7)))
	treeB := makeMBTINode(40,
		makeMBTINode(20, mbtiLeaf(10), mbtiLeaf(30)),
		makeMBTINode(60, mbtiLeaf(50), mbtiLeaf(70)))
	result := mergeBinaryTreesIterative(treeA, treeB)
	if result == nil || result.value != 44 {
		t.Error("merged root should be 44")
	}
}
