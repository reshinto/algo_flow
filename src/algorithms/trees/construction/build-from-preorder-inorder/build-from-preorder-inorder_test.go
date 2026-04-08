package main

import (
	"reflect"
	"testing"
)

func bpriInorder(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	left := bpriInorder(root.left)
	right := bpriInorder(root.right)
	result := append(left, root.value)
	return append(result, right...)
}

func bpriPreorder(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	result := []int{root.value}
	result = append(result, bpriPreorder(root.left)...)
	return append(result, bpriPreorder(root.right)...)
}

func TestBuildFromPreorderInorderBalanced7Node(t *testing.T) {
	root := buildFromPreorderInorder([]int{4, 2, 1, 3, 6, 5, 7}, []int{1, 2, 3, 4, 5, 6, 7})
	if root == nil || root.value != 4 {
		t.Error("root value should be 4")
	}
	if !reflect.DeepEqual(bpriInorder(root), []int{1, 2, 3, 4, 5, 6, 7}) {
		t.Error("inorder should be sorted")
	}
}

func TestBuildFromPreorderInorderPreservesPreorder(t *testing.T) {
	root := buildFromPreorderInorder([]int{4, 2, 1, 3, 6, 5, 7}, []int{1, 2, 3, 4, 5, 6, 7})
	if !reflect.DeepEqual(bpriPreorder(root), []int{4, 2, 1, 3, 6, 5, 7}) {
		t.Error("preorder should match input")
	}
}

func TestBuildFromPreorderInorderEmpty(t *testing.T) {
	root := buildFromPreorderInorder([]int{}, []int{})
	if root != nil {
		t.Error("empty input should return nil")
	}
}

func TestBuildFromPreorderInorderSingleNode(t *testing.T) {
	root := buildFromPreorderInorder([]int{42}, []int{42})
	if root == nil || root.value != 42 {
		t.Error("single node value should be 42")
	}
}

func TestBuildFromPreorderInorderRightSkewed(t *testing.T) {
	root := buildFromPreorderInorder([]int{1, 2, 3}, []int{1, 2, 3})
	if root == nil || root.value != 1 || root.left != nil {
		t.Error("right-skewed root should have no left child")
	}
}
