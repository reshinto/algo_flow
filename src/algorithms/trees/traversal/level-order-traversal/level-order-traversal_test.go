package main

import (
	"reflect"
	"testing"
)

func makeBSTNodeLevelOrder(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafLevelOrder(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestLevelOrderTraversalBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodeLevelOrder(4,
		makeBSTNodeLevelOrder(2, leafLevelOrder(1), leafLevelOrder(3)),
		makeBSTNodeLevelOrder(6, leafLevelOrder(5), leafLevelOrder(7)))
	expected := [][]int{{4}, {2, 6}, {1, 3, 5, 7}}
	if !reflect.DeepEqual(levelOrderTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestLevelOrderTraversalNullRoot(t *testing.T) {
	if len(levelOrderTraversal(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestLevelOrderTraversalSingleNode(t *testing.T) {
	expected := [][]int{{42}}
	if !reflect.DeepEqual(levelOrderTraversal(leafLevelOrder(42)), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestLevelOrderTraversalLeftSkewed(t *testing.T) {
	root := makeBSTNodeLevelOrder(5, makeBSTNodeLevelOrder(4, leafLevelOrder(3), nil), nil)
	expected := [][]int{{5}, {4}, {3}}
	if !reflect.DeepEqual(levelOrderTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestLevelOrderTraversalRightSkewed(t *testing.T) {
	root := makeBSTNodeLevelOrder(1, nil, makeBSTNodeLevelOrder(2, nil, leafLevelOrder(3)))
	expected := [][]int{{1}, {2}, {3}}
	if !reflect.DeepEqual(levelOrderTraversal(root), expected) {
		t.Errorf("expected %v", expected)
	}
}
