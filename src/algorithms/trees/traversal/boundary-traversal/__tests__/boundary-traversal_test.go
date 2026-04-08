package main

import (
	"reflect"
	"testing"
)

func makeBSTNodeBoundary(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafBoundary(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBoundaryTraversalBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodeBoundary(4,
		makeBSTNodeBoundary(2, leafBoundary(1), leafBoundary(3)),
		makeBSTNodeBoundary(6, leafBoundary(5), leafBoundary(7)))
	expected := []int{4, 2, 1, 3, 5, 7, 6}
	if !reflect.DeepEqual(boundaryTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestBoundaryTraversalNullRoot(t *testing.T) {
	if len(boundaryTraversal(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestBoundaryTraversalSingleNode(t *testing.T) {
	expected := []int{42}
	if !reflect.DeepEqual(boundaryTraversal(leafBoundary(42)), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestBoundaryTraversalOnlyRightChild(t *testing.T) {
	root := makeBSTNodeBoundary(5, nil, leafBoundary(8))
	expected := []int{5, 8}
	if !reflect.DeepEqual(boundaryTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestBoundaryTraversalOnlyLeftChild(t *testing.T) {
	root := makeBSTNodeBoundary(5, leafBoundary(3), nil)
	expected := []int{5, 3}
	if !reflect.DeepEqual(boundaryTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}
