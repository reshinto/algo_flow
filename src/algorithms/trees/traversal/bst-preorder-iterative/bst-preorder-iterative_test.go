package main

import (
	"reflect"
	"testing"
)

func makeBSTNodePreorderIter(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafPreorderIter(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBstPreorderIterativeBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodePreorderIter(4,
		makeBSTNodePreorderIter(2, leafPreorderIter(1), leafPreorderIter(3)),
		makeBSTNodePreorderIter(6, leafPreorderIter(5), leafPreorderIter(7)))
	if !reflect.DeepEqual(bstPreorderIterative(root), []int{4, 2, 1, 3, 6, 5, 7}) {
		t.Errorf("expected pre-order")
	}
}

func TestBstPreorderIterativeNullRoot(t *testing.T) {
	if len(bstPreorderIterative(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestBstPreorderIterativeSingleNode(t *testing.T) {
	if !reflect.DeepEqual(bstPreorderIterative(leafPreorderIter(42)), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestBstPreorderIterativeLeftSkewed(t *testing.T) {
	root := makeBSTNodePreorderIter(5, makeBSTNodePreorderIter(4, makeBSTNodePreorderIter(3, makeBSTNodePreorderIter(2, leafPreorderIter(1), nil), nil), nil), nil)
	if !reflect.DeepEqual(bstPreorderIterative(root), []int{5, 4, 3, 2, 1}) {
		t.Errorf("expected [5,4,3,2,1]")
	}
}

func TestBstPreorderIterativeRightSkewed(t *testing.T) {
	root := makeBSTNodePreorderIter(1, nil, makeBSTNodePreorderIter(2, nil, makeBSTNodePreorderIter(3, nil, makeBSTNodePreorderIter(4, nil, leafPreorderIter(5)))))
	if !reflect.DeepEqual(bstPreorderIterative(root), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1,2,3,4,5]")
	}
}

func TestBstPreorderIterativeLeftChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstPreorderIterative(makeBSTNodePreorderIter(5, leafPreorderIter(3), nil)), []int{5, 3}) {
		t.Errorf("expected [5,3]")
	}
}

func TestBstPreorderIterativeRightChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstPreorderIterative(makeBSTNodePreorderIter(5, nil, leafPreorderIter(8))), []int{5, 8}) {
		t.Errorf("expected [5,8]")
	}
}
