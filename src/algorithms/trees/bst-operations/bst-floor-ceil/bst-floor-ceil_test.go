package main

import "testing"

func makeFloorCeilNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func floorCeilLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildFloorCeilTree() *BSTNode {
	return makeFloorCeilNode(4,
		makeFloorCeilNode(2, floorCeilLeaf(1), floorCeilLeaf(3)),
		makeFloorCeilNode(6, floorCeilLeaf(5), floorCeilLeaf(7)),
	)
}

func TestBSTFloorCeilExactMatch(t *testing.T) {
	result := bstFloorCeil(buildFloorCeilTree(), 5)
	if result.floor == nil || *result.floor != 5 {
		t.Error("floor should be 5")
	}
	if result.ceil == nil || *result.ceil != 5 {
		t.Error("ceil should be 5")
	}
}

func TestBSTFloorCeilNullFloorBelowAll(t *testing.T) {
	result := bstFloorCeil(buildFloorCeilTree(), 0)
	if result.floor != nil {
		t.Error("floor should be nil for value below all")
	}
	if result.ceil == nil || *result.ceil != 1 {
		t.Errorf("ceil should be 1, got %v", result.ceil)
	}
}

func TestBSTFloorCeilNullCeilAboveAll(t *testing.T) {
	result := bstFloorCeil(buildFloorCeilTree(), 8)
	if result.floor == nil || *result.floor != 7 {
		t.Error("floor should be 7")
	}
	if result.ceil != nil {
		t.Error("ceil should be nil for value above all")
	}
}

func TestBSTFloorCeilNullTree(t *testing.T) {
	result := bstFloorCeil(nil, 5)
	if result.floor != nil || result.ceil != nil {
		t.Error("both floor and ceil should be nil for null tree")
	}
}
