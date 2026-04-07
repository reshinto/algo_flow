package main

import (
	"reflect"
	"testing"
)

func makeSDTNode(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func sdtLeaf(value int) *TreeNode {
	return &TreeNode{value: value}
}

func sdtInorder(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	left := sdtInorder(root.left)
	right := sdtInorder(root.right)
	result := append(left, root.value)
	return append(result, right...)
}

func TestSerializeTreeNull(t *testing.T) {
	if serializeTree(nil) != "null" {
		t.Error("null should serialize to 'null'")
	}
}

func TestDeserializeTreeNull(t *testing.T) {
	if deserializeTree("null") != nil {
		t.Error("null string should deserialize to nil")
	}
}

func TestRoundTripsBalanced7NodeBST(t *testing.T) {
	original := makeSDTNode(4,
		makeSDTNode(2, sdtLeaf(1), sdtLeaf(3)),
		makeSDTNode(6, sdtLeaf(5), sdtLeaf(7)))
	serialized := serializeTree(original)
	reconstructed := deserializeTree(serialized)
	if reconstructed == nil || reconstructed.value != 4 {
		t.Error("reconstructed root should be 4")
	}
	if !reflect.DeepEqual(sdtInorder(reconstructed), []int{1, 2, 3, 4, 5, 6, 7}) {
		t.Error("inorder should match")
	}
}

func TestRoundTripsSingleNode(t *testing.T) {
	original := sdtLeaf(99)
	serialized := serializeTree(original)
	reconstructed := deserializeTree(serialized)
	if reconstructed == nil || reconstructed.value != 99 {
		t.Error("single node value should be 99")
	}
	if reconstructed.left != nil || reconstructed.right != nil {
		t.Error("single node should have no children")
	}
}
