package main

import "testing"

func makeCCTNNode(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func cctnLeaf(value int) *TreeNode {
	return &TreeNode{value: value}
}

func TestCountCompleteTreeNodes7Node(t *testing.T) {
	root := makeCCTNNode(4,
		makeCCTNNode(2, cctnLeaf(1), cctnLeaf(3)),
		makeCCTNNode(6, cctnLeaf(5), cctnLeaf(7)))
	if countCompleteTreeNodes(root) != 7 {
		t.Error("7-node perfect tree should have 7 nodes")
	}
}

func TestCountCompleteTreeNodesNull(t *testing.T) {
	if countCompleteTreeNodes(nil) != 0 {
		t.Error("null root should return 0")
	}
}

func TestCountCompleteTreeNodesSingleNode(t *testing.T) {
	if countCompleteTreeNodes(cctnLeaf(1)) != 1 {
		t.Error("single node should return 1")
	}
}

func TestCountCompleteTreeNodes3Node(t *testing.T) {
	root := makeCCTNNode(1, cctnLeaf(2), cctnLeaf(3))
	if countCompleteTreeNodes(root) != 3 {
		t.Error("3-node perfect tree should have 3 nodes")
	}
}
