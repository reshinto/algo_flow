package main

import (
	"reflect"
	"testing"
)

func makeBSTNodeZigzag(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafZigzag(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestZigzagLevelOrderBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodeZigzag(4,
		makeBSTNodeZigzag(2, leafZigzag(1), leafZigzag(3)),
		makeBSTNodeZigzag(6, leafZigzag(5), leafZigzag(7)))
	expected := [][]int{{4}, {6, 2}, {1, 3, 5, 7}}
	if !reflect.DeepEqual(zigzagLevelOrder(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestZigzagLevelOrderNullRoot(t *testing.T) {
	if len(zigzagLevelOrder(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestZigzagLevelOrderSingleNode(t *testing.T) {
	expected := [][]int{{42}}
	if !reflect.DeepEqual(zigzagLevelOrder(leafZigzag(42)), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestZigzagLevelOrderTwoLevelBothChildren(t *testing.T) {
	root := makeBSTNodeZigzag(1, leafZigzag(2), leafZigzag(3))
	expected := [][]int{{1}, {3, 2}}
	if !reflect.DeepEqual(zigzagLevelOrder(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestZigzagLevelOrderLeftSkewed(t *testing.T) {
	root := makeBSTNodeZigzag(3, makeBSTNodeZigzag(2, leafZigzag(1), nil), nil)
	expected := [][]int{{3}, {2}, {1}}
	if !reflect.DeepEqual(zigzagLevelOrder(root), expected) {
		t.Errorf("expected %v", expected)
	}
}
