package main

import "testing"

func makeInsNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func insLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func buildInsTree() *BSTNode {
	return makeInsNode(4,
		makeInsNode(2, insLeaf(1), insLeaf(3)),
		makeInsNode(6, insLeaf(5), insLeaf(7)),
	)
}

func TestBSTInsertGreaterThanAll(t *testing.T) {
	result := bstInsert(buildInsTree(), 8)
	if result.right.right.right.value != 8 {
		t.Error("insert greater than all failed")
	}
}

func TestBSTInsertIntoLeftSubtree(t *testing.T) {
	result := bstInsert(buildInsTree(), 0)
	if result.left.left.left.value != 0 {
		t.Error("insert into left subtree failed")
	}
}

func TestBSTInsertCreatesRootFromNil(t *testing.T) {
	result := bstInsert(nil, 10)
	if result == nil || result.value != 10 {
		t.Error("create root from nil failed")
	}
}

func TestBSTInsertIgnoresDuplicates(t *testing.T) {
	tree := makeInsNode(4, insLeaf(2), insLeaf(6))
	result := bstInsert(tree, 4)
	if result.value != 4 {
		t.Error("duplicate should be ignored")
	}
}
