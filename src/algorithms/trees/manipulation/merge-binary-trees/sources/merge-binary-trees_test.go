package main

import "testing"

func makeMBTNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func mbtLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestMergeBinaryTreesNullA(t *testing.T) {
	treeB := mbtLeaf(1)
	result := mergeBinaryTrees(nil, treeB)
	if result != treeB {
		t.Error("null A should return B")
	}
}

func TestMergeBinaryTreesNullB(t *testing.T) {
	treeA := mbtLeaf(1)
	result := mergeBinaryTrees(treeA, nil)
	if result != treeA {
		t.Error("null B should return A")
	}
}

func TestMergeBinaryTreesSumsSingleNodes(t *testing.T) {
	result := mergeBinaryTrees(mbtLeaf(3), mbtLeaf(5))
	if result == nil || result.value != 8 {
		t.Error("sum of 3 and 5 should be 8")
	}
}

func TestMergeBinaryTrees7NodeTrees(t *testing.T) {
	treeA := makeMBTNode(4,
		makeMBTNode(2, mbtLeaf(1), mbtLeaf(3)),
		makeMBTNode(6, mbtLeaf(5), mbtLeaf(7)))
	treeB := makeMBTNode(40,
		makeMBTNode(20, mbtLeaf(10), mbtLeaf(30)),
		makeMBTNode(60, mbtLeaf(50), mbtLeaf(70)))
	result := mergeBinaryTrees(treeA, treeB)
	if result == nil || result.value != 44 {
		t.Error("merged root should be 44")
	}
}
