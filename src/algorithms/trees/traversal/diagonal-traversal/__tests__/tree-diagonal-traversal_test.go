package main

import (
	"reflect"
	"testing"
)

func makeBSTNodeDiagonal(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafDiagonal(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestTreeDiagonalTraversalBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodeDiagonal(4,
		makeBSTNodeDiagonal(2, leafDiagonal(1), leafDiagonal(3)),
		makeBSTNodeDiagonal(6, leafDiagonal(5), leafDiagonal(7)))
	expected := [][]int{{4, 6, 7}, {2, 5, 3}, {1}}
	if !reflect.DeepEqual(treeDiagonalTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestTreeDiagonalTraversalNullRoot(t *testing.T) {
	if len(treeDiagonalTraversal(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestTreeDiagonalTraversalSingleNode(t *testing.T) {
	expected := [][]int{{42}}
	if !reflect.DeepEqual(treeDiagonalTraversal(leafDiagonal(42)), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestTreeDiagonalTraversalRightSkewed(t *testing.T) {
	root := makeBSTNodeDiagonal(1, nil, makeBSTNodeDiagonal(2, nil, leafDiagonal(3)))
	expected := [][]int{{1, 2, 3}}
	if !reflect.DeepEqual(treeDiagonalTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestTreeDiagonalTraversalLeftSkewed(t *testing.T) {
	root := makeBSTNodeDiagonal(3, makeBSTNodeDiagonal(2, leafDiagonal(1), nil), nil)
	expected := [][]int{{3}, {2}, {1}}
	if !reflect.DeepEqual(treeDiagonalTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}
