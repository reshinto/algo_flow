package main

import (
	"reflect"
	"testing"
)

func bflInorder(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	left := bflInorder(root.left)
	right := bflInorder(root.right)
	result := append(left, root.value)
	return append(result, right...)
}

func TestBuildFromLevelOrderBalanced7Node(t *testing.T) {
	root := buildFromLevelOrder([]int{4, 2, 6, 1, 3, 5, 7})
	if root == nil || root.value != 4 {
		t.Error("root value should be 4")
	}
	if !reflect.DeepEqual(bflInorder(root), []int{1, 2, 3, 4, 5, 6, 7}) {
		t.Error("inorder should be sorted")
	}
}

func TestBuildFromLevelOrderEmpty(t *testing.T) {
	root := buildFromLevelOrder([]int{})
	if root != nil {
		t.Error("empty input should return nil")
	}
}

func TestBuildFromLevelOrderSingleNode(t *testing.T) {
	root := buildFromLevelOrder([]int{42})
	if root == nil || root.value != 42 {
		t.Error("single node value should be 42")
	}
	if root.left != nil || root.right != nil {
		t.Error("single node should have no children")
	}
}

func TestBuildFromLevelOrderThreeNode(t *testing.T) {
	root := buildFromLevelOrder([]int{2, 1, 3})
	if root == nil || root.value != 2 {
		t.Error("root value should be 2")
	}
	if !reflect.DeepEqual(bflInorder(root), []int{1, 2, 3}) {
		t.Error("inorder should be [1, 2, 3]")
	}
}
