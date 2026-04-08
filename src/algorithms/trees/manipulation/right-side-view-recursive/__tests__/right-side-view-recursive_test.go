package main

import (
	"reflect"
	"testing"
)

func makeRSVRNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func rsvrLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestRightSideViewRecursiveNull(t *testing.T) {
	result := rightSideViewRecursive(nil)
	if len(result) != 0 {
		t.Error("null should return empty")
	}
}

func TestRightSideViewRecursiveSingleNode(t *testing.T) {
	if !reflect.DeepEqual(rightSideViewRecursive(rsvrLeaf(1)), []int{1}) {
		t.Error("single node should return [1]")
	}
}

func TestRightSideViewRecursive7NodeBST(t *testing.T) {
	root := makeRSVRNode(4,
		makeRSVRNode(2, rsvrLeaf(1), rsvrLeaf(3)),
		makeRSVRNode(6, rsvrLeaf(5), rsvrLeaf(7)))
	if !reflect.DeepEqual(rightSideViewRecursive(root), []int{4, 6, 7}) {
		t.Error("7-node BST right side failed")
	}
}

func TestRightSideViewRecursiveLeftSkewed(t *testing.T) {
	root := makeRSVRNode(1, makeRSVRNode(2, rsvrLeaf(3), nil), nil)
	if !reflect.DeepEqual(rightSideViewRecursive(root), []int{1, 2, 3}) {
		t.Error("left-skewed right side failed")
	}
}
