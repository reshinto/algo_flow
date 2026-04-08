package main

import "testing"

func makeFETNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func fetLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestFlipEquivalentTreesTwoNulls(t *testing.T) {
	if flipEquivalentTrees(nil, nil) != true {
		t.Error("two nulls should be true")
	}
}

func TestFlipEquivalentTreesOneNull(t *testing.T) {
	if flipEquivalentTrees(fetLeaf(1), nil) != false {
		t.Error("one null should be false")
	}
}

func TestFlipEquivalentTreesIdentical(t *testing.T) {
	treeA := makeFETNode(1, fetLeaf(2), fetLeaf(3))
	treeB := makeFETNode(1, fetLeaf(2), fetLeaf(3))
	if flipEquivalentTrees(treeA, treeB) != true {
		t.Error("identical trees should be true")
	}
}

func TestFlipEquivalentTreesFlippedAtRoot(t *testing.T) {
	treeA := makeFETNode(1, fetLeaf(2), fetLeaf(3))
	treeB := makeFETNode(1, fetLeaf(3), fetLeaf(2))
	if flipEquivalentTrees(treeA, treeB) != true {
		t.Error("flipped at root should be true")
	}
}

func TestFlipEquivalentTreesDifferentRootValues(t *testing.T) {
	if flipEquivalentTrees(fetLeaf(1), fetLeaf(2)) != false {
		t.Error("different root values should be false")
	}
}

func TestFlipEquivalentTreesDifferentLeafValues(t *testing.T) {
	treeA := makeFETNode(1, fetLeaf(2), fetLeaf(3))
	treeB := makeFETNode(1, fetLeaf(9), fetLeaf(3))
	if flipEquivalentTrees(treeA, treeB) != false {
		t.Error("different leaf values should be false")
	}
}
