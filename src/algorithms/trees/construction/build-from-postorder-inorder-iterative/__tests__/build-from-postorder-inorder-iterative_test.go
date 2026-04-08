package main

import (
	"reflect"
	"testing"
)

func bpiiInorder(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	left := bpiiInorder(root.left)
	right := bpiiInorder(root.right)
	result := append(left, root.value)
	return append(result, right...)
}

func bpiiPostorder(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	left := bpiiPostorder(root.left)
	right := bpiiPostorder(root.right)
	result := append(left, right...)
	return append(result, root.value)
}

func TestBuildFromPostorderInorderIterativeBalanced7Node(t *testing.T) {
	root := buildFromPostorderInorderIterative([]int{1, 3, 2, 5, 7, 6, 4}, []int{1, 2, 3, 4, 5, 6, 7})
	if root == nil || root.value != 4 {
		t.Error("root value should be 4")
	}
	if !reflect.DeepEqual(bpiiInorder(root), []int{1, 2, 3, 4, 5, 6, 7}) {
		t.Error("inorder should be sorted")
	}
}

func TestBuildFromPostorderInorderIterativePreservesPostorder(t *testing.T) {
	root := buildFromPostorderInorderIterative([]int{1, 3, 2, 5, 7, 6, 4}, []int{1, 2, 3, 4, 5, 6, 7})
	if !reflect.DeepEqual(bpiiPostorder(root), []int{1, 3, 2, 5, 7, 6, 4}) {
		t.Error("postorder should match input")
	}
}

func TestBuildFromPostorderInorderIterativeEmpty(t *testing.T) {
	root := buildFromPostorderInorderIterative([]int{}, []int{})
	if root != nil {
		t.Error("empty input should return nil")
	}
}

func TestBuildFromPostorderInorderIterativeSingleNode(t *testing.T) {
	root := buildFromPostorderInorderIterative([]int{7}, []int{7})
	if root == nil || root.value != 7 {
		t.Error("single node value should be 7")
	}
	if root.left != nil || root.right != nil {
		t.Error("single node should have no children")
	}
}
