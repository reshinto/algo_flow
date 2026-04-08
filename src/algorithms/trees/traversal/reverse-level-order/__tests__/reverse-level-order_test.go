package main

import (
	"reflect"
	"testing"
)

func makeBSTNodeRevLevel(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafRevLevel(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestReverseLevelOrderBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodeRevLevel(4,
		makeBSTNodeRevLevel(2, leafRevLevel(1), leafRevLevel(3)),
		makeBSTNodeRevLevel(6, leafRevLevel(5), leafRevLevel(7)))
	expected := [][]int{{1, 3, 5, 7}, {2, 6}, {4}}
	if !reflect.DeepEqual(reverseLevelOrder(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestReverseLevelOrderNullRoot(t *testing.T) {
	if len(reverseLevelOrder(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestReverseLevelOrderSingleNode(t *testing.T) {
	expected := [][]int{{42}}
	if !reflect.DeepEqual(reverseLevelOrder(leafRevLevel(42)), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestReverseLevelOrderLeftSkewed(t *testing.T) {
	root := makeBSTNodeRevLevel(5, makeBSTNodeRevLevel(4, leafRevLevel(3), nil), nil)
	expected := [][]int{{3}, {4}, {5}}
	if !reflect.DeepEqual(reverseLevelOrder(root), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestReverseLevelOrderRightSkewed(t *testing.T) {
	root := makeBSTNodeRevLevel(1, nil, makeBSTNodeRevLevel(2, nil, leafRevLevel(3)))
	expected := [][]int{{3}, {2}, {1}}
	if !reflect.DeepEqual(reverseLevelOrder(root), expected) {
		t.Errorf("expected %v", expected)
	}
}
