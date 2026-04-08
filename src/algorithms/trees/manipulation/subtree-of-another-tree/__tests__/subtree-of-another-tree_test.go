package main

import "testing"

func makeSOATNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func soatLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestSubtreeOfAnotherTreeNullSubtree(t *testing.T) {
	if subtreeOfAnotherTree(soatLeaf(1), nil) != true {
		t.Error("null subtree should return true")
	}
}

func TestSubtreeOfAnotherTreeNullMainTree(t *testing.T) {
	if subtreeOfAnotherTree(nil, soatLeaf(1)) != false {
		t.Error("null main tree should return false")
	}
}

func TestSubtreeOfAnotherTreeIsLeftSubtree(t *testing.T) {
	mainTree := makeSOATNode(4,
		makeSOATNode(2, soatLeaf(1), soatLeaf(3)),
		makeSOATNode(6, soatLeaf(5), soatLeaf(7)))
	subTree := makeSOATNode(2, soatLeaf(1), soatLeaf(3))
	if subtreeOfAnotherTree(mainTree, subTree) != true {
		t.Error("left subtree should return true")
	}
}

func TestSubtreeOfAnotherTreeNotFound(t *testing.T) {
	mainTree := makeSOATNode(4, soatLeaf(2), soatLeaf(6))
	subTree := soatLeaf(9)
	if subtreeOfAnotherTree(mainTree, subTree) != false {
		t.Error("missing subtree should return false")
	}
}

func TestSubtreeOfAnotherTreeStructureDiffers(t *testing.T) {
	mainTree := makeSOATNode(4, makeSOATNode(2, soatLeaf(1), nil), nil)
	subTree := makeSOATNode(2, nil, soatLeaf(1))
	if subtreeOfAnotherTree(mainTree, subTree) != false {
		t.Error("different structure should return false")
	}
}
