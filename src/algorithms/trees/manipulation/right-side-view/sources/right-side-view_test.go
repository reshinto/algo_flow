package main

import (
	"reflect"
	"testing"
)

func makeRSVNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func rsvLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestRightSideViewNull(t *testing.T) {
	result := rightSideView(nil)
	if len(result) != 0 {
		t.Error("null should return empty")
	}
}

func TestRightSideViewSingleNode(t *testing.T) {
	if !reflect.DeepEqual(rightSideView(rsvLeaf(1)), []int{1}) {
		t.Error("single node should return [1]")
	}
}

func TestRightSideView7NodeBST(t *testing.T) {
	root := makeRSVNode(4,
		makeRSVNode(2, rsvLeaf(1), rsvLeaf(3)),
		makeRSVNode(6, rsvLeaf(5), rsvLeaf(7)))
	if !reflect.DeepEqual(rightSideView(root), []int{4, 6, 7}) {
		t.Error("7-node BST right side failed")
	}
}

func TestRightSideViewLeftSkewed(t *testing.T) {
	root := makeRSVNode(1, makeRSVNode(2, rsvLeaf(3), nil), nil)
	if !reflect.DeepEqual(rightSideView(root), []int{1, 2, 3}) {
		t.Error("left-skewed right side failed")
	}
}
