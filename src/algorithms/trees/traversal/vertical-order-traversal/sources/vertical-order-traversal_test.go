package main

import (
	"reflect"
	"testing"
)

func makeBSTNodeVertical(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafVertical(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestVerticalOrderTraversalBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodeVertical(4,
		makeBSTNodeVertical(2, leafVertical(1), leafVertical(3)),
		makeBSTNodeVertical(6, leafVertical(5), leafVertical(7)))
	expected := [][]int{{1}, {2}, {4, 3, 5}, {6}, {7}}
	if !reflect.DeepEqual(verticalOrderTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestVerticalOrderTraversalNullRoot(t *testing.T) {
	if len(verticalOrderTraversal(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestVerticalOrderTraversalSingleNode(t *testing.T) {
	expected := [][]int{{42}}
	if !reflect.DeepEqual(verticalOrderTraversal(leafVertical(42)), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestVerticalOrderTraversalRightSkewed(t *testing.T) {
	root := makeBSTNodeVertical(1, nil, makeBSTNodeVertical(2, nil, leafVertical(3)))
	expected := [][]int{{1}, {2}, {3}}
	if !reflect.DeepEqual(verticalOrderTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestVerticalOrderTraversalLeftChild(t *testing.T) {
	root := makeBSTNodeVertical(5, leafVertical(3), nil)
	expected := [][]int{{3}, {5}}
	if !reflect.DeepEqual(verticalOrderTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}
