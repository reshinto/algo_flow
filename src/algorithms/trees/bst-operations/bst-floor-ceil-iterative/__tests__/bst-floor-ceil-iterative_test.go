package main

import "testing"

func makeFloorCeilIterNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func floorCeilIterLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildFloorCeilIterTree() *BSTNode {
	return makeFloorCeilIterNode(4,
		makeFloorCeilIterNode(2, floorCeilIterLeaf(1), floorCeilIterLeaf(3)),
		makeFloorCeilIterNode(6, floorCeilIterLeaf(5), floorCeilIterLeaf(7)),
	)
}

func TestBSTFloorCeilIterExactMatch(t *testing.T) {
	result := bstFloorCeilIterative(buildFloorCeilIterTree(), 3)
	if result.floor == nil || *result.floor != 3 {
		t.Error("floor should be 3")
	}
	if result.ceil == nil || *result.ceil != 3 {
		t.Error("ceil should be 3")
	}
}

func TestBSTFloorCeilIterNullFloorBelowAll(t *testing.T) {
	result := bstFloorCeilIterative(buildFloorCeilIterTree(), 0)
	if result.floor != nil {
		t.Error("floor should be nil")
	}
	if result.ceil == nil || *result.ceil != 1 {
		t.Errorf("ceil should be 1, got %v", result.ceil)
	}
}

func TestBSTFloorCeilIterNullTree(t *testing.T) {
	result := bstFloorCeilIterative(nil, 5)
	if result.floor != nil || result.ceil != nil {
		t.Error("both should be nil for null tree")
	}
}
