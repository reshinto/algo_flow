package main

import (
	"reflect"
	"testing"
)

func bpiInorder(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	left := bpiInorder(root.left)
	right := bpiInorder(root.right)
	result := append(left, root.value)
	return append(result, right...)
}

func bpiPostorder(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	left := bpiPostorder(root.left)
	right := bpiPostorder(root.right)
	result := append(left, right...)
	return append(result, root.value)
}

func TestBuildFromPostorderInorderBalanced7Node(t *testing.T) {
	root := buildFromPostorderInorder([]int{1, 3, 2, 5, 7, 6, 4}, []int{1, 2, 3, 4, 5, 6, 7})
	if root == nil || root.value != 4 {
		t.Error("root value should be 4")
	}
	if !reflect.DeepEqual(bpiInorder(root), []int{1, 2, 3, 4, 5, 6, 7}) {
		t.Error("inorder should be sorted")
	}
}

func TestBuildFromPostorderInorderPreservesPostorder(t *testing.T) {
	root := buildFromPostorderInorder([]int{1, 3, 2, 5, 7, 6, 4}, []int{1, 2, 3, 4, 5, 6, 7})
	if !reflect.DeepEqual(bpiPostorder(root), []int{1, 3, 2, 5, 7, 6, 4}) {
		t.Error("postorder should match input")
	}
}

func TestBuildFromPostorderInorderEmpty(t *testing.T) {
	root := buildFromPostorderInorder([]int{}, []int{})
	if root != nil {
		t.Error("empty input should return nil")
	}
}

func TestBuildFromPostorderInorderSingleNode(t *testing.T) {
	root := buildFromPostorderInorder([]int{42}, []int{42})
	if root == nil || root.value != 42 {
		t.Error("single node value should be 42")
	}
	if root.left != nil || root.right != nil {
		t.Error("single node should have no children")
	}
}
