package main

import (
	"reflect"
	"testing"
)

func bpriiInorder(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	left := bpriiInorder(root.left)
	right := bpriiInorder(root.right)
	result := append(left, root.value)
	return append(result, right...)
}

func bpriiPreorder(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	result := []int{root.value}
	result = append(result, bpriiPreorder(root.left)...)
	return append(result, bpriiPreorder(root.right)...)
}

func TestBuildFromPreorderInorderIterativeBalanced7Node(t *testing.T) {
	root := buildFromPreorderInorderIterative([]int{4, 2, 1, 3, 6, 5, 7}, []int{1, 2, 3, 4, 5, 6, 7})
	if root == nil || root.value != 4 {
		t.Error("root value should be 4")
	}
	if !reflect.DeepEqual(bpriiInorder(root), []int{1, 2, 3, 4, 5, 6, 7}) {
		t.Error("inorder should be sorted")
	}
}

func TestBuildFromPreorderInorderIterativePreservesPreorder(t *testing.T) {
	root := buildFromPreorderInorderIterative([]int{4, 2, 1, 3, 6, 5, 7}, []int{1, 2, 3, 4, 5, 6, 7})
	if !reflect.DeepEqual(bpriiPreorder(root), []int{4, 2, 1, 3, 6, 5, 7}) {
		t.Error("preorder should match input")
	}
}

func TestBuildFromPreorderInorderIterativeEmpty(t *testing.T) {
	root := buildFromPreorderInorderIterative([]int{}, []int{})
	if root != nil {
		t.Error("empty input should return nil")
	}
}

func TestBuildFromPreorderInorderIterativeSingleNode(t *testing.T) {
	root := buildFromPreorderInorderIterative([]int{42}, []int{42})
	if root == nil || root.value != 42 {
		t.Error("single node value should be 42")
	}
	if root.left != nil || root.right != nil {
		t.Error("single node should have no children")
	}
}
