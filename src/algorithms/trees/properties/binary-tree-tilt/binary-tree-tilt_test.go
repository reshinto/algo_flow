package main

import "testing"

func makeBTTNode(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func bttLeaf(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestBinaryTreeTiltNull(t *testing.T) {
	if binaryTreeTilt(nil) != 0 {
		t.Error("null root should return 0")
	}
}

func TestBinaryTreeTiltSingleNode(t *testing.T) {
	if binaryTreeTilt(bttLeaf(1)) != 0 {
		t.Error("single node should return 0")
	}
}

func TestBinaryTreeTiltSimple3Node(t *testing.T) {
	root := makeBTTNode(1, bttLeaf(2), bttLeaf(3))
	if binaryTreeTilt(root) != 1 {
		t.Error("3-node tilt should be 1")
	}
}

func TestBinaryTreeTiltNonNegative(t *testing.T) {
	root := makeBTTNode(4,
		makeBTTNode(2, bttLeaf(1), bttLeaf(3)),
		makeBTTNode(6, bttLeaf(5), bttLeaf(7)))
	if binaryTreeTilt(root) < 0 {
		t.Error("tilt should be non-negative")
	}
}
